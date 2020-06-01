package com.capstone.cfos.controller.vm;

import com.capstone.cfos.model.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CustomerVM {

    private Long id;//user Id

    private String username;

    private String fullname;

    private String address;

    private Date birthday;

    private String phone;

    private String email;

    private String gender;

    private String customerId;

    private String cardId;

    private String cardStatus;

    private double point;

    private boolean active;

    private double walletAmount;
}
