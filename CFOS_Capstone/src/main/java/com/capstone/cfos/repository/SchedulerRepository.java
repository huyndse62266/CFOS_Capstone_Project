package com.capstone.cfos.repository;

import com.capstone.cfos.model.Scheduler;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchedulerRepository extends JpaRepository<Scheduler, Long> {

    List<Scheduler> findByActiveIsTrueAndMondayIsTrue();

    List<Scheduler> findByActiveIsTrueAndTuesdayIsTrue();

    List<Scheduler> findByActiveIsTrueAndWednesdayIsTrue();

    List<Scheduler> findByActiveIsTrueAndThursdayIsTrue();

    List<Scheduler> findByActiveIsTrueAndFridayIsTrue();

    List<Scheduler> findByActiveIsTrueAndSaturdayIsTrue();

    List<Scheduler> findByActiveIsTrueAndSundayIsTrue();

    Scheduler findByOrderOrderId(long orderId);
}
