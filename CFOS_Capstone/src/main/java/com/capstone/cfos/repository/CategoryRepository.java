package com.capstone.cfos.repository;

import com.capstone.cfos.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Category findByCategoryId(Long id);

    @Query(value = "Select c From Category c Where c.categoryName = :name and " +
            "(c.foodCourt.fcId is not null or c.category.categoryId is null)")
    Category findByParentFcCategoryName(@Param("name") String name);

    @Query(value = "Select c From Category c Where c.categoryName = :name and c.category.categoryId = :categoryId")
    Category findBySubFcCategoryName(@Param("name") String name, @Param("categoryId") long categoryId);

    @Query(value = "Select c From Category c Where c.categoryName = :name and c.store.storeId = :storeId and " +
            "(c.foodCourt.fcId is null or c.category.categoryId is null)")
    Category findByStoreCategoryName(@Param("name") String name, @Param("storeId") Long storeId);

    @Query(value = "Select c From Category c Where c.store.storeId = :storeId and c.category = null")
    List<Category> findByStoreId(@Param("storeId") Long storeId);

    @Query(value = "Select c From Category c Where c.foodCourt.fcId = :fcId")
    List<Category> findByFcId(@Param("fcId") Long fcId);

    List<Category> findDistinctByCategoryCategoryNameAndFoodsNotNull(String cateName);

    List<Category> findDistinctByFoodsNotNull();

    Category findDistinctByFoodCourtFcIdAndCategoryName(Long fcId, String cateName);

    List<Category> findDistinctByCategoryCategoryIdAndFoodsNotNull(Long id);

    @Query(value = "Select c From Category c Where c.category.foodCourt.fcId = :fcId and c.active = true")
    List<Category> findSubCategoryByFcId(@Param("fcId") Long fcId);
}
