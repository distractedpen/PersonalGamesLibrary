package com.dpigloo.gamelibrary.models;

import java.io.Serializable;
import java.util.Objects;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class GameMetadataPK implements Serializable {
  private long userId;
  private long gameId;

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof GameMetadataPK gameMetadataPK)) return false;
    return userId == gameMetadataPK.getUserId() && gameId == gameMetadataPK.getGameId();
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, gameId);
  }

}
