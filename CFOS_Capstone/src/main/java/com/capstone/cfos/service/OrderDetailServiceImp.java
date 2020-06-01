package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.CustomerController;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.OrderDetailMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.apache.http.HttpException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Time;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.capstone.cfos.constants.Constant.*;
import static com.capstone.cfos.constants.Constant.ORDER_PLACEED;
import static com.capstone.cfos.constants.Constant.ORDER_READY;

import com.kinoroy.expo.push.*;

@Service
public class OrderDetailServiceImp implements OrderDetailService {
    @Autowired
    OrderDetailRepository repository;

    @Autowired
    OrderDetailMapper mapper;

    @Autowired
    FoodRepository foodRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    TransactionService transactionService;

    @Autowired
    WalletService walletService;

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    OrderService orderService;
    @Autowired
    OrderDetailFoodOptionRepository orderDetailFoodOptionRepository;
    @Autowired
    FoodOptionRepository foodOptionRepository;
    @Autowired
    BlockService blockService;

    @Autowired
    UserRepository userRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderDetailServiceImp.class);

    @Override
    public List<OrderDetailReponseVM> getAllOrderDetailOfStore(Long storeId) {
        List<OrderDetail> orderDetails = repository.findAllByStoreStoreIdAndOderDetailStatus(storeId, ORDER_PLACEED);
        if (orderDetails == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Store id does not exit");
        }
        return orderDetails.stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList());

    }

    @Override
    public String changeStatusOrderDetail(Long orderDetailId, String newStatus) {
        OrderDetail orderDetail = repository.findByOrderDetailId(orderDetailId);
        Order vm = orderDetail.getOrder();
        String oldStatus = orderDetail.getOderDetailStatus();
        switch (oldStatus) {
            case ORDER_PLACEED://placed -> ready or cancel
                if (newStatus == ORDER_PLACEED) {
                    return "Order have already PLACED";
                }
                if (newStatus == ORDER_CANCELLED) {//case cancel order
                    newStatus = ORDER_REFUNDED;

                    blockService.pollOrderDetailFromDeque(orderDetailId);
                    TransactionVM transactionVM = new TransactionVM();
                    if (vm.getCustomer() != null) {//case customer
                        orderDetail.setOrderDetailDate(new Date());
                        HashMap<String, Object> order = new HashMap<>();
                        order.put("OrderNumber", orderDetail.getOrder().getOrderNumber());
                        String token = orderDetail.getOrder().getCustomer().getDeviceToken();
                        if (token != null) {
                            Message message = new Message.Builder()
                                    .to(token)
                                    .title("Order Đã Bị Hủy")
                                    .body("Món Ăn: "
                                            + orderDetail.getFood().getFoodName() + "\r\n"
                                            + "Số Order: "
                                            + orderDetail.getOrder().getOrderNumber() + "\r\n"
                                            + "Đã Bị Hủy Vì Lý Do Nhà Bếp Trục Trặc!")
                                    .data(order)

                                    .build();
                            Ultilities.sendNotification(token, message);
                        } else {
                            LOGGER.info("Error with send notification: token = null");
                        }

                        transactionVM.setCustomerId(vm.getCustomer().getCustomerId());
                        transactionVM.setStatus(TRANSACTION_ROLLBACK);//chỉ dành cho customer bị chef cancel
                        transactionVM.setTranDescription(vm.getCustomer().getCustomerId() + "_" + vm.getOrderId());
                        walletService.changeCreditCustomer
                                (vm.getCustomer().getCustomerId(), orderDetail.getTotalPrice(), false);
                    } else {//case là guest
                        orderDetail.setOrderDetailDate(new Date());
                        newStatus = ORDER_CANCELLED;//case guest bị chef cancel
                        //  blockService.pollOrderDetailFromDeque(orderDetailId);
                        break;
//                        transactionVM.setStatus(TRANSACTION_ROLLBACK+"_GUEST");
//                        transactionVM.setTranDescription("GUEST" + "_"+vm.getOrderId() );
                    }
                    //ghi lại transaction khi đã cancel
                    transactionVM.setOrderId(vm.getOrderId());
                    transactionVM.setTranDate(new Date());
                    transactionVM.setEmpId(null);
                    transactionVM.setTranTotal(orderDetail.getTotalPrice() * -1);
                    orderDetail.setOrderDetailDate(new Date());
                    transactionService.recordTransaction(transactionVM);
                    // blockService.pollOrderDetailFromDeque(orderDetailId);

                }
                if (newStatus == ORDER_READY) {

                    Store store = orderDetail.getStore();
                    if (store != null) {
                        store.setRevenue(store.getRevenue() + orderDetail.getTotalPrice());
                        storeRepository.save(store);
                    }
                    blockService.pollOrderDetailFromDeque(orderDetailId);
                    orderDetail.setOrderDetailDate(new Date());
                    if (vm.getCustomer() != null) {//check coi phải customer order k?
                        HashMap<String, Object> order = new HashMap<>();
                        order.put("OrderNumber", orderDetail.getOrder().getOrderNumber());
                        String token = orderDetail.getOrder().getCustomer().getDeviceToken();
                        if (token != null) {
                            Message message = new Message.Builder()
                                    .to(token)
                                    .title("Vui Lòng Đến "
                                            + orderDetail.getFood().getStoreCategory().getStore().getStoreName() + " Nhận Món Ăn")
                                    .body("Món Ăn: "
                                            + orderDetail.getFood().getFoodName() + "\r\n"
                                            + "Số Order: "
                                            + orderDetail.getOrder().getOrderNumber() + "\r\n"
                                            + "Đã Hoàn Thành!")
                                    .data(order)

                                    .build();
                            Ultilities.sendNotification(token, message);
                        } else {
                            LOGGER.info("Error with send notification: token = null");
                        }

                        Customer customer = customerRepository.findByCustomerId(vm.getCustomer().getCustomerId());
                        //update customer đã order đc bao nhiêu món ăn
                        customer.setCountOrder(orderService.countTotalOrderCustomer(customer.getCustomerId()));
                        //customer.setPoint();
                        customer.setLastOrder(new Date());
                        customerRepository.save(customer);
                    }

                }
                break;
            case ORDER_READY: //ready -> delivered
                if (newStatus == ORDER_READY) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have already READY"
                    );
                }
                if (newStatus == ORDER_CANCELLED) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have finished, can not cancel this order!");
                }
                if (newStatus == ORDER_PLACEED) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have finished, can not placed this order again!");
                }
                break;


            case ORDER_CANCELLED:
                if (newStatus == ORDER_CANCELLED) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have already CANCELLED");
                }
//                if(newStatus == ORDER_DELIVERED){
//                    throw new ResponseStatusException(
//                            HttpStatus.INTERNAL_SERVER_ERROR,
//                            "Order have already CANCELLED"
//                    );
//                }
                if (newStatus == ORDER_READY) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have already CANCELLED"
                    );
                }
                if (newStatus == ORDER_PLACEED) {
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "Order have CANCELLED, can not placed this order again!");
                }
                break;


        }
        orderDetail.setOderDetailStatus(newStatus);
        repository.save(orderDetail);


        return "Successful change status from" + oldStatus + "to" + newStatus;
    }


    @Override
    @Transactional
    public OrderDetailVM saveOrderDetail(OrderDetailVM vm, String customerId, String scheduleTime) {
        OrderDetail lastOrderdetail = repository.findTop1ByOrderByOrderDetailIdDesc();//tìm orderDetail cuối cùng
        if (lastOrderdetail == null) {//case first order, create 1 orderDetail with orderDetailNumber = 0
            OrderDetail order1 = new OrderDetail();
            order1.setOrderDetailNumber(0);
            order1.setTotalPrice(0);
            order1.setQuantity(0);

            repository.save(order1);
            lastOrderdetail = order1;
        }
        OrderDetail orderDetail = new OrderDetail();
        Food food = foodRepository.findByFoodId(vm.getFoodId());
        if (food.getQuantity() < vm.getQuantity()) {//hết food trong kho
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    food.getFoodName() + " đã hết. Xin quý khách chọn món khác"
            );
        }
        food.setQuantity(food.getQuantity() - vm.getQuantity());//trừ quantity của food khi đc order
        foodRepository.save(food);
        Order lastOrder = orderRepository.findTop1ByOrderByOrderIdDesc();
        if (customerId != null) { //Customer order
            orderDetail.setOderDetailStatus(ORDER_PLACEED);
        }
        if (customerId == null) { //guest order
            orderDetail.setOderDetailStatus(ORDER_GUEST_NOT_PAID);
        }

        orderDetail.setFood(food);
        orderDetail.setOrder(lastOrder);//save order_id
        orderDetail.setQuantity(vm.getQuantity());
        orderDetail.setOrderDetailDate(vm.getOrderDetailDate());
        orderDetail.setStore(food.getStoreCategory().getStore());
        orderDetail.setOrderDetailNumber(lastOrderdetail.getOrderDetailNumber() + 1);// thêm 1
        orderDetail.setTotalPrice(vm.getTotalPrice());
        // vm.setTotalPrice(Math.random()*500);
        orderDetailRepository.save(orderDetail);
        if (scheduleTime != null) {
            blockService.addToBlock(new Time(new Date().getTime()), scheduleTime, orderDetail.getOrderDetailNumber());
        } else {//case for guest or customer without shedulerTime
            blockService.addToBlock(new Time(new Date().getTime()), null, orderDetail.getOrderDetailNumber());
        }
        //OrderDetail lastOrderDetail = repository.findTop1ByOrderByOrderDetailIdDesc();
        List<OrderDetailFoodOption> orderDetailFoodOptions = new ArrayList<>();

        if (vm.getOrderDetailFoodOption() != null) {//xử lí foodOption
            int size = vm.getOrderDetailFoodOption().size();

            for (int i = 0; i < size; i++) {
                OrderDetailFoodOption orderDetailFoodOption = new OrderDetailFoodOption();
                orderDetailFoodOption.setQuantity(vm.getOrderDetailFoodOption().get(i).getQuantity());
                orderDetailFoodOption.setFoodOption(foodOptionRepository.findByFoId(vm.getOrderDetailFoodOption().get(i).getFoId()));
                orderDetailFoodOption.setOrderDetail(orderDetailRepository.findByOrderDetailId(orderDetail.getOrderDetailId()));
                orderDetailFoodOptions.add(orderDetailFoodOption);
            }
            orderDetailFoodOptionRepository.saveAll(orderDetailFoodOptions);
            orderDetail.setOrderDetailFoodOption(orderDetailFoodOptions);
        }
        return mapper.toOrderDetailVM(orderDetail);
    }

    //dùng cho màn hình chờ ngoài store
    @Override
    public List<OrderDetailReponseVM> getAllOrderDetailByStatusAndStore(String status, Long storeId) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Date start = oneDateVM.getDateStart();
        Date end = oneDateVM.getDateEnd();
        List<OrderDetail> orderDetailList =
                repository.findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetweenOrderByOrderDetailIdDesc
                        (status, storeId, start, end);
        if (orderDetailList == null) {
            return new ArrayList<>();
        }
        return orderDetailList.stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList());
    }

    //dùng cho cashier
    @Override
    public Page<OrderDetailReponseVM> getAllOrderCancel(Pageable pageable, String status) {
        Page<OrderDetail> orderDetailList = repository.findAllByOderDetailStatus(pageable, status);
        return orderDetailList.map(mapper::toOrderDetailReponseVM);

    }

    //cashier sử dụng để trả tiền lại cho khách hàng bị cancel orderDetail
    @Override
    public String rollbackOrderDetail(Long orderDetailId, String username) {
        User user = userRepository.findByUsername(username);
        String empId = user.getEmployee().getEmpId();
        OrderDetail orderDetail = orderDetailRepository.findByOrderDetailId(orderDetailId);
        if (orderDetail == null) {
            return "Orderdetail ID không hợp lệ !";
        }
        orderDetail.setOderDetailStatus(ORDER_REFUNDED);
        orderDetailRepository.save(orderDetail);
        //String s = order.getCustomer().getCustomerId();
        double v = orderDetail.getTotalPrice() * -1;
        long l = orderDetail.getOrderDetailId();
        transactionService.recordTransaction(null, v, l, empId);
        return SUCCESS;
    }

    @Override
    public List<OrderKitchenVM> getAllOrderDetailForStore(String username) {
        User user = userRepository.findByUsername(username);
        long storeId = user.getEmployee().getStore().getStoreId();
        List<OrderDetail> orderDetailList =
                blockService.getOrderDetailForKitchen(storeId);
        if (orderDetailList == null) {
            return new ArrayList<>();
        }
        List<OrderDetail> result = new ArrayList<>();
        int countOrderDetailList = orderDetailList.size();
        for (int i = 0; i < countOrderDetailList; i++) {
            if (orderDetailList.get(i) != null) {
                result.add(orderDetailList.get(i));
            }
        }

//          List<OrderDetailReponseVM> orderDetailVMS =result.stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList());
        return groupOrderDetail(result, storeId);
    }

    private List<OrderKitchenVM> groupOrderDetail(List<OrderDetail> orderDetails, long storeId) {
        List<OrderKitchenVM> result = new ArrayList<>();
        List<Order> orders = orderRepository.findDistinctByOrderDetailsIn(orderDetails);

        int count = orders.size();
        for (int i = 0; i < count; i++) {
            OrderKitchenVM orderKitchenVM = new OrderKitchenVM();
            orderKitchenVM.setOrderNumber(orders.get(i).getOrderNumber());

            orderKitchenVM.setScheduleTime(orders.get(i).getScheduleTime());
            if (orders.get(i).getScheduleTime() == null) {
                // orderKitchenVM.setScheduleTime(Time.valueOf(new Date().toString()).toString());
                orderKitchenVM.setScheduleTime(new Time(orders.get(i).getOrderDate().getTime()).toString());

            }
            orderKitchenVM.setStoreName(storeRepository.findByStoreId(storeId).getStoreName());
            orderKitchenVM.setListOrderDetail(orderDetailRepository.findAllByOrderOrderIdAndOderDetailStatusAndStoreStoreIdOrderByOrderDetailNumberAsc
                    (orders.get(i).getOrderId(), ORDER_PLACEED, storeId)
                    .stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList()));
            result.add(orderKitchenVM);
        }
        return result;
    }

    @Override
    public List<OrderKitchenVM> getAllOrderDetailReadyForFoodCourt(long foodcourtId) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<OrderDetail> orderDetailList = repository.findAllByOderDetailStatusAndStoreFoodCourtFcIdAndOrderOrderDateBetweenOrderByOrderDetailDateDesc
                (ORDER_READY, foodcourtId, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        if (orderDetailList == null) {
            return new ArrayList<>();
        }

        List<OrderKitchenVM> result = new ArrayList<>();
        List<Order> orders = orderRepository.findDistinctByOrderDetailsInOrderByOrderDetailsOrderDetailDateDesc(orderDetailList);

        int count = orders.size();
        for (int i = 0; i < count; i++) {
            List<Store> stores = storeRepository.findDistinctByOrderDetailsIn(orders.get(i).getOrderDetails());
            for (int j = 0; j < stores.size(); j++) {
                OrderKitchenVM orderKitchenVM = new OrderKitchenVM();
                orderKitchenVM.setOrderNumber(orders.get(i).getOrderNumber());
                orderKitchenVM.setStoreName(stores.get(j).getStoreName());
                orderKitchenVM.setStoreIcon(stores.get(j).getStoreIcon());
                orderKitchenVM.setStoreNumber(stores.get(j).getStoreNumber());

                orderKitchenVM.setListOrderDetail(orderDetailRepository.findAllByOrderOrderIdAndOderDetailStatusAndStoreStoreIdOrderByOrderDetailDateDesc(orders.get(i).getOrderId(), ORDER_READY, stores.get(j).getStoreId())
                        .stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList()));
                result.add(orderKitchenVM);
            }

        }
        return result;

    }

    @Override
    public List<OrderDetailReponseVM> getAllOrderDetailCancelForFoodCourt(long foodcourtId) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<OrderDetail> orderDetailList = repository.findAllByOderDetailStatusAndStoreFoodCourtFcIdAndOrderOrderDateBetweenOrderByOrderDetailDateDesc
                (ORDER_CANCELLED, foodcourtId, oneDateVM.getDateStart(), oneDateVM.getDateEnd());//Case GUEST
        List<OrderDetail> orderDetailList2 = repository.findAllByOderDetailStatusAndStoreFoodCourtFcIdAndOrderOrderDateBetweenOrderByOrderDetailDateDesc
                (ORDER_REFUNDED, foodcourtId, oneDateVM.getDateStart(), oneDateVM.getDateEnd());//Case Customer
        if (orderDetailList2 != null) {
            for (OrderDetail o : orderDetailList2) {
                if(o.getOrder().getCustomer() != null){
                    Date orderDetailCancelDate = o.getOrderDetailDate();
                    Date currentDate = new Date();
                    long tmp = currentDate.getTime() - orderDetailCancelDate.getTime();
                    long minute = TimeUnit.MINUTES.convert(tmp, TimeUnit.MILLISECONDS);
                    if( minute <= 30 ){//Chỉ hiện khách cancel trong 30 phút tính từ hiện tại
                        orderDetailList.add(o);
                    }

                }
            }
        }
        if (orderDetailList == null) {
            return new ArrayList<>();
        }
        return orderDetailList.stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList());
    }

    @Override
    public List<OrderDetailReponseVM> getAllOrderCancelForStore(long storeId) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();

        List<OrderDetail> orderDetailList =
                repository.findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetweenOrderByOrderDetailIdDesc
                        (ORDER_CANCELLED, storeId, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        List<OrderDetail> orderDetailList2 =
                repository.findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetweenOrderByOrderDetailIdDesc
                        (ORDER_REFUNDED, storeId, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        if (orderDetailList2 != null) {
            for (OrderDetail o : orderDetailList2) {
                orderDetailList.add(o);
            }
        }
        if (orderDetailList == null) {
            return new ArrayList<>();
        }
        return orderDetailList.stream().map(mapper::toOrderDetailReponseVM).collect(Collectors.toList());
    }


}
