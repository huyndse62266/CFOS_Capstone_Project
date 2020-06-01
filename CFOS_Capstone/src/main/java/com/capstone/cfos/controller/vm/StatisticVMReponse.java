package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;
@Data
public class StatisticVMReponse {
    private String storeName;
    private List<StatisticVM> statisticVMS;
    public StatisticVMReponse(String storeName,List<StatisticVM> statisticVMS ){
        this.storeName = storeName;
        this.statisticVMS = statisticVMS;
    }

}
