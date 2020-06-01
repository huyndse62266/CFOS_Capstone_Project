package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "food_court")
public class FoodCourt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long fcId;

    @Column(name = "name")
    private String fcName;

    @Column(name = "location")
    private String fcLocation;

    @OneToMany(mappedBy = "foodCourt", cascade = CascadeType.ALL)
    private List<Employee> employees;

    @OneToMany(mappedBy = "foodCourt", cascade = CascadeType.ALL)
    private List<Store> stores;

    @OneToMany(mappedBy = "foodCourt", cascade = CascadeType.ALL)
    private List<Category> categories;

    @OneToMany(mappedBy = "foodCourt", cascade = CascadeType.ALL)
    private List<Image> images;

    @OneToMany(mappedBy = "foodCourt", cascade = CascadeType.ALL)
    private List<Transaction> transactions;

}
