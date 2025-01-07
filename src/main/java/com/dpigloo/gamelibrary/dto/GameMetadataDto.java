package com.dpigloo.gamelibrary.dto;

import lombok.Data;

@Data
public class GameMetadataDto {

  private long gameId;
  private long userId;
  private Boolean completed;
  private Boolean currentlyPlaying;
  private Long rating;
  private String notes;
}
