package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "statistic")
public class Statistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "day")
    private Date day;

    @Column(name = "total")
    private double total;

    @Column(name = "total_items")
    private int item;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

}
