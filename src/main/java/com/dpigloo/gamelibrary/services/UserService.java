package com.dpigloo.gamelibrary.services;

import org.springframework.security.core.userdetails.User;

public interface UserService {

  Integer getUserId(User user);
}
