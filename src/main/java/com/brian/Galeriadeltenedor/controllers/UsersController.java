package com.brian.Galeriadeltenedor.controllers;
import java.util.ArrayList;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.users.Users;
import com.brian.Galeriadeltenedor.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UsersController {

  @Autowired
  private UsersService usersService;

  @GetMapping
  public ArrayList<Users> getUsers() {
    return this.usersService.getUsers();
  }

  @PostMapping
  public Users saveUser(@RequestBody Users user) {
    return this.usersService.saveUser(user);
  }

  @GetMapping(path = "/{id}")
  public Optional<Users> getUserById(@PathVariable Long id) {
    return this.usersService.getById(id);
  }

  @PutMapping(path = "/{id}")
  public Users updateUserById(@RequestBody Users request, @PathVariable("id") Long id) {
    return this.usersService.updateById(request, id);
  }

  @DeleteMapping(path = "/{id}")
  public String deleteById(@PathVariable("id") Long id) {
    boolean ok = this.usersService.deleteUser(id);

    if (ok) {
      return "User with id " + id + " deleted";
    } else {
      return "Error, we have a problem and cant deliver" + id + "que te follen";
    }
  }

}