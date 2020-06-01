package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.FoodCourtMapper;
import com.capstone.cfos.mapper.ImageMapper;
import com.capstone.cfos.model.*;
import com.capstone.cfos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.capstone.cfos.constants.Constant.CASHIER;
import static com.capstone.cfos.constants.Constant.ORDER_READY;
import static com.capstone.cfos.constants.Constant.SUCCESS;

@Service
public class FoodCourtServiceImp implements FoodCourtService {

    @Autowired
    private FoodCourtRepository repository;

    @Autowired
    private FoodCourtMapper foodCourtMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private StoreService storeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private ImageMapper imageMapper;
    @Autowired
    private StatisticService statisticService;

    @Override
    public FoodCourtVM getFoodCourt(Long fcId) {
        FoodCourt foodCourt = repository.findByFcId(fcId);
        if (foodCourt == null) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Food Court này không tồn tại");
        return foodCourtMapper.toFoodCourtVM(foodCourt);
    }

    @Override
    public List<FoodCourtVM> getAllFoodCourt() {
        List<FoodCourt> foodCourts = repository.findAll();
        if (foodCourts == null || foodCourts.isEmpty()) throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Không tìm thấy bất cứ food court nào");
        return foodCourts.stream().map(foodCourtMapper::toFoodCourtVM).collect(Collectors.toList());
    }

    @Override
    public FoodCourtVM createFoodCourt(FoodCourtVM vm) {
        FoodCourt foodCourt = repository.findByFcNameAndLocation(vm.getFcName(), vm.getFcLocation());
        if (foodCourt != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Food Court này đã tồn tại");
        }
        FoodCourt fc = new FoodCourt();
        fc.setFcName(vm.getFcName());
        fc.setFcLocation(vm.getFcLocation());
        fc.setCategories(getCategories(fc));
        fc = repository.save(fc);
        return foodCourtMapper.toFoodCourtVM(repository.save(fc));
    }

    private List<Category> getCategories(FoodCourt foodCourt) {
        List<Category> categories = new ArrayList<>();
        for (String categoryName : Constant.FC_CATEGORY) {
            Category category = new Category();
            category.setCategoryName(categoryName);
            category.setActive(true);
            category.setFoodCourt(foodCourt);
            categories.add(category);
        }
        return categories;
    }

    @Override
    public FoodCourtVM updateFoodCourt(FoodCourtVM vm) {
        FoodCourt foodCourt = repository.findByFcId(vm.getFcId());
        if (foodCourt == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Food court này không tồn tại!");
        }
        foodCourt.setFcName(vm.getFcName());
        foodCourt.setFcLocation(vm.getFcLocation());
        return foodCourtMapper.toFoodCourtVM(repository.save(foodCourt));
    }
    @Override
    public FoodCourt authorityFoodCourt(String authoryUsername){
        User user = userRepository.findByUsername(authoryUsername);
        if (user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Tài khoản không tồn tại!");
        }
        FoodCourt foodCourt = user.getEmployee().getFoodCourt();
        if (foodCourt == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Food court này không tồn tại!");
        }
        return  foodCourt;
    }
    @Override
    public int countMember(String authoryUsername){
        FoodCourt foodCourt = authorityFoodCourt(authoryUsername);
        int count = customerRepository.countAllByActiveTrue();
        return count;
    }

    @Override
    public  double countMemberDepositInDay(String authoryUsername){
        double count =0;
        FoodCourt foodCourt = authorityFoodCourt(authoryUsername);
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        Date currentDate = new Date();
        List<Transaction> transactions = transactionRepository
                .findAllByStatusAndEmployeeFoodCourtFcIdAndTranDateBetween
                        (Constant.TRANSACTION_DEPOSIT,foodCourt.getFcId(),oneDateVM.getDateStart(),currentDate);
        for (Transaction t:transactions
             ) {
            count = count + t.getTranTotal();
        }
        return count;
    }
    @Override
    public double countBalanceToday(String authoryUsername){
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        FoodCourt foodCourt = authorityFoodCourt(authoryUsername);
        List<Store> stores = storeRepository.findAllByFcId(foodCourt.getFcId());
        int countStore = stores.size();
        double ressult = 0;
        for (int i = 0; i < countStore; i++) {
            ressult = ressult + stores.get(i).getRevenue();
        }
        return ressult;
    }
    @Override
    public String createBanner(String authoryUsername, BannerVM bannerVM){
        FoodCourt foodCourt = authorityFoodCourt(authoryUsername);

        List<Image> images = foodCourt.getImages();
        if(images != null || !images.isEmpty() || images.size() ==0){
            imageRepository.deleteInBatch(images);
        }
        images = new ArrayList<>();
        for (int i = 0; i < bannerVM.getImage().size(); i++) {
            Image image = new Image();
            image.setImage(bannerVM.getImage().get(i).getImage());
            image.setFoodCourt(foodCourt);
            images.add(image);
        }
        imageRepository.saveAll(images);
        return SUCCESS;
    }
    @Override
    public BannerVM getBanner(long fcId,String username){
        if(fcId == 0){
            FoodCourt foodCourt = authorityFoodCourt(username);
            fcId = foodCourt.getFcId();
        }
        List<ImageVM> imageVMS = imageRepository.findAllByFoodCourtFcId(fcId)
                .stream().map(imageMapper::toImageVM).collect(Collectors.toList());
        BannerVM bannerVM = new BannerVM();
        bannerVM.setImage(imageVMS);
        return bannerVM;
    }
    @Override
    public List<EmpVM> getCashEndDay(String username){
        List<EmpVM> empVMS = new ArrayList<>();
        FoodCourt foodCourt = authorityFoodCourt(username);
        List<Employee> result = employeeRepository.findAllByActiveTrueAndFoodCourtFcIdAndRoleRoleName
                (foodCourt.getFcId(),CASHIER);
        for (int i = 0; i < result.size() ; i++) {
            EmpVM empVM = new EmpVM();
            CashierReportVM cashierReportVM = statisticService
                    .getTotalCashToday(result.get(i).getUser().getUsername());
            empVM.setFullname(result.get(i).getUser().getFullname());
            empVM.setEmpId(result.get(i).getEmpId());
            empVM.setCashEndDay(cashierReportVM.getTotalCash());
            empVMS.add(empVM);
        }
        return empVMS;
    }


}
