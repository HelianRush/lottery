package com.lottery.service;

import com.lottery.entity.WinNumber;


import java.util.List;

public interface WinNumberService {

    /**
     * query
     */
    List<WinNumber> queryAll();

    // 获取最新三期
    List<WinNumber> getNewTop(int pageSize);

    /**
     * insert & update for Entity\Entitys
     */
    void saveEntity(WinNumber entity);

    void saveEntitys(List<WinNumber> entitys);

    List<WinNumber> getSelectList(String[] issues);

    /**
     * delete by id\Entity\Entitys
     */
    void deleteById(String id);

    void deleteByEntity(WinNumber entity);

    void deleteByEntitys(List<WinNumber> entitys);


}
