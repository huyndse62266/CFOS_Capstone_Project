package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.AppCategoryVM;
import com.capstone.cfos.controller.vm.CategoryVM;
import com.capstone.cfos.controller.vm.FCCategoryVM;
import com.capstone.cfos.service.CategoryService;
import com.capstone.cfos.service.FoodCourtService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api")
public class CategoryController {
    private static final Logger LOGGER = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    CategoryService categoryService;

    @PostMapping("/stores/create-category")
    public ResponseEntity<CategoryVM> createStoreCategory(@RequestBody CategoryVM storeCategoryVM, HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        CategoryVM vm = categoryService.createStoreCategory(storeCategoryVM, username);
        return new ResponseEntity<CategoryVM>(vm, HttpStatus.OK);
    }

    @PutMapping("/stores/update-category")
    public ResponseEntity<CategoryVM> updateStoreCategory(@RequestBody CategoryVM storeCategoryVM, HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        CategoryVM vm = categoryService.updateStoreCategory(storeCategoryVM, username);
        return new ResponseEntity<CategoryVM>(vm, HttpStatus.OK);
    }

    @GetMapping("/stores/all-category")
    public ResponseEntity<List<CategoryVM>> getAllStoreCategory(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        List<CategoryVM> vms = categoryService.getAllStoreCategory(username);
        return new ResponseEntity<List<CategoryVM>>(vms, HttpStatus.OK);
    }

    @GetMapping("/foodcourt/all-category")
    public ResponseEntity<List<FCCategoryVM>> getFCCategory(HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        List<FCCategoryVM> vms = categoryService.getCategoryByFC(username);
        LOGGER.info("get food' category: " + vms.size());
        return new ResponseEntity<List<FCCategoryVM>>(vms, HttpStatus.OK);
    }

    @PostMapping("/foodcourt/create-category")
    public ResponseEntity<CategoryVM> createFCCategory(@RequestBody CategoryVM vm, HttpServletRequest request) {
        String username = Ultilities.getUsername(request);
        CategoryVM result = categoryService.createFCCategory(vm, username);
        LOGGER.info("create food' category: " + result);
        return new ResponseEntity<CategoryVM>(result, HttpStatus.OK);
    }

    @PutMapping("/foodcourt/update-category")
    public ResponseEntity<CategoryVM> updateFCCategory(@RequestBody CategoryVM vm) {
        CategoryVM result = categoryService.updateFCCategory(vm);
        LOGGER.info("update food' category: " + result);
        return new ResponseEntity<CategoryVM>(result, HttpStatus.OK);
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<List<CategoryVM>> getAllCategories(@PathVariable Long id) {
        List<CategoryVM> categoryVMList = categoryService.findAllByFCId(id);
        return new ResponseEntity<List<CategoryVM>>(categoryVMList, HttpStatus.OK);
    }

    @GetMapping("/app/categories")
    public ResponseEntity<List<AppCategoryVM>> getAllAppCategories() {
        List<AppCategoryVM> vms = categoryService.findAllAppCategories();
        return new ResponseEntity<List<AppCategoryVM>>(vms, HttpStatus.OK);
    }

    @GetMapping("/fc/categories")
    public ResponseEntity<List<CategoryVM>> getCategoriesByFc(@RequestParam("fcId") Long fcId) {
        List<CategoryVM> vms = categoryService.findCategoriesByFcId(fcId);
        return new ResponseEntity<List<CategoryVM>>(vms, HttpStatus.OK);
    }

    @GetMapping("/categories/parent")
    public ResponseEntity<List<CategoryVM>> getAllCategoriesByParent(@RequestParam("name") String cateName, @RequestParam("fcId") Long fcId) {
        List<CategoryVM> categoryVMList = categoryService.findAllByParent(cateName, fcId);
        return new ResponseEntity<List<CategoryVM>>(categoryVMList, HttpStatus.OK);
    }

    @GetMapping("/kiosk/categories")
    public ResponseEntity<List<AppCategoryVM>> getAllKioskCategories() {
        List<AppCategoryVM> vms = categoryService.findAllKioskCategories();
        return new ResponseEntity<List<AppCategoryVM>>(vms, HttpStatus.OK);
    }


}
