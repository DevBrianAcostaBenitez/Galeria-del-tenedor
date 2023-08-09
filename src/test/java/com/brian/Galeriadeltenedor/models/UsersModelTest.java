package com.brian.Galeriadeltenedor.models;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.brian.Galeriadeltenedor.models.users.Users;

import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsersModelTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testUsersModel() {
        Users user = new Users("john", "password", "admin");
        entityManager.persistAndFlush(user);

        Users foundUser = entityManager.find(Users.class, user.getId());

        assertEquals("john", foundUser.getUsername());
        assertEquals("password", foundUser.getPassword());
        assertEquals("admin", foundUser.getRole());
    }
}