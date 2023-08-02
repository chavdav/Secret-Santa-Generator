package com.temporary.santa.controller;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/test")
public class TestController {

    @RequestMapping("/simpleTest")
    public String returnString() {
        return "This is a simple API test";
    }
    
    @RequestMapping("/string")
    public void stringChecker(@RequestParam String s) {
        System.out.println(s);
    }
    
    @RequestMapping("/date")
    public void dateChecker(@RequestParam String date) {
        System.out.println( LocalDate.parse(date));
    }
    
    @RequestMapping("/int")
    public void dateChecker(@RequestParam int i) {
        System.out.println(i);
    }
}
