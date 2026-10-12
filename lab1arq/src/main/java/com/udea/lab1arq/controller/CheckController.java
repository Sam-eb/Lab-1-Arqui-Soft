package com.udea.lab1arq.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/status")
@CrossOrigin(origins = "http://localhost:5173")
public class CheckController {
    
    @GetMapping("/")
    public String healthCheck() {
        return "HEALTH CHECK OK!";
    }
    
}
