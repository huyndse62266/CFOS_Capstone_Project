package com.capstone.cfos.repository;

import com.capstone.cfos.model.OrderDetailFoodOption;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailFoodOptionRepository extends JpaRepository<OrderDetailFoodOption,Long> {
List<OrderDetailFoodOption> findAllByOrderDetailOrderDetailId(long orderDetailId);
}
