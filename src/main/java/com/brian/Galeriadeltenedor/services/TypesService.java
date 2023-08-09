package com.brian.Galeriadeltenedor.services;

import java.util.ArrayList;
import java.util.Optional;

import com.brian.Galeriadeltenedor.models.types.Types;
import com.brian.Galeriadeltenedor.repositories.TypesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TypesService {

    private final TypesRepository typesRepository;

    @Autowired
    public TypesService(TypesRepository typesRepository) {
        this.typesRepository = typesRepository;
    }

    public ArrayList<Types> getTypes() {
        return (ArrayList<Types>) typesRepository.findAll();
    }

    public Optional<Types> getById(Long id) {
        return typesRepository.findById(id);
    }
}
