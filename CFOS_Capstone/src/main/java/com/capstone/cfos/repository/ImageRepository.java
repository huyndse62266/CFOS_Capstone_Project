package com.capstone.cfos.repository;

import com.capstone.cfos.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Image findTop1ByFoodFoodId(long foodId);
    List<Image> findAllByFoodFoodId(long foodId);
    List<Image> findAllByFoodCourtFcId(long fcId);

}
