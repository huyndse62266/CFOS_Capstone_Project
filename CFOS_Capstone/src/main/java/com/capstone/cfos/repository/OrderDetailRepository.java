package com.capstone.cfos.repository;



import com.capstone.cfos.model.Order;
import com.capstone.cfos.model.OrderDetail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public interface OrderDetailRepository extends JpaRepository<OrderDetail,Long> {
    List<OrderDetail> findAllByStoreStoreId(Long storeId);
    List<OrderDetail> findAllByStoreStoreIdAndOderDetailStatus(Long storeId,String oderDetailStatus);
    OrderDetail findByOrderDetailId(Long orderDetailId);

    List<OrderDetail> findAllByOderDetailStatusAndStoreStoreId(String status,Long storeId);
    List<OrderDetail> findAllByOderDetailStatusAndStoreStoreIdOrderByOrderDetailIdAsc(String status,Long storeId);

    Page<OrderDetail> findAllByOderDetailStatusAndOrderOrderDateBetween(Pageable pageable,String status,Date timeStart, Date timeEnd);
    Page<OrderDetail> findAllByOderDetailStatus(Pageable pageable,String status);

    OrderDetail findTop1ByOderDetailStatusOrderByOrderDetailIdAsc(String oderDetailStatus);

    List<OrderDetail> findAllByOrderOrderId(Long id);
    List<OrderDetail> findAllByOrderOrderIdAndOderDetailStatusAndStoreStoreIdOrderByOrderDetailNumberAsc
            (Long id,String status,long storeId);
    List<OrderDetail> findAllByOrderOrderIdAndOderDetailStatusAndStoreStoreIdOrderByOrderDetailDateDesc
            (Long id,String status,long storeId);

    //find list in list. Not finish yet.
//    List<OrderDetail> findAllByOrderOrderIdAndOderDetailStatusAndOderDetailOrderDetailId
//            (Long id,String status,List<Long> ids);

    List<OrderDetail> findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetween
            (String status, Long storeId, Date timeStart, Date timeEnd);


    List<OrderDetail> findAllByOderDetailStatusAndStoreStoreIdAndOrderOrderDateBetweenOrderByOrderDetailIdDesc
            (String status, Long storeId, Date timeStart, Date timeEnd);

    List<OrderDetail> findDistinctByFoodNotNull();

    List<OrderDetail> findAllByFoodFoodIdAndOderDetailStatusAndOrderOrderDateBetween
            (long foodId,String status,Date timeStart, Date timeEnd);

    List<OrderDetail> findAllByBlockBlockIdAndStoreStoreIdAndOderDetailStatusAndOrderOrderDateBetween
            (long blockId,long storeId,String status,Date timeStart, Date timeEnd);

    OrderDetail findTop1ByOrderByOrderDetailIdDesc();//use to mark orderDetailNumber

    OrderDetail findByOrderDetailNumber(int orderDetailNumber);//use for scheduler to reset orderDetailNumber

    OrderDetail findByOrderDetailNumberAndOrderOrderDateBetween(int orderDetailNumber,Date timeStart, Date timeEnd);

    OrderDetail findByOrderDetailNumberAndOderDetailStatusAndOrderOrderDateBetween
            (int orderDetailNumber,String status,Date timeStart, Date timeEnd);

    List<OrderDetail> findAllByOderDetailStatusAndStoreFoodCourtFcIdAndOrderOrderDateBetweenOrderByOrderDetailDateDesc
            (String oderDetailStatus,long fcId,Date timeStart, Date timeEnd);

    List<OrderDetail> findAllByOderDetailStatusAndOrderOrderNumberAndOrderOrderDateBetweenOrderByOrderDetailDateAsc
            (String status,int orderNumber,Date timeStart, Date timeEnd);

    List<OrderDetail> findAllByOderDetailStatusAndStoreFoodCourtFcIdAndOrderOrderDateBetween
            (String oderDetailStatus,long fcId,Date timeStart, Date timeEnd);

    List<OrderDetail> findAllByOderDetailStatusAndOrderOrderNumberAndStoreStoreIdAndOrderOrderDateBetween
            (String status,int orderNumber,long storeId,Date timeStart, Date timeEnd);

    int countByOderDetailStatusAndOrderOrderId
            (String oderDetailStatus,long orderId);
    List<OrderDetail> findAllByOderDetailStatus(String oderDetailStatus);
}
