package com.capstone.cfos.repository;

import com.capstone.cfos.model.FoodCourt;
import com.capstone.cfos.model.FoodOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface FoodOptionRepository extends JpaRepository<FoodOption, Long> {
    FoodOption findByFoId(Long id);

    List<FoodOption> findAllByStoreStoreIdAndFoodOptionIsNull(Long storeId);

    List<FoodOption> findAllByFoodOptionIsNull();

    List<FoodOption> findAllByFoodOptionFoodsFoodFoodId(long foodId);

    //List<FoodOption> findAllByFoodOptionFoodsFoodFoodId(long foodId);
    List<FoodOption> findAllByFoodOptionFoId(long foodId);

    List<FoodOption> findAllByFoodOptionFoIdAndFoodOptionFoodsFoodFoodId(long foParent, long foChild);
    // List<FoodOption> findAllBy   FoodOptionFoods Food FoodId And FoodOptionIsNull(long foodId);

    FoodOption findBySubNameAndStoreStoreId(String name, long storeId);

    FoodOption findByFoNameAndFoodOptionFoId(String name, long foId);
}
