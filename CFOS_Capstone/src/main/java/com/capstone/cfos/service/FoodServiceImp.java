package com.capstone.cfos.service;

import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.vm.*;
import com.capstone.cfos.mapper.*;
import com.capstone.cfos.model.*;
import com.capstone.cfos.model.Image;
import com.capstone.cfos.repository.*;
import com.google.gson.internal.LinkedHashTreeMap;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.awt.*;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service
public class FoodServiceImp implements FoodService {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private FoodRepository repository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FoodMapper foodMapper;

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    FoodCourtRepository foodCourtRepository;

    @Autowired
    FoodCourtMapper foodCourtMapper;

    @Autowired
    FoodOptionMapper foodOptionMapper;

    @Autowired
    FoodOptionFoodRepository foodOptionFoodRepository;

    @Autowired
    FoodOptionRepository foodOptionRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    StoreMapper storeMapper;

    @Autowired
    FoodOptionService foodOptionService;

    @Autowired
    FullTextSearchService fullTextSearchService;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    FoodRepository foodRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public FoodVM getFoodById(Long id) {
        Food food = repository.findByFoodId(id);
        if (food == null) {
            return null;
        }
        return foodMapper.toFoodVM(food);
    }

    @Override
    public String deleteFood(Long id) {
        Food food = repository.findByFoodId(id);
        if (food == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Món ăn này không tồn tại ");
        }
        food.setActive(false);
        repository.save(food);
        return Constant.SUCCESS;
    }

    @Override
    public FoodVM updateFood(FoodVM vm, String username) {
        Food food = repository.findByFoodName(vm.getFoodName());
        if (food != null) {
            User user = userRepository.findByUsername(username);
            Category subCategory = categoryRepository.findByCategoryId(food.getStoreCategory().getCategoryId());
            if (user.getEmployee().getStore().getStoreId() == subCategory.getStore().getStoreId() && food.getFoodId() != vm.getFoodId()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Nhà hàng đã có món ăn với tên :" + vm.getFoodName() + " !");
            }
        }


        food = repository.findByFoodId(vm.getFoodId());
        if (food == null) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Món ăn này không tồn tại");
        }

        food.setFoodName(vm.getFoodName());
        //     food.setImages(vm.getImageVMS().stream().map(imageMapper::toImage).collect(Collectors.toList()));
        food.setFoodDescription(vm.getFoodDescription());
        food.setFoodUnit(vm.getFoodUnit());
        food.setPrice(vm.getPrice());
        food.setPromotion(vm.getPromotion());
        food.setQuantity(vm.getQuantity());
        food.setActive(vm.isActive());
        imageRepository.deleteInBatch(food.getImages());
        foodOptionFoodRepository.deleteInBatch(food.getFoodOptionFoods());
        food.setImages(null);
        food.setFoodOptionFoods(null);
        Food result = repository.save(food);
        List<Image> images = vm.getImageVMS().stream().map(i -> {
            Image image = new Image();
            image.setImage(i.getImage());
            image.setFood(result);
            return image;
        }).collect(Collectors.toList());
        result.setImages(images);
        List<FoodOptionFood> foodOptionFoods = vm.getFoodOptionVMS().stream().map(f -> {
            FoodOptionFood foodOptionFood = new FoodOptionFood();
            foodOptionFood.setFood(result);
            foodOptionFood.setFoodOption(foodOptionRepository.findByFoId(f.getFoId()));
            return foodOptionFood;
        }).collect(Collectors.toList());
        result.setFoodOptionFoods(foodOptionFoods);
        return foodMapper.toFoodVM(repository.save(result));
    }

    @Override
    public FoodVMDetailResponse findFoodDetailByID(Long id) {
        Food food = repository.findByFoodId(id);
        FoodVMDetailResponse foodVMDetailResponse = foodMapper.toFoodVMDetailResponse(food);
        Category category = categoryRepository.findByCategoryId(foodVMDetailResponse.getStoreCategoryId());
        if (category != null) {
            StoreVM storeVM = storeMapper.toStoreVM(storeRepository.findByStoreId(category.getStore().getStoreId()));
            if (storeVM != null) {
                foodVMDetailResponse.setFoodCourtVM(foodCourtMapper.toFoodCourtVM(foodCourtRepository.findByFcId(storeVM.getFcId())));
                foodVMDetailResponse.setStoreVM(storeVM);
            }
        }
        return foodVMDetailResponse;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public FoodVM createFood(FoodVM vm, String username) {
        Food food = repository.findByFoodName(vm.getFoodName());
        if (food != null) {
            User user = userRepository.findByUsername(username);
            Category subCategory = categoryRepository.findByCategoryId(food.getStoreCategory().getCategoryId());
            if (user.getEmployee().getStore().getStoreId() == subCategory.getStore().getStoreId()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, "Nhà hàng đã có món ăn với tên :" + vm.getFoodName() + " !");
            }
        }
        Category storeCategory = categoryRepository.findByCategoryId(vm.getStoreCategoryId());
        if (storeCategory == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "This store's category is not exist!");
        }
        Category fcCategory = categoryRepository.findByCategoryId(vm.getFcSubCategoryId());
        if (fcCategory == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "This food court's category is not exist!");
        }
        food = new Food();
        food.setFoodName(vm.getFoodName());
//        List<ImageVM> imageVMS = vm.getImageVMS();
//        List<Image> images = imageVMS.stream().map(imageMapper::toImageVM).collect(Collectors.toList());
        food.setFoodDescription(vm.getFoodDescription());
        food.setFoodUnit(vm.getFoodUnit());
        food.setPrice(vm.getPrice());
        food.setQuantity(vm.getQuantity());
        food.setRate(0);
        food.setPromotion(vm.getPromotion());
        food.setActive(true);
        food.setFcCategory(fcCategory);
        food.setStoreCategory(storeCategory);
        Food result = repository.save(food);
        List<Image> images = vm.getImageVMS().stream().map(i -> {
            Image image = new Image();
            image.setImage(i.getImage());
            image.setFood(result);
            return image;
        }).collect(Collectors.toList());
        result.setImages(images);
        List<FoodOptionFood> foodOptionFoods = vm.getFoodOptionVMS().stream().map(f -> {
            FoodOptionFood foodOptionFood = new FoodOptionFood();
            foodOptionFood.setFood(result);
            foodOptionFood.setFoodOption(foodOptionRepository.findByFoId(f.getFoId()));
            return foodOptionFood;
        }).collect(Collectors.toList());
        result.setFoodOptionFoods(foodOptionFoods);
        return foodMapper.toFoodVM(repository.save(result));
    }

    @Override
    public Page<FoodVM> getFoodByCategory(Pageable pageable, Long categoryId) {
        Page<Food> page = repository.findFoodByCategoryId(pageable, categoryId);
        if (page == null || page.isEmpty()) {
            return null;
        }
        return page.map(foodMapper::toFoodVM);
    }

    @Override
    public Page<FoodVM> searchFood(Pageable pageable, String name, Long categoryId) {
        Page<Food> page = repository.searchFood(pageable, categoryId, name);
        if (page == null || page.isEmpty()) {
            return null;
        }
        return page.map(foodMapper::toFoodVM);
    }

    @Override
    public List<FoodVMListResponse> findTop2PerStore(Long cateID) {
//        List<Food> fo = foodRepository.findAll();
//        for(Food food: fo){
//            Random rd = new Random();
//            food.setCount(rd.nextInt(200));
//        }
//        foodRepository.saveAll(fo);


        List<Food> foods = foodRepository.findAllByFcCategoryCategoryIdAndActiveTrueOrderByCountDesc(cateID);

        // Old
//        for (int i = 0; i < foods.size(); i++) {
//            int count = 0;
//            for(int j =  1 ; j < foods.size() ; j++){
//                if(foods.get(i).getStoreCategory().getCategoryId() == foods.get(j).getStoreCategory().getCategoryId()){
//                    count++;
//                    if(count >= 2){
//                        foods.remove(foods.get(j));
//                    }
//                }
//            }
//        }
//        List<Food> newFoods = new ArrayList<>();
//        for (int i = 0; i <  foods.size(); i++) {
//            for (int j = i+1; j < foods.size(); j++) {
//                if(foods.get(i).getStoreCategory().getCategoryId() == foods.get(i).getStoreCategory().getCategoryId()){
//                    newFoods.add(foods.get(i));
//                    newFoods.add(foods.get(j));
//                }
//            }
//        }

        foods = foods.stream()
                .sorted(Comparator.comparingInt(Food::getCount).reversed())
                .collect(groupingBy(Food::getCategoryId,
                        LinkedHashTreeMap::new,
                        collectingAndThen(Collectors.toList(), v -> v.stream().limit(2).collect(toList()))))
                .values().stream()
                .flatMap(Collection::stream)
                .collect(toList());


        List<FoodVMListResponse> listFood = foods.stream().distinct().map(foodMapper::toFoodVMListResponse).collect(Collectors.toList());

        for (int i = 0; i < listFood.size(); i++) {
            Image image = imageRepository.findTop1ByFoodFoodId(listFood.get(i).getFoodId());
            listFood.get(i).setFoodImage(image.getImage());
        }

        return addStoreVM(listFood);
    }

    @Override
    public List<FoodVMListResponse> findAllWithPromotionByCategory(Long id) {
        List<FoodVMListResponse> listFood = repository.findAllByFcCategoryCategoryIdAndActiveTrueAndPromotionGreaterThan(id, Double.valueOf(0)).stream().map(foodMapper::toFoodVMListResponse).collect(Collectors.toList());
        for (int i = 0; i < listFood.size(); i++) {
            Image image = imageRepository.findTop1ByFoodFoodId(listFood.get(i).getFoodId());
            listFood.get(i).setFoodImage(image.getImage());

        }
        return addStoreVM(listFood);
    }

    @Override
    public List<FoodVMListResponse> findAllWithStore(Long id) {
        List<FoodVMListResponse> listFood = repository.findAllByStoreCategoryStoreStoreIdAndActiveTrueOrderByCountDesc(id).stream().map(foodMapper::toFoodVMListResponse).collect(Collectors.toList());
        for (int i = 0; i < listFood.size(); i++) {
            Image image = imageRepository.findTop1ByFoodFoodId(listFood.get(i).getFoodId());
            listFood.get(i).setFoodImage(image.getImage());

        }
        return addStoreVM(listFood);
    }

    public List<FoodVMListResponse> addStoreVM(List<FoodVMListResponse> listFood) {
        for (FoodVMListResponse foodVMListResponse : listFood) {
            Category category = categoryRepository.findByCategoryId(foodVMListResponse.getStoreCategoryId());
            StoreVM storeVM = new StoreVM();
            foodVMListResponse.setStoreId(category.getStore().getStoreId());
            foodVMListResponse.setStoreName(category.getStore().getStoreName());
            foodVMListResponse.setStoreIcon(category.getStore().getStoreIcon());
        }
        return listFood;
    }

    @Override
    public List<FoodVMDetailResponse> getFoodNear(String usernameCus) {
        String customerId = customerRepository.findByUserUsername(usernameCus).getCustomerId();
        if (customerId == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Not found customer!"
            );
        }
        List<Food> foods = repository.findDistinctTop10ByActiveTrueAndOrderDetailsOrderCustomerCustomerIdOrderByOrderDetailsOrderOrderDateDesc(customerId);

        return toFoodVMDetailResponses(foods);
    }

    private List<FoodVMDetailResponse> toFoodVMDetailResponses(List<Food> foods) {
        if (foods == null && foods.isEmpty()) return null;
        List<FoodVMDetailResponse> vms = new ArrayList<>();
        for (Food food : foods) {
            if (food.isActive() && food.getStoreCategory().isActive() && food.getStoreCategory().getStore().isActive()) {
                FoodVMDetailResponse vmDetailResponse = foodMapper.toFoodVMDetailResponse(food);
                vmDetailResponse.setStoreVM(storeMapper.toStoreVM(food.getStoreCategory().getStore()));
                vmDetailResponse.setFoodOptions(foodOptionService.getAllFoodOptionByFood(food.getFoodId()));
                vms.add(vmDetailResponse);
            }
        }
        return vms;
    }

    @Override
    public List<FoodVMDetailResponse> searchFoods(String foodName) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder queryBuilder = fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(Food.class)
                .get();

        org.apache.lucene.search.Query query = queryBuilder
                .keyword()
                .onField("foodName")
                .matching(foodName)
                .createQuery();

        org.hibernate.search.jpa.FullTextQuery jpaQuery
                = fullTextEntityManager.createFullTextQuery(query, Food.class);

        List<Food> foods = null;
        try {
            foods = jpaQuery.getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return foods.stream().map(foodMapper::toFoodVMDetailResponse).collect(Collectors.toList());
    }

    @Override
    public List<FoodVMListResponse> findTop2ByCategory(long categoryId) {
        List<Store> s = storeRepository
                .findDistinctTop3ByActiveTrueAndStoreCategoriesStoreFoodsActiveTrueOrderByStoreCategoriesStoreFoodsCountDesc();
        List<Food> foods = new ArrayList<>();
        for (int j = 0; j < s.size(); j++) {//list store
            List<Category> categories1 = categoryRepository.findByStoreId(s.get(j).getStoreId());
            for (int k = 0; k < categories1.size(); k++) {
                List<Food> top2 = foodRepository.findTop2ByStoreCategoryCategoryIdAndFcCategoryCategoryIdAndActiveTrueOrderByCountDesc
                        (s.get(j).getStoreCategories().get(k).getCategoryId(), categoryId);
                for (Food food1 : top2) {
                    foods.add(food1);
                }
            }
        }
        List<FoodVMListResponse> listFood = foods.stream().map(foodMapper::toFoodVMListResponse).collect(Collectors.toList());
        for (int i = 0; i < listFood.size(); i++) {
            Image image = imageRepository.findTop1ByFoodFoodId(listFood.get(i).getFoodId());
            listFood.get(i).setFoodImage(image.getImage());

        }
        return addStoreVM(listFood);
    }

    @Override
    public List<FoodVMDetailResponse> getFoodsByCategoryId(Long cateId) {
        List<Food> foods = repository.findFoodByCategoryId(cateId);
        if (foods == null || foods.isEmpty()) return null;
        return toFoodVMDetailResponses(foods);
    }

    @Override
    public FoodVMDetailResponse getFoodDetailById(Long id) {
        Food food = repository.findByFoodId(id);
        if (food == null) return null;
        return foodMapper.toFoodVMDetailResponse(food);
    }

    @Override
    public List<FoodVMDetailResponse> getPromotionFoods(Long fcId) {
        List<Food> foods = repository.findTopPromotionFoods(fcId, new PageRequest(0, 30));
        if (foods == null || foods.isEmpty()) return null;
        return toFoodVMDetailResponses(foods);
    }

    @Override
    public List<FoodVMDetailResponse> getPopularFoods(Long fcId) {
        List<Food> foods = repository.findTopPopularFoods(fcId, new PageRequest(0, 30));
        if (foods == null || foods.isEmpty()) return null;
        return toFoodVMDetailResponses(foods);
    }

    @Override
    public SearchFoodVM searchFoods(String name, Long fcId) {
        Sort sortable = Sort.by(Food.PROP_FOODNAME).ascending();
        Pageable pageable = PageRequest.of(0, 20, sortable);
        List<Food> foods = repository.searchFoods(fcId, name, pageable);
        if (foods == null || foods.isEmpty()) return null;
        SearchFoodVM vm = new SearchFoodVM();
        vm.setFoodVMDetailResponses(toFoodVMDetailResponses(foods));
        List<Store> stores = new ArrayList<>();
        for (Food food : foods) {
            if (food.isActive() && food.getStoreCategory().isActive() && food.getStoreCategory().getStore().isActive()) {
                Store store = food.getStoreCategory().getStore();
                if (!stores.contains(store)) {
                    stores.add(store);
                }
            }
        }
        List<AppStoreVM> appStoreVMS = stores.stream().map(s -> {
            AppStoreVM appStoreVM = new AppStoreVM();
            appStoreVM.setFoodCount(foodRepository.countFood(s.getStoreId(), Constant.MEAL));
            appStoreVM.setDrinkCount(foodRepository.countFood(s.getStoreId(), Constant.DRINK));
            appStoreVM.setStoreVM(storeMapper.toStoreVM(s));
            return appStoreVM;
        }).collect(Collectors.toList());
        vm.setAppStoreVMS(appStoreVMS);
        return vm;
    }

    @Override
    public List<FoodVMListResponse> getListFoodPopular(long categoryId) {
        List<Food> foods = repository.findTop8ByFcCategoryCategoryIdAndActiveTrueOrderByCountDesc(categoryId);
        List<FoodVMListResponse> listFood = foods.stream().map(foodMapper::toFoodVMListResponse).collect(Collectors.toList());
        for (int i = 0; i < listFood.size(); i++) {
            Image image = imageRepository.findTop1ByFoodFoodId(listFood.get(i).getFoodId());
            listFood.get(i).setFoodImage(image.getImage());

        }
        return addStoreVM(listFood);
    }

    @Override
    public List<FoodVMDetailResponse> findAllSortByRate() {
        List<Food> foods = repository.findAllByOrderByRateDesc();
        if (foods == null)
            return null;
        return toFoodVMDetailResponses(foods);
    }
}
