package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.BlockVM;
import com.capstone.cfos.model.Block;
import com.capstone.cfos.model.OrderDetail;

import java.sql.Time;
import java.util.List;

public interface BlockService {
    void saveBlock();
    String addToBlock(Time currentTime,String schedulerTime,int orderDetailNumber);
    void updateBlockDeque(long storeId, String storeDeque, long blockId);
    void pollOrderDetailFromDeque(long oderDetailId);
    List<OrderDetail> getOrderDetailForKitchen(long storeId);
    //List<BlockVM> getListBlockRemain(long storeId);
    List<BlockVM> getListBlockRemain();
}
