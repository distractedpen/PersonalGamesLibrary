package com.dpigloo.gamelibrary.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Games")
@ToString
public class Game {
    @Id
    private long id;
    private String name;
    private String cover;


    @ManyToMany(mappedBy = "library")
    private List<UserEntity> users = new ArrayList<>();

}
