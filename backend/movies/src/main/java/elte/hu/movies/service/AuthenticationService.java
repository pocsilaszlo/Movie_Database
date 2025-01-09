package elte.hu.movies.service;

import elte.hu.movies.dto.LoginRequest;
import elte.hu.movies.dto.LoginResponse;
import elte.hu.movies.dto.RegisterRequest;
import elte.hu.movies.dto.UserDto;
import elte.hu.movies.entity.RefreshToken;
import elte.hu.movies.entity.User;
import elte.hu.movies.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtService jwtService;

    private final RefreshTokenService refreshTokenService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            RefreshTokenService refreshTokenService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public void register(RegisterRequest request) {
        userRepository.save(
                User.builder()
                        .email(request.email())
                        .username(request.username())
                        .password(passwordEncoder.encode(request.password()))
                        .role("USER")
                        .build()
        );

    }

    public Optional<User> authenticate(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        return userRepository.findByEmail(request.email());
    }

    public LoginResponse makeLoginResponse(User user) {
        String accessToken = jwtService.generateAccessToken(
                Map.of("role", "USER",
                        "username", user.getUsername(),
                        "id", user.getId()),
                user.getEmail());

        return new LoginResponse(new UserDto(Long.toString(user.getId()), user.getUsername(), user.getEmail()), accessToken);
    }



    public ResponseCookie makeRefreshCookie(User user, HttpServletRequest request) {
        String refreshToken = jwtService.generateRefreshToken(user.getEmail());

        refreshTokenService.saveToken(
                RefreshToken.builder()
                        .token(refreshToken)
                        .address(((WebAuthenticationDetails) SecurityContextHolder.getContext().getAuthentication().getDetails()).getRemoteAddress())
                        .deviceDetails(request.getHeader("User-Agent"))
                        .user(user)
                        .build()
        );

        return createCookie(refreshToken);
    }

    public ResponseCookie makeNewRefreshCookie(RefreshToken storedToken) {
        String newRefreshToken = jwtService.generateRefreshToken(storedToken.getUser().getEmail());

        storedToken.setToken(newRefreshToken);
        refreshTokenService.saveToken(storedToken);

        return createCookie(newRefreshToken);
    }

    private ResponseCookie createCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .maxAge((int) (jwtService.getJwtRefreshExpiration() / 1000))
                .httpOnly(true)  // Csak szerveroldali hozzáférés
                .secure(true)    // HTTPS szükséges
                .sameSite("None") // Cross-origin kérések támogatása
                .path("/")
                .build();
    }
}
