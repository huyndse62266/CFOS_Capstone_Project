package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.OrderDetailFoodOptionReponseVM;
import com.capstone.cfos.controller.vm.OrderDetailFoodOptionVM;
import com.capstone.cfos.model.OrderDetailFoodOption;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {OrderDetailMapper.class})
public interface OrderDetailFoodOptionMapper {
    @Mappings({
            @Mapping(target = "orderDetailId", source = "orderDetail.orderDetailId"),
            @Mapping(target = "foId", source = "foodOption.foId")
    })
    OrderDetailFoodOptionVM toOrderDetailFoodOptionVM(OrderDetailFoodOption orderDetailFoodOption);

    @Mappings({
            @Mapping(target = "foId", source = "foodOption.foId"),
            @Mapping(target = "foName", source = "foodOption.foName"),
            @Mapping(target = "parentName",
                    expression = "java(orderDetailFoodOption.getFoodOption() != null && " +
                            "orderDetailFoodOption.getFoodOption().getFoodOption() != null ? " +
                            "orderDetailFoodOption.getFoodOption().getFoodOption().getFoName() : null)")

    })
    OrderDetailFoodOptionReponseVM toOrderDetailFoodOptionReponseVM(OrderDetailFoodOption orderDetailFoodOption);
}

