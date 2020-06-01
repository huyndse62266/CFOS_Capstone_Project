package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.CategoryVM;
import com.capstone.cfos.model.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {TransactionMapper.class, WalletMapper.class})
public interface CategoryMapper {
    @Mappings({
            @Mapping(target = "parentId", expression = "java(category.getCategory() != null ? category.getCategory().getCategoryId() : null)")
    })
    CategoryVM toCategoryVM(Category category);
}
