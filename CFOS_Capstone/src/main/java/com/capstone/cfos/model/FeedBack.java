package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "feedback")
public class FeedBack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long fbId;

    @Column(name = "content")
    private String fbContent;

    @Column(name = "date")
    private Date fbDate;

    @Column(name = "rate")
    private double rate;

    @ManyToOne
    @JoinColumn(name = "cus_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "food_id")
    private Food food;

}
