package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.StoreMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import com.capstone.cfos.constants.Constant.*;

import static com.capstone.cfos.constants.Constant.*;

@Service
public class StoreServiceImp implements StoreService {

    @Autowired
    StoreRepository repository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    StoreMapper mapper;

    @Autowired
    FoodCourtRepository foodCourtRepository;

    @Autowired
    OrderDetailService orderDetailService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    FoodRepository foodRepository;

    @Override
    public StoreVM getStoreById(Long storeId) {
        Store store = repository.findByStoreId(storeId);
        if (store == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This store does not exit!");
        }
        return mapper.toStoreVM(store);
    }

    @Override
    public StoreVM addNewStore(StoreVM vm, String authorityUsername) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user == null || user.getEmployee() == null || !user.getEmployee().getRole().getRoleName().equals(Constant.FOOD_COURT_MANAGER)) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Unauthoried!");
        }
        Employee employee = employeeRepository.findByUserId(user.getId());
        Store store = repository.findByStoreNameAndFoodCourtFcId(vm.getStoreName(), employee.getFoodCourt().getFcId());
        if (store != null) throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "This store is exist!");

        FoodCourt foodCourt = user.getEmployee().getFoodCourt();
        if (foodCourt == null) throw new ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR, "This foodcourt is not exist!");

        store = new Store();
        store.setFoodCourt(foodCourt);
        store.setStoreName(vm.getStoreName());
        store.setStoreImage(vm.getStoreImage());
        store.setStoreIcon(vm.getStoreIcon());
        store.setStoreNumber(vm.getStoreNumber());
        if (vm.getFoodPerBlock() == 0) {//Admin k nhập
            vm.setFoodPerBlock(Constant.DEFAULT_FOOD_PER_BLOCK);//10
        }
        store.setFoodPerBlock(vm.getFoodPerBlock());
        store.setActive(true);
        store.setRevenue(0);
        store.setStoreDescription(vm.getStoreDescription());

        return mapper.toStoreVM(repository.save(store));
    }

    @Override
    public StoreVM updateStore(StoreVM vm) {
        Store store = repository.findByStoreId(vm.getStoreId());
        if (store == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This store does not exit!");
        }
        store.setStoreName(vm.getStoreName());
        store.setActive(vm.isActive());
        store.setStoreImage(vm.getStoreImage());
        store.setStoreIcon(vm.getStoreIcon());
        store.setStoreNumber(vm.getStoreNumber());
        store.setFoodPerBlock(vm.getFoodPerBlock());
        store.setStoreDescription(vm.getStoreDescription());
        return mapper.toStoreVM(repository.save(store));
    }

    @Override
    public List<StoreVM> getAllStoreByFc(String authorityUsername) {
        User user = userRepository.findByUsername(authorityUsername);
        if (user == null || user.getEmployee() == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Unauthoried!");
        }
        FoodCourt foodCourt = user.getEmployee().getFoodCourt();
        List<Store> storeList = repository.findAllByFoodCourtFcId(foodCourt.getFcId());
        if (storeList == null || storeList.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "List store is empty!");
        }
        return storeList.stream().map(mapper::toStoreVM).collect(Collectors.toList());
    }


    @Override
    public List<StoreVM> findAll() {
        List<Store> stores = repository.findAll();
        if (stores == null || stores.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "List store is empty!");
        }
        return stores.stream().map(mapper::toStoreVM).collect(Collectors.toList());
    }

    @Override
    public List<StoreVMResponse> findAllByFC(Long id) {
        List<Store> stores = repository.findDistinctByActiveTrueAndFoodCourtFcIdAndStoreCategoriesNotNull(id);
        for (Store store : stores) {

            Iterator<Category> categories = store.getStoreCategories().iterator();
            while (categories.hasNext()) {
                Category category = categories.next();
                List<Food> foods = foodRepository.findAllByStoreCategoryCategoryId(category.getCategoryId());
                if (foods.size() == 0) {
                    categories.remove();
                }
            }
        }
        return stores.stream().map(mapper::toStoreVMResponse).collect(Collectors.toList());
    }

    @Override
    public List<AppStoreVM> findAllStore(Long fcId) {
        List<Store> stores = repository.findAllByFcId(fcId);
        if (stores == null || stores.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "List store is empty!");
        }
        List<AppStoreVM> vms = new ArrayList<>();
        for (Store s : stores) {
            int foodCount = foodRepository.countFood(s.getStoreId(), Constant.MEAL);
            int drinkCount = foodRepository.countFood(s.getStoreId(), Constant.DRINK);
            if (foodCount + drinkCount > 0) {
                AppStoreVM vm = new AppStoreVM();
                vm.setFoodCount(foodRepository.countFood(s.getStoreId(), Constant.MEAL));
                vm.setDrinkCount(foodRepository.countFood(s.getStoreId(), Constant.DRINK));
                vm.setStoreVM(mapper.toStoreVM(s));
                vms.add(vm);
            }
        }
        return vms;
    }

    @Override
    public AppStoreVM findStoreById(Long id) {
        Store store = repository.findByStoreId(id);
        if (store == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Store is not exist!");
        }
        AppStoreVM vm = new AppStoreVM();
        vm.setFoodCount(foodRepository.countFood(store.getStoreId(), Constant.MEAL));
        vm.setDrinkCount(foodRepository.countFood(store.getStoreId(), Constant.DRINK));
        vm.setStoreVM(mapper.toStoreVM(store));
        vm.setAppCategoryVMS(
                categoryService.getALLStoreCategory(store.getStoreCategories())
        );
        return vm;
    }

    @Override
    public double getCurrentRevenue(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Not found this user!");
        }
        Store store = user.getEmployee().getStore();
        if (!store.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This store is unactive!");
        }
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Date current = new Date();
        List<OrderDetail> orderDetails = orderDetailRepository
                .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
                        (ORDER_READY, store.getStoreId(), oneDateVM.getDateStart(), current);
        List<OrderDetail> orderDetails2 = orderDetailRepository
                .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
                        (ORDER_REFUNDED, store.getStoreId(), oneDateVM.getDateStart(), current);
        double count = 0;
        for (int i = 0; i < orderDetails.size(); i++) {
            count = count + orderDetails.get(i).getTotalPrice();
        }
        for (int i = 0; i < orderDetails2.size(); i++) {
            count = count - orderDetails.get(i).getTotalPrice();
        }
        return count;

    }

    @Override
    public int countOrderByStatus(String username, String status) {
        int count = 0;
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Not found this user!");
        }
        Store store = user.getEmployee().getStore();
        if (!store.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "This store is unactive!");
        }
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Date current = new Date();
        if (status.equals(ORDER_READY)) {
            List<OrderDetail> orderDetails = orderDetailRepository
                    .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
                            (ORDER_READY, store.getStoreId(), oneDateVM.getDateStart(), current);
            count = orderDetails.size();
        } else {
            List<OrderDetail> orderDetails = orderDetailRepository
                    .findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
                            (ORDER_REFUNDED, store.getStoreId(), oneDateVM.getDateStart(), current);

            count = orderDetails.size();
        }

        return count;
    }

}