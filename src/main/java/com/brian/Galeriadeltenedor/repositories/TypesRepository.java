package com.brian.Galeriadeltenedor.repositories;


import com.brian.Galeriadeltenedor.models.types.Types;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypesRepository extends JpaRepository<Types, Long> {
}

