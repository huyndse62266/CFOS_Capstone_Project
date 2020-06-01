package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class SchedulerVM {

    private Long id;

    private boolean monday;

    private boolean tuesday;

    private boolean wednesday;

    private boolean thursday;

    private boolean friday;

    private boolean saturday;

    private boolean sunday;

    private long orderId;

    private String schedulerTime;
}
