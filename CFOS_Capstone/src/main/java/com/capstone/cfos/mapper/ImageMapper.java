package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.BannerVM;
import com.capstone.cfos.controller.vm.ImageVM;
import com.capstone.cfos.model.Image;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ImageMapper {
    @Mappings({
            @Mapping(target = "foodId",source ="food.foodId" )
    })
    ImageVM toImageVM(Image image);

    @Mappings({
            @Mapping(target = "food.foodId",source ="foodId" )
    })
    Image toImage(ImageVM imageVM);


}
