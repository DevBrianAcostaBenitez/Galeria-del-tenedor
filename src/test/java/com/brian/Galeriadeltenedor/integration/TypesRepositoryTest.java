package com.brian.Galeriadeltenedor.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.repositories.TypesRepository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class TypesRepositoryTest {

    @Autowired
    private TypesRepository typesRepository;

    @Test
    public void testSaveAndFindById() {
        Types type = new Types("Main Dish");
        typesRepository.save(type);

        Optional<Types> savedType = typesRepository.findById(type.getId());

        assertTrue(savedType.isPresent());
        assertEquals("Main Dish", savedType.get().getName());
    }

    @Test
    public void testFindAll() {
        typesRepository.save(new Types("Main Dish"));
        typesRepository.save(new Types("Appetizer"));

        List<Types> typesList = typesRepository.findAll();

        assertEquals(2, typesList.size());
    }

    @Test
    public void testUpdate() {
        Types type = new Types("Main Dish");
        typesRepository.save(type);

        Optional<Types> savedType = typesRepository.findById(type.getId());
        assertTrue(savedType.isPresent());

        savedType.get().setName("Dessert");
        typesRepository.save(savedType.get());

        Optional<Types> updatedType = typesRepository.findById(type.getId());
        assertTrue(updatedType.isPresent());
        assertEquals("Dessert", updatedType.get().getName());
    }

    @Test
    public void testDelete() {
        Types type = new Types("Main Dish");
        typesRepository.save(type);

        Optional<Types> savedType = typesRepository.findById(type.getId());
        assertTrue(savedType.isPresent());

        typesRepository.delete(savedType.get());

        Optional<Types> deletedType = typesRepository.findById(type.getId());
        assertFalse(deletedType.isPresent());
    }
}
