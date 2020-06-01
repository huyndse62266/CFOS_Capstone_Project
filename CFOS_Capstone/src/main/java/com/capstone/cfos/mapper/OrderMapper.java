package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.OrderVM;
import com.capstone.cfos.controller.vm.OrderVMResponse;
import com.capstone.cfos.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
uses = {OrderDetailMapper.class})
public interface OrderMapper {
    @Mappings({
            @Mapping(target = "customerId",source = "customer.customerId")
    })

    OrderVM toOrderVM(Order order);

    @Mappings({
            @Mapping(target = "customerId",source = "customer.customerId"),
            @Mapping(target = "scheduleTime",source = "scheduleTime")
    })
    OrderVMResponse toOrderVMResponse(Order order);
}
