package com.capstone.cfos.controller.vm;

import lombok.Data;

@Data
public class CategoryVM {

    private Long categoryId;

    private String categoryName;

    private String image;

    private boolean active;

    private Long parentId;

    private int dishsCount;
}