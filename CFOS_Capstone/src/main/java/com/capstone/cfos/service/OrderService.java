package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.OrderVM;
import com.capstone.cfos.controller.vm.OrderVMResponse;
import com.capstone.cfos.model.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface OrderService {
    OrderVM getOrderCustomer(String customerId, int orderNumber);

    OrderVM getOrderCustomer(Long orderId);

    List<OrderVMResponse> getAllOrderOfACustomer(String customerId);


    List<OrderVM> findAllByOrderDateBetween(Date timeStart, Date timeEnd);

    boolean isCustomerOrderedFood(String customerId, Long foodId);

    int countTotalOrderCustomer(String customerId);

    OrderVM getLastOrderCustomer(String customerId);

    List<OrderVM> getAllCancelOrder();

    String submitOrder(OrderVM vm);

    Page<OrderVM> getAllOrderGuest(Pageable pageable, int orderNumber);

    String paidOrder(Long orderId, String empId);

    OrderVMResponse findOrderByID(Long id);

    OrderVMResponse getOrderByOrderNumber(int orderNumber);//use for cashier,and customer checked at food court

    String cancelScheduledOrder(int orderId);

    String readyOrder(int orderNumber,String username);

    String submitScheduleOrder(OrderVM vm);

}
