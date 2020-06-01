package com.capstone.cfos.model;

import lombok.Data;
import org.springframework.data.jpa.repository.Temporal;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "order_food")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long orderId;

    @Column(name = "order_number")
    private int orderNumber;

    @Column(name = "total_order")
    private double totalOrder;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "status")
    private String status;

    @Column(name = "original_price")
    private double originalPrice;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @ManyToOne
    @JoinColumn(name = "cus_id")
    private Customer customer;

    @Column(name = "schedule_time")
    private String scheduleTime;

    @OneToOne(mappedBy = "order", cascade = CascadeType.ALL)
    private Scheduler scheduler;
}
