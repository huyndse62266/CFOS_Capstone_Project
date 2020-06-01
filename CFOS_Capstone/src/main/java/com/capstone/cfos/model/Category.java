package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long categoryId;

    @Column(name = "name")
    private String categoryName;

    @Column(name = "image")
    private String image;

    @Column(name = "active")
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category category;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Category> categories;

    @ManyToOne
    @JoinColumn(name = "fc_id")
    private FoodCourt foodCourt;

    @ManyToOne
    @JoinColumn(name = "store_id")
    private Store store;

    @OneToMany(mappedBy = "fcCategory", cascade = CascadeType.ALL)
    private List<Food> foods;

    @OneToMany(mappedBy = "storeCategory", cascade = CascadeType.ALL)
    private List<Food> storeFoods;

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                ", image='" + image + '\'' +
                ", active=" + active +
                ", category=" + category +
                ", categories=" + categories +
                ", foodCourt=" + foodCourt +
                ", store=" + store +
                ", foods=" + foods +
                ", storeFoods=" + storeFoods +
                '}';
    }
}
