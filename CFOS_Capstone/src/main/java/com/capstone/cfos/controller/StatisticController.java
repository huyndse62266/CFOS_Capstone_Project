package com.capstone.cfos.controller;


import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.model.Employee;
import com.capstone.cfos.model.FoodCourt;
import com.capstone.cfos.model.Store;
import com.capstone.cfos.model.User;
import com.capstone.cfos.repository.StoreRepository;
import com.capstone.cfos.repository.UserRepository;
import com.capstone.cfos.service.OrderService;
import com.capstone.cfos.service.StatisticService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.DateTimeException;
import java.util.*;

@Controller
@RequestMapping("/api")
public class StatisticController {
    @Autowired
    OrderService orderService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StatisticService statisticService;

    @Autowired
    StoreRepository storeRepository;


    @ApiOperation(value = "Get all order by date")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Intetornal server error")}
    )
    @GetMapping(value = "/statistic-order",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderVM>> getOrderByTime(@RequestParam(name = "startTime") String startTime,
                                                        @RequestParam(name = "endTime") String endTime,
                                                        HttpServletRequest request)
    throws ParseException
    {

        Date start = Ultilities.parseStringToDate(startTime);
        Date end = Ultilities.parseStringToDate(endTime);

        List<OrderVM> vms = orderService.findAllByOrderDateBetween(start,end);

        return new ResponseEntity<List<OrderVM>>(vms, HttpStatus.OK);
    }


    @ApiOperation(value = "Get revenue for store, use for foodcourt, please Input 'yyyy-mm'")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Db bị lỗi nè!!!")}
    )
    @GetMapping(value = "/statistic-fcs",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StatisticVMReponse>> getStatisticFc(@RequestParam(name = "month") String month,HttpServletRequest request)
            throws ParseException
    {
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        FoodCourt foodCourt = user.getEmployee().getFoodCourt();
        List<Store> stores = foodCourt.getStores();
        int tmp =stores.size();
        List<StatisticVMReponse> vms2 = new ArrayList<>();
        for (int i = 0; i < tmp; i++) {
            List<StatisticVM> vms=
                    statisticService.getStatisticForFooDCourt(month,stores.get(i).getStoreId());
             vms2.add(new StatisticVMReponse(stores.get(i).getStoreName(),vms));

        }
        return new ResponseEntity<List<StatisticVMReponse>>(vms2, HttpStatus.OK);
    }


    @ApiOperation(value = "Get count order detail rollback")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/cashier/total-cash-today")
    public ResponseEntity<CashierReportVM> getTotalCashToday(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        CashierReportVM vms = statisticService.getTotalCashToday(username);
        return new ResponseEntity<CashierReportVM>(vms, HttpStatus.OK);
    }

    @GetMapping(value = "/statistic-store",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StatisticVMReponse> getStatisticStore(@RequestParam(name = "month") String month,HttpServletRequest request)

    {
        String username = Ultilities.getUsername(request);
        StatisticVMReponse vms = statisticService.getStatisticStore(month,username);
        return new ResponseEntity<StatisticVMReponse>(vms, HttpStatus.OK);
    }


}
