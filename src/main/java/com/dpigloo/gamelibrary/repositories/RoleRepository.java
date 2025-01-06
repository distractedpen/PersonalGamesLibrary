package com.dpigloo.gamelibrary.repositories;

import com.dpigloo.gamelibrary.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(String name);
}
