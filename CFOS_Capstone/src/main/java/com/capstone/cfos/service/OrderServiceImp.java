package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.OrderDetailMapper;
import com.capstone.cfos.mapper.OrderMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;

import static com.capstone.cfos.constants.Constant.*;

import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    OrderMapper orderMapper;


    @Autowired
    TransactionService transactionService;
    @Autowired
    WalletService walletService;

    @Autowired
    OrderDetailMapper orderDetailMapper;

    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    OrderDetailService orderDetailService;
    @Autowired
    FoodRepository foodRepository;

    @Autowired
    BlockService blockService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FoodOptionRepository foodOptionRepository;

    @Autowired
    SchedulerService schedulerService;

    @Autowired
    StoreRepository storeRepository;

    @Override
    public OrderVM getOrderCustomer(String customerId, int orderNumber) {
        Customer customer = customerRepository.findByCustomerId(customerId);
        Order order = orderRepository.findByCustomerCustomerIdAndOrderNumber(customerId, orderNumber);
        if (customer == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Account does not exit ");
        } else if (order == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "orderNumber does not exit ");
        }
        return orderMapper.toOrderVM(order);

    }

    @Override
    public OrderVM getOrderCustomer(Long orderId) {

        Order order = orderRepository.findByOrderId(orderId);
        if (order == null) {
//            throw new ResponseStatusException(
//                    HttpStatus.INTERNAL_SERVER_ERROR, "orderNumber does not exit ");
            return null;
        }
        return orderMapper.toOrderVM(order);

    }

    @Override
    public List<OrderVM> findAllByOrderDateBetween(Date timeStart, Date timeEnd) {
        List<Order> orders = orderRepository.findAllByOrderDateBetween(timeStart, timeEnd);
        if (orders == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "TIMESTAMP format is incorrect"
            );
        }

        return orders.stream().map(orderMapper::toOrderVM).collect(Collectors.toList());
    }

    @Override
    public List<OrderVMResponse> getAllOrderOfACustomer(String customerId) {
        List<Order> orders = orderRepository.findAllByCustomerCustomerIdOrderByOrderDateDesc(customerId);

        List<OrderVMResponse> orderVMResponse = orders.stream().map(o -> {
            OrderVMResponse vm = orderMapper.toOrderVMResponse(o);
            Scheduler scheduler = o.getScheduler();
            List<Integer> days = new ArrayList<>();
            if (scheduler != null) {
                if (scheduler.isMonday()) days.add(1);
                if (scheduler.isTuesday()) days.add(2);
                if (scheduler.isWednesday()) days.add(3);
                if (scheduler.isThursday()) days.add(4);
                if (scheduler.isFriday()) days.add(5);
                if (scheduler.isSaturday()) days.add(6);
                if (scheduler.isSunday()) days.add(0);
                vm.setSchedulerStatus(scheduler.isActive());
            }
            vm.setDays(days);
            vm.setOrderNumberString(
                    String.format("%04d", o.getOrderNumber())
            );
            return vm;
        }).collect(Collectors.toList());


        int countResult = orderVMResponse.size();
        for (int i = 0; i < countResult; i++) {
            orderVMResponse.get(i).setOrderDetailReponseVMList(orderDetailRepository.findAllByOrderOrderId(orderVMResponse.get(i).getOrderId()).stream().map(orderDetailMapper::toOrderDetailReponseVM).collect(Collectors.toList()));
            orderVMResponse.get(i).setStatus(checkStatus(orderVMResponse.get(i).getOrderId()));
        }
        if (orderVMResponse == null) {
            return new ArrayList<>();
        }
        return orderVMResponse;
    }

    private String checkStatus(long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        List<OrderDetail> orderDetailList = order.getOrderDetails();
        int orderCancel = orderDetailRepository.countByOderDetailStatusAndOrderOrderId(ORDER_REFUNDED, orderId);
        int orderReady = orderDetailRepository.countByOderDetailStatusAndOrderOrderId(ORDER_READY, orderId);
        int orderPlaced = orderDetailRepository.countByOderDetailStatusAndOrderOrderId(ORDER_PLACEED, orderId);
        int cancelPlushReady = orderCancel + orderReady;

        if (orderDetailList.size() == orderCancel) {
            return ORDER_CANCEL;
        }
        if (orderPlaced == 0 && orderReady > 0) {
            return ORDER_FINISHED;
        }
        if (orderPlaced > 0) {
            return ORDER_COOKING;
        }
        return null;

    }

    //kiểm tra xem cus đã từng order food này chưa , phục vụ cho requirement "khách đã order mới đc feedback"
    @Override
    public boolean isCustomerOrderedFood(String customerId, Long foodId) {
        List<Order> orders = orderRepository.findAllByCustomerCustomerIdOrderByOrderDateDesc(customerId);
        if (orders == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "customerId is incorrect, or this customer did not order any food"
            );
        }
        for (int i = 0; i < orders.size(); i++) {
            List<OrderDetail> orderDetailList = orders.get(i).getOrderDetails();
            for (int j = 0; j < orderDetailList.size(); j++) {
                Long foodIdInOrderDetail = orderDetailList.get(j).getFood().getFoodId();
                if (foodIdInOrderDetail == foodId) return true;
            }
        }

        return false;
    }

    @Override
    public int countTotalOrderCustomer(String customerId) {
        int count = orderRepository.countByCustomerCustomerId(customerId);
        count = count + 1;
        return count;

    }


    @Override
    public OrderVM getLastOrderCustomer(String customerId) {
        Order order = orderRepository.findLastOrderCustomer(customerId);
        if (order == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "This customer has not ordered any food."
            );

        }
        return orderMapper.toOrderVM(order);
    }

    @Override
    public List<OrderVM> getAllCancelOrder() {

        List<Order> orders = orderRepository.findAllCancelOrder();
        if (orders == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Do not have any cancel order!"
            );
        }
        return orders.stream().map(orderMapper::toOrderVM).collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public String submitOrder(OrderVM vm) {
        Order order = new Order();
        Order lastOrder = orderRepository.findTop1ByOrderByOrderIdDesc();//tìm order cuối cùng

        if (lastOrder == null) {//case first order, create 1 order with orderNumber = 0
            Order order1 = new Order();
            order1.setTotalOrder(0);
            order1.setOrderNumber(0);
            order1.setOriginalPrice(0);
            orderRepository.save(order1);
            lastOrder = order1;
        }
        //check khách hàng còn tiền ko?
        if (vm.getCustomerId() != null) {//case customer order
            WalletVM wallet = walletService.getWalletByCustomerId(userRepository.findByCustomerCustomerId(vm.getCustomerId()).getUsername());
            if (vm.getTotalOrder() > wallet.getAmount()) {
                return "Customer does not have enough balance in the account!";
            } else {//trừ tiền
                walletService.changeCreditCustomer(vm.getCustomerId(), vm.getTotalOrder(), true);
            }
            order.setStatus(ORDER_CUSTOMER);
            Customer customer = customerRepository.findByCustomerId(vm.getCustomerId());
            order.setCustomer(customer);
            customer.setPoint(vm.getTotalOrder() * (1 / POINT_RATE));
            if (vm.getScheduleTime() != null) {//case have scheduler time
                order.setScheduleTime(vm.getScheduleTime());
            }
        } else {//guest k đc đặt lịch trước
            order.setStatus(ORDER_GUEST);
        }

        order.setOrderDate(new Date());
        order.setOrderNumber(lastOrder.getOrderNumber() + 1);//tăng orderNumber lên 1
        order.setTotalOrder(vm.getTotalOrder());
        order.setOriginalPrice(vm.getOriginalPrice());

        order = orderRepository.save(order);
//        if (vm.getDays() != null && !vm.getDays().isEmpty()) {//case guest order repeat Day
//            schedulerService.postRepeatScheduler(vm.getDays(), order.getOrderId());
//        }
        if (vm.getCustomerId() != null) {
            //case customer thì k có emp nào thực hiện trans nên emp = null
            transactionService.recordTransaction(vm.getCustomerId(), vm.getTotalOrder(), order.getOrderId(), null);
        }

        int orderDetailSize = vm.getOrderDetails().size();
        for (int i = 0; i < orderDetailSize; i++) {
            orderDetailService.saveOrderDetail(vm.getOrderDetails().get(i), vm.getCustomerId(), vm.getScheduleTime());
        }
        return String.format("%04d", order.getOrderNumber());
    }


    @Override
    public Page<OrderVM> getAllOrderGuest(Pageable pageable, int orderNumber) {
        Page<Order> orders = null;
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        if (orderNumber == 0) {
            orders = orderRepository.findAllByStatusAndOrderDateBetweenOrderByOrderNumberAsc(pageable, ORDER_GUEST, oneDateVM.getDateStart(), oneDateVM.getDateEnd());

        } else {

            orders = orderRepository.findAllByOrderNumberAndOrderDateBetween(pageable, orderNumber, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        }
        if (orders == null) {
            return null;
        }
        return orders.map(orderMapper::toOrderVM);
    }

    @Override
    public String paidOrder(Long orderId, String empId) {
        Order order = orderRepository.findByOrderId(orderId);
        if (order == null) {
            return "NOT FOUND THIS ORDER";
        }
        order.setStatus(ORDER_GUEST_PAID);
        order.getOrderDetails().stream().map(c -> {
                    c.setOderDetailStatus(ORDER_PLACEED);
                    return c;
                }
        ).collect(Collectors.toList());
        orderRepository.save(order);
        //String s = order.getCustomer().getCustomerId();
        double v = order.getTotalOrder();
        long l = order.getOrderId();
        transactionService.recordTransaction(null, v, l, empId);//record which employee done transaction
        return "submit successfull";
    }

    @Override
    public OrderVMResponse findOrderByID(Long id) {
        OrderVMResponse orderVMResponse = orderMapper.toOrderVMResponse(orderRepository.findByOrderId(id));
        orderVMResponse.setOrderDetailReponseVMList(orderDetailRepository.findAllByOrderOrderId(id).stream().map(orderDetailMapper::toOrderDetailReponseVM).collect(Collectors.toList()));
        return orderVMResponse;
    }

    @Override
    public OrderVMResponse getOrderByOrderNumber(int orderNumber) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Order order = orderRepository.findByOrderNumberAndOrderDateBetween(orderNumber, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        if (order == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Today did not have this orderNumber"
            );
        }
        OrderVMResponse orderVMResponse =
                orderMapper.toOrderVMResponse(order);
        orderVMResponse.setOrderNumberString(
                String.format("%04d", order.getOrderNumber())
        );
        orderVMResponse.setOrderDetailReponseVMList(orderDetailRepository.findAllByOrderOrderId(order.getOrderId()).stream().map(orderDetailMapper::toOrderDetailReponseVM).collect(Collectors.toList()));

        return orderVMResponse;
    }

    @Override
    public String cancelScheduledOrder(int orderNumber) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Order order = orderRepository.findByOrderNumberAndOrderDateBetween(orderNumber, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        if (order == null) {
            return "Not Found Your OrderId!";
        }
        String scheduleTime = order.getScheduleTime();
        if (scheduleTime == null) {
            return "You can't cancel this order.";
        }
        Date orderedTime = order.getOrderDate();
        // Date dateAfterCaculate = Ultilities.caculateDateFromAmountTimeGive(orderedTime, scheduleTime);
        Date dateAfterCaculate = Ultilities.parseStringHourToDate(orderedTime, scheduleTime);
        Date currentDate = new Date();
        long tmp = dateAfterCaculate.getTime() - currentDate.getTime();
        long minute = TimeUnit.MINUTES.convert(tmp, TimeUnit.MILLISECONDS);
        if (minute <= 10) {//Do order customer 10 minute before
            return "Oops! Your scheduled order is cooking.";
        }
        List<OrderDetail> orderDetailList = order.getOrderDetails();
        int countOrderDetail = orderDetailList.size();
        for (int i = 0; i < countOrderDetail; i++) {
            orderDetailService.changeStatusOrderDetail(orderDetailList.get(i).getOrderDetailId(), ORDER_CANCELLED);
        }

        return "Your scheduled order have been canceled.";
    }

    @Override
    public String readyOrder(int orderNumber, String username) {
        if (username == null) {
            return "Not found this account!";
        }
        Store store = storeRepository.findByEmployeesUserUsernameAndActiveTrue(username);
        if (store == null) {
            return "Not found this store!";
        }
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<OrderDetail> orderDetails = orderDetailRepository
                .findAllByOderDetailStatusAndOrderOrderNumberAndStoreStoreIdAndOrderOrderDateBetween(ORDER_PLACEED, orderNumber, store.getStoreId(), oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        for (OrderDetail o : orderDetails) {
            orderDetailService.changeStatusOrderDetail(o.getOrderDetailId(), ORDER_READY);
        }
        return SUCCESS;
    }

    @Override
    public String submitScheduleOrder(OrderVM vm) {
        if (vm.getDays() == null || vm.getDays().isEmpty() || vm.getScheduleTime() == null) return UNSUCCESSFULL;
        if (vm.getCustomerId() == null) return UNSUCCESSFULL;
        Customer customer = customerRepository.findByCustomerId(vm.getCustomerId());
        int lastOrderNum = orderRepository.findTop1ByOrderByOrderIdDesc().getOrderNumber();
        if (customer == null) return UNSUCCESSFULL;
        Order order = new Order();
        order.setOriginalPrice(vm.getOriginalPrice());
        order.setTotalOrder(vm.getTotalOrder());
        order.setScheduleTime(vm.getScheduleTime());
        order.setCustomer(customer);
        order.setOrderNumber(lastOrderNum + 1);
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (OrderDetailVM orderDetailVM : vm.getOrderDetails()) {
            OrderDetail orderDetail = new OrderDetail();
            Food food = foodRepository.findByFoodId(orderDetailVM.getFoodId());
            if (food != null) {
                orderDetail.setFood(food);
                orderDetail.setOrderDetailNumber(orderDetailRepository.findTop1ByOrderByOrderDetailIdDesc().getOrderDetailNumber() + 1);
                orderDetail.setQuantity(orderDetailVM.getQuantity() > 0 ? orderDetailVM.getQuantity() : 1);
                orderDetail.setTotalPrice(orderDetailVM.getTotalPrice());
                orderDetail.setStore(food.getStoreCategory().getStore());
                orderDetail.setOrder(order);
                List<OrderDetailFoodOption> detailFoodOptions = new ArrayList<>();
                for (OrderDetailFoodOptionVM foodOptionVM : orderDetailVM.getOrderDetailFoodOption()) {
                    OrderDetailFoodOption orderDetailFoodOption = new OrderDetailFoodOption();
                    orderDetailFoodOption.setOrderDetail(orderDetail);
                    orderDetailFoodOption.setQuantity(foodOptionVM.getQuantity() > 0 ? foodOptionVM.getQuantity() : 1);
                    FoodOption foodOption = foodOptionRepository.findByFoId(foodOptionVM.getFoId());
                    if (foodOption != null) {
                        orderDetailFoodOption.setFoodOption(foodOption);
                        detailFoodOptions.add(orderDetailFoodOption);
                    }
                }
                if (!detailFoodOptions.isEmpty()) {
                    orderDetail.setOrderDetailFoodOption(detailFoodOptions);
                }
                orderDetails.add(orderDetail);
            }
        }
        if (orderDetails.isEmpty()) return UNSUCCESSFULL;
        order.setOrderDetails(orderDetails);
        order = orderRepository.save(order);
        if (vm.getDays() != null && !vm.getDays().isEmpty() && order != null) {
            schedulerService.postRepeatScheduler(vm.getDays(), order.getOrderId());
        }
        return submitSchedulerInDay(vm);
    }

    private String submitSchedulerInDay(OrderVM vm) {
        Date date = new Date();
        int day = date.getDay();
        if (vm.getDays().indexOf(day) < 0) return "-2";
        int now = date.getHours() * 60 + date.getMinutes() + 30;
        int scheduleTime =
                Integer.parseInt(vm.getScheduleTime().substring(0, 2)) * 60 +
                        Integer.parseInt(vm.getScheduleTime().substring(3, 5));
        if (now <= scheduleTime) {
            return submitOrder(vm);
        }
        return "-2";
    }

}

