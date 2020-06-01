package com.capstone.cfos.service;

import com.capstone.cfos.Utils.Ultilities;
import com.capstone.cfos.constants.Constant;
import com.capstone.cfos.controller.FoodController;
import com.capstone.cfos.controller.vm.BlockVM;
import com.capstone.cfos.controller.vm.OneDateVM;
import com.capstone.cfos.model.Block;
import com.capstone.cfos.model.OrderDetail;
import com.capstone.cfos.model.Store;
import com.capstone.cfos.repository.BlockRepository;
import com.capstone.cfos.repository.OrderDetailRepository;
import com.capstone.cfos.repository.StoreRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Time;
import java.text.DecimalFormat;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
public class BlockServiceImp implements BlockService {
    @Autowired
    BlockRepository blockRepository;

    @Autowired
    OrderDetailRepository orderDetailRepository;

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    SchedulerService schedulerService;
    private static final Logger LOGGER = LoggerFactory.getLogger(BlockServiceImp.class);


    @Override//run one time when init server
    public void saveBlock() {
        if(isBlockChange()){
            blockRepository.deleteAll();
        }
        List<Block> blocks = blockRepository.findAll();
        if(blocks.size() >1){
            if(blocks.get(1).getDeque() == null){
                schedulerService.autoResetBlock();
            }
            return;
        }
        Time blockStart = Time.valueOf(Constant.BLOCK_START);
        Time blockEnd = Time.valueOf(Constant.BLOCK_END);
        long tmpTime = blockEnd.getTime() - blockStart.getTime();//get MILLISECONDS from end to start time
        long minute = TimeUnit.MINUTES.convert(tmpTime, TimeUnit.MILLISECONDS);//parse to Minute
        long blockSize = minute / Constant.BLOCK_AMOUNT;
        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(blockStart);

        for (int i = 0; i < blockSize +1 ; i++) {
            Block block = new Block();
            if(i == 0){
                block.setBlockStart(new Time(calendar.getTime().getTime()));
            }else {
                calendar.add(Calendar.MINUTE, Constant.BLOCK_AMOUNT);
                block.setBlockStart(new Time(calendar.getTime().getTime()));
            }

            blockRepository.save(block);
        }
        schedulerService.autoResetBlock();
    }

    private boolean isBlockChange(){
        List<Block> blocks = blockRepository.findAll();
        if(blocks.size()==0) return false;
        if(!blocks.get(0).getBlockStart().toString().equals(Constant.BLOCK_START)
                || !blocks.get(blocks.size()-1).getBlockStart().toString().equals(Constant.BLOCK_END)){
            return  true; //have change
        }
        return false;
    }

    //push : đẩy lên đầu
    //offer : đẩy ra sau
    @Override
    public String addToBlock(Time currentTime, String schedulerTime, int orderDetailNumber) {
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        OrderDetail orderDetail =
                orderDetailRepository
                        .findByOrderDetailNumberAndOrderOrderDateBetween
                                (orderDetailNumber, oneDateVM.getDateStart(), oneDateVM.getDateEnd());
        Store store = orderDetail.getStore();
    if(!store.isActive()){
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Xin lỗi, hiện tại cửa hàng đã đóng.");
    }
        Deque<OrderDetail> deque = new ArrayDeque<>();
        Block block = new Block();
        if (schedulerTime != null) {
             block = findBlock(schedulerTime);
        }else{
            block = findBlock(currentTime.toString());
        }
        if(block == null){
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Xin lỗi, hiện tại tất cả cửa hàng đã đóng. Xin vui lòng quay lại hôm sau");
        }
            String blockDeque = block.getDeque();

            //deque already have orderDetail
            String storeDeque = getDequeStringByStoreId(store.getStoreId(), parseStringToFindListStore(blockDeque));
            if (!storeDeque.equals(" ")) { //have orderDetail
                deque = addOrderDetailToDeque(storeDeque);
            }
            if(schedulerTime != null){//for customer schedule via app mobile
                if(isInRushHour(schedulerTime)){//case RUSH HOUR
                    int countFoodForRushHour = (int)store.getFoodPerBlock()*Constant.RUSH_HOUR_DECREASE_SIZE/100;
                    if (deque.size() >= countFoodForRushHour) {//case block is full
                        throw new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "The time frame is now full" +
                                        ". Please choose another time." +
                                        store.getStoreName() +" is full at: " + schedulerTime);
                    }
                }
            }
            if (deque.size() >= store.getFoodPerBlock()) {//case block is full
                if(schedulerTime != null){//for customer schedule via app mobile
                    throw new ResponseStatusException(
                            HttpStatus.INTERNAL_SERVER_ERROR,
                            "The time frame is now full" +
                                    ". Please choose another time." +
                                    store.getStoreName() +" is full at: " + schedulerTime);
                }
                //for guest,customer order without schedule => add to waiting block
                Block block1 = blockRepository.findByBlockId(block.getBlockId()+1);//nextBlock
                //addToBlock(currentTime,block1.getBlockStart().toLocalTime().toString(),orderDetailNumber);
            return    addToBlock(block1.getBlockStart(),null,orderDetailNumber);

            }
            //add orderDetail to block
        if(schedulerTime != null){//case schedule cus
            deque.offer(orderDetail);
        }else {
            Time timeInBlock = block.getBlockStart();
            if(isInRushHour(block.getBlockStart().toString())){//chỉ xảy ra ở giờ cao điểm
                if(timeInBlock.getHours() == currentTime.getHours()){
                    if(currentTime.getMinutes() <= timeInBlock.getMinutes() + 5 && timeInBlock.getMinutes() <= currentTime.getMinutes()){
                        deque.push(orderDetail);//đẩy lên đầu: phút <= 5
                    }else {
                        deque.offer(orderDetail);//đẩy vào sau : phút > 5
                    }
                }
            }else {
                deque.offer(orderDetail);
            }

        }

            orderDetail.setBlock(block);
            orderDetailRepository.save(orderDetail);
            if (storeDeque.equals(" ")) {//cut the space if have
                storeDeque = "";
            }
            storeDeque = parseDequeToString2(deque);
            updateBlockDeque(store.getStoreId(), storeDeque, block.getBlockId());
            return Constant.SUCCESSFULL;
    }

    private boolean isBlockFull(long storeId,long blockId,String schedulerTime){
        Store store = storeRepository.findByStoreId(storeId);
        Block block = blockRepository.findByBlockId(blockId);
        String blockDeque = block.getDeque();
        String storeDeque = getDequeStringByStoreId(store.getStoreId(), parseStringToFindListStore(blockDeque));
        Deque<OrderDetail> deque = new ArrayDeque<>();

        if (!storeDeque.equals(" ")) { //have orderDetail
            deque = addOrderDetailToDeque(storeDeque);
        }
        if(schedulerTime != null){//for customer schedule via app mobile
            if(isInRushHour(schedulerTime)){//case RUSH HOUR
                int countFoodForRushHour = (int)store.getFoodPerBlock()*Constant.RUSH_HOUR_DECREASE_SIZE/100;
                if (deque.size() >= countFoodForRushHour) {//case block is full
                   return true;
                }
            }
        }
        if (deque.size() >= store.getFoodPerBlock()) {//case block is full
            if (schedulerTime != null) {//for customer schedule via app mobile
                return true;
            }
        }

        return false;
    }

    private Deque<OrderDetail> addOrderDetailToDeque(String storeDeque){
        List<OrderDetail> orderDetailList = parseStringToList(storeDeque);//parseDeque
        Deque<OrderDetail> deque = new ArrayDeque<>();
        int countOrderDetailList = orderDetailList.size();
        for (int i = 0; i < countOrderDetailList; i++) {
            deque.offer(orderDetailList.get(i));
        }
        return deque;
    }

//find block with scheduler time given
    private Block findBlock(String time) {
        List<Block> blocks = blockRepository.findAll();
        int tmp = blocks.size();
        if(time.length() < 6){//hh:mm:ss
           time = time+":00";
        }
        Time checkTime = Time.valueOf(time);
        for (int i = 0; i < tmp; i++) {
            Time timeInBlock = blocks.get(i).getBlockStart();
            if(timeInBlock.getHours() == checkTime.getHours()){
                if(checkTime.getMinutes() <= timeInBlock.getMinutes() + 9 && timeInBlock.getMinutes() <= checkTime.getMinutes()){
                    return blocks.get(i);
                }
            }
        }
        return null;
    }

    private List<OrderDetail> parseStringToList(String deque) {
        //example : deque = "30,34,21,23";
        String[] strings = deque.split(",");
        OneDateVM oneDateVM = Ultilities.parseCurrentDate();
        List<OrderDetail> orderDetailList = new ArrayList<>();
        for (int i = 0; i < strings.length; i++) {
            OrderDetail orderDetail =orderDetailRepository
                    .findByOrderDetailNumberAndOrderOrderDateBetween
                            (Integer.parseInt(strings[i]), oneDateVM.getDateStart(), oneDateVM.getDateEnd());
            if(orderDetail != null){
                orderDetailList.add(orderDetail);
            }else {
                LOGGER.info("Server did not active last night. Resetting block....");
                schedulerService.autoResetBlock();
                break;
            }
        }
        return orderDetailList;
    }

    private String parseDequeToString2(Deque<OrderDetail> orderDetails){
        String result ="";
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(result);
        int size = orderDetails.size();
        for (int i = 0; i <  size; i++) {
            if(i == 0){
               // result = result + orderDetails.pollFirst().getOrderDetailNumber();
                stringBuilder.append(orderDetails.pollFirst().getOrderDetailNumber());
            }else {
               // result = result +","+orderDetails.pollFirst().getOrderDetailNumber();
                stringBuilder.append(","+orderDetails.pollFirst().getOrderDetailNumber());
            }
        }
        return  stringBuilder.toString();
    }

    private HashMap<Long, String> parseStringToFindListStore(String deque) {
        //example : deque = "1/12,13,14-2/12,23,14,15";
        //1/ -2/ -3/ -4/
        HashMap<Long, String> result = new HashMap<>();
        String[] stringStoreAndOrder = deque.split("-");//include store/orderNumber,orderNumber
        //StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < stringStoreAndOrder.length; i++) {
            if(stringStoreAndOrder[i].length() == 2){
               // stringBuilder.append(stringStoreAndOrder[i] + " ");
                stringStoreAndOrder[i] = stringStoreAndOrder[i] + " ";
            }
            String[] storeString = stringStoreAndOrder[i].split("/");
            //only 2 elemnt. 1: store id,2: list order(1,2,4)
            result.put(Long.parseLong(storeString[0]), storeString[1]);
        }
        return result;
    }

    private String getDequeStringByStoreId(long storeId, HashMap<Long, String> hashMap) {
            for (Long i : hashMap.keySet()
                    ) {
                if (storeId == i) return hashMap.get(i);
            }
        return "NOT_FOUND";
    }

    //use to poll orderDetail out of deque
    @Override
    public void pollOrderDetailFromDeque(long oderDetailId){
        OrderDetail orderDetail = orderDetailRepository.findByOrderDetailId(oderDetailId);
        Store store = orderDetail.getStore();
        String storeDeque = getDequeStringByStoreId
                (store.getStoreId(), parseStringToFindListStore(orderDetail.getBlock().getDeque()));
        List<OrderDetail> oldOrderDetailList = parseStringToList(storeDeque);//parseDeque
        Deque<OrderDetail> deque = new ArrayDeque<>();
        int countOrderDetailList = oldOrderDetailList.size();
        for (int i = 0; i < countOrderDetailList; i++) {
            if(!oldOrderDetailList.get(i).getOrderDetailId().equals(oderDetailId)){
                deque.offer(oldOrderDetailList.get(i));
            }
        }
       String finalDeque = parseDequeToString2(deque);
        updateBlockDeque(orderDetail.getStore().getStoreId(), finalDeque, orderDetail.getBlock().getBlockId());
    }
    @Override
    public void updateBlockDeque(long storeId, String storeDeque, long blockId) {
        Block block = blockRepository.findByBlockId(blockId);
        HashMap<Long, String> map = parseStringToFindListStore(block.getDeque());
        String tmp = "";
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(tmp);
        for (Long i : map.keySet()) {
            if (storeId == i) {
                map.put(i, storeDeque);
            }
            stringBuilder.append("-" + i + "/" + map.get(i));
            //tmp = tmp + "-" + i + "/" + map.get(i);
        }
        tmp = stringBuilder.toString();
        block.setDeque(tmp.substring(1));
        blockRepository.save(block);
    }

    //get orderDetail in store from current Time back to pass.
    @Override

   public List<OrderDetail> getOrderDetailForKitchen(long storeId){
        Time currentTime = new Time(new Date().getTime());
        Block currentBlock = findBlock(currentTime.toString());
        String blockDeque = currentBlock.getDeque();
        int countTotalBlocks = blockRepository.findAll().size();
        String currentStoreDeque = getDequeStringByStoreId(storeId, parseStringToFindListStore(blockDeque));
        if(currentStoreDeque.equals(" ")) currentStoreDeque = "";//case : current time didn't have any order
        String pass = "";
        //find the previous block
        if(currentBlock.getBlockId() != 1){
            for (int i = 1; i < findIndexBlockInList(currentBlock.getBlockId())-1; i++) {
                Block blockPrevios = blockRepository.findByBlockId(currentBlock.getBlockId() - i);
                String previousStoreDeque = getDequeStringByStoreId(storeId, parseStringToFindListStore(blockPrevios.getDeque()));

                if (previousStoreDeque.equals(" ")){
                    previousStoreDeque="";
                }else {
                    pass = previousStoreDeque +","+ pass;
                }
                //if (previousStoreDeque.equals(" ")) break;
            }

        }
        //find the next block
        String future="";
//        Block blockNext = blockRepository.findByBlockId(currentBlock.getBlockId() +1);
        for (int i = 1; i < countTotalBlocks - findIndexBlockInList(currentBlock.getBlockId())-1 ; i++) {
            Block blockNext = blockRepository.findByBlockId(currentBlock.getBlockId() +i);
            String futureDeque = getDequeStringByStoreId(storeId, parseStringToFindListStore(blockNext.getDeque()));
            if (futureDeque.equals(" ")){
                futureDeque="";
            }else {
                future = futureDeque +","+ future;
            }
        }
//        String future = getDequeStringByStoreId(storeId, parseStringToFindListStore(blockNext.getDeque()));
      //  if(future.equals(" ")) future = "";
        String finalDeque ="";
        if(!pass.equals("")){
             finalDeque = pass.substring(0,pass.length()-1)+","+currentStoreDeque;
             if(!future.equals("")){
                 finalDeque = pass.substring(0,pass.length()-1)+","+currentStoreDeque + "," + future;
             }
        }else {
            if(!future.equals("")){
                finalDeque = currentStoreDeque + "," + future;
            }else {
                finalDeque = currentStoreDeque;
            }

        }

        if(finalDeque.contains(",,")){
            finalDeque = finalDeque.replace(",,",",");
        }
        if(finalDeque.endsWith(",")){
            finalDeque = finalDeque.substring(0,finalDeque.length()-1);
        }
        
        if (!finalDeque.equals(" ") && !finalDeque.equals("")) {
            String[] listFinal = finalDeque.split(",");
            OneDateVM oneDateVM = Ultilities.parseCurrentDate();
            List<OrderDetail> orderDetailList = new ArrayList<>();
            for (int i = 0; i < listFinal.length; i++) {
                orderDetailList.add(orderDetailRepository
                        .findByOrderDetailNumberAndOderDetailStatusAndOrderOrderDateBetween
                                (Integer.parseInt(listFinal[i].trim()),Constant.ORDER_PLACEED,oneDateVM.getDateStart(), oneDateVM.getDateEnd()));
            }
            return orderDetailList;
        }else return null;
    }

    private int findIndexBlockInList(long blockId){
        List<Block> blocks = blockRepository.findAll();
        int count =0;
        int countBlock = blocks.size();
        for (int i = 0; i < countBlock; i++) {
            count  = count +1;
            if(blocks.get(i).getBlockId() == blockId) break;
        }
        return  count;
    }


    private boolean isInRushHour(String schedule){
        Time timeRushHourStart = Time.valueOf(Constant.RUSH_HOUR_START);
        Time timeRushHourEnd = Time.valueOf(Constant.RUSH_HOUR_END);
        if(schedule.length() < 6){
            schedule = schedule+":00";
        }
        Time scheduleTime = Time.valueOf(schedule);
        if(timeRushHourStart.getTime() <= scheduleTime.getTime()
                && timeRushHourEnd.getTime() >= scheduleTime.getTime())
            return  true;
        return false;
    }

    @Override
    //public List<BlockVM> getListBlockRemain(long storeId){
            public List<BlockVM> getListBlockRemain(){
            Time currentTime = new Time(new Date().getTime());
        Block block = findBlock(currentTime.toString());
        List<Block> blocks = blockRepository.findAll();

        if (block ==null){
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Empty list!!");
        }
        List<BlockVM> blockVMS = new ArrayList<>();
        int idBlockFuture = (int)blocks.get(blocks.size()-1).getBlockId();
        for (int i = (int)block.getBlockId()+3; i < idBlockFuture; i++) {
           BlockVM blockVM = new BlockVM();
           Block block1 = blockRepository.findByBlockId((long)i);
           blockVM.setTimeBlock(block1.getBlockStart().toString());
           blockVM.setTimeRemain(timeRemain(block1.getBlockStart()));
           //boolean trueFasle = isBlockFull(storeId,block1.getBlockId(),block1.getBlockStart().toString());
          // blockVM.setFull(trueFasle);
            blockVMS.add(blockVM);
        }
        return  blockVMS;
    }

    private String timeRemain(Time timeFuture){
        Block block = findBlock(timeFuture.toString());
        Block blockCurrent = findBlock(new Time(new Date().getTime()).toString());
        String strBlockCurrent = new Time(new Date().getTime()).toString();
        int tmp = Integer.parseInt(strBlockCurrent.substring(4,5));
        if(block == null) return "Not found for time future!";
        if(blockCurrent == null) return "Not found time current!";
        long blockDistange = block.getBlockId() - blockCurrent.getBlockId();
        if(blockDistange >= 0){
            long minuteAmount = blockDistange * Constant.BLOCK_AMOUNT  - tmp;
            if(minuteAmount / 60 == 0){
                return "00:"+String.format("%02d",minuteAmount)+":00";
            }else {
                return String.format("%02d",minuteAmount / 60) +":"+String.format("%02d",minuteAmount%60)+":00";
            }
        }
        return null;
    }
//    @Scheduled(fixedRate = 10000*2)
//    public void test(){
//        getOrderDetailForKitchen(1);
//    }
}
