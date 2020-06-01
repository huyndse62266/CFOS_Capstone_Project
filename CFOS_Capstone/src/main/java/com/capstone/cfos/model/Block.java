package com.capstone.cfos.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.util.Deque;
import java.util.List;

@Data
@Entity
@Table(name = "block")
public class Block {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long blockId;

    @Column(name = "block_start")
    private Time blockStart;

    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails;

    @Column(name="deque",length = 800)
    private String deque;
}
