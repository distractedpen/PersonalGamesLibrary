package com.dpigloo.gamelibrary.services;

import com.dpigloo.gamelibrary.dto.GameMetadataDto;

import org.springframework.security.core.userdetails.User;

public interface GameMetadataService {
  void createGameMetadata(long gameId, int userId);
  GameMetadataDto getGameMetadataById(long gameId, User user);
  GameMetadataDto updateGameMetadata(GameMetadataDto gameMetadataDto, User user);
  void deleteGameMetadata(long gameId, int userId);
}
