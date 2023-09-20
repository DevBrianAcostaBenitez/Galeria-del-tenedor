package com.brian.Galeriadeltenedor.controllers;

import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.services.UsersService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UsersController.class)
public class UsersControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UsersService usersService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testGetUsers() throws Exception {
        Users user = new Users("brian", "1234", "admin");
        user.setId(1L);
        ArrayList<Users> usersList = new ArrayList<>();
        usersList.add(user);
        when(usersService.getUsers()).thenReturn(usersList);

        mockMvc.perform(get("/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(user.getId()))
                .andExpect(jsonPath("$[0].username").value(user.getUsername()))
                .andExpect(jsonPath("$[0].password").value(user.getPassword()))
                .andExpect(jsonPath("$[0].role").value(user.getRole()));
    }

    @Test
    public void testSaveUser() throws Exception {
        Users user = new Users("brian", "1234", "admin");
        user.setId(1L);
        when(usersService.saveUser(any(Users.class))).thenReturn(user);

        mockMvc.perform(post("/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.username").value(user.getUsername()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.role").value(user.getRole()));
    }

    @Test
    public void testGetUserById() throws Exception {
        Users user = new Users("brian", "1234", "admin");
        user.setId(1L);
        when(usersService.getById(1L)).thenReturn(Optional.of(user));

        mockMvc.perform(get("/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.username").value(user.getUsername()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.role").value(user.getRole()));
    }

    @Test
    public void testUpdateUserById() throws Exception {
        Users user = new Users("brian", "1234", "admin");
        user.setId(1L);
        when(usersService.updateById(any(Users.class), eq(1L))).thenReturn(user);

        mockMvc.perform(put("/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(user.getId()))
                .andExpect(jsonPath("$.username").value(user.getUsername()))
                .andExpect(jsonPath("$.password").value(user.getPassword()))
                .andExpect(jsonPath("$.role").value(user.getRole()));
    }

    @Test
    public void testDeleteUserById() throws Exception {
        when(usersService.deleteUser(1L)).thenReturn(true);

        mockMvc.perform(delete("/users/1"))
                .andExpect(status().isOk())
                .andExpect(content().string("User with id 1 deleted"));
    }
}
