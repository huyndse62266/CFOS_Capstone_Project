package com.capstone.cfos.repository;

import com.capstone.cfos.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

    Card findByCardId(String cardId);

    Card findByCustomerCustomerId(String cusId);
}
