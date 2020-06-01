package com.capstone.cfos.repository;

import com.capstone.cfos.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findByEmpId(String empId);
    Employee findTop1ByActiveTrueAndStoreStoreId(long storeId);
    Employee findByUserId(Long id);
    List<Employee> findAllByActiveTrueAndFoodCourtFcIdAndRoleRoleName(long fcId, String roleName);
}
