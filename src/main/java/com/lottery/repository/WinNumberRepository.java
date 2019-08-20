package com.lottery.repository;

import com.lottery.entity.WinNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.Repository;

import java.util.List;


public interface WinNumberRepository extends Repository<WinNumber, String>, CrudRepository<WinNumber, String>, PagingAndSortingRepository<WinNumber, String>, JpaRepository<WinNumber, String> {

    /**
     * Query
     */
    /* 查询分析数据，2-5个数据 */
    @Query(nativeQuery = true, value = "select * from win_number order by issue DESC LIMIT 0,?1")
    List<WinNumber> queryMsaNew3(int pageSize); //@Param("pageSize") int pageSize

    @Query(value = "select wn from WinNumber wn order by wn.issue DESC")
    List<WinNumber> queryAllByDesc();

    @Query(value = "select wn from WinNumber wn where wn.issue in ?1 order by wn.issue DESC")
    List<WinNumber> querySelectList(String[] issues);

    // @Query(value = "select wn from WinNumber wn where wn.id = 1 order by wn.id asc")
    // public List<WinNumber> findAllById();

    // insert & update for Entity\Entitys
    // delete by id\Entity\EntitysW

}
