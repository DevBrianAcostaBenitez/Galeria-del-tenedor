package com.brian.Galeriadeltenedor.repositories;


import com.brian.Galeriadeltenedor.models.meals.Meals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealsRepository extends JpaRepository<Meals, Long> {
}

