package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.FcPayableVM;
import com.capstone.cfos.controller.vm.FcStroreTransactionVM;
import com.capstone.cfos.controller.vm.TransactionVM;
import com.capstone.cfos.mapper.TransactionMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import com.kinoroy.expo.push.Message;
import org.omg.PortableInterceptor.SUCCESSFUL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.capstone.cfos.constants.Constant.*;
import static com.capstone.cfos.constants.Constant.TRANSACTION_GUEST;

@Service
public class TransactionServiceImp implements TransactionService {

    @Autowired
    TransactionRepository repository;

    @Autowired
    TransactionMapper transactionMapper;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Autowired
    public WalletService walletService;

    @Autowired
    private FoodCourtService foodCourtService;

    @Autowired
    private StoreRepository storeRepository;


    @Override
    public List<TransactionVM> getAllTransaction(String usernameCus) {
        if (usernameCus == "" || usernameCus == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Not found customer"
            );
        }
        String customerId = userRepository.findByUsername(usernameCus).getCustomer().getCustomerId();

        List<Transaction> transactions = repository.findAllByCustomerCustomerIdAndTranDescriptionNotOrderByTranDateDesc(customerId, TRANSACTION_DELETED);

        if (transactions == null) {
           return new ArrayList<>();
        }
        List<TransactionVM> transactionVMs = new ArrayList<>();
        for (Transaction t:transactions) {
            TransactionVM transactionVM = transactionMapper.toTransactionVm(t);
            if(t.getOrder() != null){
                transactionVM.setOrderNumberString(
                        String.format("%04d",t.getOrder().getOrderNumber())
                );
            }

            transactionVMs.add(transactionVM);
        }
        return transactionVMs;
    }

    @Override
    public void recordTransaction(TransactionVM vm) {
        Transaction transaction = new Transaction();
        Customer customer = customerRepository.findByCustomerId(vm.getCustomerId());
        if (vm.getEmpId() != null) {
            Employee employee = employeeRepository.findByEmpId(vm.getEmpId());
            transaction.setEmployee(employee);
        }
        Order order = orderRepository.findByOrderId(vm.getOrderId());
        transaction.setCustomer(customer);
        transaction.setOrder(order);
        transaction.setStatus(vm.getStatus());
        transaction.setTranDate(vm.getTranDate());
        transaction.setTranDescription(TRANSACTION_UNREAD);
        transaction.setTranTotal(vm.getTranTotal());
        transaction.setTranId(vm.getTranId());
        repository.save(transaction);
    }

    @Override
    public TransactionVM getTransactionById(Long tranId) {
        Transaction transaction = repository.findByTranId(tranId);
        if (transaction == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Invalid tranId!");
        }

        return transactionMapper.toTransactionVm(transaction);

    }

    @Override
    public Page<TransactionVM> getAllTransactionByStatus(Pageable pageable, String status, String authorize, long tranId) {
        User user = userRepository.findByUsername(authorize);
        if (user == null || user.getEmployee() == null || !user.getEmployee().getRole().getRoleName().equals(CASHIER)) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        Page<Transaction> transactions = repository.findAllByStatus(pageable, status);
        if (tranId != 0) {
            transactions = repository.findAllByTranId(pageable, tranId);
        }

        if (transactions == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Empty");
        }
        return transactions.map(transactionMapper::toTransactionVm);
    }

    @Override
    public TransactionVM deposit(TransactionVM vm, String authorityUsername, String password) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user == null || user.getEmployee() == null || !user.getEmployee().getRole().getRoleName().equals(CASHIER)) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Password is incorrect!");
        }
        Customer customer = customerRepository.findByCustomerId(vm.getCustomerId());
        if (customer == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Customer is not exist!");
        }
        if(vm.getTranTotal() <0){
            vm.setTranTotal(vm.getTranTotal()*-1);
        }

        Transaction transaction = new Transaction();
        transaction.setTranDescription(TRANSACTION_UNREAD);
        transaction.setTranTotal(vm.getTranTotal());
        transaction.setStatus(TRANSACTION_DEPOSIT);
        transaction.setTranDate(new Date());
        transaction.setEmployee(user.getEmployee());
        transaction.setCustomer(customer);

        walletService.changeCreditCustomer(customer.getCustomerId(), vm.getTranTotal(), false);
        Customer customer1 = customerRepository.findByCustomerId(vm.getCustomerId());
        String token = customer1.getDeviceToken();
        if (token != null) {
            Message message = new Message.Builder()
                    .to(token)
                    .title("Giao Dịch Thành Công !")
                    .sound("default")
                    .body("Bận Được Cộng: " + vm.getTranTotal() + "VNĐ Vào Tài Khoản.")
                    .build();
            Ultilities.sendNotification(token, message);
        }
        return transactionMapper.toTransactionVm(repository.save(transaction));
    }

    @Override
    public void recordTransaction(String customerId, double totalOrder, long orderIdNew, String empId) {
        TransactionVM transactionVM = new TransactionVM();
        //long orderIdNew = lastOrder.getOrderId() +1;

        transactionVM.setCustomerId(customerId);
        transactionVM.setOrderId(orderIdNew);
        if (customerId != null) {//case : customer
            transactionVM.setStatus(TRANSACTION_ORDERD);
            transactionVM.setTranDescription(TRANSACTION_UNREAD);
            transactionVM.setEmpId(null);
        } else {//case : guest
            if (totalOrder < 0) {//rolloback total orrdderr luôn âm

                transactionVM.setStatus(TRANSACTION_GUEST_ROLLBACK);
                transactionVM.setTranDescription(TRANSACTION_UNREAD);
            } else {
                transactionVM.setStatus(TRANSACTION_GUEST);
                transactionVM.setTranDescription(TRANSACTION_UNREAD);
            }
            transactionVM.setEmpId(empId);
        }

        transactionVM.setTranDate(new Date());
        //
        transactionVM.setTranTotal(totalOrder);
//        Transaction transaction = transactionMapper.toTransaction(transactionVM);
//        repository.save(transaction);
        recordTransaction(transactionVM);

    }

    @Override
    public String changeUnreadTransaction(String customerId) {
        if (customerId == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Customer is not exist!");
        }
        Customer customer = customerRepository.findByCustomerId(customerId);
        if (!customer.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Customer is unactive!");
        }
        List<Transaction> transactions = repository.findAllByCustomerCustomerId(customerId);
        if (transactions == null) {
            return "No transaction unread";
        }
        for (int i = 0; i < transactions.size(); i++) {
            transactions.get(i).setTranDescription(TRANSACTION_READ);
        }
        repository.saveAll(transactions);
        return SUCCESS;
    }

    @Override
    public String deleteNoti(String authorityUsername, long transactionId) {
        if (authorityUsername == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Customer not found!");
        }
        User user = userRepository.findByUsername(authorityUsername);
        Customer customer = user.getCustomer();
        if (!customer.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Customer is unactive!");
        }

        Transaction transaction = repository.findByCustomerCustomerIdAndTranId(customer.getCustomerId(), transactionId);
        if (transaction != null) {
            transaction.setTranDescription(TRANSACTION_DELETED);
            return SUCCESS;
        }
        return UNSUCCESSFULL;
    }

    @Override
    public double getStoreReceivable(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            Store store = user.getEmployee().getStore();
            if (store != null) {
                return store.getRevenue();
            }
        }
        return 0;
    }

    @Override
    public List<FcStroreTransactionVM> getStoreReceivableHistory(String authorityUsername) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user != null) {
            Store store = user.getEmployee().getStore();
            if (store != null) {
                FoodCourt foodCourt = store.getFoodCourt();
                if (foodCourt != null) {
                    return getFcPayableHistory(foodCourt.getFcId(), store.getStoreId());
                }
            }
        }
        return null;
    }


    private List<FcStroreTransactionVM> getFcPayableHistory(long fcId, long storeId) {

        List<Transaction> transactions = repository.findAllByStoreStoreIdAndFoodCourtFcIdOrderByTranDateDesc(storeId, fcId);
        return transactions.stream().map(transactionMapper::toFcStroreTransactionVm).collect(Collectors.toList());
    }

    @Override
    public List<FcPayableVM> getFcPayable(String authorityUsername) {
        FoodCourt foodCourt = foodCourtService.authorityFoodCourt(authorityUsername);
        List<Store> stores = storeRepository.findAllByFcId(foodCourt.getFcId());
        List<FcPayableVM> fcPayableVMS = new ArrayList<>();
        int countStore = stores.size();
        for (int i = 0; i < countStore; i++) {
            FcPayableVM fcPayableVM = new FcPayableVM();
            fcPayableVM.setStoreId(stores.get(i).getStoreId());
            fcPayableVM.setStoreName(stores.get(i).getStoreName());
            fcPayableVM.setPayableRemain(stores.get(i).getRevenue());
            fcPayableVM.setFcStroreTransactionVMS(
                    getFcPayableHistory(foodCourt.getFcId(), stores.get(i).getStoreId())
            );
            fcPayableVMS.add(fcPayableVM);
        }
        return fcPayableVMS;

    }


    @Override
    public String fcPostTransaction(String authorityUsername, FcStroreTransactionVM vm) {
        FoodCourt foodCourt = foodCourtService.authorityFoodCourt(authorityUsername);
        Store store = storeRepository.findByStoreId(vm.getStoreId());
        if (store == null) {
            return UNSUCCESSFULL + " Invalid store";
        }
        Transaction transaction = new Transaction();
        transaction.setTranDescription(vm.getTranDescription());
        transaction.setStatus(TRANSACTION_SPENDING);
        transaction.setTranTotal(vm.getTranTotal());
        transaction.setTranDate(new Date());
        transaction.setFoodCourt(foodCourt);
        transaction.setStore(store);
        repository.save(transaction);
        return SUCCESS;
    }

    @Override
    public String fcCancelTransaction(String authorityUsername, long tranId){
        FoodCourt foodCourt = foodCourtService.authorityFoodCourt(authorityUsername);
        Transaction transaction = repository.findByTranId(tranId);
        if(transaction != null){
            if(!transaction.getFoodCourt().getFcId().equals(foodCourt.getFcId())){
                return UNSUCCESSFULL;
            }
        }
        if(transaction != null){
            transaction.setStatus(TRANSACTION_CANCEL);
            repository.save(transaction);
            return SUCCESS;
        }else return UNSUCCESSFULL;

    }

    @Override
    public String storeConfirmTrans(String authorityUsername, long tranId){
        User user = userRepository.findByUsername(authorityUsername);
        if (user != null) {
            Store store = user.getEmployee().getStore();
            if (store != null) {
                Transaction transaction = repository.findByTranId(tranId);
                if(transaction != null){
                    if(!transaction.getStore().getStoreId().equals(store.getStoreId())){
                        return UNSUCCESSFULL;
                    }
                    transaction.setStatus(TRANSACTION_COMPLETED);
                    transaction.setTranDateEnd(new Date());
                    repository.save(transaction);
                    store.setRevenue(store.getRevenue() - transaction.getTranTotal());
                    storeRepository.save(store);
                }
            }
        }
        return SUCCESS;
    }



}
