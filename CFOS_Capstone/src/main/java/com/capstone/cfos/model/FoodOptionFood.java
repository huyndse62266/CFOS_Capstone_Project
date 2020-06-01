package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "food_option_food")
public class FoodOptionFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @ManyToOne
    @JoinColumn(name = "food_option_id")
    private FoodOption foodOption;
}
