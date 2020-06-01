package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.FoodOptionVM;
import com.capstone.cfos.controller.vm.StoreFoodOptionVM;
import com.capstone.cfos.controller.vm.StoreVM;
import com.capstone.cfos.service.FoodOptionService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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
public class FoodOptionController {
    @Autowired
    FoodOptionService foodOptionService;
    @ApiOperation(value = " add new Food Option")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid store"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @PostMapping(value = "/food-option/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FoodOptionVM> createFoodOption(@RequestBody FoodOptionVM foodOptionVM, HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        FoodOptionVM vm = foodOptionService.addNewFoodOption(foodOptionVM ,authorityUsername);
        return new ResponseEntity<FoodOptionVM>(vm, HttpStatus.OK);
    }
    @ApiOperation(value = " update Food Option")
    @PutMapping("/food-option/update")
    public ResponseEntity<String> editFoodOption(@RequestBody FoodOptionVM vms) {
        String vm = foodOptionService.updateFoodOption(vms);
        return new ResponseEntity<String>(vm, HttpStatus.OK);
    }
    @ApiOperation(value = " Get All Food Option")
    @GetMapping("/food-options")
    public ResponseEntity<List<StoreFoodOptionVM>> getAllFoodOption(HttpServletRequest request){
        String authorityUsername = Ultilities.getUsername(request);
        List<StoreFoodOptionVM> vms = foodOptionService.getAllFoodOptionByStore(authorityUsername);
        return new ResponseEntity<List<StoreFoodOptionVM>>(vms, HttpStatus.OK);
    }
}
