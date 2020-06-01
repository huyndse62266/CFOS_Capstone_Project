package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.CashierReportVM;
import com.capstone.cfos.controller.vm.OneDateVM;
import com.capstone.cfos.controller.vm.StatisticVM;
import com.capstone.cfos.controller.vm.StatisticVMReponse;
import com.capstone.cfos.mapper.StatisticMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static com.capstone.cfos.constants.Constant.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticServiceImp implements StatisticService {
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
    UserRepository userRepository;



    @Override
    public List<StatisticVM> getStatisticForFooDCourt(String monthInput, long storeId)  {
        String[] ymd = monthInput.split("-");
        int year = Integer.parseInt(ymd[0]);
        int month = Integer.parseInt(ymd[1]);
        YearMonth yearMonthObject = YearMonth.of(year, month);
        int daysInMonth = yearMonthObject.lengthOfMonth();
        String startTime = monthInput+"-01 " + "00:00:00.000000";
        String endTime = monthInput+"-"+daysInMonth+" " + "00:00:00.000000";
        Date start = Ultilities.parseStringToDate(startTime);
        Date end = Ultilities.parseStringToDate(endTime);
        List<Statistic> list = repository.findAllByStoreStoreIdAndDayBetween(storeId,start,end);
        if(list == null){
            return null;
        }

        return list.stream().map(mapper::toStatisticVm).collect(Collectors.toList());
    }

    @Override
    public CashierReportVM getTotalCashToday(String username){//use for cashier
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Not found this user!");
        }
        Employee employee = user.getEmployee();
        if(!employee.isActive()){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This employee not active!");
        }
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        double count = 0;
        List<Transaction> deposit = transactionRepository
                .findAllByEmployeeEmpIdAndStatusAndTranDateBetween
                        (employee.getEmpId(),TRANSACTION_DEPOSIT,oneDateVM.getDateStart(),oneDateVM.getDateEnd());
        List<Transaction> guestRollback = transactionRepository.
                findAllByEmployeeEmpIdAndStatusAndTranDateBetween
                        (employee.getEmpId(),TRANSACTION_GUEST_ROLLBACK,oneDateVM.getDateStart(),oneDateVM.getDateEnd());
        List<Transaction> guestOrdered =  transactionRepository.
                findAllByEmployeeEmpIdAndStatusAndTranDateBetween
                        (employee.getEmpId(),TRANSACTION_GUEST,oneDateVM.getDateStart(),oneDateVM.getDateEnd());
        int max = 0;
        int arrayNum[] = new int[]{
                deposit.size(),
                guestOrdered.size(),
                guestRollback.size()
        };

        for (int i = 0; i <  arrayNum.length; i++) {
            if(arrayNum[i] > max){
                max = arrayNum[i];
            }
        }
        CashierReportVM cashierReportVM = new CashierReportVM();
         double depositTotal=0;
         double guestOrderedTotal=0;
         double guestRollbackTotal=0;

        for (int i = 0; i < max ; i++) {
            if(i < deposit.size()){
                depositTotal = depositTotal + deposit.get(i).getTranTotal();
            }
            if(i < guestOrdered.size()){
                guestOrderedTotal = guestOrderedTotal + guestOrdered.get(i).getTranTotal();
            }
            if(i < guestRollback.size()){
                guestRollbackTotal = guestRollbackTotal + guestRollback.get(i).getTranTotal();
            }
        }
        cashierReportVM.setDepositTotal(depositTotal);
        cashierReportVM.setGuestOrderedTotal(guestOrderedTotal);
        cashierReportVM.setGuestRollbackTotal(guestRollbackTotal);
        cashierReportVM.setTotalCash(depositTotal+guestOrderedTotal+guestRollbackTotal);

        return cashierReportVM;
    }
    @Override
    public StatisticVMReponse getStatisticStore(String month,String username){
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Not found this user!");
        }
        Store store = user.getEmployee().getStore();
        if(!store.isActive()){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This store is unactive");
        }
        List<StatisticVM>  statisticVMS=  getStatisticForFooDCourt(month,store.getStoreId());
        StatisticVMReponse statisticVMReponse = new StatisticVMReponse(store.getStoreName(),statisticVMS);

       return  statisticVMReponse;
    }



}
