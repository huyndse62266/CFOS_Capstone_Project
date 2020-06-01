package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.OrderDetailReponseVM;
import com.capstone.cfos.controller.vm.OrderDetailVM;
import com.capstone.cfos.controller.vm.OrderKitchenVM;
import com.capstone.cfos.model.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

public interface OrderDetailService {
   List<OrderDetailReponseVM> getAllOrderDetailOfStore(Long storeId);
   String changeStatusOrderDetail(Long orderDetailId,String newStatus);
   //OrderDetailVM saveOrderDetail(OrderDetailVM orderDetailVM);
   //dùng khi submit order của guest và cus
   OrderDetailVM saveOrderDetail(OrderDetailVM orderDetailVM,String customerId,String scheduleTime);
   //trong store có những orderDetail có những trạng thái nào?
   List<OrderDetailReponseVM> getAllOrderDetailByStatusAndStore(String status, Long storeId);
   //cashier sử dụng khi xem những order của GUEST bị cancel
   Page<OrderDetailReponseVM> getAllOrderCancel(Pageable pageable,String status);

  String  rollbackOrderDetail(Long orderDetailId,String username);


  // void fixBugOrderDetailNumber();

    List<OrderKitchenVM> getAllOrderDetailForStore(String username);

    List<OrderKitchenVM> getAllOrderDetailReadyForFoodCourt(long foodcourtId);
    List<OrderDetailReponseVM> getAllOrderDetailCancelForFoodCourt(long foodcourtId);
    List<OrderDetailReponseVM> getAllOrderCancelForStore(long storeId);



}
