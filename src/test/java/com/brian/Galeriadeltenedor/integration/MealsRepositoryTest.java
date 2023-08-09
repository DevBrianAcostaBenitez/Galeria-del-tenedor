package com.brian.Galeriadeltenedor.integration;

import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.repositories.MealsRepository;
import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.repositories.TypesRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MealsRepositoryTest {

    @Autowired
    private MealsRepository mealsRepository;

    @Autowired
    private TypesRepository typesRepository; 
    @Test
    public void testSaveAndFindById() {
        Types type = new Types("Main Dish");
        Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");
        Meals savedMeal = mealsRepository.save(meal);
        Optional<Meals> foundMeal = mealsRepository.findById(savedMeal.getId());

        assertTrue(foundMeal.isPresent());
        assertEquals(savedMeal, foundMeal.get());
    }

    @Test
    public void testFindByNonexistentId() {
        Optional<Meals> meal = mealsRepository.findById(-1L);
        assertFalse(meal.isPresent());
    }

    @Test
    public void testFindAll() {
        Types type1 = new Types("Main Dish");
        Types type2 = new Types("Appetizer");

        typesRepository.save(type1);
        typesRepository.save(type2);

        Meals meal1 = new Meals("Pasta", type1, "Ingredients", "Recipe", "imgUrl");
        Meals meal2 = new Meals("Pizza", type2, "Ingredients", "Recipe", "imgUrl");

        mealsRepository.saveAll(List.of(meal1, meal2));

        List<Meals> mealsList = mealsRepository.findAll();

        assertEquals(2, mealsList.size());
    }

    @Test
    public void testDeleteById() {
        Types type = new Types("Main Dish");
        Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");
        Meals savedMeal = mealsRepository.save(meal);

        mealsRepository.deleteById(savedMeal.getId());
        Optional<Meals> deletedMeal = mealsRepository.findById(savedMeal.getId());

        assertFalse(deletedMeal.isPresent());
    }
}
