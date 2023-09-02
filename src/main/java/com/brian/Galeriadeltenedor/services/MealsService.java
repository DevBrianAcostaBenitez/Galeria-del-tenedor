package com.brian.Galeriadeltenedor.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.repositories.MealsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MealsService {
    private final MealsRepository mealsRepository;

    @Autowired
    public MealsService(MealsRepository mealsRepository) {
        this.mealsRepository= mealsRepository;
    }

    public List<Meals> getAllMeals() {
        return mealsRepository.findAll();
    }

    public Optional<Meals> getMealById(Long id) {
        return mealsRepository.findById(id);
    }

    public Meals saveMeal(Meals meal) {
        return mealsRepository.save(meal);
    }

    public Meals updateMealById(Long id, Meals updatedMeal) {
        Optional<Meals> optionalMeal = mealsRepository.findById(id);
        if (optionalMeal.isPresent()) {
            Meals existingMeal = optionalMeal.get();
            existingMeal.setName(updatedMeal.getName());
            existingMeal.setType(updatedMeal.getType());
            existingMeal.setIngredients(updatedMeal.getIngredients());
            existingMeal.setRecipe(updatedMeal.getRecipe());
            existingMeal.setImgUrl(updatedMeal.getImgUrl());
            return mealsRepository.save(existingMeal);
        } else {
            throw new RuntimeException("Meal not found with id: " + id);
        }
    }

    public boolean deleteMeal(Long id) {
        if (mealsRepository.existsById(id)) {
            mealsRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
