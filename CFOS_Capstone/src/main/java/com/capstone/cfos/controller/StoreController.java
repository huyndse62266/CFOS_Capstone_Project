package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.StoreMapper;
import com.capstone.cfos.model.Store;
import com.capstone.cfos.model.User;
import com.capstone.cfos.repository.StoreRepository;
import com.capstone.cfos.repository.UserRepository;
import com.capstone.cfos.service.*;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api")
public class StoreController {

    private static final Logger LOGGER = LoggerFactory.getLogger(StoreController.class);

    @Autowired
    StoreService storeService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FeedbackService feedbackService;


    @GetMapping("/store")
    public ResponseEntity<StoreVM> getStore(@RequestParam(name = "storeId") Long id) {
        StoreVM vm = storeService.getStoreById(id);
        LOGGER.info("get store: " + vm);
        return new ResponseEntity<StoreVM>(vm, HttpStatus.OK);
    }

    @ApiOperation(value = "GEt all store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/all-store", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<StoreVM>> getAllStoreByWebAdmin(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        List<StoreVM> vms = storeService.getAllStoreByFc(authorityUsername);
        LOGGER.info("get all stores: " + vms.size());
        return new ResponseEntity<List<StoreVM>>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = " add new Store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping(value = "/store/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<StoreVM> createStore(@RequestBody StoreVM storeVM, HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        StoreVM vm = storeService.addNewStore(storeVM, authorityUsername);
        LOGGER.info("create store: " + vm);
        return new ResponseEntity<StoreVM>(vm, HttpStatus.OK);
    }

    //Done 6-8-2019
    @PutMapping("/store/update")
    public ResponseEntity<StoreVM> editStore(@RequestBody StoreVM vm) {
        vm = storeService.updateStore(vm);
        LOGGER.info("update store: " + vm);
        return new ResponseEntity<StoreVM>(vm, HttpStatus.OK);
    }

    //Done 9-6-2019
    @ApiOperation(value = "Get all feedback of a store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/stores/feedbacks")
    public ResponseEntity<Page<FeedbackVM>> getAllFeedBack(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            HttpServletRequest request) {

        Pageable pageable = PageRequest.of(page, size);
        String username = Ultilities.getUsername(request);
        User user = userRepository.findByUsername(username);
        long storeId = user.getEmployee().getStore().getStoreId();
        Page<FeedbackVM> vms = feedbackService.getAllFeedbackByStoreId(pageable, storeId);
        return new ResponseEntity<Page<FeedbackVM>>(vms, HttpStatus.OK);
    }

    @GetMapping("/stores")
    public ResponseEntity<List<StoreVM>> getAllStore() {
        return new ResponseEntity<List<StoreVM>>(storeService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/app/stores")
    public ResponseEntity<List<AppStoreVM>> getAllAppStore(@RequestParam Long fcId) {
        return new ResponseEntity<List<AppStoreVM>>(storeService.findAllStore(fcId), HttpStatus.OK);
    }

    @GetMapping("/app/store")
    public ResponseEntity<AppStoreVM> getStoreById(@RequestParam Long storeId) {
        return new ResponseEntity<AppStoreVM>(storeService.findStoreById(storeId), HttpStatus.OK);
    }

    @GetMapping("/stores/{id}")
    public ResponseEntity<List<StoreVMResponse>> getAllStoreVM(@PathVariable Long id) {
        return new ResponseEntity<List<StoreVMResponse>>(storeService.findAllByFC(id), HttpStatus.OK);
    }

    //khang
    @ApiOperation(value = "Get current day revenue for store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/stores/current-revenue")
    public ResponseEntity<Double> getCurrentRevenue(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        double vms = storeService.getCurrentRevenue(username);
        return new ResponseEntity<Double>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get count order success for store")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/stores/count-order-success")
    public ResponseEntity<Integer> getCountOrderSuccess(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        int vms = storeService.countOrderByStatus(username, Constant.ORDER_READY);
        return new ResponseEntity<Integer>(vms, HttpStatus.OK);
    }

    @ApiOperation(value = "Get count order detail rollback")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store ID"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping("/stores/count-order-unsuccess")
    public ResponseEntity<Integer> getCountOrderUnSuccess(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        int vms = storeService.countOrderByStatus(username,Constant.ORDER_REFUNDED);
        return new ResponseEntity<Integer>(vms, HttpStatus.OK);
    }

}
