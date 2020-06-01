package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "card_id", unique = true)
    private String cardId;

    @Column(name = "status")
    private String status;

    @Column(name = "issue_date")
    private Date issueDate;

    @Column(name = "lock_date")
    private Date lockDate;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cus_id")
    private Customer customer;
}
