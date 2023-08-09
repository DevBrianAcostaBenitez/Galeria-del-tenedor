package com.brian.Galeriadeltenedor.models;
import com.brian.Galeriadeltenedor.models.meals.Meals;
import com.brian.Galeriadeltenedor.models.types.Types;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class MealsModelTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testMealsModel() {
        Types type = new Types("Main Dish");
        entityManager.persistAndFlush(type);

        Meals meal = new Meals("Pasta", type, "Ingredients", "Recipe", "imgUrl");
        entityManager.persistAndFlush(meal);

        Meals foundMeal = entityManager.find(Meals.class, meal.getId());

        assertEquals("Pasta", foundMeal.getName());
        assertEquals(type.getName(), foundMeal.getType().getName());
        assertEquals("Ingredients", foundMeal.getIngredients());
        assertEquals("Recipe", foundMeal.getRecipe());
        assertEquals("imgUrl", foundMeal.getImgUrl());
    }
}
