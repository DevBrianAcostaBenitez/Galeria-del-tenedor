package com.brian.Galeriadeltenedor.controllers;
import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.services.MealsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meals")
public class MealsController {
    @Autowired
    private final MealsService mealsService;
    public MealsController(MealsService mealsService) {
        this.mealsService = mealsService;
    }

    @GetMapping
    public ResponseEntity<List<Meals>> getAllMeals() {
        List<Meals> meals = mealsService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meals> getMealById(@PathVariable Long id) {
        Optional<Meals> optionalMeal = mealsService.getMealById(id);
        if (optionalMeal.isPresent()) {
            Meals  meal = optionalMeal.get();
            return ResponseEntity.ok(meal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Meals> saveMeal(@RequestBody Meals meal) {
        Meals savedMeal = mealsService.saveMeal(meal);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMeal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meals> updateMealById(@PathVariable Long id, @RequestBody Meals updatedMeal) {
        Meals meal = mealsService.updateMealById(id, updatedMeal);
        return ResponseEntity.ok(meal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        boolean deleted = mealsService.deleteMeal(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
