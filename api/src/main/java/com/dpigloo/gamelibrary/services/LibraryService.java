package com.dpigloo.gamelibrary.services;

import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.dto.LibraryDto;
import com.dpigloo.gamelibrary.exceptions.GameNotFoundException;
import com.dpigloo.gamelibrary.exceptions.UserNotFoundException;
import com.dpigloo.gamelibrary.models.Game;
import com.dpigloo.gamelibrary.models.UserEntity;
import org.apache.catalina.User;

import java.util.List;

public interface LibraryService {

    List<GameDto> getUserLibrary(String username);
    LibraryDto addToUserLibrary(String username, long gameId ) throws GameNotFoundException, UserNotFoundException;
    LibraryDto removeFromUserLibrary(String username, long gameId) throws GameNotFoundException, UserNotFoundException;
}
