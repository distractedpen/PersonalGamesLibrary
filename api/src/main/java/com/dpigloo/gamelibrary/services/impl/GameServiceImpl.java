package com.dpigloo.gamelibrary.services.impl;

import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.models.Game;
import com.dpigloo.gamelibrary.repositories.GameRepository;
import com.dpigloo.gamelibrary.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Autowired
    public GameServiceImpl(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }


    @Override
    public GameDto createGame(GameDto gameDto) {
        Game game = new Game();
        game.setId(gameDto.getId());
        game.setName(gameDto.getName());

        Game newGame = gameRepository.save(game);

        GameDto newGameResponse = new GameDto();
        newGameResponse.setId(newGame.getId());
        newGameResponse.setName(newGame.getName());

        return newGameResponse;
    }

    @Override
    public List<GameDto> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return games.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public GameDto getGameById(long id) {
        Optional<Game> game = gameRepository.findById(id);
        return game.map(this::mapToDto).orElse(null);
    }

    @Override
    public GameDto updateGame(long id, GameDto gameDto) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isEmpty()) {
            return null;
        }
        Game exisitingGame = game.get();
        exisitingGame.setName(gameDto.getName());
        gameRepository.save(exisitingGame);
        return mapToDto(exisitingGame);
    }

    @Override
    public GameDto deleteGame(long id) {
        Optional<Game> game = gameRepository.findById(id);
        if (game.isEmpty()) {
            return null;
        }
        Game removedGame = game.get();
        gameRepository.delete(removedGame);
        return mapToDto(removedGame);
    }


    private GameDto mapToDto(Game game) {
        GameDto gameDto = new GameDto();
        gameDto.setId(game.getId());
        gameDto.setName(game.getName());
        return gameDto;
    }


}
