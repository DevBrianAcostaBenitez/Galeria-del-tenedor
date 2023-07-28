package com.brian.Galeriadeltenedor.models.meals;

import jakarta.persistence.*;

@Entity
@Table(name = "meals")
public class Meals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "ingredients", nullable = false)
    private String ingredients;

    @Column(name = "recipe", nullable = false)
    private String recipe;
    public Meals() {
    }

    public Meals(String name, String type,String ingredients, String recipe) {
        this.name = name;
        this.type = type;
        this.ingredients = ingredients;
        this.recipe = recipe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
     public String getRecipe() {
        return ingredients;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }
}
