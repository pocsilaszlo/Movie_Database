package elte.hu.movies.security;

import elte.hu.movies.dto.CustomUserDetails;
import elte.hu.movies.entity.User;
import elte.hu.movies.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userEntity = userRepository.findByEmail(username);

        if (userEntity.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }

        User user = userEntity.get();
        return new CustomUserDetails(user);
    }
}
