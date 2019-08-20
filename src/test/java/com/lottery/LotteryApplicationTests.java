package com.lottery;

import com.lottery.entity.WinNumber;
import com.lottery.repository.WinNumberRepository;
import com.lottery.service.WinNumberService;
import com.lottery.service.impl.WinNumberServiceImpl;
import com.lottery.utils.SystemUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LotteryApplicationTests {

    @Test
    public void contextLoads() {
        System.out.println("HELLO");

        WinNumberService wnService = new WinNumberServiceImpl();

//        @Autowired
//        WinNumberRepository repository;

        List<WinNumber> list = new ArrayList<>();
        WinNumber tempWN = null;

        for (int i = 0; i < 100; i++) {
            tempWN = new WinNumber();

            // set ID
            tempWN.setId(SystemUtils.getID());

            // 构建日期&期号
            Date date = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            int year = calendar.get(Calendar.YEAR);
            int month_1 = calendar.get(Calendar.MONTH);
            String month = (month_1 < 9) ? "0" + (month_1 + 1) : String.valueOf(month_1 + 1);
            String issue = null;
            if (i < 9)
                issue = "00" + i;
            else if (i < 99)
                issue = "0" + i;
            else if (i < 999)
                issue = String.valueOf(i);

            // set 期号
            tempWN.setIssue(year + month + issue);
            // set 日期
            tempWN.setLotteryDate(date);

            String redNum = "";
            String[] redNums = new String[6];
            for (int ri = 0; ri < 6; ri++) {
                int num = (int) (1 + (Math.random() * 33));
                redNum += (num < 10) ? "0" + num : String.valueOf(num);
                if (ri != 5) {
                    redNum += ",";
                    redNums[i] = (num < 10) ? "0" + num : String.valueOf(num);
                }
            }

            // set 红色中奖号码
            tempWN.setRedNumbers(redNums);
            System.out.println("红色中奖号码:" + redNum.toString());
//            System.out.println("红色中奖号码:" + redNum.toString());

            int num = (int) (1 + (Math.random() * 16));
            String blueNum = (num < 10) ? "0" + num : String.valueOf(num);
            // set 蓝色中奖号码
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


        wnService.saveEntitys(list);

    }

}
