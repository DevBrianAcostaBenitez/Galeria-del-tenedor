package com.brian.Galeriadeltenedor.services;

import java.util.ArrayList;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.repositories.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public ArrayList<Users> getUsers() {
        return (ArrayList<Users>) usersRepository.findAll();
    }

    public Users saveUser(Users users) {
        return usersRepository.save(users);
    }

    public Optional<Users> getById(Long id) {
        return usersRepository.findById(id);
    }

    public Users updateById(Users request, Long id) {
        if (usersRepository.existsById(id)) {
            Users user = usersRepository.findById(id).get();
            user.setUsername(request.getUsername());
            user.setPassword(request.getPassword());
            return usersRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public Boolean deleteUser(Long id) {
        if ( usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
            return true;
        } else {
            System.out.println("Error trying to delete the user with ID: " + id);
            return false;
        }
    }
}
