package com.brian.Galeriadeltenedor.controllers;

import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.services.MealsService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MealsController.class)
public class MealsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MealsService mealsService;

@Test
public void testGetAllMeals() throws Exception {
    Types type = new Types("Main Dish");
    Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");

    when(mealsService.getAllMeals()).thenReturn(Collections.singletonList(meal));

    mockMvc.perform(get("/meals"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].name").value(meal.getName()))
            .andExpect(jsonPath("$[0].type.name").value(meal.getType().getName()))
            .andExpect(jsonPath("$[0].ingredients").value(meal.getIngredients()))
            .andExpect(jsonPath("$[0].recipe").value(meal.getRecipe()))
            .andExpect(jsonPath("$[0].imgUrl").value(meal.getImgUrl())); 
}

@Test
public void testGetMealById() throws Exception {
    Types type = new Types("Main Dish");
    Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");
    when(mealsService.getMealById(1L)).thenReturn(Optional.of(meal));

    mockMvc.perform(get("/meals/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value(meal.getName()))
            .andExpect(jsonPath("$.type.name").value(meal.getType().getName()))
            .andExpect(jsonPath("$.ingredients").value(meal.getIngredients()))
            .andExpect(jsonPath("$.recipe").value(meal.getRecipe()))
            .andExpect(jsonPath("$.imgUrl").value(meal.getImgUrl())); 
}


@Test
public void testSaveMeal() throws Exception {
    Types type = new Types("Main Dish");
    Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");

    when(mealsService.saveMeal(any())).thenReturn(meal);

    mockMvc.perform(post("/meals")
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(meal)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value(meal.getName()))
            .andExpect(jsonPath("$.type.name").value(meal.getType().getName()))
            .andExpect(jsonPath("$.ingredients").value(meal.getIngredients()))
            .andExpect(jsonPath("$.recipe").value(meal.getRecipe()))
            .andExpect(jsonPath("$.imgUrl").value(meal.getImgUrl())); 
}

    @Test
    public void testUpdateMealById() throws Exception {
        Types type = new Types("Main Dish");
        Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");

        when(mealsService.updateMealById(any(), any())).thenReturn(meal);

        mockMvc.perform(put("/meals/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(meal)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(meal.getName()))
                .andExpect(jsonPath("$.type.name").value(meal.getType().getName()))
                .andExpect(jsonPath("$.ingredients").value(meal.getIngredients()))
                .andExpect(jsonPath("$.recipe").value(meal.getRecipe()))
                .andExpect(jsonPath("$.imgUrl").value(meal.getImgUrl())); 
}

}
