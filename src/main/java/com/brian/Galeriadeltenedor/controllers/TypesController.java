package com.brian.Galeriadeltenedor.controllers;

import java.util.ArrayList;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.services.TypesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("types")
public class TypesController {
     
    @Autowired
    private TypesService typesService;

    @GetMapping
    public ArrayList<Types> getTypes() {
        return this.typesService.getTypes();
    }
}