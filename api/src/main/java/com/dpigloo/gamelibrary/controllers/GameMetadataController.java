package com.dpigloo.gamelibrary.controllers;

import com.dpigloo.gamelibrary.dto.GameMetadataDto;
import com.dpigloo.gamelibrary.services.GameMetadataService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/games/meta")
public class GameMetadataController {

  private final GameMetadataService gameMetadataService;
  private final Logger logger = LoggerFactory.getLogger(GameMetadataController.class);

  public GameMetadataController(GameMetadataService gameMetadataService) {
    this.gameMetadataService = gameMetadataService;
  }

  @GetMapping
  public ResponseEntity<GameMetadataDto> getGameMetadata(@RequestParam long gameId, @AuthenticationPrincipal User user) {
    GameMetadataDto gameMetadata = gameMetadataService.getGameMetadataById(gameId, user);
    if (gameMetadata == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return ResponseEntity.ok(gameMetadata);
  }

  @PatchMapping
  public ResponseEntity<GameMetadataDto> updateGameMetadata(@RequestParam long gameId, @RequestBody GameMetadataDto gameMetadataDto, @AuthenticationPrincipal User user) {
    gameMetadataDto.setGameId(gameId);
    GameMetadataDto updatedGameMetadataDto = gameMetadataService.updateGameMetadata(gameMetadataDto, user);
    if (updatedGameMetadataDto == null) {
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(updatedGameMetadataDto, HttpStatus.OK);
  }
}
