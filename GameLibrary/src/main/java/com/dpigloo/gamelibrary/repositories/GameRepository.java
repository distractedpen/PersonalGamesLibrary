package com.dpigloo.gamelibrary.repositories;

import com.dpigloo.gamelibrary.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
