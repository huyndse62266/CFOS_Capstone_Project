package com.capstone.cfos.repository;

import com.capstone.cfos.model.Order;
import com.capstone.cfos.model.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface StatisticRepository extends JpaRepository<Statistic,Long> {
    List<Statistic> findAllByDayBetween(Date timeStart, Date timeEnd);
    List<Statistic> findAllByDayBetweenOrderByStoreStoreId(Date timeStart, Date timeEnd);
    List<Statistic> findAllByStoreStoreIdAndDayBetween(Long storeId, Date timeStart, Date timeEnd);
}
