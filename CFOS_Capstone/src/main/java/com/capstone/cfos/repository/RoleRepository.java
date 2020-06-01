package com.capstone.cfos.repository;

import com.capstone.cfos.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByRoleId(Long id);

    Role findByRoleName(String roleName);

    @Query("select r from Role r where r.roleName not in :roleNames")
    List<Role> findByRoleNames(@Param("roleNames") List<String> roleNames);
}
