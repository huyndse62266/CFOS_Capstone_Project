package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.StatisticVM;
import com.capstone.cfos.model.Statistic;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface StatisticMapper {
//    @Mappings({
//            @Mapping(source = "store",target = "storeVM")
//    })
    StatisticVM toStatisticVm (Statistic statistic);
}
