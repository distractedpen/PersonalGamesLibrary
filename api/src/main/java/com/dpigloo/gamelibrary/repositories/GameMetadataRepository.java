package com.dpigloo.gamelibrary.repositories;

import com.dpigloo.gamelibrary.models.GameMetadata;
import com.dpigloo.gamelibrary.models.GameMetadataPK;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface GameMetadataRepository extends JpaRepository<GameMetadata, GameMetadataPK> {
  @Query("SELECT g FROM GameMetadata g WHERE g.gameId = :gameId AND g.userId = :userId")
  Optional<GameMetadata> findGameById(long gameId, long userId);

  @Query("SELECT g FROM GameMetadata g WHERE g.userId = :userId")
  List<GameMetadata> findGamesByUserId(long userId);

}
