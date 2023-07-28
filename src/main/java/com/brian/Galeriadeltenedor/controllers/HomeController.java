package com.brian.Galeriadeltenedor.controllers;

import java.util.List;

import com.brian.Galeriadeltenedor.repositories.UsersRepository;

import com.brian.Galeriadeltenedor.models.users.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @Autowired
    UsersRepository repository;
    public HomeController(UsersRepository repo){
        this.repository = repo;
    }
    @GetMapping(path = "/usersfsd")
    public List<Users> index(){
        List<Users> users = repository.findAll();
        return users;
    }
}
