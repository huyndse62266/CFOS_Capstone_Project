package com.capstone.cfos.repository;

import com.capstone.cfos.model.Employee;
import com.capstone.cfos.model.FoodCourt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface FoodCourtRepository extends JpaRepository<FoodCourt, Long> {
    FoodCourt findByFcId(Long fcId);

    @Query(" select  f from  FoodCourt f where f.fcName = :name and f.fcLocation = :location")
    FoodCourt findByFcNameAndLocation(@Param("name") String name,@Param("location") String location);
//    List<Employee> findAllByFcIdAndEmployeesRoleRoleNameAndEmployeesActiveTrue(long fcId,String roleName);

}
