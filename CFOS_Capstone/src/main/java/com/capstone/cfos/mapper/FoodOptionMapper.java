package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.FoodOptionVM;
import com.capstone.cfos.model.FoodOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface FoodOptionMapper {
    @Mappings({
            @Mapping(target = "storeId", source = "store.storeId"),
            @Mapping(target = "default", source = "default"),
            @Mapping(target = "parentName", expression = "java(foodOption.getFoodOption() != null ? foodOption.getFoodOption().getFoName() : null)")
    })
    FoodOptionVM toFoodOptionVM(FoodOption foodOption);

    @Mappings({
            @Mapping(target = "store.storeId", source = "storeId")
    })
    FoodOption toFoodOption(FoodOptionVM foodOptionVM);


}
