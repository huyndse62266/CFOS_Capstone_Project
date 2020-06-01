package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class CashierReportVM {
    private double depositTotal;
    private double guestOrderedTotal;
    private double guestRollbackTotal;
    private double totalCash;
}
