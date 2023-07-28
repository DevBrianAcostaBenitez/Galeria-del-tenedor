package com.brian.Galeriadeltenedor.repositories;


import com.brian.Galeriadeltenedor.models.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
}

