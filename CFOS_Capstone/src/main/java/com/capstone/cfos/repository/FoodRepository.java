package com.capstone.cfos.repository;

import com.capstone.cfos.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface FoodRepository extends JpaRepository<Food, Long> {

    Food findByFoodId(Long id);

    Food findByFoodName(String foodName);

    List<Food> findAllByStoreCategoryCategoryId(Long id);

    List<Food> findAllByFcCategoryCategoryIdAndActiveTrue(Long id);

    List<Food> findAllByFcCategoryCategoryIdAndActiveTrueAndPromotionGreaterThan(Long id, Double promotion);

    // find top 2 food ordered for each store - use for kiosk
    List<Food> findTop2ByStoreCategoryCategoryIdAndFcCategoryCategoryIdAndActiveTrueOrderByCountDesc
    (Long categoryStoreId, Long categoryFoodcourtId);

    List<Food> findAllByStoreCategoryStoreStoreIdAndActiveTrueOrderByCountDesc(Long id);

    @Query("Select f From Food f where f.storeCategory.categoryId = :categoryId and f.foodName LIKE %:foodName%")
    Page<Food> searchFood(Pageable pageable, @Param("categoryId") Long categoryId, @Param("foodName") String foodName);

    @Query("Select f From Food f where f.storeCategory.categoryId = :id")
    Page<Food> findFoodByCategoryId(Pageable pageable, @Param("id") Long categoryId);

    @Query("Select count(f) From Food f where f.storeCategory.store.storeId= :storeId " +
            "and f.fcCategory.category.categoryName= :type " +
            "and f.active=true and f.storeCategory.active = true and f.storeCategory.store.active = true")
    int countFood(@Param("storeId") Long storeId, @Param("type") String type);

    List<Food> findDistinctByActiveTrue();

    List<Food> findDistinctTop10ByActiveTrueAndOrderDetailsOrderCustomerCustomerIdOrderByOrderDetailsOrderOrderDateDesc
            (String customerId);

    @Query("Select f From Food f where f.fcCategory.categoryId = :id and f.active = true")
    List<Food> findFoodByCategoryId(@Param("id") Long categoryId);

    @Query("Select f From Food f where f.fcCategory.category.foodCourt.fcId = :fcId  " +
            "and f.active = true and f.promotion > 0 order by f.promotion Desc, f.count Desc")
    List<Food> findTopPromotionFoods(@Param("fcId") Long fcId, Pageable pageable);

    @Query("Select f From Food f where f.fcCategory.category.foodCourt.fcId = :fcId " +
            "and f.active = true order by f.count Desc, f.promotion Desc")
    List<Food> findTopPopularFoods(@Param("fcId") Long fcId, Pageable pageable);

    @Query("Select f From Food f where f.fcCategory.category.foodCourt.fcId = :fcId " +
            "and f.active = true and f.foodName LIKE %:name% ")
    List<Food> searchFoods(@Param("fcId") Long fcId, @Param("name") String name, Pageable pageable);

    List<Food> findTop8ByFcCategoryCategoryIdAndActiveTrueOrderByCountDesc(long fcCate);

    List<Food> findAllByOrderByRateDesc();

    List<Food> findAllByFcCategoryCategoryIdAndActiveTrueOrderByCountDesc(Long id);

}
