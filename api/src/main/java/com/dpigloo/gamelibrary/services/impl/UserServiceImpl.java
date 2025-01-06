package com.dpigloo.gamelibrary.services.impl;

import com.dpigloo.gamelibrary.models.UserEntity;
import com.dpigloo.gamelibrary.repositories.UserRepository;
import com.dpigloo.gamelibrary.services.UserService;

import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Integer getUserId(User user) {
    Optional<UserEntity> userEntityOp = userRepository.findByUsername(user.getUsername());
    if (userEntityOp.isEmpty()) {
      return null;
    }
    UserEntity userEntity = userEntityOp.get();
    return userEntity.getId();
  }
}
