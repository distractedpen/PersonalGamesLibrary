package com.dpigloo.gamelibrary.dto;

import java.util.List;

import lombok.Data;

@Data
public class GameDto {
    private long id;
    private String name;
    private List<String> developer;
    private List<String> genres;
    private String coverUrl;
}
