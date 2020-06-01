package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.model.Food;
import com.capstone.cfos.model.User;
import com.capstone.cfos.repository.CustomerRepository;
import com.capstone.cfos.repository.UserRepository;
import com.capstone.cfos.service.BlockService;
import com.capstone.cfos.service.OrderDetailService;
import com.capstone.cfos.service.OrderService;
import com.capstone.cfos.service.SchedulerService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.capstone.cfos.constants.Constant.*;

@Controller
@RequestMapping("/api/orders")
public class OrderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    OrderService orderService;

    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    BlockService blockService;

    @Autowired
    SchedulerService schedulerService;

    @ApiOperation(value = "Chef cancel order")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful cancel"),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/chef-cancel")
    public ResponseEntity<String> chefCancelOrderDetail(@RequestParam(name = "orderDetailId") Long orderDetailId) {

        String msg = orderDetailService.changeStatusOrderDetail(orderDetailId, ORDER_CANCELLED);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @ApiOperation(value = "Cashier paid order")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful paid"),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/pay-order")
    public ResponseEntity<String> paidOrder(HttpServletRequest request
            , @RequestParam(name = "orderId") Long orderId) {
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        String empId = user.getEmployee().getEmpId();
        String msg = orderService.paidOrder(orderId, empId);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @ApiOperation(value = "Chef ready orderDetail")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful ready orderDetail"),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/chef-ready")
    public ResponseEntity<String> chefReadyOrderDetail(@RequestParam(name = "orderDetailId") Long orderDetailId) {

        String msg = orderDetailService.changeStatusOrderDetail(orderDetailId, ORDER_READY);

        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @ApiOperation(value = "Get last order of customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful "),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/last-order")
    public ResponseEntity<OrderVM> getLastOrder(@RequestParam(name = "customerId") String customerId) {

        // Date msg = orderService.getLastOrderCustomer("CUS_"+customerId);
        OrderVM vm = orderService.getLastOrderCustomer("CUS_" + customerId);
        return new ResponseEntity<OrderVM>(vm, HttpStatus.OK);
    }


    @ApiOperation(value = "Customer submit order, can use for guest")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful "),

            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/orders/submit-order")

    public ResponseEntity<String> submitOrder(@RequestBody OrderVM orderVM, HttpServletRequest request) {

        String username = Ultilities.getUsername(request);
        if (StringUtils.isNotEmpty(username)) {
            String customerId = customerRepository.findByUserUsername(username).getCustomerId();
            orderVM.setCustomerId(customerId);
        }
        String orderId;
        if (orderVM.getDays() == null || orderVM.getDays().isEmpty()) {
            orderId = orderService.submitOrder(orderVM);
        } else {
            orderId = orderService.submitScheduleOrder(orderVM);
        }
        LOGGER.info("submit Order: " + orderId);
        return new ResponseEntity<String>(orderId, HttpStatus.OK);
    }

    //Done
    @ApiOperation(value = "Search order(Can use for FoodCourt,Store,Customer)," +
            "JUST SEARCH ORDER IN DAY")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/search-order", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderVMResponse> getOrderByID(@RequestParam(name = "orderNumber") int orderNumber) {
        OrderVMResponse orderVM = orderService.getOrderByOrderNumber(orderNumber);
        return new ResponseEntity<OrderVMResponse>(orderVM, HttpStatus.OK);
    }

    @ApiOperation(value = "Search order(Can use for FoodCourt,Store,Customer)")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/history", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrderVM> getOrderHistoryById(@RequestParam(name = "orderId") Long orderId) {

        OrderVM orderVM = orderService.getOrderCustomer(orderId);
        return new ResponseEntity<OrderVM>(orderVM, HttpStatus.OK);

    }

    //Done  6-9-2019
    @ApiOperation(value = "Get all orderDetail with PLACED status of a store,use in kitchen")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Has the error with local Db ! :D ")})
    @GetMapping("/stores/orderDetails")
    public ResponseEntity<List<OrderKitchenVM>> getAllOrderDetailPlaced(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);

        List<OrderKitchenVM> vms = orderDetailService.getAllOrderDetailForStore(username);
        return new ResponseEntity<List<OrderKitchenVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get all orderDetail READY of a store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/stores/orderDetails-ready")
    public ResponseEntity<List<OrderDetailReponseVM>> getAllOrderREADY(
            HttpServletRequest request) {

        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        List<OrderDetailReponseVM> vms = orderDetailService.getAllOrderDetailByStatusAndStore(ORDER_READY,
                user.getEmployee().getStore().getStoreId());
        return new ResponseEntity<List<OrderDetailReponseVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get All ORDER of GUESt, can use cashier")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/orders/guests")
    public ResponseEntity<Page<OrderVM>> getAllOrderGuest(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(value = "orderNumber", required = false, defaultValue = "0") int orderNumber
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderVM> vms = orderService.getAllOrderGuest(pageable, orderNumber);
        return new ResponseEntity<Page<OrderVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get ORDER CANCEL of guest, can use cashier")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/orders/order-cancel")
    public ResponseEntity<Page<OrderDetailReponseVM>> getAllOrderCancel(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDetailReponseVM> vms = orderDetailService.getAllOrderCancel(pageable, ORDER_CANCELLED);
        return new ResponseEntity<Page<OrderDetailReponseVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Cashier rollback money for GUEST")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful rollback"),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/rollback-order")
    public ResponseEntity<String> rollbackOrder(HttpServletRequest request,
                                                @RequestParam(name = "orderDetailId") Long orderDetailId) {
        String username = Ultilities.getUsername(request);
        String msg = orderDetailService.rollbackOrderDetail(orderDetailId, username);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderVMResponse> findOrderByID(@PathVariable Long id) {
        return new ResponseEntity<OrderVMResponse>(orderService.findOrderByID(id), HttpStatus.OK);
    }

    @ApiOperation(value = "Customer cancel scheduled orders! ")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/customer/order-cancel")
    public ResponseEntity<String> cancelScheduledOrder(@RequestParam(name = "orderNumber") int orderNumber) {

        String msg = orderService.cancelScheduledOrder(orderNumber);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @ApiOperation(value = "Get all orderDetail READY of foodcourt")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid food-court ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/order-ready-foodcourt")
    public ResponseEntity<List<OrderKitchenVM>> getAllOrderReadyForFoodCourt(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        List<OrderKitchenVM> vms = orderDetailService.getAllOrderDetailReadyForFoodCourt(user.getEmployee().getFoodCourt().getFcId());
        return new ResponseEntity<List<OrderKitchenVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get all orderDetail CANCEL of foodcourt")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid food-court ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/order-cancel-foodcourt")
    public ResponseEntity<List<OrderDetailReponseVM>> getAllOrderCancelForFoodCourt(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        List<OrderDetailReponseVM> vms = orderDetailService.getAllOrderDetailCancelForFoodCourt(user.getEmployee().getFoodCourt().getFcId());
        return new ResponseEntity<List<OrderDetailReponseVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get ORDER CANCEL of a store, can use cashier")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/order-cancel-store")
    public ResponseEntity<List<OrderDetailReponseVM>> getAllOrderCancel(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        List<OrderDetailReponseVM> vms = orderDetailService.getAllOrderCancelForStore(user.getEmployee().getStore().getStoreId());
        return new ResponseEntity<List<OrderDetailReponseVM>>(vms, HttpStatus.OK);
    }

    @GetMapping("/block-remain")
    //public ResponseEntity<List<BlockVM>> getAllBlockVm(long storeId){
    public ResponseEntity<List<BlockVM>> getAllBlockVm() {
        List<BlockVM> blockVMS = blockService.getListBlockRemain();
        return new ResponseEntity<List<BlockVM>>(blockVMS, HttpStatus.OK);
    }

    @ApiOperation(value = "Chef ready order")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful ready order"),
            @ApiResponse(code = 400, message = "Invalid orderDetail ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping("/chef-ready-order")
    public ResponseEntity<String> chefReadyOrder(@RequestParam(name = "orderNumber") int orderNumber,HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        String msg = orderService.readyOrder(orderNumber,username);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete-scheduler")
    public ResponseEntity<String> customerCancelOrderRepeat(@RequestParam(name = "orderId") long orderId) {
        String msg = schedulerService.customerCancelOrderRepeat(orderId);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }

    @PutMapping(value = "update-scheduler")
    public ResponseEntity<String> customerUpdateOrderRepeat(@RequestBody OrderVMResponse orderVMResponse) {
        String msg = schedulerService.customerUpdateOrderRepeat(orderVMResponse);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
//
//    @PostMapping("/repeat-scheduler")
//    public ResponseEntity<String> postRepeatScheduler(@RequestBody SchedulerVM schedulerVM) {
//        String msg = schedulerService.postRepeatScheduler(schedulerVM);
//        return new ResponseEntity<>(msg, HttpStatus.OK);
//    }

    @PutMapping(value = "change-active-scheduler")
    public ResponseEntity<String> changeActive(@RequestParam(name = "orderId") long orderId) {
        String msg = schedulerService.changeActive(orderId);
        return new ResponseEntity<>(msg, HttpStatus.OK);
    }
}
