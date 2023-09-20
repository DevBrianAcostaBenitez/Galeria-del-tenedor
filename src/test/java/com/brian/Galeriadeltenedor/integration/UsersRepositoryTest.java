package com.brian.Galeriadeltenedor.integration;

import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.repositories.UsersRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsersRepositoryTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    public void testSaveUser() {
        Users user = new Users("testuser", "password", "ROLE_USER");
        Users savedUser = usersRepository.save(user);
        assertEquals(user.getUsername(), savedUser.getUsername());
    }

    @Test
    public void testFindUserById() {
        Users user = new Users("testuser", "password", "ROLE_USER");
        Users savedUser = usersRepository.save(user);
        
        Users retrievedUser = usersRepository.findById(savedUser.getId()).orElse(null);
        assertEquals(savedUser.getId(), retrievedUser.getId());
    }

    @Test
    public void testUpdateUser() {
        Users user = new Users("testuser", "password", "ROLE_USER");
        Users savedUser = usersRepository.save(user);

        savedUser.setUsername("updatedusername");
        Users updatedUser = usersRepository.save(savedUser);

        assertEquals("updatedusername", updatedUser.getUsername());
    }

    @Test
    public void testDeleteUser() {
        Users user = new Users("testuser", "password", "ROLE_USER");
        Users savedUser = usersRepository.save(user);

        usersRepository.deleteById(savedUser.getId());
        assertFalse(usersRepository.existsById(savedUser.getId()));
    }

    @Test
    public void testUserCount() {
        long initialCount = usersRepository.count();

        Users user1 = new Users("testuser1", "password", "ROLE_USER");
        Users user2 = new Users("testuser2", "password", "ROLE_USER");

        usersRepository.save(user1);
        usersRepository.save(user2);

        long finalCount = usersRepository.count();
        assertEquals(initialCount + 2, finalCount);
    }
}
