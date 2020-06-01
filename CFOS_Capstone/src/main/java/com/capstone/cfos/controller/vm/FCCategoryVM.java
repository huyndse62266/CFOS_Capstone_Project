package com.capstone.cfos.controller.vm;

import lombok.Data;

import java.util.List;

@Data
public class FCCategoryVM {

    private Long fcCategoryId;

    private String fcCategoryName;

    private boolean active;

    private List<CategoryVM> categoryVM;
}
