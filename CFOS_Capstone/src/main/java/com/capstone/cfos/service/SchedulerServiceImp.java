package com.capstone.cfos.service;
//<second> <minute> <hour> <day-of-month> <month> <day-of-week> <year> <command>
/* 0        0        1      *               *       MON
 * https://www.baeldung.com/cron-expressions
 * * (all)
 * ? (any)
 * – (range)
 * , (values)
 * / (increments)
 * L (last)
 * W (weekday)
 * # N-th
 */

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.RoleController;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.OrderDetailFoodOptionMapper;
import com.capstone.cfos.mapper.OrderDetailMapper;
import com.capstone.cfos.mapper.OrderMapper;
import com.capstone.cfos.mapper.StatisticMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import com.kinoroy.expo.push.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import static com.capstone.cfos.constants.Constant.*;

@Service
public class SchedulerServiceImp implements SchedulerService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchedulerServiceImp.class);

    @Autowired
    StatisticRepository repository;

    @Autowired
    StatisticMapper mapper;

    @Autowired
    OrderDetailRepository orderDetailRepository;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    StoreRepository storeRepository;

    @Autowired
    OrderRepository orderRepository;
    @Autowired
    FoodRepository foodRepository;

    @Autowired
    BlockRepository blockRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    SchedulerRepository schedulerRepository;

    @Autowired
    OrderMapper orderMapper;

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailMapper orderDetailMapper;
    @Autowired
    OrderDetailFoodOptionMapper foMapper;

    @Autowired
    OrderDetailFoodOptionRepository foRepository;

    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    WalletService walletService;

    @Autowired
    TransactionService transactionService;

    @Override
    @Scheduled(cron = "0 50 23 ? * *") //23h53 per day
    //@Scheduled(fixedRate = 5000)
    public void autoRecordStatistic() { //lưu dữ liêu vào bảng statistic khi
        LOGGER.info("Recording statistic.....");
        // Date date = new GregorianCalendar(2019, Calendar.MARCH, 2).getTime();
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<Store> stores = storeRepository.findAllByActiveTrue();
        if (stores != null) {
            int countStore = stores.size();

            for (int i = 0; i < countStore; i++) {
                double revenueCus = 0;
                int item = 0;
                List<OrderDetail> listRevenueCus =
                        orderDetailRepository
                                .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
                                        (ORDER_READY, stores.get(i).getStoreId(), oneDateVM.getDateStart(), oneDateVM.getDateEnd());
                int tmpListCus = listRevenueCus.size();
                for (int j = 0; j < tmpListCus; j++) {
//                    Food food = listRevenueCus.get(i).getFood();
//                    food.setQuantity(food.getQuantity() + listRevenueCus.get(i).getQuantity());
//                    foodRepository.save(food);
                    revenueCus = revenueCus + listRevenueCus.get(j).getTotalPrice();
                    item = item + listRevenueCus.get(j).getQuantity();
                }
                Statistic statistic = new Statistic();
                statistic.setDay(oneDateVM.getDateEnd());
                statistic.setItem(item);
                statistic.setStatus("DAY");
                statistic.setStore(stores.get(i));
                statistic.setTotal(revenueCus);
                repository.save(statistic);
            }
        }
    }

    @Override
    @Scheduled(cron = "0 0 0 ? * *")//0h hằng ngày
    // @Scheduled(fixedRate = 10000)
    public void autoResetOrderNumber() { //chuyển orderNumber về 0
        Order orderNumber0 = orderRepository.findByOrderNumber(0);
        if (orderNumber0 != null) {
            orderRepository.delete(orderNumber0);
            Order order = new Order();
            order.setOrderNumber(0);
            order.setTotalOrder(0);
            order.setOriginalPrice(0);
            orderRepository.save(order);
            LOGGER.info("Reseting... order number to zero!");
        }
        OrderDetail orderDetail0 = orderDetailRepository.findByOrderDetailNumber(0);
        if (orderDetail0 != null) {
            orderDetailRepository.delete(orderDetail0);
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrderDetailNumber(0);
            orderDetail.setTotalPrice(0);
            orderDetail.setQuantity(0);

            orderDetailRepository.save(orderDetail);
            LOGGER.info("Reseting... order detail number to zero!");

        }

    }

//    @Override
//   // @Scheduled(fixedRate = 1000*60*5)//5 minutes
//    public  void autoChangeStatusOrderDetail(){
//        OrderDetail orderDetail = orderDetailRepository.findTop1ByOderDetailStatusOrderByOrderDetailIdAsc(ORDER_READY);
//        if(orderDetail != null){
//            orderDetail.setOderDetailStatus(ORDER_DELIVERED);
//            orderDetailRepository.save(orderDetail);
//            LOGGER.info("One food delivered");
//
//        }
//
//    }

    @Override//chưa tối ưu. Do sau này ko query đc tableOrderDetail
    // @Scheduled(cron = "0 55 23 ? * *")//23h55 hằng ngày, revenue của store sẽ tự động cập nhật
    //@Scheduled(fixedRate = 20000)
    public void autoUpdateStoreRevenue() {
        List<Store> stores = storeRepository.findAllByActiveTrue();
        if (stores != null) {
            for (int i = 0; i < stores.size(); i++) {
                // Store store = storeRepository.findByStoreId(stores.get(i).getStoreId());
                Store store = stores.get(i);
                double revenue = store.getRevenue();
                //  int item = 0;
                OneDateVM oneDateVM = Ultilities.parseCurrentDate();//current Day
//                List<OrderDetail> orderDetailList = orderDetailRepository
//                        .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
//                                (Constant.ORDER_READY, store.getStoreId(),oneDateVM.getDateStart(),oneDateVM.getDateEnd());
                List<OrderDetail> orderDetailList = orderDetailRepository
                        .findAllByOderDetailStatusAndStoreStoreId
                                (Constant.ORDER_READY, store.getStoreId());
                for (int j = 0; j < orderDetailList.size(); j++) {
                    revenue = revenue + orderDetailList.get(j).getTotalPrice();
                    //item = item + orderDetailList.get(j).getQuantity();
                }
                store.setRevenue(revenue);
                storeRepository.save(store);
            }
        }

    }

//    @Override
//    //@Scheduled(fixedRate = 1000*60*8)//8 minutes
//    public void autoFindOrderDetailOntime(){//tìm những order của khách hẹn và chuyển vào bếp
//
//        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOderDetailStatus(ORDER_SCHEDULE);
//        int countOrderDetailList = orderDetailList.size();
//        for (int i = 0; i < countOrderDetailList; i++) {
//            String scheduleTime = orderDetailList.get(i).getOrder().getScheduleTime();
//            Date orderedTime = orderDetailList.get(i).getOrder().getOrderDate();
////            Date dateAfterCaculate = Ultilities.caculateDateFromAmountTimeGive(orderedTime,scheduleTime);
//            Date dateAfterCaculate = Ultilities.parseStringHourToDate(orderedTime,scheduleTime);
//
//            Date currentDate = new Date();
//            long tmp = dateAfterCaculate.getTime() - currentDate.getTime();
//            long minute = TimeUnit.MINUTES.convert(tmp, TimeUnit.MILLISECONDS);
//            // System.out.println("xxxxx" + minute);
//            if( minute <= 10 ){//Do order customer 10 minute before
//                orderDetailList.get(i).setOderDetailStatus(ORDER_PLACEED);
//                orderDetailRepository.save(orderDetailList.get(i));
//            }
//        }
//    }

//    @Override
//    @Scheduled(cron = "0 1 0 1 * ?")//0h01p every day 1 of month
//    //reset count of food every month - use to short store by count food
//    public void autoResetCountFood(){
//        List<Food> foods = foodRepository.findAll();
//        for (int i = 0; i < foods.size(); i++) {
//            foods.get(i).setQuantity(0);
//            foodRepository.save(foods.get(i));
//        }
//    }

    @Override
    @Scheduled(cron = "0 0/180 07-19 * * ?")//every 3hour(180 minute from 7am to 7pm)
    public void autoRecordFoodPopular() {
        Date datePast = Ultilities.getSevenDayFromNow();
//    List<OrderDetail> orderDetailList = orderDetailRepository.findDistinctByFoodNotNull();
        List<Food> foods = foodRepository.findDistinctByActiveTrue();
        int tmp = foods.size();
        for (int i = 0; i < tmp; i++) {
            List<OrderDetail> orderDetailList =
                    orderDetailRepository
                            .findAllByFoodFoodIdAndOderDetailStatusAndOrderOrderDateBetween
                                    (foods.get(i).getFoodId(), ORDER_READY, datePast, new Date());
            int tmp2 = orderDetailList.size();
            int count = 0;
            for (int j = 0; j < tmp2; j++) {
                count = count + orderDetailList.get(j).getQuantity();
            }
            Food food = foodRepository.findByFoodId(foods.get(i).getFoodId());
            food.setCount(count);
            foodRepository.save(food);
        }
    }

    @Override
    @Scheduled(cron = "0 55 23 ? * *")//23h55 per day
    // @Scheduled(fixedRate = 5000)
    public void autoResetBlock() {
        List<Block> blocks = blockRepository.findAll();
        List<Store> stores = storeRepository.findAll();
        if (stores.size() >= 1 && blocks.size() > 1) {
            for (Block b : blocks) {
                String dequeStore = "";
                for (Store s : stores) {
                    dequeStore = dequeStore + "-" + s.getStoreId() + "/ ";

                }
                b.setDeque(dequeStore.substring(1));
                blockRepository.save(b);
                LOGGER.info("Reseting block!");

            }
        }

    }

    @Override
    @Scheduled(cron = "0 01 08 ? * *")//8h01 per day
    public void notiCusOrder() {
        List<Customer> customers = customerRepository.findAll();
        Date currentDate = new Date();
        for (int i = 0; i < customers.size(); i++) {
            long tmp = customers.get(i).getLastOrder().getTime() - currentDate.getTime();
            long days = TimeUnit.DAYS.convert(tmp, TimeUnit.MILLISECONDS);
            if (days % DAYS_NOTI_CUSTOMER == 0) {//once DAYS_NOTI_CUSTOMER
                HashMap<String, Object> order = new HashMap<>();
                order = null;
                String token = customers.get(i).getDeviceToken();
                if (token != null) {
                    Message message = new Message.Builder()
                            .to(token)
                            .title("Hôm nay bạn thế nào?")
                            .body("Dù có thế nào thì......")
                            .data(order)
                            .build();
                    Ultilities.sendNotification(token, message);
                }
            }
        }
    }

    @Override
    //@Scheduled(cron = "0 0/09 07-19 * * ?")//mỗi 9 phút từ 7am đến 7pm
    public void notiCusNearTimeSchedule() {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<Order> orders = orderRepository.findAllByScheduleTimeNotNullAndOrderDateBetween
                (oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        int countOrders = orders.size();
        if (countOrders > 0) {
            for (int i = 0; i < countOrders; i++) {
                Date dateAfterCaculate = Ultilities.parseStringHourToDate(orders.get(i).getOrderDate(), orders.get(i).getScheduleTime());
                Date currentDate = new Date();
                long tmp = dateAfterCaculate.getTime() - currentDate.getTime();
                long minute = TimeUnit.MINUTES.convert(tmp, TimeUnit.MILLISECONDS);

                if (minute <= 10 && minute >= 0) {//Do order customer 10 minute before
                    Customer customer = orders.get(i).getCustomer();
                    if (customer != null) {
                        HashMap<String, Object> order = new HashMap<>();
                        order = null;
                        String token = customer.getDeviceToken();
                        if (token != null) {
                            Message message = new Message.Builder()
                                    .to(token)
                                    .title("Món ăn bạn đặt trước")
                                    .body("Đã sắp đến giờ lấy......")
                                    .data(order)
                                    .build();
                            Ultilities.sendNotification(token, message);
                        }
                    }
                }
            }

        }
    }

    @Override
    public List<Order> getScheduler() {
        Date date = new Date();
        int day = date.getDay();
        List<Order> orders = new ArrayList<>();
        List<Scheduler> schedulers = new ArrayList<>();
        switch (day) {
            case 0:
                schedulers = schedulerRepository.findByActiveIsTrueAndSundayIsTrue();
                break;
            case 1:
                schedulers = schedulerRepository.findByActiveIsTrueAndMondayIsTrue();
                break;
            case 2:
                schedulers = schedulerRepository.findByActiveIsTrueAndTuesdayIsTrue();
                break;
            case 3:
                schedulers = schedulerRepository.findByActiveIsTrueAndWednesdayIsTrue();
                break;
            case 4:
                schedulers = schedulerRepository.findByActiveIsTrueAndThursdayIsTrue();
                break;
            case 5:
                schedulers = schedulerRepository.findByActiveIsTrueAndFridayIsTrue();
                break;
            case 6:
                schedulers = schedulerRepository.findByActiveIsTrueAndSaturdayIsTrue();
                break;
            default:
                break;
        }
        if (!schedulers.isEmpty()) {
            orders = schedulers.stream().map(s -> {
                return s.getOrder();
            }).collect(Collectors.toList());
        }
        return orders;
    }

    @Override
    public String postRepeatScheduler(List<Integer> days, Long orderId) {
        if (days.isEmpty()) return UNSUCCESSFULL;
        Order order = orderRepository.findByOrderId(orderId);
        if (order == null) return UNSUCCESSFULL;
        Scheduler result;
        if (order.getScheduler() != null) {
            result = order.getScheduler();
            result.setSunday(false);
            result.setMonday(false);
            result.setTuesday(false);
            result.setWednesday(false);
            result.setThursday(false);
            result.setFriday(false);
            result.setSaturday(false);
        } else {
            result = new Scheduler();
            result.setOrder(order);
        }
        for (Integer day : days) {
            switch (day) {
                case 0:
                    result.setSunday(true);
                    break;
                case 1:
                    result.setMonday(true);
                    break;
                case 2:
                    result.setTuesday(true);
                    break;
                case 3:
                    result.setWednesday(true);
                    break;
                case 4:
                    result.setThursday(true);
                    break;
                case 5:
                    result.setFriday(true);
                    break;
                case 6:
                    result.setSaturday(true);
                    break;
                default:
                    break;
            }
        }
        result.setActive(true);
        schedulerRepository.save(result);
        return SUCCESS;
    }

    @Scheduled(cron = "0 0 1 * * 1")
    private void scanMonday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndMondayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 2")//1h sáng thứ 3
    private void scanTuesday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndTuesdayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 3")//1h sáng thứ 4
    private void scanWednesday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndWednesdayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 4")//1h sáng thứ 5
    private void scanThursday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndThursdayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 5")
    private void scanFriday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndFridayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 6")//1h sáng thứ 7
    private void scanSaturday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndSaturdayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    @Scheduled(cron = "0 0 1 * * 0")
    //@Scheduled(fixedRate = 20000)
    private void scanSunday() {
        List<Scheduler> monday = schedulerRepository.findByActiveIsTrueAndSundayIsTrue();
        for (Scheduler s : monday) {
            OrderVM vm = parseToOrderVM(s.getOrder());
            orderService.submitOrder(vm);
        }
    }

    private OrderVM parseToOrderVM(Order order) {
        OrderVM result = new OrderVM();
        result.setCustomerId(order.getCustomer().getCustomerId());
        result.setTotalOrder(order.getTotalOrder());
        result.setOriginalPrice(order.getOriginalPrice());
        result.setScheduleTime(order.getScheduleTime());
        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrderOrderId(order.getOrderId());
        List<OrderDetailVM> orderDetailVMS = new ArrayList<>();
        for (OrderDetail o : orderDetailList) {
            OrderDetailVM orderDetailVM = new OrderDetailVM();
            orderDetailVM.setTotalPrice(o.getTotalPrice());
            orderDetailVM.setFoodId(o.getFood().getFoodId());
            orderDetailVM.setQuantity(o.getQuantity());
            List<OrderDetailFoodOptionVM> orderDetailFoodOptionVMS =
                    foRepository.findAllByOrderDetailOrderDetailId(o.getOrderDetailId()).stream().map(foMapper::toOrderDetailFoodOptionVM).collect(Collectors.toList());
            orderDetailVM.setOrderDetailFoodOption(orderDetailFoodOptionVMS);
            orderDetailVMS.add(orderDetailVM);
        }
        result.setOrderDetails(orderDetailVMS);
        return result;
    }

    @Override
    public String customerCancelOrderRepeat(long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        if (order == null || order.getScheduler() == null) {//not found
            return UNSUCCESSFULL;
        }
        orderRepository.delete(order);
        return SUCCESS;
    }

    @Override
    public String customerUpdateOrderRepeat(OrderVMResponse vm) {
        if (vm.getOrderId() == null) {
            return "Input OrderId";
        }
        Order order = orderRepository.findByOrderId(vm.getOrderId());
        if (order == null || order.getScheduler() == null) return UNSUCCESSFULL;
        if (vm.getDays().isEmpty()) {
            customerCancelOrderRepeat(vm.getOrderId());
        } else {
            Scheduler scheduler = order.getScheduler();
            order.setScheduler(null);
            order.setScheduleTime(vm.getScheduleTime());
            orderRepository.save(order);
            schedulerRepository.delete(scheduler);
        }
        String result = postRepeatScheduler(vm.getDays(), vm.getOrderId());
        return result;
    }

    @Override
    public String changeActive(long orderId) {
        Scheduler scheduler = schedulerRepository.findByOrderOrderId(orderId);
        if (scheduler == null) {//not found
            return UNSUCCESSFULL;
        }
        scheduler.setActive(!scheduler.isActive());
        schedulerRepository.save(scheduler);
        return SUCCESS;
    }

    @Override
    @Scheduled(cron = "0 53 23 ? * *")//23h53
    //@Scheduled(fixedRate = 5000)
    public void autoFindOrderStillInKitchen() {
        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOderDetailStatus(ORDER_PLACEED);
        String newStatus = ORDER_REFUNDED;
        LOGGER.info("Refunding.............");
        for (OrderDetail o : orderDetailList) {
            // OrderDetail orderDetail = repository.findByOrderDetailId(orderDetailId);
            Order vm = o.getOrder();
            TransactionVM transactionVM = new TransactionVM();
            if (vm.getCustomer() != null) {//case customer
                o.setOrderDetailDate(new Date());
                HashMap<String, Object> order = new HashMap<>();
                order.put("OrderNumber", o.getOrder().getOrderNumber());
                String token = o.getOrder().getCustomer().getDeviceToken();
                if (token != null) {
                    Message message = new Message.Builder()
                            .to(token)
                            .title("Order Đã Bị Hủy")
                            .body("Món Ăn: "
                                    + o.getFood().getFoodName() + "\r\n"
                                    + "Số Order: "
                                    + o.getOrder().getOrderNumber() + "\r\n"
                                    + "Đã bị hủy vì lý sự cố ở bếp!")
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
                        (vm.getCustomer().getCustomerId(), o.getTotalPrice(), false);
            }else {//case là guest
                    o.setOrderDetailDate(new Date());
                    newStatus = ORDER_CANCELLED;//case guest bị chef cancel

            }
            transactionVM.setOrderId(vm.getOrderId());
            transactionVM.setTranDate(new Date());
            transactionVM.setEmpId(null);
            transactionVM.setTranTotal(o.getTotalPrice() * -1);
            o.setOrderDetailDate(new Date());
            transactionService.recordTransaction(transactionVM);

            o.setOderDetailStatus(newStatus);
            orderDetailRepository.save(o);
        }
        LOGGER.info("Refund finish");

    }
}
