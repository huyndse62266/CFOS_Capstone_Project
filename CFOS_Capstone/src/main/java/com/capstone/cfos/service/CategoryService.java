package com.capstone.cfos.service;

import com.capstone.cfos.controller.vm.AppCategoryVM;
import com.capstone.cfos.controller.vm.CategoryVM;
import com.capstone.cfos.controller.vm.FCCategoryVM;
import com.capstone.cfos.model.Category;

import java.util.List;

public interface CategoryService {

    CategoryVM createStoreCategory(CategoryVM vm, String username);

    CategoryVM updateStoreCategory(CategoryVM vm, String username);

    List<CategoryVM> getAllStoreCategory(String username);

    List<FCCategoryVM> getCategoryByFC(String username);

    List<CategoryVM> findAllByFCId(Long fcId);

    List<AppCategoryVM> findAllAppCategories();

    List<AppCategoryVM> getALLStoreCategory(List<Category> categories);

    List<CategoryVM> findAllByParent(String cateName, Long fcId);

    CategoryVM createFCCategory(CategoryVM vm, String username);

    CategoryVM updateFCCategory(CategoryVM vm);
        //use for kiosk - 2 food with top order for each restaurant
    List<AppCategoryVM>  findAllKioskCategories();

    List<CategoryVM> findCategoriesByFcId(Long fcId);
}
