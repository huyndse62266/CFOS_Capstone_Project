
package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.repository.CustomerRepository;
import com.capstone.cfos.service.*;
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
public class CustomerController {

    @Autowired
    WalletService walletService;

    @Autowired
    FeedbackService feedbackService;

    @Autowired
    OrderService orderService;

    @Autowired
    UserService userService;

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    FoodService foodService;

    private static final Logger LOGGER = LoggerFactory.getLogger(CustomerController.class);

    //Done 8-6-2019
    @ApiOperation(value = "Get wallet information of customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Internal server error")}
    )
    @GetMapping(value = "/customers/wallet",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<WalletVM> getWalletCustomer(HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
        WalletVM vm = walletService.getWalletByCustomerId(usernameCus);
        return new ResponseEntity<WalletVM>(vm, HttpStatus.OK);
    }


    //done 6-8-2019
    @ApiOperation(value = "Customer post a Feedbacks of customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @PostMapping(value = "/customer/feedback", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FeedbackVM> postFeedback(@RequestBody FeedbackVM feedbackVM,HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);

        FeedbackVM vm = feedbackService.postFeedback(feedbackVM,usernameCus);
        LOGGER.info("Feedback of customer posted" );
        return new ResponseEntity<FeedbackVM>(vm, HttpStatus.OK);
    }
    //khang
    @ApiOperation(value = "Get all order of a customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Internal server error") })
    @GetMapping(value = "/customer/all-order", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrderVMResponse>> getAllOrder(HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
        String customerId = customerRepository.findByUserUsername(usernameCus).getCustomerId();

        List<OrderVMResponse> vm = orderService.getAllOrderOfACustomer(customerId);
        LOGGER.info("Loading all order history with customer id: " + usernameCus );
        return new ResponseEntity<List<OrderVMResponse>>(vm, HttpStatus.OK);
    }

    @GetMapping(value = "/customer/info", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CustomerVM> getInfoCustomer(HttpServletRequest request,
                                                      @RequestParam(value = "cardId", required = false, defaultValue = "") String cardId) {
        String usernameCus = Ultilities.getUsername(request);
           CustomerVM  vm = userService.getInfoCustomer(usernameCus,cardId);
        LOGGER.info("Load info of customer : " + usernameCus );
        return new ResponseEntity<CustomerVM>(vm, HttpStatus.OK);
    }
    //khang
    @ApiOperation(value = "Get all feedback of a customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Customer did not have any feedback!") })
    @GetMapping(value = "/customer/all-feedback", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FeedbackVM>> getAllFeedback(HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
        List<FeedbackVM> vms = feedbackService.getAllFeedbackCustomer(usernameCus);
        LOGGER.info("Loading all feedback history with customer : " + usernameCus );
        return new ResponseEntity<List<FeedbackVM>>(vms, HttpStatus.OK);
    }

    //khang
    @ApiOperation(value = "Update info customer by username")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Have a problem with server!") })
    @PutMapping(value = "/customer/edit", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> updateInfoCustomer(@RequestBody CustomerVM customerVM,HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        String result = userService.updateCustomerInfo(customerVM,username);
        return new ResponseEntity<String>( result,HttpStatus.OK);
    }

    @PutMapping(value = "/customer/device-token")
    public ResponseEntity<String> updateDeviceToken(HttpServletRequest request, @RequestBody String deviceToken) {
        String authorityUsername = Ultilities.getUsername(request);
        String result = userService.updateDeviceToken(authorityUsername,deviceToken);
        LOGGER.info("update device token : " + result );
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    //khang/**/
    @ApiOperation(value = "Get food customer order near here.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid customer ID"),
            @ApiResponse(code = 500, message = "Have an error with Database!") })
    @GetMapping(value = "/customer/food-near", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<FoodVMDetailResponse>> getFoodNear(HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
            //String customerId = customerRepository.findByUserUsername(usernameCus).getCustomerId();
            List<FoodVMDetailResponse> vms = foodService.getFoodNear(usernameCus);
            LOGGER.info("Loading all food history with customer : " + usernameCus );
            return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
    }

    @PutMapping(value = "/customer/deactive-card", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deactivateCard(@RequestParam(name = "password") String password,HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
        LOGGER.info("Deactivate card of username : " + usernameCus );
        return new ResponseEntity<String>(userService.deactivateCard(usernameCus,password), HttpStatus.OK);
    }






}
