package com.lottery.controller;

import com.lottery.entity.WinNumber;
import com.lottery.service.WinNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class msaController {

    @Autowired
    private WinNumberService wnService;

    @RequestMapping(value = "/showMsa")
    public String showMsa(Model model) {
        // left_page WinNumber列表
        List<WinNumber> list = wnService.queryAll();
        model.addAttribute("wnList", list);

        String test = "TEST_DATA";
        model.addAttribute("test", test);

        return "msa";
    }

    @ResponseBody
    @RequestMapping(value = "/getWinNumberTopList")
    public List<WinNumber> getWinNumberTopList(@RequestParam("pageSize") int pageSize) {
        // 最新三期
        // int pageSize = 3;
        List<WinNumber> new3List = wnService.getNewTop(pageSize);
        // model.addAttribute("new3List", new3List);
        return new3List;
    }

    @ResponseBody
    @RequestMapping(value = "/getWinNumberSelectList")
    public List<WinNumber> getWinNumberSelectList(@RequestParam("issues") String[] issues) {

        if (0 == issues.length)
            return null;

        for (String issue : issues) {
            System.out.println(issue);
        }
        
        List<WinNumber> selectList = wnService.getSelectList(issues);
        return selectList;
    }

}
