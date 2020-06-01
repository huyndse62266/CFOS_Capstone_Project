package com.capstone.cfos.Utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.capstone.cfos.controller.vm.OneDateVM;
import com.kinoroy.expo.push.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

import javax.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.capstone.cfos.constants.SecurityConstant.*;

public class Ultilities {

    public static String getUsername(HttpServletRequest request) {
        String tokenHeader = request.getHeader(HEADER_STRING);
        String username = "";
        try {
            if (tokenHeader != null) {
                String token = tokenHeader.replace(TOKEN_PREFIX, "");
                username = getDecodedJWT(token).getSubject();
            }
        } catch (Exception e) {
            username = "";
        }
        return username;
    }

    private static DecodedJWT getDecodedJWT(String token) {
        return JWT.require(Algorithm.HMAC512(JWT_SECRET.getBytes()))
                .build()
                .verify(token);
    }

    public static String md5(String data) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hash = md.digest(data.getBytes("UTF-8"));

            StringBuilder sb = new StringBuilder(2 * hash.length);
            for (byte b : hash) {
                sb.append(String.format("%02x", b & 0xff));
            }

            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }

    public static Date parseStringToDate(String s)
    {
       try{
           Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(s);
           return date;
       }catch (ParseException e){
           return null;
       }

    }

    //get time start and end of current day
    public static OneDateVM parseCurrentDate(){
        Date date = new Date();
        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(date);   // assigns calendar to given date
        int hour = calendar.get(Calendar.HOUR_OF_DAY); // gets hour in 24h format
        int month = calendar.get(Calendar.MONTH) + 1;       // gets month number, NOTE this is zero based!
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int year = calendar.get(Calendar.YEAR);
        //System.out.println("hour :" + hour + "month : " + month + "day: " + day + "year : " + year);
        String startTime = year +"-"+ month +"-" + day + " 00:00:01.000000";
        String endTime =  year +"-"+ month +"-" + day + " 23:59:01.000000";
        Date start = Ultilities.parseStringToDate(startTime);
        Date end = Ultilities.parseStringToDate(endTime);
        OneDateVM oneDateVM = new OneDateVM();
        oneDateVM.setDateStart(start);
        oneDateVM.setDateEnd(end);
        return oneDateVM;
    }
    //change hh:mm to yyyy-MM-dd HH:mm
    public static Date parseStringHourToDate(Date dateOrdered,String scheduleTime){

        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(dateOrdered);


        int month = calendar.get(Calendar.MONTH) + 1;       // gets month number, NOTE this is zero based!
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int year = calendar.get(Calendar.YEAR);
        String yyyyMMddHHmm = year +"-"+ month +"-" + day + " " + scheduleTime ;
        return parseStringToDate(yyyyMMddHHmm);
    }

    //get time from current time , with amount of time for given.
    public static Date caculateDateFromAmountTimeGive(Date dateOrdered,String scheduleTime){

        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(dateOrdered);
        String[] hourMinute = scheduleTime.split(":");
        int hour = Integer.parseInt(hourMinute[0]);
        int minute = Integer.parseInt(hourMinute[1]);
        calendar.add(Calendar.HOUR, hour);
        calendar.add(Calendar.MINUTE,minute);
        return calendar.getTime();
    }

    //get date from current date to 7 days before
    public static Date getSevenDayFromNow(){
        Calendar calendar = GregorianCalendar.getInstance(); // creates a new calendar instance
        calendar.setTime(new Date());//get current date
        calendar.add(Calendar.DATE,-7);
        return calendar.getTime();
    }
    public static void sendNotification(String token, Message message){
        // Sending message
        List<Message> messages = new ArrayList<>();
        // You can check whether your push tokens are syntactically valid
        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
        if (!ExpoPushClient.isExpoPushToken(token)) {
            System.out.println(token + " is not a valid Expo Push Token!");
        }

        messages.add(message);
        // The Expo push service accepts batches of messages, no more than 100 at a time.
        // If you know you're sending more than 100 messages,
        // Use ExpoPushClient.chunkItems to get lists of 100 or less items
        List<List<Message>> chunks = ExpoPushClient.chunkItems(messages);

        for (List<Message> chunk : chunks) {
            try {
                PushTicketResponse response = ExpoPushClient.sendPushNotifications(messages);
                List<ExpoError> errors = response.getErrors();
                // If there is an error with the *entire request*:
                // The errors object will be an list of errors,
                // (usually just one)
                if (errors != null) {
                    for (ExpoError error : errors) {
                        // Handle the errors
                    }
                }
                // If there are errors that affect individual messages but not the entire request,
                // errors will be null and each push ticket will individually contain the status
                // of each message (ok or error)
                List<PushTicket> tickets = response.getTickets();
                if (tickets != null) {
                    for (PushTicket ticket : tickets) {
                        // Handle each ticket (namely, check the status, and save the ID!)
                        // NOTE: If a ticket status is error, you can get the specific error
                        // from the details object. You must handle it appropriately.
                        // The error codes are listed in PushError
                        if (ticket.getStatus() == Status.OK) {
                            String id = ticket.getId();
                            // Save this id somewhere for later
                        } else {
                            // Handle the error
                            PushError e = ticket.getDetails().getError();
                            switch (e) {
                                case MESSAGE_TOO_BIG:
                                case INVALID_CREDENTIALS:
                                case DEVICE_NOT_REGISTERED:
                                case MESSAGE_RATE_EXCEEDED:
                            }

                        }
                    }
                }
            } catch (IOException e) {
                // Handle a network error here
                System.out.println(e.getMessage());
            }
        }
    }


}
