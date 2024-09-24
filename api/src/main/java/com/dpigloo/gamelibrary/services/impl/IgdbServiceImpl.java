package com.dpigloo.gamelibrary.services.impl;

import com.api.igdb.apicalypse.APICalypse;
import com.api.igdb.exceptions.RequestException;
import com.api.igdb.request.IGDBWrapper;
import com.api.igdb.request.ProtoRequestKt;
import com.api.igdb.request.TwitchAuthenticator;
import com.api.igdb.utils.TwitchToken;
import com.dpigloo.gamelibrary.GameLibraryConfigurationProperties;
import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.services.IgdbService;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import proto.Game;
import proto.Search;

import java.util.List;

@Service
public class IgdbServiceImpl implements IgdbService {

    private final IGDBWrapper wrapper;
    private final Logger logger;


    public IgdbServiceImpl(GameLibraryConfigurationProperties configProperties) {

        logger = LoggerFactory.getLogger(IgdbServiceImpl.class);

        TwitchAuthenticator twitchAuthenticator = TwitchAuthenticator.INSTANCE;
        TwitchToken token = twitchAuthenticator.requestTwitchToken(
                configProperties.igdbClientId(), configProperties.igdbClientSecret());

        wrapper = IGDBWrapper.INSTANCE;
        wrapper.setCredentials(configProperties.igdbClientId(), token.getAccess_token());
    }

    @Override
    public List<GameDto> searchGameByName(String game, int offset, int limit) {
        APICalypse apiCalypse = new APICalypse().search(game).fields("game, name").offset(offset).limit(limit);
        logger.info("apiCalypse request: {}", apiCalypse.buildQuery());
        try {
            List<Search> searchResults = ProtoRequestKt.search(wrapper, apiCalypse);
            logger.info("search results: {}", searchResults.size());
            return searchResults.stream().map(result -> mapResultToGameDto(result)).toList();
        } catch (RequestException e) {
            logger.error(e.getMessage());
            return null;
        }
    }


    @Override
    public GameDto getGameById(long id) throws RequestException {
        APICalypse apiCalypse = new APICalypse().fields("*").where("id = " + id);
        logger.info(apiCalypse.buildQuery());
        List<Game> games = ProtoRequestKt.games(wrapper, apiCalypse);
        if (games.isEmpty()) {
            return null;
        }
        Game result = games.getFirst();

        return mapProtoGameToGameDto(result);
    }

    private GameDto mapResultToGameDto(Search result) {
        GameDto gameDto = new GameDto();
        gameDto.setId(result.getGame().getId());
        gameDto.setName(result.getName());
        return gameDto;
    }

    private GameDto mapProtoGameToGameDto(proto.Game protoGame) {
        GameDto gameDto = new GameDto();
        gameDto.setId(protoGame.getId());
        gameDto.setName(protoGame.getName());
        return gameDto;
    }
}
