package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long storeId;

    @Column(name = "name")
    private String storeName;

    @Column(name = "description")
    private String storeDescription;

    @Column(name = "active")
    private boolean active;

    @Column(name = "image")
    private String storeImage;

    @Column(name = "icon")
    private String storeIcon;

    @Column(name = "number")
    private int storeNumber;

    @Column(name = "revenue")
    private double revenue;

    @Column(name = "food_per_block")
    private int foodPerBlock;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fc_id")
    private FoodCourt foodCourt;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Employee> employees;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Category> storeCategories;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Statistic> dayStatistics;

    @OneToMany(mappedBy = "store", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

}
