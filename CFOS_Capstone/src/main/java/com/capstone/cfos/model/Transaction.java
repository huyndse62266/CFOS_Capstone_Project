package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "transaction")
public class Transaction {

    public static final String PROP_TRANS_DATE = "tranDate";


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long tranId;

    @Column(name = "description")
    private String tranDescription;

    @Column(name = "total")
    private double tranTotal;

    @Column(name = "status")
    private String status;

    @Column(name = "date")
    private Date tranDate;

    @Column(name = "date_end")
    private Date tranDateEnd;

    @ManyToOne
    @JoinColumn(name = "cus_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "emp_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "fc_id")
    private FoodCourt foodCourt;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;


}
