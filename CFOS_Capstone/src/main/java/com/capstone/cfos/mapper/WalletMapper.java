package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.WalletVM;
import com.capstone.cfos.model.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN, uses = {CustomerMapper.class})
public interface WalletMapper {
  WalletVM toWalletVM (Wallet wallet);

}
