package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.Date;

@Data
public class FeedBackVMResponse {

    private Long fbId;

    private String fbContent;

    private Date fbDate;

    private double rate;
}

