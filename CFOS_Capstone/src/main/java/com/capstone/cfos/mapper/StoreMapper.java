package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.CategoryVM;
import com.capstone.cfos.controller.vm.StoreVM;
import com.capstone.cfos.controller.vm.StoreVMResponse;
import com.capstone.cfos.model.Category;
import com.capstone.cfos.model.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface StoreMapper {
    @Mappings({
            @Mapping(target = "fcId",source ="foodCourt.fcId" )
    })
    StoreVM toStoreVM(Store store);

    List<CategoryVM> toCategoryVM(List<Category> category);


    @Mappings({
            @Mapping(target = "categoryVMList", expression = "java(toCategoryVM(store.getStoreCategories()))")
    })
    StoreVMResponse toStoreVMResponse(Store store);

}
