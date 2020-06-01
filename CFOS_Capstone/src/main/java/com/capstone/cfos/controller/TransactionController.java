package com.capstone.cfos.controller;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.FcPayableVM;
import com.capstone.cfos.controller.vm.FcStroreTransactionVM;
import com.capstone.cfos.controller.vm.TransactionVM;
import com.capstone.cfos.model.Transaction;
import com.capstone.cfos.repository.TransactionRepository;
import com.capstone.cfos.repository.UserRepository;
import com.capstone.cfos.service.TransactionService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/api")
public class TransactionController {

    private static final Logger LOGGER = LoggerFactory.getLogger(TransactionController.class);
    @Autowired
    TransactionService transactionService;
    @Autowired
    TransactionRepository transactionRepository;
    @Autowired
    UserRepository userRepository;

    //Done 8-6-2019
    @ApiOperation(value = "Get all transaction of customer")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid Param"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/transaction/customer", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TransactionVM>> getTransactionCustomer(HttpServletRequest request) {
        String usernameCus = Ultilities.getUsername(request);
        List<TransactionVM> transactionVM = transactionService.getAllTransaction(usernameCus);
        return new ResponseEntity<List<TransactionVM>>(transactionVM, HttpStatus.OK);
    }

    @ApiOperation(value = "Get  transaction by transaction Id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid Param"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/transaction", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TransactionVM> getTransactionById(@RequestParam(name = "tranId") Long tranId) {
        TransactionVM transactionVM = transactionService.getTransactionById(tranId);

        return new ResponseEntity<TransactionVM>(transactionVM, HttpStatus.OK);
    }

    @ApiOperation(value = "Get list transaction by transaction status")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Successful"),
            @ApiResponse(code = 400, message = "Invalid Param"),
            @ApiResponse(code = 500, message = "Internal server error")})
    @GetMapping(value = "/transaction-status", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Page<TransactionVM>> getTransactionByStatus(
            @RequestParam(name = "page", required = false, defaultValue = "0") Integer page,
            @RequestParam(name = "size", required = false, defaultValue = "5") Integer size,
            @RequestParam(name = "sort", required = false, defaultValue = "DESC") String sort,
            @RequestParam(name = "trandId", required = false, defaultValue = "0") long tranId,
            @RequestParam(name = "status") String status
            , HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        Sort sortable = null;
        if (sort.equals("ASC")) {
            sortable = Sort.by(Transaction.PROP_TRANS_DATE).ascending();
        }
        if (sort.equals("DESC")) {
            sortable = Sort.by(Transaction.PROP_TRANS_DATE).descending();
        }
        Pageable pageable = PageRequest.of(page, size, sortable);
        Page<TransactionVM> vms = transactionService.getAllTransactionByStatus(pageable, status, authorityUsername, tranId);

        return new ResponseEntity<Page<TransactionVM>>(vms, HttpStatus.OK);
    }

    @PostMapping(value = "/deposit")
    public ResponseEntity<TransactionVM> deposit(@RequestParam(name = "password") String password, @RequestBody TransactionVM vm, HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        vm = transactionService.deposit(vm, authorityUsername, password);
        LOGGER.info("deposit: " + vm);
        return new ResponseEntity<TransactionVM>(vm, HttpStatus.OK);
    }

    @GetMapping(value = "/countNoti")
    public ResponseEntity<Integer> countNoti(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        String customerId = userRepository.findByUsername(authorityUsername).getCustomer().getCustomerId();
        int countTran = transactionRepository.countByTranDescriptionAndCustomerCustomerId
                (Constant.TRANSACTION_UNREAD, customerId);
        return new ResponseEntity<Integer>(countTran, HttpStatus.OK);
    }

    @PutMapping(value = "/changeNoti")
    public ResponseEntity<String> changeNoti(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        String customerId = null;
        if (authorityUsername != null) {
            customerId = userRepository.findByUsername(authorityUsername).getCustomer().getCustomerId();
        }
        String result = transactionService.changeUnreadTransaction(customerId);

        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @PutMapping(value = "/detele-noti")
    public ResponseEntity<String> deleteNoti(HttpServletRequest request, @RequestParam(name = "tranId") long transactionId) {
        String authorityUsername = Ultilities.getUsername(request);
        String result = transactionService.deleteNoti(authorityUsername, transactionId);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @GetMapping(value = "/store-receivable")
    public ResponseEntity<Double> getStoreReceivable(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        double result = transactionService.getStoreReceivable(authorityUsername);
        return new ResponseEntity<Double>(result, HttpStatus.OK);

    }

    @GetMapping(value = "/store-receivable-history")
    public ResponseEntity<List<FcStroreTransactionVM>> getStoreReceivableHistory(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        List<FcStroreTransactionVM> result = transactionService.getStoreReceivableHistory(authorityUsername);
        return new ResponseEntity<List<FcStroreTransactionVM>>(result, HttpStatus.OK);

    }

    @GetMapping(value = "/fc-payable")
    public ResponseEntity<List<FcPayableVM>> getFcPayable(HttpServletRequest request) {
        String authorityUsername = Ultilities.getUsername(request);
        List<FcPayableVM> result = transactionService.getFcPayable(authorityUsername);
        return new ResponseEntity<List<FcPayableVM>>(result, HttpStatus.OK);

    }

    @PostMapping(value = "/fc-payable")
    public ResponseEntity<String> fcPostTransaction(HttpServletRequest request, @RequestBody FcStroreTransactionVM fcStroreTransactionVM) {
        String authorityUsername = Ultilities.getUsername(request);
        String result = transactionService.fcPostTransaction(authorityUsername, fcStroreTransactionVM);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @PostMapping(value = "/fc-cancel-transaction")
    public ResponseEntity<String> fcCancelTransaction(HttpServletRequest request, @RequestParam(name = "tranId") long tranId) {
        String authorityUsername = Ultilities.getUsername(request);
        String result = transactionService.fcCancelTransaction(authorityUsername, tranId);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }

    @PostMapping(value = "/store-confirm-transaction")
    public ResponseEntity<String> storeConfirmTrans(HttpServletRequest request, @RequestParam(name = "tranId") long tranId) {
        String authorityUsername = Ultilities.getUsername(request);
        String result = transactionService.storeConfirmTrans(authorityUsername, tranId);
        return new ResponseEntity<String>(result, HttpStatus.OK);
    }
}
