package com.capstone.cfos.constants;


public class Constant {
    //Account status
    public static final String INITIALIZATION = "initialization";
    public static final String BLOCKED = "blocked";

    //Message
    public static final String SUCCESS = "success";
    public static final String FAIL = "fail";
    public static final String RESET_PASSWORD_SUCCESS = "Reset password success! Password sent to your email.";

    //Email account
    public static final String EMAIL = "foodcourt.cfos@gmail.com";
    public static final String PASSWORD = "Az123123";

    //Role
    public static final String SYSTEM_ADMIN = "SYSTEM_ADMIN";
    public static final String FOOD_COURT_MANAGER = "FOOD_COURT_MANAGER";
    public static final String CASHIER = "CASHIER";
    public static final String STORE_MANAGER = "STORE_MANAGER";
    public static final String CHEF = "CHEF";
    public static final String CUSTOMER = "CUSTOMER";

    //OrderDetails Status
    public static final String ORDER_PLACEED = "PLACED";
    public static final String ORDER_READY = "READY";
    public static final String ORDER_CANCELLED = "CANCELLED";
    public static final String ORDER_GUEST_NOT_PAID = "NOT_PAID";
    public static final String ORDER_REFUNDED = "REFUNDED";


    // api mapping
    public static final String FOODCOURT = "/foodcourt";
    public static final String FOODCOURT_ALL = "/foodcourt/all";
    public static final String FOODCOURT_CREATE = "/foodcourt/create";
    public static final String FOODCOURT_UPDATE = "/foodcourt/update";

    //Transaction Status
    public static final String TRANSACTION_ORDERD = "ORDERD";
    public static final String TRANSACTION_ROLLBACK = "ROLLBACK";
    public static final String TRANSACTION_DEPOSIT = "DEPOSIT";
    public static final String TRANSACTION_GUEST = "GUEST";
    public static final String TRANSACTION_GUEST_ROLLBACK = "GUEST_ROLLBACK";
    public static final String TRANSACTION_SPENDING = "SPENDING";
    public static final String TRANSACTION_CANCEL = "FC_CANCEL";
    public static final String TRANSACTION_COMPLETED = "COMPLETED";

    //Transaction Decription
    public static final String TRANSACTION_UNREAD = "UNREAD";
    public static final String TRANSACTION_READ = "READ";
    public static final String TRANSACTION_DELETED = "DELETED";


    //OrderStatus
    public static final String ORDER_CUSTOMER = "ORDER_CUSTOMER";
    public static final String ORDER_GUEST = "ORDER_GUEST";
    public static final String ORDER_GUEST_PAID = "ORDER_GUEST_PAID";
    public static final String ORDER_CANCEL = "CANCELLED";
    public static final String ORDER_FINISHED = "FINISHED";
    public static final String ORDER_WITH_SCHEDULER = "SCHEDULER";
    public static final String ORDER_COOKING = "COOKING";

    // Food-court category
    public static final String MEAL = "Đồ ăn";
    public static final String DRINK = "Đồ uống";
    public static final String COMBO = "Combo";
    public static final String[] FC_CATEGORY = {MEAL, DRINK, COMBO};

    //Gender user
    public static final String MALE = "Male";
    public static final String FEMALE = "Female";

    public static final String SUCCESSFULL = "SUCCESSFULL";
    public static final String UNSUCCESSFULL = "UNSUCCESSFULL";

    //Block config
    public static final int BLOCK_AMOUNT = 10;//10 minutes
    public static final String BLOCK_START = "00:10:00";//7 A.M
    public static final  String BLOCK_END = "23:50:00";//7 P.M
    public static final  String RUSH_HOUR_START = "10:30:00";//10h30 A.M
    public static final  String RUSH_HOUR_END = "13:00:00";//1h PM
    public static final  int RUSH_HOUR_DECREASE_SIZE = 70;
    public static final  int DEFAULT_FOOD_PER_BLOCK = 10;//10 foods

    //Exception code
    public static final int BLOCK_FULL = 1001;
    public static final int OUT_OF_MONEY = 1002;

    //Customer care
    public static final int POINT_RATE = 1000;
    public static final int DAYS_NOTI_CUSTOMER = 5;

    //Card status
    public static final String CARD_ACTIVATE = "ACTIVATE";
    public static final String CARD_LOST = "LOST";
    public static final String CARD_ERROR = "ERROR";
    public static final String CARD_UNACTIVATE = "UNACTIVATE";

}
