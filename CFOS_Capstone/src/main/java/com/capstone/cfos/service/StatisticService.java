package com.capstone.cfos.service;
import com.capstone.cfos.controller.vm.CashierReportVM;
import com.capstone.cfos.controller.vm.StatisticVM;
import com.capstone.cfos.controller.vm.StatisticVMReponse;

import java.text.ParseException;
import java.util.List;
public interface StatisticService {
    List<StatisticVM> getStatisticForFooDCourt(String month,long storeId) throws ParseException;

    CashierReportVM getTotalCashToday(String username);

    StatisticVMReponse getStatisticStore(String month, String username);


}
