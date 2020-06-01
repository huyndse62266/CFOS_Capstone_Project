package com.capstone.cfos.repository;

import com.capstone.cfos.model.Block;
import org.springframework.data.jpa.repository.JpaRepository;
import java.sql.Time;


import java.util.List;

public interface BlockRepository extends JpaRepository<Block,Long> {
    Block findByBlockId(long blockId);
    List<Block> findAllByBlockStartBetween(Time timeStart,Time timeEnd);
}
