package com.brian.Galeriadeltenedor.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.repositories.UsersRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UsersServiceTest {

    private UsersService usersService;
    private UsersRepository usersRepository;

    @BeforeEach
    public void setUp() {
        usersRepository = mock(UsersRepository.class);
        usersService = new UsersService(usersRepository);
    }

    @Test
    public void testGetUsers() {
        List<Users> usersList = new ArrayList<>();
        usersList.add(new Users("user1", "password1", "role1"));
        usersList.add(new Users("user2", "password2", "role2"));

        when(usersRepository.findAll()).thenReturn(usersList);

        List<Users> result = usersService.getUsers();

        assertEquals(2, result.size());
    }

    @Test
    public void testSaveUser() {
        Users userToSave = new Users("newUser", "newPassword", "newRole");
        Users savedUser = new Users("newUser", "newPassword", "newRole");

        when(usersRepository.save(userToSave)).thenReturn(savedUser);

        Users result = usersService.saveUser(userToSave);

        assertNotNull(result);
        assertEquals("newUser", result.getUsername());
    }

    @Test
    public void testGetById() {
        Long userId = 1L;
        Users user = new Users("user1", "password1", "role1");

        when(usersRepository.findById(userId)).thenReturn(Optional.of(user));

        Optional<Users> result = usersService.getById(userId);

        assertTrue(result.isPresent());
        assertEquals("user1", result.get().getUsername());
    }

    @Test
    public void testUpdateById() {
        Long userId = 1L;
        Users existingUser = new Users("user1", "password1", "role1");
        Users updatedUser = new Users("updatedUser", "updatedPassword", "updatedRole");

        when(usersRepository.existsById(userId)).thenReturn(true);
        when(usersRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(usersRepository.save(existingUser)).thenReturn(updatedUser);

        Users result = usersService.updateById(updatedUser, userId);

        assertNotNull(result);
        assertEquals("updatedUser", result.getUsername());
    }

    @Test
    public void testUpdateByIdNonExistentUser() {
        Long userId = 1L;
        Users updatedUser = new Users("updatedUser", "updatedPassword", "updatedRole");

        when(usersRepository.existsById(userId)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> usersService.updateById(updatedUser, userId));
    }

    @Test
    public void testDeleteUser() {
        Long userId = 1L;

        when(usersRepository.existsById(userId)).thenReturn(true);

        boolean result = usersService.deleteUser(userId);

        assertTrue(result);
        verify(usersRepository, times(1)).deleteById(userId);
    }

    @Test
    public void testDeleteUserNonExistentUser() {
        Long userId = 3L;

        when(usersRepository.existsById(userId)).thenReturn(false);

        boolean result = usersService.deleteUser(userId);

        assertFalse(result); 
        verify(usersRepository, never()).deleteById(userId);
    }

}
