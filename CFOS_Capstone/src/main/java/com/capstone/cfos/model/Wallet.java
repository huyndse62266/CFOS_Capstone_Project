package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Entity
@Table(name = "wallet")
public class Wallet{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long walletId;

    @Column(name = "amount")
    private double amount;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "cus_id", unique = true)
    private Customer customer;

}
