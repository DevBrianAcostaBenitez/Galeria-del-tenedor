package com.brian.Galeriadeltenedor.controllers;

import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.services.TypesService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(TypesController.class)
public class TypesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TypesService typesService;

    @Test
    public void testGetTypes() throws Exception {
        List<Types> typesList = new ArrayList<>();
        typesList.add(new Types("Main Dish"));

        when(typesService.getTypes()).thenReturn(new ArrayList<>(typesList));

        mockMvc.perform(get("/types"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value(typesList.get(0).getName())); 
    }
}
