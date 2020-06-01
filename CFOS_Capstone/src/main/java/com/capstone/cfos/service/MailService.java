package com.capstone.cfos.service;

import com.capstone.cfos.model.User;

import javax.servlet.http.HttpServletRequest;

public interface MailService {

    void sendMail(User user, HttpServletRequest request, String password);
}
