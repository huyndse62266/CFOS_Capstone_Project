package com.capstone.cfos.repository;

import com.capstone.cfos.model.OrderDetail;
import com.capstone.cfos.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface StoreRepository extends JpaRepository<Store, Long> {

    Store findByStoreId(Long storeId);

    Store findByStoreNameAndFoodCourtFcId(String name, Long fcid);

    List<Store> findDistinctByActiveTrueAndFoodCourtFcIdAndStoreCategoriesNotNull(Long id);

    List<Store> findAllByFoodCourtFcId(Long id);

    @Query(value = "select s from Store s")
    List<Store> findAllByStoreId();

    List<Store> findAllByActiveTrue();

    //khang write for kiosk
    //top 3 store have order many food
    List<Store> findDistinctTop3ByActiveTrueAndStoreCategoriesStoreFoodsActiveTrueOrderByStoreCategoriesStoreFoodsCountDesc();

    @Query(value = "select s from Store s where s.foodCourt.fcId = :fcId and s.active = true")
    List<Store> findAllByFcId(@Param("fcId") Long fcId);

    List<Store> findDistinctByOrderDetailsIn(List<OrderDetail> orderDetails);

    Store findByEmployeesUserUsernameAndActiveTrue
            (String username);
}
