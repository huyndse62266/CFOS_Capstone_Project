package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.OrderVMResponse;
import com.capstone.cfos.controller.vm.SchedulerVM;
import com.capstone.cfos.model.Order;
import com.capstone.cfos.model.Scheduler;

import java.util.List;

public interface SchedulerService {
    void autoRecordStatistic();

    void autoResetOrderNumber();

    //   void autoChangeStatusOrderDetail();
    void autoUpdateStoreRevenue();

    // void autoFindOrderDetailOntime();
//    void autoResetCountFood();
    void autoRecordFoodPopular();

    void autoResetBlock();

    void notiCusOrder();//lâu rồi customer ko order

    void notiCusNearTimeSchedule();

    List<Order> getScheduler();

    String postRepeatScheduler(List<Integer> days, Long orderId);

    String customerCancelOrderRepeat(long orderId);

    String customerUpdateOrderRepeat(OrderVMResponse orderVMResponse);

    String changeActive(long orderId);

    void autoFindOrderStillInKitchen();
}

