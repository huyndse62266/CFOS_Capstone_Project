package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.model.Food;
import com.capstone.cfos.service.FoodOptionService;
import com.capstone.cfos.service.FoodService;
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

@Controller
@RequestMapping("/api")
public class FoodController {

    private static final Logger LOGGER = LoggerFactory.getLogger(FoodController.class);

    @Autowired
    private FoodService foodService;
    @Autowired
    private FoodOptionService foodOptionService;

    @GetMapping("/food")
    public ResponseEntity<FoodVM> getFood(@RequestParam Long foodId) {
        FoodVM vm = foodService.getFoodById(foodId);
        LOGGER.info("get food by id: " + foodId);
        return new ResponseEntity<FoodVM>(vm, HttpStatus.OK);
    }

    @GetMapping("/category/food")
    public ResponseEntity<Page<FoodVM>> getAllFoodByCategory(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam Long categoryId) {
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(Food.PROP_FOODNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(Food.PROP_FOODNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<FoodVM> vm = foodService.getFoodByCategory(pageable, categoryId);
        if(vm != null){
            vm.map(foodVM -> {
                List<FoodOptionVM> foodOptionVMS = foodOptionService.findAllFoodOptionByFoodId(foodVM.getFoodId());
                foodVM.setFoodOptionVMS(foodOptionVMS);
                return foodVM;
            });
        }
        LOGGER.info("get food by category: " + categoryId);
        return new ResponseEntity<Page<FoodVM>>(vm, HttpStatus.OK);
    }


    @GetMapping("/search-food")
    public ResponseEntity<Page<FoodVM>> searchFood(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "ASC") String sort,
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "categoryId") Long categoryId) {

        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(Food.PROP_FOODNAME).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(Food.PROP_FOODNAME).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<FoodVM> vm = foodService.searchFood(pageable, name, categoryId);
        LOGGER.info("search food : " + vm.getTotalElements());
        return new ResponseEntity<Page<FoodVM>>(vm, HttpStatus.OK);
    }

    @PostMapping("create-food")
    public ResponseEntity<FoodVM> createFood(@RequestBody FoodVM vm,HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        FoodVM result = foodService.createFood(vm, username);
        LOGGER.info("create food : " + vm.getFoodName());
        return new ResponseEntity<FoodVM>(result, HttpStatus.OK);
    }

    @PutMapping("update-food")
    public ResponseEntity<FoodVM> updateFood(@RequestBody FoodVM vm,HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        FoodVM result = foodService.updateFood(vm, username);
        LOGGER.info("update food : " + vm.getFoodName());
        return new ResponseEntity<FoodVM>(result, HttpStatus.OK);
    }

    @PutMapping("delete-food")
    public ResponseEntity<String> deleteFood(@RequestParam(value = "id") Long id) {
        String result = foodService.deleteFood(id);
        LOGGER.info("delete food : " + id);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @GetMapping("category/{id}/foods")
    public ResponseEntity<List<FoodVMListResponse>> getAllFoodByCategory(@PathVariable Long id) {
        return new ResponseEntity<List<FoodVMListResponse>>(foodService.findTop2PerStore(id), HttpStatus.OK);
    }

    @GetMapping("category/{id}/foods/promotion")
    public ResponseEntity<List<FoodVMListResponse>> getAllFoodWithPromotion(@PathVariable Long id) {
        return new ResponseEntity<List<FoodVMListResponse>>(foodService.findAllWithPromotionByCategory(id), HttpStatus.OK);
    }

    @GetMapping("store/{id}/foods")
    public ResponseEntity<List<FoodVMListResponse>> getAllFoodWithStore(@PathVariable Long id) {
        return new ResponseEntity<List<FoodVMListResponse>>(foodService.findAllWithStore(id), HttpStatus.OK);
    }

    @GetMapping("foods/{id}")
    public ResponseEntity<FoodVMDetailResponse> getFoodDetailByID(@PathVariable Long id) {
        FoodVMDetailResponse vm = foodService.findFoodDetailByID(id);
        List<StoreFoodOptionVM> foodOptionVMS = foodOptionService.getAllFoodOptionByFood(id);
        vm.setFoodOptions(foodOptionVMS);
        return new ResponseEntity<FoodVMDetailResponse>(vm, HttpStatus.OK);
    }

//    @GetMapping("search/foods")
//    public ResponseEntity<List<FoodVMDetailResponse>> searchFoods(@RequestParam String name) {
//        List<FoodVMDetailResponse> vms = foodService.searchFoods(name);
//        return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
//    }

    @GetMapping("/search/foods")
    public ResponseEntity<SearchFoodVM> searchFoods(
            @RequestParam(value = "name", required = false, defaultValue = "") String name,
            @RequestParam(value = "fcId") Long fcId) {
        SearchFoodVM vm = foodService.searchFoods(name, fcId);
        LOGGER.info("search food : " + name);
        return new ResponseEntity<SearchFoodVM>(vm, HttpStatus.OK);
    }

    @GetMapping("category/{id}/foods-top")
    public ResponseEntity<List<FoodVMListResponse>> getAllFoodTopByCategory(@PathVariable Long id) {
        return new ResponseEntity<List<FoodVMListResponse>>(foodService.getListFoodPopular(id), HttpStatus.OK);
    }

    @GetMapping("category/foods")
    public ResponseEntity<List<FoodVMDetailResponse>> getFoodsByCategoryId(@RequestParam Long cateId) {
        List<FoodVMDetailResponse> vms = foodService.getFoodsByCategoryId(cateId);
        return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
    }

    @GetMapping("/food-detail")
    public ResponseEntity<FoodVMDetailResponse> getFoodById(@RequestParam Long foodId) {
        FoodVMDetailResponse vm = foodService.getFoodDetailById(foodId);
        LOGGER.info("get food detail by id: " + foodId);
        return new ResponseEntity<FoodVMDetailResponse>(vm, HttpStatus.OK);
    }

    @GetMapping("promotion/foods")
    public ResponseEntity<List<FoodVMDetailResponse>> getPromotionFoods(@RequestParam Long fcId) {
        List<FoodVMDetailResponse> vms = foodService.getPromotionFoods(fcId);
        LOGGER.info("get promotion foods");
        return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
    }

    @GetMapping("popular/foods")
    public ResponseEntity<List<FoodVMDetailResponse>> getPopularFoods(@RequestParam Long fcId) {
        List<FoodVMDetailResponse> vms = foodService.getPopularFoods(fcId);
        LOGGER.info("get popular foods");
        return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
    }

    @GetMapping("foods/rating")
    public ResponseEntity<List<FoodVMDetailResponse>> getFoodsByRate() {
        LOGGER.info("Get list foods sort by count desc");
        List<FoodVMDetailResponse> vms = foodService.findAllSortByRate();
        return new ResponseEntity<List<FoodVMDetailResponse>>(vms, HttpStatus.OK);
    }
}
