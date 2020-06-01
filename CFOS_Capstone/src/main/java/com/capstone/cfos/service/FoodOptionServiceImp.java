package com.capstone.cfos.service;

import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.FoodOptionVM;
import com.capstone.cfos.controller.vm.StoreFoodOptionVM;
import com.capstone.cfos.controller.vm.StoreVM;
import com.capstone.cfos.mapper.FoodOptionMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.FoodOptionFoodRepository;
import com.capstone.cfos.repository.FoodOptionRepository;
import com.capstone.cfos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodOptionServiceImp implements FoodOptionService {
    @Autowired
    FoodOptionRepository repository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    FoodOptionMapper mapper;

    @Autowired
    FoodOptionFoodRepository foodOptionFoodRepository;

    @Override
    public FoodOptionVM addNewFoodOption(FoodOptionVM vm, String authorityUsername) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user == null || user.getEmployee() == null || !user.getEmployee().getRole().getRoleName().equals(Constant.STORE_MANAGER)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Unauthoried!");
        }
        Store store = user.getEmployee().getStore();
        if (store == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Cửa hàng này không tồn tại!");

        FoodOption parent = repository.findByFoId(vm.getFoodOptionParent());
        FoodOption foodOption;
        if (parent != null) {
            foodOption = repository.findByFoNameAndFoodOptionFoId(vm.getFoName(), vm.getFoodOptionParent());
            if (foodOption != null) throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This sub food option in " + foodOption.getFoName() + " is exist!");
            foodOption = new FoodOption();
            foodOption.setStore(store);
            foodOption.setFoName(vm.getFoName());
            foodOption.setCount(parent.isCount());
            foodOption.setSelectMore(parent.isSelectMore());
            foodOption.setOptionPrice(vm.getOptionPrice());
            if (vm.isDefault() && !parent.isSelectMore() && !parent.isCount()) {
                parent.getFoodOptions().stream().map(o -> {
                    o.setDefault(false);
                    return o;
                }).collect(Collectors.toList());
            }
            parent = repository.save(parent);
            foodOption.setFoodOption(parent);
            foodOption.setDefault(vm.isDefault());

        } else {
            foodOption = repository.findBySubNameAndStoreStoreId(vm.getSubName(), store.getStoreId());
            if (foodOption != null) throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This food option's sub-name in store " + foodOption.getStore().getStoreName() + " is exist!");
            foodOption = new FoodOption();
            foodOption.setStore(store);
            foodOption.setFoName(vm.getFoName());
            foodOption.setOptionPrice(0);
            foodOption.setSubName(vm.getSubName());
            foodOption.setCount(vm.isCount());
            foodOption.setSelectMore(vm.isSelectMore());
            foodOption.setDefault(false);
        }
        return mapper.toFoodOptionVM(repository.save(foodOption));
    }

    @Override
    public String updateFoodOption(FoodOptionVM vm) {
        FoodOption foodOption = repository.findByFoId(vm.getFoId());
        if (foodOption == null) return "fail";
        if (foodOption.getFoodOption() != null) {//case : child
            foodOption.setOptionPrice(vm.getOptionPrice());
            FoodOption parent = foodOption.getFoodOption();
            if (vm.isDefault() && !parent.isSelectMore() && !parent.isCount()) {
                parent.getFoodOptions().stream().map(o -> {
                    o.setDefault(false);
                    return o;
                }).collect(Collectors.toList());
            }
            repository.save(parent);
            foodOption.setDefault(vm.isDefault());
        } else {
            foodOption.setCount(vm.isCount());
            foodOption.setSelectMore(vm.isSelectMore());
            foodOption.setSubName(vm.getSubName());
            foodOption.setDefault(false);
        }
        foodOption.setFoName(vm.getFoName());
        repository.save(foodOption);
        return "success";
    }

    @Override
    public List<FoodOptionVM> findAll() {
        List<FoodOption> foodOptions = repository.findAll();
        if (foodOptions == null || foodOptions.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy bất cứ danh sách món ăn thêm nào!");
        }
        return foodOptions.stream().map(mapper::toFoodOptionVM).collect(Collectors.toList());
    }

    @Override
    public List<StoreFoodOptionVM> getAllFoodOptionByStore(String authorityUsername) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user == null || user.getEmployee() == null) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Unauthoried!");
        }
//        Store store = user.getEmployee().getStore();
//        List<FoodOption> foodOptions = repository.findAllByStoreStoreId(store.getStoreId());
        Store store = user.getEmployee().getStore();
        List<FoodOption> foodOptionParent = repository.findAllByStoreStoreIdAndFoodOptionIsNull(store.getStoreId());
        List<StoreFoodOptionVM> result = new ArrayList<>();
        int tmpCount = foodOptionParent.size();
        for (int i = 0; i < tmpCount; i++) {
            List<FoodOption> foodOptionChild = repository.findAllByFoodOptionFoId(foodOptionParent.get(i).getFoId());
            StoreFoodOptionVM tmp = new StoreFoodOptionVM();
            tmp.setFoodOptionParentId(foodOptionParent.get(i).getFoId());
            tmp.setFoodOptionNameParent(foodOptionParent.get(i).getFoName());
            tmp.setStoreId(foodOptionParent.get(i).getStore().getStoreId());
            tmp.setCount(foodOptionParent.get(i).isCount());
            tmp.setSelectMore(foodOptionParent.get(i).isSelectMore());
            tmp.setSubName(foodOptionParent.get(i).getSubName());
            tmp.setFoodOptionVMS(
                    foodOptionChild.stream().map(mapper::toFoodOptionVM).collect(Collectors.toList())
            );
            result.add(tmp);
        }
        return result;
    }

    @Override
    public List<FoodOptionVM> findAllFoodOptionByFoodId(long foodId) {
        List<FoodOption> foodOption = repository.findAllByFoodOptionFoodsFoodFoodId(foodId);
        return foodOption.stream().map(mapper::toFoodOptionVM).collect(Collectors.toList());
    }

    @Override
    public List<StoreFoodOptionVM> getAllFoodOptionByFood(long foodId) {
        List<StoreFoodOptionVM> resultTmp = new ArrayList<>();//list contain all StoreFoodOptionVM is available
        List<StoreFoodOptionVM> result = new ArrayList<>();//list final result
        List<FoodOption> foodOptionParent = repository.findAllByFoodOptionIsNull();//list all foodOption parent
        List<FoodOptionFood> tmp2 = foodOptionFoodRepository.findAllByFoodFoodId(foodId);// can use find foodOption by foodID
        int tmpCount = foodOptionParent.size();
        for (int i = 0; i < tmpCount; i++) {
            StoreFoodOptionVM tmp = new StoreFoodOptionVM();
            List<FoodOption> foodOptionChild = repository.findAllByFoodOptionFoIdAndFoodOptionFoodsFoodFoodId(foodOptionParent.get(i).getFoId(), foodId);
            tmp.setFoodOptionParentId(foodOptionParent.get(i).getFoId());
            tmp.setFoodOptionNameParent(foodOptionParent.get(i).getFoName());
            tmp.setStoreId(foodOptionParent.get(i).getStore().getStoreId());
            tmp.setCount(foodOptionParent.get(i).isCount());
            tmp.setSelectMore(foodOptionParent.get(i).isSelectMore());
            List<FoodOptionVM> foodOptionVMS = foodOptionChild.stream().map(mapper::toFoodOptionVM).collect(Collectors.toList());
            for (FoodOptionVM fovm : foodOptionVMS) {
                fovm.setFoodOptionParent(foodOptionParent.get(i).getFoId());
            }
            tmp.setFoodOptionVMS(
                    foodOptionVMS
            );
            resultTmp.add(tmp);
            boolean c = false;//c = true : founded foodOption and add to VM
            for (int k = 0; k < resultTmp.get(i).getFoodOptionVMS().size(); k++) {
                for (int j = 0; j < tmp2.size(); j++) {
                    if (resultTmp.get(i).getFoodOptionVMS().get(k).getFoId()
                            == tmp2.get(j).getFoodOption().getFoId()) {
                        result.add(resultTmp.get(i));
                        c = true;
                        break;
                    }
                }
                if (c == true) {
                    break;
                }
            }

        }

        return result;
    }
}
