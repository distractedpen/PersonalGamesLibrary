package com.dpigloo.gamelibrary.services;

import com.dpigloo.gamelibrary.dto.GameDto;

import java.util.List;

public interface GameService {
    GameDto createGame(GameDto gameDto);
    List<GameDto> getAllGames();
    GameDto getGameById(long id);
    GameDto updateGame(long id, GameDto gameDto);
    GameDto deleteGame(long id);

}
