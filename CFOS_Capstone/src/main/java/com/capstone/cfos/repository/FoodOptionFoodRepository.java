package com.capstone.cfos.repository;

import com.capstone.cfos.model.FoodOptionFood;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodOptionFoodRepository extends JpaRepository<FoodOptionFood,Long> {
    List<FoodOptionFood> findAllByFoodFoodId(long foodId);
}
