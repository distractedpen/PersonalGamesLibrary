package com.dpigloo.gamelibrary.services.impl;

import com.dpigloo.gamelibrary.dto.GameMetadataDto;
import com.dpigloo.gamelibrary.models.GameMetadata;
import com.dpigloo.gamelibrary.repositories.GameMetadataRepository;
import com.dpigloo.gamelibrary.services.GameMetadataService;
import com.dpigloo.gamelibrary.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GameMetadataServiceImpl implements GameMetadataService {

  private final GameMetadataRepository gameMetadataRepository;
  private final UserService userService;

  @Autowired
  public GameMetadataServiceImpl(UserService userService, GameMetadataRepository repository) {
    this.gameMetadataRepository = repository;
    this.userService = userService;
  }

  @Override
  public void createGameMetadata(long gameId, int userId) {
    GameMetadata gameMetadata = new GameMetadata();
    gameMetadata.setUserId(userId);
    gameMetadata.setGameId(gameId);
    gameMetadata.setCurrentlyPlaying(false);
    gameMetadata.setCompleted(false);
    gameMetadata.setRating(0);
    gameMetadata.setNotes("");

    GameMetadata newGameMetadata = gameMetadataRepository.save(gameMetadata);
    mapGameMetadataToGameMetadataDto(newGameMetadata);
  }

  @Override
  public GameMetadataDto getGameMetadataById(long gameId, User user) {
    Integer userId = userService.getUserId(user);
    if (userId == null) {
      return null;
    }
    Optional<GameMetadata> gameMetadata = gameMetadataRepository.findGameById(gameId, userId);
    return gameMetadata.map(this::mapGameMetadataToGameMetadataDto).orElse(null);
  }

  @Override
  public GameMetadataDto updateGameMetadata(GameMetadataDto gameMetadataDto, User user) {
    Integer userId = userService.getUserId(user);
    if (userId == null) {
      return null;
    }
    Optional<GameMetadata> gameMetadata = gameMetadataRepository.findGameById(gameMetadataDto.getGameId(), userId);
    if (gameMetadata.isEmpty()) {
      return null;
    }

    GameMetadata gameMetadataToUpdate = gameMetadata.get();
    if (gameMetadataDto.getCurrentlyPlaying() != null) {
      gameMetadataToUpdate.setCurrentlyPlaying(gameMetadataDto.getCurrentlyPlaying());
    }

    if (gameMetadataDto.getCompleted() != null) {
      gameMetadataToUpdate.setCompleted(gameMetadataDto.getCompleted());
    }

    if (gameMetadataDto.getRating() != null) {
      gameMetadataToUpdate.setRating(gameMetadataDto.getRating());
    }

    if (gameMetadataDto.getNotes() != null) {
      gameMetadataToUpdate.setNotes(gameMetadataDto.getNotes());
    }

    gameMetadataRepository.save(gameMetadataToUpdate);
    return mapGameMetadataToGameMetadataDto(gameMetadataToUpdate);
  }

  @Override
  public void deleteGameMetadata(long gameId, int userId) {
    Optional<GameMetadata> gameMetadata = gameMetadataRepository.findGameById(gameId, userId);
    if (gameMetadata.isEmpty()) {
      return;
    }
    GameMetadata gameMetadataToDelete = gameMetadata.get();
    gameMetadataRepository.delete(gameMetadataToDelete);
    mapGameMetadataToGameMetadataDto(gameMetadataToDelete);
  }


  private GameMetadataDto mapGameMetadataToGameMetadataDto(GameMetadata gameMetadata) {
    GameMetadataDto gameMetadataDto = new GameMetadataDto();
    gameMetadataDto.setUserId(gameMetadata.getUserId());
    gameMetadataDto.setGameId(gameMetadata.getGameId());
    gameMetadataDto.setCompleted(gameMetadata.getCompleted());
    gameMetadataDto.setCurrentlyPlaying(gameMetadata.getCurrentlyPlaying());
    gameMetadataDto.setRating(gameMetadata.getRating());
    gameMetadataDto.setNotes(gameMetadata.getNotes());
    return gameMetadataDto;
  }


}
