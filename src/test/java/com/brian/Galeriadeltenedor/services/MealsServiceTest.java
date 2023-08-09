package com.brian.Galeriadeltenedor.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.repositories.MealsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class MealsServiceTest {

    private MealsService mealsService;
    private MealsRepository mealsRepository;

    @BeforeEach
    public void setUp() {
        mealsRepository = mock(MealsRepository.class);
        mealsService = new MealsService(mealsRepository);
    }

    @Test
    public void testGetAllMeals() {
        List<Meals> mealsList = new ArrayList<>();
        mealsList.add(new Meals("Pasta", new Types("Main Dish"), "Ingredients", "Recipe", "imgUrl"));
        mealsList.add(new Meals("Pizza", new Types("Appetizer"), "Ingredients", "Recipe", "imgUrl"));

        when(mealsRepository.findAll()).thenReturn(mealsList);

        List<Meals> result = mealsService.getAllMeals();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetMealById() {
        Long mealId = 1L;
        Meals meal = new Meals("Pasta", new Types("Main Dish"), "Ingredients", "Recipe", "imgUrl");

        when(mealsRepository.findById(mealId)).thenReturn(Optional.of(meal));

        Optional<Meals> result = mealsService.getMealById(mealId);

        assertTrue(result.isPresent());
        assertEquals("Pasta", result.get().getName());
    }

    @Test
    public void testSaveMeal() {
        Meals mealToSave = new Meals("Sushi", new Types("Appetizer"), "Ingredients", "Recipe", "imgUrl");
        Meals savedMeal = new Meals("Sushi", new Types("Appetizer"), "Ingredients", "Recipe", "imgUrl");

        when(mealsRepository.save(mealToSave)).thenReturn(savedMeal);

        Meals result = mealsService.saveMeal(mealToSave);

        assertNotNull(result);
        assertEquals("Sushi", result.getName());
    }

    @Test
    public void testUpdateMealById() {
        Long mealId = 1L;
        Meals existingMeal = new Meals("Pasta", new Types("Main Dish"), "Ingredients", "Recipe", "imgUrl");
        Meals updatedMeal = new Meals("Updated Pasta", new Types("Main Dish"), "Updated Ingredients", "Updated Recipe", "Updated imgUrl");
        
        when(mealsRepository.findById(mealId)).thenReturn(Optional.of(existingMeal));
        when(mealsRepository.save(existingMeal)).thenReturn(updatedMeal);
        
        Meals result = mealsService.updateMealById(mealId, updatedMeal);
        
        assertNotNull(result);
        assertEquals("Updated Pasta", result.getName());
    }
    
    @Test
    public void testUpdateMealByIdNonExistentMeal() {
        Long mealId = 1L;
        Meals updatedMeal = new Meals("Updated Pasta", new Types("Main Dish"), "Updated Ingredients", "Updated Recipe", "Updated imgUrl");
        
        when(mealsRepository.findById(mealId)).thenReturn(Optional.empty());
        
        assertThrows(RuntimeException.class, () -> mealsService.updateMealById(mealId, updatedMeal));
    }
    
    @Test
    public void testDeleteMeal() {
        Long mealId = 1L;
    
        when(mealsRepository.existsById(mealId)).thenReturn(true);
    
        boolean result = mealsService.deleteMeal(mealId);
    
        assertTrue(result);
        verify(mealsRepository, times(1)).deleteById(mealId);
    }
    
    @Test
    public void testDeleteMealNonExistentMeal() {
        Long mealId = 3L;
    
        when(mealsRepository.existsById(mealId)).thenReturn(false);
    
        boolean result = mealsService.deleteMeal(mealId);
    
        assertFalse(result);
        verify(mealsRepository, never()).deleteById(mealId);
    }

}
