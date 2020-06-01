package com.capstone.cfos.model;

import lombok.Data;
import org.hibernate.search.annotations.Field;
import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.TermVector;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "food")
@Indexed
public class Food {

    public static final String PROP_FOODNAME = "foodName";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long foodId;

    @Column(name = "name")
    @Field(termVector = TermVector.YES)
    private String foodName;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<Image> images;

    @Column(name = "description")
    private String foodDescription;

    @Column(name = "unit")
    private String foodUnit;

    @Column(name = "count")
    private int count;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "active")
    private boolean active;

    @Column(name = "rate")
    private double rate;

    @Column(name = "promotion")
    private double promotion;

    @ManyToOne
    @JoinColumn(name = "store_category_id")
    private Category storeCategory;

    @ManyToOne
    @JoinColumn(name = "fc_category_id")
    private Category fcCategory;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<FoodOptionFood> foodOptionFoods;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL)
    private List<FeedBack> feedBacks;

    public Long getCategoryId() {
        return this.storeCategory.getCategoryId();
    }

    @Override
    public String toString() {
        return "Food{" +
                "foodId=" + foodId +
                ", foodName='" + foodName + '\'' +
                ", images=" + images +
                ", foodDescription='" + foodDescription + '\'' +
                ", foodUnit='" + foodUnit + '\'' +
                ", count=" + count +
                ", price=" + price +
                ", quantity=" + quantity +
                ", active=" + active +
                ", rate=" + rate +
                ", promotion=" + promotion +
                ", storeCategory=" + storeCategory +
                ", fcCategory=" + fcCategory +
                ", foodOptionFoods=" + foodOptionFoods +
                ", orderDetails=" + orderDetails +
                ", feedBacks=" + feedBacks +
                '}';
    }
}
