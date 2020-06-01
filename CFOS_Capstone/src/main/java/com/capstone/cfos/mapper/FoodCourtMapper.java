package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.FoodCourtVM;
import com.capstone.cfos.model.FoodCourt;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface FoodCourtMapper {
    FoodCourtVM toFoodCourtVM(FoodCourt foodCourt);
}
