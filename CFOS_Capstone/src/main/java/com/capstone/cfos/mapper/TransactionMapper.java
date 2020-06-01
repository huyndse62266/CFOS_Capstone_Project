package com.capstone.cfos.mapper;

import com.capstone.cfos.controller.vm.FcStroreTransactionVM;
import com.capstone.cfos.controller.vm.TransactionVM;
import com.capstone.cfos.model.Transaction;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.WARN)
public interface TransactionMapper {
    @Mappings({
            @Mapping(target = "customerId", expression = "java(transaction.getCustomer() != null ? transaction.getCustomer().getCustomerId() : null)"),
            @Mapping(target = "empId", expression = "java(transaction.getEmployee() != null ? transaction.getEmployee().getEmpId() : null)"),
            @Mapping(target = "orderId", expression = "java(transaction.getOrder() != null ? transaction.getOrder().getOrderId() : null)"),
            @Mapping(target = "orderNumber",source = "order.orderNumber")
    })
    TransactionVM toTransactionVm(Transaction transaction);
//    @Mappings({
//            @Mapping(target = "order.orderId",source = "orderId"),
//            @Mapping(target = "customer.customerId",source = "customerId"),
////            @Mapping(target = "employee.empId",source = "empId"),
//            @Mapping(target = "employee.empId",expression = "java(transactionVM.getEmpId() != null ? transactionVM.getEmpId() : null)")
//    })
//    Transaction toTransaction(TransactionVM transaction);
    @Mappings({
            @Mapping(target = "fcId",source = "foodCourt.fcId"),
            @Mapping(target = "storeId",source = "store.storeId")
    })
    FcStroreTransactionVM toFcStroreTransactionVm(Transaction transaction);
}
