package com.lottery.utils;

import java.io.Serializable;
import java.util.Date;

public class SystemUtils implements Serializable {

    private static final long serialVersionUID = -4391816271909813542L;

    public static String getID() {
        return String.valueOf(new Date().getTime());
    }
}
