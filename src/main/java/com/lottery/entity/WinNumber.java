package com.lottery.entity;


import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Date;

@Entity
public class WinNumber implements Serializable {

    private static final long serialVersionUID = 5887460392543165626L;

    @Id
    @Column(length = 16, nullable = false)
    private String id; // 主键ID

    @Column(length = 10)
    private String issue; // 期号

    @Column(nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date lotteryDate; // 开奖日期

    @Column(length = 20, nullable = false)
    private String winNumber;

    @Column(length = 6, nullable = false)
    private String[] redNumbers; // 红色中奖号码

    @Column(length = 2, nullable = false)
    private String blueNumber; // 蓝色中奖号码

    @Column(nullable = false)
    private Integer redSum; // 红球和值

    @Column(nullable = false)
    private Integer redSpan; //红球跨度

    @Column(length = 5, nullable = false)
    private String redOldEven; // 红球奇偶比

    @Column(length = 5, nullable = false)
    private String redMaxMin; // 红球大小比

    /**
     * Getter Setter
     */
    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIssue() {
        return issue;
    }

    public void setIssue(String issue) {
        this.issue = issue;
    }

    public Date getLotteryDate() {
        return lotteryDate;
    }

    public void setLotteryDate(Date lotteryDate) {
        this.lotteryDate = lotteryDate;
    }

    public String[] getRedNumbers() {
        return redNumbers;
    }

    public void setRedNumbers(String[] redNumbers) {
        this.redNumbers = redNumbers;
    }

    public String getBlueNumber() {
        return blueNumber;
    }

    public void setBlueNumber(String blueNumber) {
        this.blueNumber = blueNumber;
    }

    public Integer getRedSum() {
        return redSum;
    }

    public void setRedSum(Integer redSum) {
        this.redSum = redSum;
    }

    public Integer getRedSpan() {
        return redSpan;
    }

    public void setRedSpan(Integer redSpan) {
        this.redSpan = redSpan;
    }

    public String getRedOldEven() {
        return redOldEven;
    }

    public void setRedOldEven(String redOldEven) {
        this.redOldEven = redOldEven;
    }

    public String getRedMaxMin() {
        return redMaxMin;
    }

    public void setRedMaxMin(String redMaxMin) {
        this.redMaxMin = redMaxMin;
    }

    public String getWinNumber() {
        return winNumber;
    }

    public void setWinNumber(String winNumber) {
        this.winNumber = winNumber;
    }

    /**
     * toString
     */
    @Override
    public String toString() {
        return "WinNumber{" +
                "id='" + id + '\'' +
                ", issue='" + issue + '\'' +
                ", lotteryDate=" + lotteryDate +
                ", winNumber='" + winNumber + '\'' +
                ", redNumbers=" + Arrays.toString(redNumbers) +
                ", blueNumber='" + blueNumber + '\'' +
                ", redSum=" + redSum +
                ", redSpan=" + redSpan +
                ", redOldEven='" + redOldEven + '\'' +
                ", redMaxMin='" + redMaxMin + '\'' +
                '}';
    }
}
