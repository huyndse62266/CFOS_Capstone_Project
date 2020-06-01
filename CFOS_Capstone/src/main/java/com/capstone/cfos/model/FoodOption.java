package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "food_option")
public class FoodOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long foId;

    @Column(name = "name")
    private String foName;

    @Column(name = "sub_name")
    private String subName;

    @Column(name = "is_count")
    private boolean isCount;

    @Column(name = "is_select_more")
    private boolean isSelectMore;

    @Column(name = "is_default")
    private boolean isDefault;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "foodOption", cascade = CascadeType.ALL)
    private List<FoodOptionFood> foodOptionFoods;

    @OneToMany(mappedBy = "foodOption", cascade = CascadeType.ALL)
    private List<OrderDetailFoodOption> orderDetailFoodOptions;

    @Column(name = "option_price")
    private double optionPrice;

    @ManyToOne
    @JoinColumn(name = "type")
    private FoodOption foodOption;

    @OneToMany(mappedBy = "foodOption", cascade = CascadeType.ALL)
    private List<FoodOption> foodOptions;


    @Override
    public String toString() {
        return "FoodOption{" +
                "foId=" + foId +
                ", foName='" + foName + '\'' +
                ", isCount=" + isCount +
                ", isSelectMore=" + isSelectMore +
                ", isDefault=" + isDefault +
                ", store=" + store +
                ", foodOptionFoods=" + foodOptionFoods +
                ", orderDetailFoodOptions=" + orderDetailFoodOptions +
                ", optionPrice=" + optionPrice +
                ", foodOption=" + foodOption +
                ", foodOptions=" + foodOptions +
                '}';
    }
}
