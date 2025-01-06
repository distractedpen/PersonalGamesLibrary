package com.dpigloo.gamelibrary.dto;

import lombok.Data;

@Data
public class AuthResponseDto {
    private String username;
    private String email;
    private String token;
    private String tokenType = "Bearer";
}
