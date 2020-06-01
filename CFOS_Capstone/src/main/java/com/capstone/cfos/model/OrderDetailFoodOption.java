package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_detail_food_option")
public class OrderDetailFoodOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity", nullable = true)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "order_detail_id")
    private OrderDetail orderDetail;

    @ManyToOne
    @JoinColumn(name = "food_option_id")
    private FoodOption foodOption;
}
