package com.capstone.cfos.controller.vm;

import lombok.Data;
import lombok.Getter;

import java.util.Date;

@Data
@Getter
public class EmpVM {

    private Long id;

    private String username;

    private String fullname;

    private String address;

    private Date birthday;

    private String phone;

    private String email;

    private String empId;

    private Date startDate;

    private boolean active;

    private String cardId;

    private Long roleId;

    private Long storeId;

    private String storeName;

    private Long fcId;

    private double cashEndDay;

}
