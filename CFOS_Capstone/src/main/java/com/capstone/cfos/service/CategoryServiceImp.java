package com.capstone.cfos.service;

import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.AppCategoryVM;
import com.capstone.cfos.controller.vm.CategoryVM;
import com.capstone.cfos.controller.vm.FCCategoryVM;
import com.capstone.cfos.controller.vm.FoodVMDetailResponse;
import com.capstone.cfos.mapper.CategoryMapper;
import com.capstone.cfos.mapper.FoodMapper;
import com.capstone.cfos.mapper.StoreMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImp implements CategoryService {

    @Autowired
    CategoryRepository repository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryMapper categoryMapper;
    @Autowired
    FoodRepository foodRepository;

    @Autowired
    FoodMapper foodMapper;

    @Autowired
    StoreMapper storeMapper;

    @Autowired
    private FoodOptionService foodOptionService;

    @Autowired
    StoreRepository storeRepository;

    @Override
    public CategoryVM createStoreCategory(CategoryVM vm, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null || user.getEmployee() == null ||
                !user.getEmployee().getRole().getRoleName().equals(Constant.STORE_MANAGER) || user.getEmployee().getStore() == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Unauthoried!");
        }
        Store store = user.getEmployee().getStore();
        Category category = repository.findByStoreCategoryName(vm.getCategoryName(), store.getStoreId());
        if (category != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Danh mục đã tồn tại!");
        }
        category = new Category();
        category.setCategoryName(vm.getCategoryName());
        category.setActive(true);
        category.setImage(vm.getImage());
        category.setStore(store);
        category = repository.save(category);
        return categoryMapper.toCategoryVM(category);
    }

    @Override
    public CategoryVM updateStoreCategory(CategoryVM vm, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null || user.getEmployee() == null ||
                !user.getEmployee().getRole().getRoleName().equals(Constant.STORE_MANAGER) || user.getEmployee().getStore() == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Unauthoried!");
        }
        Store store = user.getEmployee().getStore();
        Category category = repository.findByStoreCategoryName(vm.getCategoryName(), store.getStoreId());
        if (category != null && category.getCategoryId() != vm.getCategoryId()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Danh mục đã tồn tại!");
        }
        category = repository.findByCategoryId(vm.getCategoryId());
        category.setCategoryName(vm.getCategoryName());
        category.setActive(vm.isActive());
        category.setImage(vm.getImage());
        category.setStore(store);
        category = repository.save(category);
        return categoryMapper.toCategoryVM(category);
    }

    @Override
    public List<CategoryVM> getAllStoreCategory(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null || user.getEmployee() == null ||
                !user.getEmployee().getRole().getRoleName().equals(Constant.STORE_MANAGER) || user.getEmployee().getStore() == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Unauthoried!");
        }
        Store store = user.getEmployee().getStore();
        List<Category> categories = repository.findByStoreId(store.getStoreId());
        return categories.stream().map(categoryMapper::toCategoryVM).collect(Collectors.toList());
    }

    @Override
    public CategoryVM createFCCategory(CategoryVM vm, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null || user.getEmployee() == null) throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Unauthoried!");

        if (vm.getParentId() == null) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Danh mục cha không được để trống");
        Category parent = repository.findByCategoryId(vm.getParentId());
        if (parent == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Danh mục cha không tồn tại!");

        Category category = repository.findBySubFcCategoryName(vm.getCategoryName(), parent.getCategoryId());
        if (category != null) throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Danh mục của food court " + vm.getCategoryName() + " đã tồn tại!");
        category = new Category();
        category.setCategoryName(vm.getCategoryName());
        category.setCategory(parent);
        category.setImage(vm.getImage());
        category.setActive(true);
        return categoryMapper.toCategoryVM(repository.save(category));
    }

    @Override
    public CategoryVM updateFCCategory(CategoryVM vm) {
        Category category = repository.findByCategoryId(vm.getCategoryId());
        Category categoryCheck;
        if (category.getCategory() == null) {
            categoryCheck = repository.findByParentFcCategoryName(vm.getCategoryName());
            if (categoryCheck != null && categoryCheck.getCategoryId() != vm.getCategoryId())
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Danh mục: " + vm.getCategoryName() + " đã tồn tại!");
        } else {
            categoryCheck = repository.findBySubFcCategoryName(vm.getCategoryName(), category.getCategory().getCategoryId());
            if (categoryCheck != null && categoryCheck.getCategoryId() != vm.getCategoryId())
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Danh mục" + vm.getCategoryName() + " đã tồn tại!");
        }
        category.setCategoryName(vm.getCategoryName());
        category.setImage(vm.getImage());
        category.setActive(vm.isActive());
        return categoryMapper.toCategoryVM(repository.save(category));
    }

    @Override
    public List<FCCategoryVM> getCategoryByFC(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null || user.getEmployee() == null) throw new ResponseStatusException(
                HttpStatus.FORBIDDEN, "Unauthoried!");
        FoodCourt foodCourt = user.getEmployee().getFoodCourt();

        List<Category> categories = repository.findByFcId(foodCourt.getFcId());
        if (categories == null || categories.isEmpty()) return null;
        List<FCCategoryVM> vms = categories.stream().map(c -> {
            return toFCCategoryVM(c);
        }).collect(Collectors.toList());
        return vms;
    }

    @Override
    public List<CategoryVM> findAllByFCId(Long fcId) {
        return repository.findDistinctByFoodsNotNull().stream().map(categoryMapper::toCategoryVM).collect(Collectors.toList());
    }

    @Override
    public List<AppCategoryVM> findAllAppCategories() {
        List<Category> categories = repository.findDistinctByFoodsNotNull();
        return getALLCategoryVM(categories);
    }

    private List<AppCategoryVM> getALLCategoryVM(List<Category> categories) {
        if (categories == null || categories.isEmpty()) return null;
        List<AppCategoryVM> vms = new ArrayList<>();
        for (Category c : categories) {
            if (!c.isActive()) continue;
            AppCategoryVM vm = new AppCategoryVM();
            vm.setCategoryVM(categoryMapper.toCategoryVM(c));
            List<FoodVMDetailResponse> foodVMDetailResponses = new ArrayList<>();
            for (Food food : c.getFoods()) {
                if (food.isActive() && food.getStoreCategory().isActive() && food.getStoreCategory().getStore().isActive()) {
                    FoodVMDetailResponse vmDetailResponse = foodMapper.toFoodVMDetailResponse(food);
                    vmDetailResponse.setStoreVM(storeMapper.toStoreVM(food.getStoreCategory().getStore()));
                    vmDetailResponse.setFoodOptions(foodOptionService.getAllFoodOptionByFood(food.getFoodId()));
                    foodVMDetailResponses.add(vmDetailResponse);
                }
            }
            vm.setFoodVMDetailResponses(foodVMDetailResponses);
            if (!foodVMDetailResponses.isEmpty()) {
                vms.add(vm);
            }
        }
        return vms;
    }

    @Override
    public List<AppCategoryVM> getALLStoreCategory(List<Category> categories) {
        if (categories == null || categories.isEmpty()) return null;
        List<AppCategoryVM> vms = new ArrayList<>();
        for (Category c : categories) {
            if (!c.isActive()) continue;
            AppCategoryVM vm = new AppCategoryVM();
            vm.setCategoryVM(categoryMapper.toCategoryVM(c));
            List<FoodVMDetailResponse> foodVMDetailResponses = new ArrayList<>();
            for (Food food : c.getStoreFoods()) {
                if (food.isActive() && food.getStoreCategory().isActive() && food.getStoreCategory().getStore().isActive()) {
                    FoodVMDetailResponse vmDetailResponse = foodMapper.toFoodVMDetailResponse(food);
                    vmDetailResponse.setStoreVM(storeMapper.toStoreVM(food.getStoreCategory().getStore()));
                    vmDetailResponse.setFoodOptions(foodOptionService.getAllFoodOptionByFood(food.getFoodId()));
                    foodVMDetailResponses.add(vmDetailResponse);
                }
            }
            vm.setFoodVMDetailResponses(foodVMDetailResponses);
            if (!foodVMDetailResponses.isEmpty()) {
                vms.add(vm);
            }
        }
        return vms;
    }

    @Override
    public List<CategoryVM> findAllByParent(String cateName, Long fcId) {
        Category category = repository.findDistinctByFoodCourtFcIdAndCategoryName(fcId, cateName);
        return repository.findDistinctByCategoryCategoryIdAndFoodsNotNull(category.getCategoryId()).stream().map((categoryMapper::toCategoryVM)).collect(Collectors.toList());
    }

    private FCCategoryVM toFCCategoryVM(Category category) {
        FCCategoryVM vm = new FCCategoryVM();
        vm.setFcCategoryId(category.getCategoryId());
        vm.setFcCategoryName(category.getCategoryName());
        vm.setActive(category.isActive());
        List<CategoryVM> categoryVMS = category.getCategories().stream().map(cs -> {
            return categoryMapper.toCategoryVM(cs);
        }).collect(Collectors.toList());
        vm.setCategoryVM(categoryVMS);
        return vm;
    }

    //khang - write for kiosk
    @Override
    public List<AppCategoryVM> findAllKioskCategories() {
        List<Category> categories = repository.findDistinctByFoodsNotNull();
        return getALLCategoryVMForKiosk(categories);

    }

    private List<AppCategoryVM> getALLCategoryVMForKiosk(List<Category> categories) {
        if (categories == null || categories.isEmpty()) return null;
        List<Store> s = storeRepository
                .findDistinctTop3ByActiveTrueAndStoreCategoriesStoreFoodsActiveTrueOrderByStoreCategoriesStoreFoodsCountDesc();
        int tmp = categories.size();
        List<AppCategoryVM> listVm = new ArrayList<>();
        for (int i = 0; i < tmp; i++) {
            AppCategoryVM vm = new AppCategoryVM();
            vm.setCategoryVM(categoryMapper.toCategoryVM(categories.get(i)));
            List<Food> foods = new ArrayList<>();
            for (int j = 0; j < s.size(); j++) {//list store
                List<Category> categories1 = repository.findByStoreId(s.get(j).getStoreId());
                for (int k = 0; k < categories1.size(); k++) {
                    List<Food> top2 = foodRepository.findTop2ByStoreCategoryCategoryIdAndFcCategoryCategoryIdAndActiveTrueOrderByCountDesc
                            (s.get(j).getStoreCategories().get(k).getCategoryId(), categories.get(i).getCategoryId());
                    for (Food food1 : top2) {
                        foods.add(food1);
                    }
                }
            }
            vm.setFoodVMDetailResponses(
                    foods.stream().map(food -> {
                        FoodVMDetailResponse vmDetailResponse = foodMapper.toFoodVMDetailResponse(food);
                        vmDetailResponse.setStoreVM(storeMapper.toStoreVM(food.getStoreCategory().getStore()));
                        vmDetailResponse.setFoodOptions(foodOptionService.getAllFoodOptionByFood(food.getFoodId()));
                        return vmDetailResponse;
                    }).collect(Collectors.toList())
            );
            listVm.add(vm);
        }
        return listVm;
    }

    @Override
    public List<CategoryVM> findCategoriesByFcId(Long fcId) {
        List<Category> categories = repository.findSubCategoryByFcId(fcId);
        if (categories == null && categories.isEmpty()) {
            return null;
        }
        List<CategoryVM> vms = new ArrayList<>();
        for (Category c : categories) {
            if (c.getFoods() != null && !c.getFoods().isEmpty()) {
                boolean flag = false;
                int count = 0;
                for (Food food : c.getFoods()) {
                    if (food.isActive() && food.getStoreCategory().isActive() && food.getStoreCategory().getStore().isActive()) {
                        flag = true;
                        count += 1;
                    }
                }
                if (flag) {
                    CategoryVM vm = categoryMapper.toCategoryVM(c);
                    vm.setDishsCount(count);
                    vms.add(vm);
                }
            }
        }
        return vms;
    }
}
