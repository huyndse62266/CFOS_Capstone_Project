package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.AppStoreVM;
import com.capstone.cfos.controller.vm.StoreVM;
import com.capstone.cfos.controller.vm.StoreVMResponse;

import java.util.List;

public interface StoreService {

    StoreVM getStoreById(Long storeId);

    StoreVM addNewStore(StoreVM vm, String authorityUsername);

    StoreVM updateStore(StoreVM vm);

    List<StoreVM> getAllStoreByFc(String authorityUsername);

    List<StoreVM> findAll();

    List<AppStoreVM> findAllStore( Long fcId);

    AppStoreVM findStoreById( Long id);

    List<StoreVMResponse> findAllByFC(Long id);

    double getCurrentRevenue(String username);
    int countOrderByStatus(String username,String status);

}
