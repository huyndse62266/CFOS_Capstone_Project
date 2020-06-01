package com.capstone.cfos.repository;


        import com.capstone.cfos.model.Order;
        import com.capstone.cfos.model.OrderDetail;
        import org.aspectj.weaver.ast.Or;
        import org.springframework.data.domain.Page;
        import org.springframework.data.domain.Pageable;
        import org.springframework.data.jpa.repository.JpaRepository;
        import org.springframework.data.jpa.repository.Query;
        import org.springframework.data.repository.query.Param;
        import org.springframework.stereotype.Repository;

        import javax.transaction.Transactional;
        import java.util.Date;
        import java.util.List;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findByCustomerCustomerIdAndOrderNumber(String customerID,int orderNumber );
    Order findByOrderNumber(int orderNumber);
    Order findByOrderId(Long orderId);
    //List<Order> findAllByCustomerCustomerIdOrderByOrderDateD(String customerId);
    List<Order> findAllByCustomerCustomerIdOrderByOrderDateDesc(String customerId);


    List<Order> findAllByOrderDateBetween( Date timeStart, Date timeEnd);

    int countByCustomerCustomerId(String customerId);

    @Query(nativeQuery = true, value = "SELECT * FROM cfos_capstone.order_food " +
            "where cus_id = :customerId ORDER BY order_date desc limit 1" )
    Order findLastOrderCustomer(@Param("customerId")String customerId);

    @Query(value = "SELECT o from Order o where o.status = 'cancelled'")
    List<Order> findAllCancelOrder();

    Order findTop1ByOrderByOrderIdDesc();

    List<Order> findAllByStatus(String status);
    Page<Order> findAllByStatusAndOrderDateBetweenOrderByOrderNumberAsc(Pageable pageable, String status,Date start,Date end);
    Page<Order> findAllByOrderNumberAndOrderDateBetween(Pageable pageable,int orderNumber,Date start,Date end);

    Order findByOrderNumberAndOrderDateBetween(int orderNumber,Date start,Date end);

    List<Order> findDistinctByOrderDetailsInOrderByOrderDetailsOrderDetailDateDesc(List<OrderDetail> orderDetails);
    List<Order> findDistinctByOrderDetailsIn(List<OrderDetail> orderDetails);

    List<Order> findAllByScheduleTimeNotNullAndOrderDateBetween
            (Date start,Date end);




}
