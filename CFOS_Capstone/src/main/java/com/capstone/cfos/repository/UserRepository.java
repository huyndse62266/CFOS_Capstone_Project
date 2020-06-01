package com.capstone.cfos.repository;

import com.capstone.cfos.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("Select u From User u where u.employee.foodCourt.fcId = :id and u.employee is not NULL " +
            "and u.employee.role.roleName <> :roleName")
    Page<User> findAllEmp(Pageable pageable, @Param("id") Long id, @Param("roleName") String roleName);

    @Query("Select u From User u where u.employee.role.roleName = :roleName")
    Page<User> findAllByRoleName(Pageable pageable, @Param("roleName") String roleName);

    @Query("Select u From User u where u.employee.empId is null")
    Page<User> findAllCustomer(Pageable pageable);

    @Query("Select u From User u where u.employee.foodCourt.fcId = :fcId and u.employee is not NULL " +
            "and u.employee.role.roleName <> :roleName and u.fullname LIKE  %:fullname%")
    Page<User> searchEmp(Pageable pageable, @Param("fcId") Long fcId, @Param("roleName") String roleName,
                         @Param("fullname") String fullname);

    @Query("Select u From User u where u.employee is not NULL " +
            "and u.employee.role.roleName = :roleName and u.fullname LIKE  %:fullname%")
    Page<User> searchFcAdmin(Pageable pageable, @Param("roleName") String roleName,
                             @Param("fullname") String fullname);

    @Query("Select u From User u where u.fullname LIKE  %:fullname%")
    Page<User> searchCustomer(Pageable pageable, @Param("fullname") String fullname);

    User findByUsername(String username);

    User findByEmail(String email);

    @Query(value = "Select u From User u Where u.username = :username and u.status <> :status")
    User findByUserLogin(@Param("username") String username, @Param("status") String status);

    @Query(value = "Select u From User u Where u.id = :id")
    User findByUserId(@Param("id") Long id);

    @Query(value = "Select u From User u Where u.username = :username and u.email  = :email")
    User findByUsernameAndEmail(@Param("username") String username, @Param("email") String email);

    User findByCustomerCardCardId(String cardId);

    Page<User> findAllByCustomerCardCardId(Pageable pageable, String searchValue);

    User findByCustomerCustomerId(String customerId);

}
