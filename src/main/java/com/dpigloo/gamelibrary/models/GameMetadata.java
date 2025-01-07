package com.dpigloo.gamelibrary.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(GameMetadataPK.class)
@Table(name = "GameMetadata")
@ToString
public class GameMetadata {
  @Id
  private long gameId;
  @Id
  private long userId;
  private Boolean completed;
  private Boolean currentlyPlaying;
  private long rating;
  private String notes;
}
