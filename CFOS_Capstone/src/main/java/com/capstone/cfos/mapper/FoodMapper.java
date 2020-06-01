package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.FeedBackVMResponse;
import com.capstone.cfos.controller.vm.FoodVM;
import com.capstone.cfos.controller.vm.FoodVMDetailResponse;
import com.capstone.cfos.controller.vm.FoodVMListResponse;
import com.capstone.cfos.model.FeedBack;
import com.capstone.cfos.model.Food;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {FeedbackMapper.class,ImageMapper.class,FoodOptionMapper.class})
public interface FoodMapper {

    @Mappings({
            @Mapping(target = "storeCategoryId", expression="java(food.getStoreCategory() != null ? food.getStoreCategory().getCategoryId() : null)"),
            @Mapping(target = "fcSubCategoryId", expression="java(food.getFcCategory() != null ? food.getFcCategory().getCategoryId() : null)"),
            @Mapping(target = "imageVMS",source = "images"),

    })
    FoodVM toFoodVM(Food food);

    @Mappings({
            @Mapping(target = "storeCategoryId", expression="java(food.getStoreCategory() != null ? food.getStoreCategory().getCategoryId() : null)"),
            @Mapping(target = "fcSubCategoryId", expression="java(food.getFcCategory() != null ? food.getFcCategory().getCategoryId() : null)"),
    })
    FoodVMListResponse toFoodVMListResponse(Food food);

    @Mappings({
            @Mapping(target = "storeCategoryId", expression="java(food.getStoreCategory() != null ? food.getStoreCategory().getCategoryId() : null)"),
            @Mapping(target = "fcSubCategoryId", expression="java(food.getFcCategory() != null ? food.getFcCategory().getCategoryId() : null)"),
            @Mapping(target = "feedbackVMS", expression="java(food.getFeedBacks() != null ? toFeedbackVMResponses(food.getFeedBacks()) : null)"),
            @Mapping(target = "imageVMS",source = "images")
    })
    FoodVMDetailResponse toFoodVMDetailResponse(Food food);

    List<FeedBackVMResponse> toFeedbackVMResponses(List<FeedBack> feedBacks);
}
