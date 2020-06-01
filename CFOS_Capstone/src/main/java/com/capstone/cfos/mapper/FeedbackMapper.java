package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.FeedBackVMResponse;
import com.capstone.cfos.controller.vm.FeedbackVM;
import com.capstone.cfos.model.FeedBack;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
uses = {FoodMapper.class,StoreMapper.class})
public interface FeedbackMapper {
    @Mappings({
            @Mapping(target = "foodVM",source ="food" ),
            @Mapping(target = "customerId",source ="customer.customerId" ),
            @Mapping(target = "storeVM",source = "food.storeCategory.store"),
            @Mapping(target = "foodId",source = "food.foodId")
    })
    FeedbackVM toFeedbackVM(FeedBack feedBack);



    FeedBackVMResponse toFeedbackVMResponse(FeedBack feedBack);
}


