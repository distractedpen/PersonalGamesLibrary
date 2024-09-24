package com.dpigloo.gamelibrary.services.impl;

import com.api.igdb.exceptions.RequestException;
import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.dto.LibraryDto;
import com.dpigloo.gamelibrary.exceptions.GameNotFoundException;
import com.dpigloo.gamelibrary.exceptions.UserNotFoundException;
import com.dpigloo.gamelibrary.models.Game;
import com.dpigloo.gamelibrary.models.UserEntity;
import com.dpigloo.gamelibrary.repositories.GameRepository;
import com.dpigloo.gamelibrary.repositories.UserRepository;
import com.dpigloo.gamelibrary.services.IgdbService;
import com.dpigloo.gamelibrary.services.LibraryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LibraryServiceImpl implements LibraryService {

    private final UserRepository userRepository;
    private final GameRepository gameRepository;
    private final IgdbService igdbService;
    private final Logger logger;

    @Autowired
    public LibraryServiceImpl(GameRepository gameRepository, UserRepository userRepository, IgdbService igdbService) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
        this.igdbService = igdbService;
        logger = LoggerFactory.getLogger(LibraryServiceImpl.class);
    }

    @Override
    public List<GameDto> getUserLibrary(String username) {
        logger.info("Current user: {}", username);
        Optional<UserEntity> user = userRepository.findByUsername(username);
        return user.map(userEntity -> userEntity.getUserLibrary().stream().map(this::mapToDto).toList()).orElse(null);
    }

    @Override
    public LibraryDto addToUserLibrary(String username, long gameId) throws GameNotFoundException, UserNotFoundException {
        LibraryDto libraryDto = new LibraryDto();

        Optional<Game> storedGame = gameRepository.findById(gameId);
        Game game;
        if (storedGame.isEmpty()) {
            try {
                GameDto gameDto = igdbService.getGameById(gameId);
                game = mapToGame(gameDto);
                gameRepository.save(game);
            } catch (RequestException e) {
                logger.error(e.getMessage());
                throw new GameNotFoundException(e.getMessage());
            }
        } else {
            game = storedGame.get();
        }

        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            throw new UserNotFoundException(username);
        }

        UserEntity userEntity = user.get();
        List<Game> userLibrary = userEntity.getLibrary();

        if (userLibrary.contains(game)) {
            return null;
        }

        userEntity.addGame(game);
        userRepository.save(userEntity);

        libraryDto.setUser_id(userEntity.getId());
        libraryDto.setGame_id(game.getId());
        return libraryDto;
    }

    @Override
    public LibraryDto removeFromUserLibrary(String username, long gameId) {
        LibraryDto libraryDto = new LibraryDto();
        Optional<UserEntity> user = userRepository.findByUsername(username);
        if (user.isEmpty()) {
            libraryDto.setUser_id(null);
            return libraryDto;
        }

        UserEntity userEntity = user.get();

        Optional<Game> game = gameRepository.findById(gameId);
        if (game.isEmpty()) {
            libraryDto.setGame_id(null);
            return libraryDto;
        }

        userEntity.removeGame(game.get());
        userRepository.save(userEntity);

        libraryDto.setUser_id(userEntity.getId());
        libraryDto.setGame_id(mapToDto(game.get()).getId());
        return libraryDto;
    }


    private GameDto mapToDto(Game game) {
        GameDto gameDto = new GameDto();
        gameDto.setId(game.getId());
        gameDto.setName(game.getName());
        return gameDto;
    }

    private Game mapToGame(GameDto gameDto) {
        Game game = new Game();
        game.setId(gameDto.getId());
        game.setName(gameDto.getName());
        return game;
    }

}
