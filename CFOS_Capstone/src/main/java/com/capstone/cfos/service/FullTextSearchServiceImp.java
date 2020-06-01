package com.capstone.cfos.service;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
public class FullTextSearchServiceImp implements FullTextSearchService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    public FullTextSearchServiceImp(EntityManager entityManager) {
        super();
        this.entityManager = entityManager;
    }

    @Override
    public void initializeHibernateSearch() {

        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
            fullTextEntityManager.createIndexer().startAndWait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
