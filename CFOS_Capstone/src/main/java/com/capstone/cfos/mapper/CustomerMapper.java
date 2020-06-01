package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.CustomerVM;
import com.capstone.cfos.model.Customer;
import com.capstone.cfos.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN,
        uses = {TransactionMapper.class, WalletMapper.class})
public interface CustomerMapper {
    @Mappings({
            @Mapping(target = "customerId", source = "user.customer.customerId"),
            @Mapping(target = "cardId", source = "user.customer.card.cardId"),
            @Mapping(target = "point", source = "user.customer.point"),
            @Mapping(target = "active", source = "user.customer.active"),
            @Mapping(target = "gender",source = "gender"),
            @Mapping(target = "walletAmount",source = "user.customer.wallet.amount")
    })
    CustomerVM toCustomerVM(User user);
}
