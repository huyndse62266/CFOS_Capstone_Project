package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.controller.vm.FeedbackVM;
import com.capstone.cfos.controller.vm.OneDateVM;
import com.capstone.cfos.mapper.CustomerMapper;
import com.capstone.cfos.model.Customer;
import com.capstone.cfos.model.FeedBack;
import com.capstone.cfos.mapper.FeedbackMapper;

import com.capstone.cfos.model.Food;
import com.capstone.cfos.model.Store;
import com.capstone.cfos.repository.CustomerRepository;
import com.capstone.cfos.repository.FeedbackRepository;
import com.capstone.cfos.repository.FoodRepository;
import com.capstone.cfos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImp implements FeedbackService{
    @Autowired
    FeedbackRepository repository;

    @Autowired
    FeedbackMapper feedbackMapper;

    @Autowired
    OrderService orderService;

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    UserRepository userRepository;
    @Autowired
    FoodRepository foodRepository;
    @Autowired
    CustomerRepository customerRepository;

    @Override
    public FeedbackVM postFeedback(FeedbackVM vm,String usernamecus) {
        FeedBack feedback = new FeedBack();
        if(usernamecus != null){
            String customerId = customerRepository.findByUserUsername(usernamecus).getCustomerId();
            vm.setCustomerId(customerId);
        }
        Food food = foodRepository.findByFoodId(vm.getFoodId());
        Customer customer = new Customer();
        if(vm.getCustomerId() != null){
             customer = customerRepository.findByCustomerId(vm.getCustomerId());

        }
        if(customer == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Khách hàng không tồn tại");
        }
        if(isTodayCustomerFeedBack(vm.getCustomerId(),vm.getFoodId())){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Hôm nay bạn đã đánh giá món ăn này");
        }
        if(orderService.isCustomerOrderedFood(vm.getCustomerId(),vm.getFoodId())){
            long countFeedbackOfFood = repository.countByFoodFoodId(food.getFoodId());
            double foodRate = food.getRate();
            double updateRate = ((foodRate*countFeedbackOfFood) + vm.getRate())/(countFeedbackOfFood+1);
            food.setRate((double) Math.round(updateRate * 10) / 10);
            foodRepository.save(food);
            feedback.setFood(food);
            feedback.setRate(vm.getRate());
            feedback.setCustomer(customer);
            feedback.setFbContent(vm.getFbContent());
            feedback.setFbDate(new Date());
            repository.save(feedback);
            return feedbackMapper.toFeedbackVM(feedback);
        }else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Bạn cần đặt món ăn này để được đánh giá");
        }
    }

    private boolean isTodayCustomerFeedBack(String customerId,long foodId){
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        FeedBack feedBack = repository.findByCustomerCustomerIdAndFoodFoodIdAndFbDateBetween
                (customerId,foodId,oneDateVM.getDateStart(),oneDateVM.getDateEnd());
        if(feedBack != null) return  true;
        return false;
    }

    @Override
    public Page<FeedbackVM> getAllFeedbackByStoreId(Pageable pageable,Long strodeId){
        Page<FeedBack> vms = repository.findAllByFoodStoreCategoryStoreStoreId(pageable,strodeId);

        if(vms == null){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Không tìm thấy người dùng");
        }
        return vms.map(feedbackMapper::toFeedbackVM);

    }
    @Override
    public List<FeedbackVM> getAllFeedbackCustomer(String usernameCus){
        String customerId = customerMapper.toCustomerVM(userRepository.findByUsername(usernameCus)).getCustomerId();
        List<FeedBack> feedBacks = repository.findAllByCustomerCustomerIdOrderByFbDateDesc(customerId);

        return  feedBacks.stream().map(feedbackMapper::toFeedbackVM).collect(Collectors.toList());
    }


}
