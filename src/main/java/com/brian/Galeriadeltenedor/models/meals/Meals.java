package com.brian.Galeriadeltenedor.models.meals;
import com.brian.Galeriadeltenedor.models.types.Types;
import jakarta.persistence.*;

@Entity
@Table(name = "meals")
public class Meals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "type")
    private Types type;

    @Column(name = "ingredients", nullable = false,columnDefinition = "LONGTEXT")
    private String ingredients;

    @Column(name = "recipe", nullable = false,  columnDefinition = "LONGTEXT")
    private String recipe;

   @Column(name = "imgUrl", nullable = false)
    private String imgUrl;

    public Meals() {
    }

    public Meals(String name, Types type, String ingredients, String recipe,  String  imgUrl) {
        this.name = name;
        this.type = type;
        this.ingredients = ingredients;
        this.recipe = recipe;
        this.imgUrl = imgUrl;
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

    public Types getType() {
        return type;
    }

    public void setType(Types type) {
        this.type = type;
    }
    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }
     public String getRecipe() {
        return recipe;
    }

    public void setRecipe(String recipe) {
        this.recipe = recipe;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String  imgUrl) {
        this.imgUrl = imgUrl;
    }
}
