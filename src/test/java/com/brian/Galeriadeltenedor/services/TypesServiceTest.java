package com.brian.Galeriadeltenedor.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.repositories.TypesRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TypesServiceTest {

    private TypesService typesService;
    private TypesRepository typesRepository;

    @BeforeEach
    public void setUp() {
        typesRepository = mock(TypesRepository.class);
        typesService = new TypesService(typesRepository);
    }

    @Test
    public void testGetTypes() {
        List<Types> typesList = new ArrayList<>();
        typesList.add(new Types("Main Dish"));
        typesList.add(new Types("Appetizer"));

        when(typesRepository.findAll()).thenReturn(typesList);

        List<Types> result = typesService.getTypes();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetById() {
        Long typeId = 1L;
        Types type = new Types("Main Dish");

        when(typesRepository.findById(typeId)).thenReturn(Optional.of(type));

        Optional<Types> result = typesService.getById(typeId);

        assertTrue(result.isPresent());
        assertEquals("Main Dish", result.get().getName());
    }
}
