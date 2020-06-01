package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.ChangePasswordVM;
import com.capstone.cfos.controller.vm.CustomerVM;
import com.capstone.cfos.controller.vm.EmpVM;
import com.capstone.cfos.controller.vm.PasswordForgotVM;
import com.capstone.cfos.mapper.CustomerMapper;
import com.capstone.cfos.mapper.UserMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.tomcat.util.bcel.Const;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static com.capstone.cfos.constants.Constant.*;

@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository repository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    FoodCourtRepository foodCourtRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    WalletRepository walletRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    UserMapper userMapper;

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    MailService mailService;

    @Autowired
    public PasswordEncoder passwordEncoder;

    @Override
    public void saveAdminAccount(EmpVM vm) {
        User user = repository.findByUsername(vm.getUsername());
        if (user != null) {
            return;
        } else {
            user = new User();
            user.setUsername(vm.getUsername());
            user.setFullname(vm.getFullname());
            user.setAddress(vm.getAddress());
            user.setBirthday(vm.getBirthday());
            user.setPhone(vm.getPhone());
            user.setEmail(vm.getEmail());
            user.setLoginCount(0);
            user.setStatus("");

            user.setPassword(encoder.encode(Ultilities.md5("admin")));
            user = repository.save(user);

            Customer customer = new Customer();
            customer.setCustomerId("CUS_" + user.getId());
            customer.setActive(true);
            customer.setUser(user);
            customerRepository.save(customer);

            Wallet wallet = new Wallet();
            wallet.setAmount(0);
            wallet.setCustomer(customer);
            walletRepository.save(wallet);

            Card checkCard = cardRepository.findByCardId(vm.getCardId());
            if(checkCard != null ){
                if(!checkCard.getStatus().equals(CARD_UNACTIVATE)){
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Thẻ này không thẻ sử dụng!");
                }
            }
            Card card = new Card();
            card.setStatus(CARD_ACTIVATE);
            card.setCustomer(customer);
            cardRepository.save(card);

            Role role = roleRepository.findByRoleName(SYSTEM_ADMIN);
            if (role != null) {
                Employee employee = new Employee();
                employee.setEmpId("EMP_" + user.getId());
                employee.setActive(true);
                employee.setRole(role);
                employee.setUser(user);
                employeeRepository.save(employee);
            }
        }
    }

    @Override
    public EmpVM createEmp(EmpVM vm, HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        User user = repository.findByUsername(vm.getUsername());
        if (user != null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account exist!");
        }
        user = repository.findByEmail(vm.getEmail());
        if (user != null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This email is registered!");
        }
        user = new User();
        user.setUsername(vm.getUsername());
        user.setFullname(vm.getFullname());
        user.setAddress(vm.getAddress());
        user.setBirthday(vm.getBirthday());
        user.setPhone(vm.getPhone());
        user.setEmail(vm.getEmail());
        user.setLoginCount(0);
        user.setStatus("");

        String newpassword = randomPassword();
        user.setPassword(encoder.encode(Ultilities.md5(newpassword)));
        user = repository.save(user);

        try {
            mailService.sendMail(user, request, newpassword);
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Email is not exist!");
        }

        Customer customer = new Customer();
        customer.setCustomerId("CUS_" + user.getId());
        customer.setActive(true);
        customer.setUser(user);
        customerRepository.save(customer);

        Wallet wallet = new Wallet();
        wallet.setAmount(0);
        wallet.setCustomer(customer);
        walletRepository.save(wallet);

        Card card = new Card();
        card.setCardId(vm.getCardId());
        card.setStatus(CARD_ACTIVATE);
        card.setIssueDate(new Date());
        card.setCustomer(customer);
        cardRepository.save(card);

        Role role = roleRepository.findByRoleId(vm.getRoleId());
        if (role != null) {

            Employee employee = new Employee();
            employee.setEmpId("EMP_" + user.getId());
            employee.setStartDate(vm.getStartDate());
            employee.setActive(true);

            Store store = storeRepository.findByStoreId(vm.getStoreId());
            if (store != null) employee.setStore(store);

            employee.setRole(role);
            employee.setUser(user);

            FoodCourt foodCourt = null;
            User user1 = repository.findByUsername(username);
            switch (user1.getEmployee().getRole().getRoleName()) {
                case SYSTEM_ADMIN:
                    foodCourt = foodCourtRepository.findByFcId(vm.getFcId());
                    System.out.println(foodCourt.getFcName());
                    break;
                case FOOD_COURT_MANAGER:
                    foodCourt = user1.getEmployee().getFoodCourt();
                    break;
                default:
                    break;
            }
            employee.setFoodCourt(foodCourt);
            employee = employeeRepository.save(employee);

            user.setEmployee(employee);
        }
        return userMapper.toEmpVM(user);
    }


    @Override
    public EmpVM updateEmp(EmpVM vm) {
        User user = repository.findByUserId(vm.getId());
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is not exist!");
        } else {
            user.setFullname(vm.getFullname());
            user.setAddress(vm.getAddress());
            user.setBirthday(vm.getBirthday());
            user.setPhone(vm.getPhone());
            user.setEmail(vm.getEmail());
            if (user.getEmployee() != null) {
                user.getEmployee().setActive(vm.isActive());
            }
            return userMapper.toEmpVM(repository.save(user));
        }
    }

    @Override
    public CustomerVM updateCus(CustomerVM vm) {
        User user = repository.findByUserId(vm.getId());
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Tài khoản này không tồn tại!");
        }
        user.getCustomer().setActive(vm.isActive());
        if(vm.getCardStatus().equals(CARD_LOST)){
            Card oldCard = cardRepository.findByCustomerCustomerId(user.getCustomer().getCustomerId());
            if (oldCard != null) {
                oldCard.setCustomer(null);
                oldCard.setStatus(CARD_LOST);
                oldCard.setIssueDate(new Date());
                oldCard.setLockDate(new Date());
                cardRepository.save(oldCard);
            }
        }
        if(vm.getCardId() != null){
            Card checkCard = cardRepository.findByCardId(vm.getCardId());
            if(checkCard != null){
                if(vm.getCardStatus().equals(CARD_ACTIVATE)){
                    if(checkCard.getStatus().equals(Constant.CARD_ERROR) || checkCard.getStatus().equals(Constant.CARD_LOST))
                        throw new ResponseStatusException(
                                HttpStatus.BAD_REQUEST, "Thẻ không thể sử dụng!");
                    if(checkCard.getStatus().equals(CARD_ACTIVATE))
                        throw new ResponseStatusException(
                                HttpStatus.BAD_REQUEST, "Thẻ đã được sử dụng!");
                    Card oldCard = cardRepository.findByCustomerCustomerId(user.getCustomer().getCustomerId());
                    if (oldCard != null) {
                        oldCard.setCustomer(null);
                        oldCard.setStatus(CARD_UNACTIVATE);
                        cardRepository.save(oldCard);
                    }
                    checkCard.setCustomer(user.getCustomer());
                    checkCard.setStatus(CARD_ACTIVATE);
                    cardRepository.save(checkCard);

                }else if(vm.getCardStatus().equals(CARD_ERROR) || vm.getCardStatus().equals(CARD_UNACTIVATE)){
                    checkCard.setStatus(vm.getCardStatus());
                    checkCard.setCustomer(null);
                    checkCard.setLockDate(new Date());
                    checkCard.setIssueDate(new Date());
                    cardRepository.save(checkCard);
                }

            }else{
                Card oldCard = cardRepository.findByCustomerCustomerId(user.getCustomer().getCustomerId());
                if (oldCard != null) {
                    oldCard.setCustomer(null);
                    oldCard.setStatus(CARD_UNACTIVATE);
                    cardRepository.save(oldCard);
                }
                Card newCard = new Card();
                newCard.setCardId(vm.getCardId());
                newCard.setIssueDate(new Date());
                newCard.setStatus(CARD_ACTIVATE);
                newCard.setCustomer(user.getCustomer());
                user.getCustomer().setCard(newCard);

            }
        }
        return customerMapper.toCustomerVM(repository.save(user));



    }

    @Override
    public String resetPassword(PasswordForgotVM vm, HttpServletRequest request) {

        if (vm.getEmail() != null) {
            User user = repository.findByEmail(vm.getEmail());
            if (user == null) {
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "This email is not exist!");
            }
            String password = randomPassword();
            user.setPassword(encoder.encode(Ultilities.md5(password)));
            user = repository.save(user);
            mailService.sendMail(user, request, password);
            return SUCCESSFULL;
        }
        return FAIL;
    }


    private String randomPassword() {
        String box = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefjhijklmnopqrstuvwxyz0123456789";
        String password = "";
        Random rand = new Random();
        for (int i = 0; i <= 8; i++) {
            password += box.charAt(rand.nextInt(box.length()));
        }
        return password;
    }

    @Override
    public String changePassword(ChangePasswordVM vm, String authorityUsername) {
        User user = repository.findByUsername(authorityUsername);
        if (user == null) {
            return "This account is not exist!";
//            throw new ResponseStatusException(
//                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is not exist!");
        }
        if (!passwordEncoder.matches(vm.getOldPassword(), user.getPassword())) {
            return "Old password is not matched!";
//            throw new ResponseStatusException(
//                HttpStatus.INTERNAL_SERVER_ERROR, "Old password is not matched!");
        }
        user.setPassword(encoder.encode(vm.getNewPassword()));
        repository.save(user);
        return SUCCESS;
    }

    @Override
    public List<EmpVM> getAllEmp() {
        List<User> users = repository.findAll();
        if (users == null || users.isEmpty()) {
            return null;
        }
        return users.stream().map(userMapper::toEmpVM).collect(Collectors.toList());
    }

    @Override
    public EmpVM getProfile(String username) {
        User user = repository.findByUsername(username);
        if (user == null) {
            return null;
        }
        return userMapper.toEmpVM(user);
    }

    @Override
    public Page<EmpVM> getAllEmp(Pageable pageable, String username) {
        User user = repository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        Page<User> userPage = null;
        String roleName = user.getEmployee().getRole().getRoleName();
        switch (roleName) {
            case SYSTEM_ADMIN:
                userPage = repository.findAllByRoleName(pageable, FOOD_COURT_MANAGER);
                break;
            case FOOD_COURT_MANAGER:
                FoodCourt foodCourt = user.getEmployee().getFoodCourt();
                userPage = repository.findAllEmp(pageable, foodCourt.getFcId(), FOOD_COURT_MANAGER);
                break;
            default:
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        if (userPage == null || userPage.isEmpty()) {
            return null;
        }
        return userPage.map(userMapper::toEmpVM);
    }

    @Override
    public Page<CustomerVM> getAllCustomer(Pageable pageable, String username) {
        User user = repository.findByUsername(username);
        if (user == null || !user.getEmployee().getRole().getRoleName().equals(CASHIER)) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        Page<User> userPage = repository.findAll(pageable);
        if (userPage == null || userPage.isEmpty()) {
            return null;
        }
        return userPage.map(customerMapper::toCustomerVM);
    }

    @Override
    public Page<EmpVM> searchEmp(Pageable pageable, String username, String searchValue) {
        User user = repository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        Page<User> userPage = null;
        String roleName = user.getEmployee().getRole().getRoleName();
        switch (roleName) {
            case SYSTEM_ADMIN:
                userPage = repository.searchFcAdmin(pageable, FOOD_COURT_MANAGER, searchValue);
                break;
            case FOOD_COURT_MANAGER:
                FoodCourt foodCourt = user.getEmployee().getFoodCourt();
                userPage = repository.searchEmp(pageable, foodCourt.getFcId(), FOOD_COURT_MANAGER, searchValue);
                break;
            default:
                throw new ResponseStatusException(
                        HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        if (userPage == null || userPage.isEmpty()) {
            return null;
        }
        return userPage.map(userMapper::toEmpVM);
    }

    @Override
    public Page<CustomerVM> searchCus(Pageable pageable, String username, String searchValue) {
        User user = repository.findByUsername(username);
        if (user == null || !user.getEmployee().getRole().getRoleName().equals(CASHIER)) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This account is unauthoried!");
        }
        Page<User> userPage = repository.searchCustomer(pageable, searchValue);
        if (userPage == null || userPage.isEmpty()) {
            userPage = repository.findAllByCustomerCardCardId(pageable, searchValue);
        }
        if (userPage == null || userPage.isEmpty()) {
            return null;
        }
        return userPage.map(customerMapper::toCustomerVM);
    }

    @Override
    public EmpVM getEmpById(Long id) {
        User user = repository.findByUserId(id);
        if (user == null) {
            return null;
        }
        return userMapper.toEmpVM(user);
    }

    @Override
    public String deleteEmp(Long id) {
        User user = repository.findByUserId(id);
        if (user == null || user.getEmployee() == null) {
            return "This employee is not exist!";
        }
        user.getEmployee().setActive(false);
        repository.save(user);
        return SUCCESS;

    }

    @Override
    public CustomerVM getInfoCustomer(String usernameCus, String cardId) {
        User user = null;
        if (StringUtils.isEmpty(cardId)) {
            user = repository.findByUsername(usernameCus);
        } else {
            Card card = cardRepository.findByCardId(cardId);
            if(card != null){
                if(card.getStatus().equals(CARD_LOST) || card.getStatus().equals(CARD_ERROR))
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Thẻ này không thể sử dụng");
            }
            user = repository.findByCustomerCardCardId(cardId);
            if(user == null)
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Thẻ này không tồn tại");

        }
        CustomerVM customerVM = customerMapper.toCustomerVM(user);

        customerVM.setWalletAmount((walletRepository.findByCustomerCustomerId(customerVM.getCustomerId())).getAmount());
        return customerVM;
    }

    @Override
    public String updateCustomerInfo(CustomerVM customerVM,String username) {
        User user = repository.findByUsername(username);
        if (user == null)    {
            return UNSUCCESSFULL;
        }

        if (customerVM.getFullname() != null) user.setFullname(customerVM.getFullname());
        if (customerVM.getEmail() != null) user.setEmail(customerVM.getEmail());
        if (customerVM.getGender() != null) user.setGender(customerVM.getGender());
        if (customerVM.getPhone() != null) user.setPhone(customerVM.getPhone());
        repository.save(user);
        return SUCCESSFULL;
    }

    @Override
    public String updateDeviceToken(String authorityUsername, String deviceToken) {
        User user = repository.findByUsername(authorityUsername);
        if (user == null) {
            return UNSUCCESSFULL;
        } else {
            Customer customer = user.getCustomer();
            customer.setDeviceToken(deviceToken);
            customerRepository.save(customer);
            return SUCCESS;
        }
    }

    @Override
    public String deactivateCard(String username, String password) {
        User user = repository.findByUsername(username);
        if(user != null){
            if(passwordEncoder.matches(password,user.getPassword())){
                if(user.getCustomer().getCard() != null){
                    Card card = user.getCustomer().getCard();
                    card.setCustomer(null);
                    card.setStatus(CARD_LOST);
                    cardRepository.save(card);
                    return SUCCESS;
                }else return  "Không tìm thấy thẻ cho tài khoản này";
            }else return  "Mật khẩu không chính xác";

        }
        return  UNSUCCESSFULL;
    }
}
