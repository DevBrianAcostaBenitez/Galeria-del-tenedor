package com.brian.Galeriadeltenedor.models;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.brian.Galeriadeltenedor.models.types.Types;

import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TypesModelTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testTypesModel() {
        Types type = new Types("Main Dish");
        entityManager.persistAndFlush(type);

        Types foundType = entityManager.find(Types.class, type.getId());

        assertEquals("Main Dish", foundType.getName());
    }
}