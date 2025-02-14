package com.dpigloo.gamelibrary.controllers;

import com.api.igdb.exceptions.RequestException;
import com.dpigloo.gamelibrary.dto.GameDto;
import com.dpigloo.gamelibrary.services.IgdbService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/igdb")
public class IgdbController {

    private final IgdbService igdbService;
    private final Logger logger;

    @Autowired
    public IgdbController(IgdbService igdbService) {
        this.igdbService = igdbService;
        logger = LoggerFactory.getLogger(IgdbController.class);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GameDto>> search(@RequestParam String gameName,
                                                @RequestParam(defaultValue = "0") int offset,
                                                @RequestParam(defaultValue = "10") int limit) {
        try {
            logger.info("SEARCHING: {} {} {}", gameName, offset, limit);
            List<GameDto> results = igdbService.searchGameByName(gameName, offset, limit);
            if (results == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(results);
        } catch (RequestException e) {
            logger.error(e.toString());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{gameId}")
    public ResponseEntity<GameDto> getGameById(@PathVariable long gameId) {
        try {
            GameDto result = igdbService.getGameById(gameId);
            if (result == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return ResponseEntity.ok(result);
        } catch (RequestException e) {
            logger.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
