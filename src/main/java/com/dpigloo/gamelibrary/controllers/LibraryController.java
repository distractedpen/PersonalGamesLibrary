package com.dpigloo.gamelibrary.controllers;

import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.dto.GameMetadataDto;
import com.dpigloo.gamelibrary.dto.LibraryDto;
import com.dpigloo.gamelibrary.exceptions.GameNotFoundException;
import com.dpigloo.gamelibrary.exceptions.UserNotFoundException;
import com.dpigloo.gamelibrary.services.GameMetadataService;
import com.dpigloo.gamelibrary.services.LibraryService;
import com.dpigloo.gamelibrary.services.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryService libraryService;
    private final GameMetadataService gameMetadataService;
    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(LibraryController.class);
    @Autowired
    public LibraryController(LibraryService libraryService, GameMetadataService gameMetadataService, UserService userService) {
        this.libraryService = libraryService;
        this.gameMetadataService = gameMetadataService;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<GameDto>> getUserLibrary(@AuthenticationPrincipal User user) {
        String username = user.getUsername();
        List<GameDto> library = libraryService.getUserLibrary(username);
        return new ResponseEntity<>(library, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addToUserLibrary(@RequestParam long gameId,
                                                    @AuthenticationPrincipal User user) {
        String username = user.getUsername();
        try {
            LibraryDto libraryDto = libraryService.addToUserLibrary(username, gameId);

            if (libraryDto == null) {
                return new ResponseEntity<>("This game is already in your library", HttpStatus.INTERNAL_SERVER_ERROR);
            }



            return new ResponseEntity<>("Successfully added game to library", HttpStatus.OK);
        } catch (UserNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>("User does not exist", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (GameNotFoundException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>("Unable to add game to library", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteFromUserLibrary(@RequestParam long gameId,
                                                        @AuthenticationPrincipal User user) {
        String username = user.getUsername();
        LibraryDto libraryDto = libraryService.removeFromUserLibrary(username, gameId);
        if (libraryDto == null) {
            return new ResponseEntity<>("Failed to remove game from library", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Successfully removed game to library", HttpStatus.OK);
    }
}
