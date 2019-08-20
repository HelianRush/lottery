package com.lottery.controller;

import com.lottery.entity.WinNumber;
import com.lottery.service.WinNumberService;
import com.lottery.utils.SystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
public class testController {


    @Autowired
    WinNumberService winNumberService;

    //public String

    @ResponseBody
    @RequestMapping(value = "/inData")
    public void inData() {

        System.out.println("HELLO");

//        WinNumberService wnService = new WinNumberServiceImpl();

//        @Autowired
//        WinNumberRepository repository;

        List<WinNumber> list = new ArrayList<>();
        WinNumber tempWN = null;

        for (int i = 0; i < 100; i++) {
            tempWN = new WinNumber();

            // set ID
            tempWN.setId(SystemUtils.getID() + i);

            // 构建日期&期号
            Date date = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            int year = calendar.get(Calendar.YEAR);
            int month_1 = calendar.get(Calendar.MONTH);
            String month = (month_1 < 9) ? "0" + (month_1 + 1) : String.valueOf(month_1 + 1);
            String issue = null;
            if (i <= 9)
                issue = "00" + i;
            else if (i <= 99)
                issue = "0" + i;
            else if (i > 99)
                issue = String.valueOf(i);

            // set 期号
            tempWN.setIssue(year + issue);
            // set 日期
            tempWN.setLotteryDate(date);

            String redNum = "";
            String[] redNums = new String[6];
            for (int ri = 0; ri < 6; ri++) {
                int num = (int) (1 + (Math.random() * 33));
                redNum += (num < 10) ? "0" + num : String.valueOf(num);
                if (ri != 5) {
                    redNum += ",";
                }
                redNums[ri] = (num < 10) ? "0" + num : String.valueOf(num);
            }

            // set 红色中奖号码

            tempWN.setRedNumbers(redNums);
            System.out.println("红色中奖号码:" + redNum.toString());

            int num = (int) (1 + (Math.random() * 16));
            String blueNum = (num < 10) ? "0" + num : String.valueOf(num);
            // set 蓝色中奖号码
            tempWN.setWinNumber(redNum + "," + blueNum);
            tempWN.setBlueNumber(blueNum);

            String[] split = redNum.split(",");

            int sum = 0;
            for (String temp : split) {
                sum += Integer.valueOf(temp);
            }
            // set 和
            tempWN.setRedSum(sum);

            Integer[] redArr = new Integer[split.length];
            for (int ti = 0; ti < split.length; ti++) {
                redArr[ti] = Integer.valueOf(split[ti]);
            }

            int intTemp = 0;

            //  Integer[] newRedArr = new Integer[split.length];
            for (int j = 0; j < redArr.length; j++) {
                for (int k = 0; k < redArr.length - 1; k++) {
                    if (redArr[k] > redArr[k + 1]) {
                        intTemp = redArr[k];
                        redArr[k] = redArr[k + 1];
                        redArr[k + 1] = intTemp;
                    }
                }
            }

            tempWN.setRedSpan(redArr[redArr.length - 1] - redArr[0]);

            int danshu = 0;
            int shuangshu = 0;
            for (Integer temp : redArr) {
                if (0 == temp % 2)
                    shuangshu++;
                else
                    danshu++;
            }
            tempWN.setRedOldEven(danshu + ":" + shuangshu);

            int max = 0;
            int min = 0;
            for (Integer temp : redArr) {
                if (temp < 18)
                    min++;
                else
                    max++;
            }

            tempWN.setRedMaxMin(max + ":" + min);


            list.add(tempWN);
        }

        winNumberService.saveEntitys(list);
    }


    @RequestMapping(value = "/getAll")
    @ResponseBody
    public void getAll() {
        List<WinNumber> winNumbers = winNumberService.queryAll();

        for (WinNumber wn : winNumbers) {
            System.out.println(wn.toString());
        }
    }


    @RequestMapping(value = "/get3All")
    @ResponseBody
    public void get3All() {
//        List<WinNumber> winNumbers = winNumberService.getNew3WinNumber();
//        for (WinNumber wn : winNumbers) {
//            System.out.println(wn.toString());
//        }
    }

    @RequestMapping(value = "/showAdd")
    public String showAdd() {
        return "add";
    }

    @RequestMapping(value = "/doAdd")
    public String doAdd(WinNumber winNumber) {
        System.out.println(winNumber.toString());

        // set ID
        winNumber.setId(SystemUtils.getID());

        // 构建日期&期号
        Date date = new Date();

        // set 日期
        winNumber.setLotteryDate(date);

        // set 红色中奖号码
        String[] split = winNumber.getWinNumber().split(",");
        String[] redNumbers = new String[6];
        for (int i = 0; i < redNumbers.length; i++) {
            redNumbers[i] = split[i];
        }
        winNumber.setRedNumbers(redNumbers);

        winNumber.setBlueNumber(split[6]);

        winNumber.setRedSum(0);
        winNumber.setRedSpan(0);
        winNumber.setRedOldEven(0 + ":" + 0);
        winNumber.setRedMaxMin(0 + ":" + 0);
        winNumberService.saveEntity(winNumber);

        return "add";
    }


}
