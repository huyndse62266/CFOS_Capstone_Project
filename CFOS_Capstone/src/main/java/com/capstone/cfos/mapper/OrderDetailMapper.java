package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.OrderDetailReponseVM;
import com.capstone.cfos.controller.vm.OrderDetailVM;
import com.capstone.cfos.model.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {StoreMapper.class, FoodMapper.class, OrderDetailFoodOptionMapper.class})
public interface OrderDetailMapper {
    @Mappings({
            @Mapping(target = "storeId", source = "store.storeId"),
            @Mapping(target = "foodId", source = "food.foodId"),
            @Mapping(target = "orderId", source = "order.orderId"),
    })
    OrderDetailVM toOrderDetailVM(OrderDetail orderDetail);

    @Mappings({
            @Mapping(target = "store.storeId", source = "storeId"),
            @Mapping(target = "food.foodId", source = "foodId"),
            @Mapping(target = "order.orderId", source = "orderId")
    })
    OrderDetail toOrderDetail(OrderDetailVM orderDetailVM);

    @Mappings({

            @Mapping(target = "orderNumber", source = "order.orderNumber"),
            @Mapping(target = "foodVM", source = "food"),
            @Mapping(target = "orderId", source = "order.orderId"),
            @Mapping(target = "storeVM", source = "store"),
            @Mapping(target = "scheduleTime", expression = "java(orderDetail.getBlock()!=null ? orderDetail.getBlock().getBlockStart().toString(): null)")
    })
    OrderDetailReponseVM toOrderDetailReponseVM(OrderDetail orderDetail);
}


