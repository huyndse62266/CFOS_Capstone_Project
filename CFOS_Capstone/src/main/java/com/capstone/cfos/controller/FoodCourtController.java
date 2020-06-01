package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;

import static com.capstone.cfos.constants.Constant.*;

import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.controller.vm.FoodCourtVM;
import com.capstone.cfos.service.FoodCourtService;
import com.capstone.cfos.service.StoreService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api")
public class FoodCourtController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FoodCourtController.class);

    @Autowired
    private FoodCourtService foodCourtService;

    @Autowired
    StoreService storeService;

    @GetMapping(FOODCOURT)
    public ResponseEntity<FoodCourtVM> getFoodCourt(@RequestParam Long id) {
        FoodCourtVM vm = foodCourtService.getFoodCourt(id);
        LOGGER.info("get food by id: " + id);
        return new ResponseEntity<FoodCourtVM>(vm, HttpStatus.OK);
    }

    @GetMapping(FOODCOURT_ALL)
    public ResponseEntity<List<FoodCourtVM>> getAllFoodCourt() {
        List<FoodCourtVM> result = foodCourtService.getAllFoodCourt();
        LOGGER.info("get all foodcourts: " + result.size());
        return new ResponseEntity<List<FoodCourtVM>>(result, HttpStatus.OK);
    }

    @PostMapping(FOODCOURT_CREATE)
    public ResponseEntity<FoodCourtVM> createFoodCourt(@RequestBody FoodCourtVM vm) {
        FoodCourtVM result = foodCourtService.createFoodCourt(vm);
        LOGGER.info("created foodcourt: " + result.getFcName());
        return new ResponseEntity<FoodCourtVM>(result, HttpStatus.OK);
    }

    @PutMapping(FOODCOURT_UPDATE)
    public ResponseEntity<FoodCourtVM> updateFoodCourt(@RequestBody FoodCourtVM vm) {
        FoodCourtVM result = foodCourtService.updateFoodCourt(vm);
        LOGGER.info("created foodcourt: " + result.getFcName());
        return new ResponseEntity<FoodCourtVM>(result, HttpStatus.OK);
    }

    //khang
    @GetMapping("/count-member")
    public ResponseEntity<Integer> countAllMember(HttpServletRequest request) {
        String authoryUsername = Ultilities.getUsername(request);
        int result = foodCourtService.countMember(authoryUsername);
        return new ResponseEntity<Integer>(result, HttpStatus.OK);
    }

    //khang
    @GetMapping("/count-member-deposit")
    public ResponseEntity<Double> countMemberDepositInDay(HttpServletRequest request) {
        String authoryUsername = Ultilities.getUsername(request);
        double result = foodCourtService.countMemberDepositInDay(authoryUsername);
        return new ResponseEntity<Double>(result, HttpStatus.OK);
    }

    //khang

    @ApiOperation(value = "FoodCourt Today balance, The amount of guest remittance minus the liabilities of all stores for 1 day")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid foodCourt"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/foodcourt-today-balance", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Double> countBalanceToday(HttpServletRequest request) {
        String authoryUsername = Ultilities.getUsername(request);
        double result = foodCourtService.countBalanceToday(authoryUsername);
        return new ResponseEntity<Double>(result, HttpStatus.OK);

    }

    //khang
    @ApiOperation(value = "FoodCourt Add banner")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid foodCourt"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping(value = "/foodcourt-add-banner", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createBanner(HttpServletRequest request, @RequestBody BannerVM bannerVM) {
        String authoryUsername = Ultilities.getUsername(request);
        String result = foodCourtService.createBanner(authoryUsername, bannerVM);
        return new ResponseEntity<String>(result, HttpStatus.OK);

    }

    //khang
    @ApiOperation(value = "Get banner for mobile")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid foodCourt"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/get-banner", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BannerVM> getBaner(@RequestParam(name = "fcId", required = false, defaultValue = "0") long fcId,
                                             HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        BannerVM result = foodCourtService.getBanner(fcId, username);
        return new ResponseEntity<BannerVM>(result, HttpStatus.OK);

    }

    //khang
    @ApiOperation(value = "Get list cash take from cashier")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid foodCourt"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/cash-end-day", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<EmpVM>> getCashEndDay(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        List<EmpVM> result = foodCourtService.getCashEndDay(username);
        return new ResponseEntity<List<EmpVM>>(result, HttpStatus.OK);

    }

}









