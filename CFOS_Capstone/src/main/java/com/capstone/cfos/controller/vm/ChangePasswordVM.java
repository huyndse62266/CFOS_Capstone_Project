package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class ChangePasswordVM {

    private Long id;

    private String username;
    private String oldPassword;

    private String newPassword;
}
