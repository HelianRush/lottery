package com.lottery.service.impl;


import com.lottery.entity.WinNumber;
import com.lottery.repository.WinNumberRepository;
import com.lottery.service.WinNumberService;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;


// @Resource是根据名称注入
// @Autowired是根据类型注入
@Service
@Transactional
public class WinNumberServiceImpl implements WinNumberService {

    private static Logger logger = LoggerFactory.getLogger(WinNumberServiceImpl.class);

    @Autowired
    private WinNumberRepository winNumberRepository;

    /**
     * query
     */
    @Override
    public List<WinNumber> queryAll() {
        // Sort.Order order = new Sort.Order(Sort.Direction.ASC, "id");
        // Sort sort = new Sort(order);
        return winNumberRepository.queryAllByDesc();
    }

    // 获取最新3-5期
    @Override
    public List<WinNumber> getNewTop(int pageSize) {
        return winNumberRepository.queryMsaNew3(pageSize);
    }

    // 获取勾选信息
    @Override
    public List<WinNumber> getSelectList(String[] issues) {
        return winNumberRepository.querySelectList(issues);
//        return null;
    }

    /**
     * insert & update for Entity\Entitys
     */
    @Override
    public void saveEntity(WinNumber entity) {
        if (null != entity)
            winNumberRepository.save(entity);
    }

    @Override
    public void saveEntitys(List<WinNumber> entitys) {
        if (null == entitys)
            return;

        if (0 < entitys.size())
            winNumberRepository.saveAll(entitys);
    }

    /**
     * delete by id\Entity\Entitys
     */
    @Override
    public void deleteById(String id) {
        if (StringUtils.isNotBlank(id))
            winNumberRepository.deleteById(id);
    }

    @Override
    public void deleteByEntity(WinNumber entity) {
        if (null != entity)
            winNumberRepository.delete(entity);
    }

    @Override
    public void deleteByEntitys(List<WinNumber> entitys) {
        if (0 < entitys.size())
            winNumberRepository.deleteAll(entitys);
    }

}
