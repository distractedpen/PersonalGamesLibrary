package com.dpigloo.gamelibrary.services;


import com.api.igdb.exceptions.RequestException;
import com.dpigloo.gamelibrary.dto.GameDto;

import java.util.List;

public interface IgdbService {

    List<GameDto> searchGameByName(String game) throws RequestException;
    GameDto getGameById(long id) throws RequestException;
}
