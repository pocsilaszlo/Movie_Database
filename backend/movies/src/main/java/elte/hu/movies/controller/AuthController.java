package elte.hu.movies.controller;

import elte.hu.movies.dto.*;
import elte.hu.movies.entity.RefreshToken;
import elte.hu.movies.entity.User;
import elte.hu.movies.repository.UserRepository;
import elte.hu.movies.service.AuthenticationService;
import elte.hu.movies.service.JwtService;
import elte.hu.movies.service.RefreshTokenService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.util.WebUtils;

import java.util.Map;
import java.util.Optional;

//@Slf4j
@RestController
public class AuthController {

    private final JwtService jwtService;

    private final UserRepository userRepository;

    private final AuthenticationService authenticationService;

    private final RefreshTokenService refreshTokenService;
    private final UserDetailsService userDetailsService;


    @Autowired
    public AuthController(JwtService jwtService,
                          UserRepository userRepository,
                          AuthenticationService authenticationService,
                          RefreshTokenService refreshTokenService,
                          UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.refreshTokenService = refreshTokenService;
        this.userDetailsService = userDetailsService;
    }

    /**
     * The register endpoint of the application. Checks if the account with the given email is in the database. If it is not exist, registers a new account with the given credentials.
     * @param registerRequest The credentials of the register from the request body. It contains a username, an email and a password.
     * @return If the register was successful it returns a message with the status OK, otherwise it returns a message with the status BAD_REQUEST (if the email is taken).
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByEmail(registerRequest.email()))
            return new ResponseEntity<>(Map.of("message", "An account with this email address already exists"), HttpStatus.BAD_REQUEST);

        authenticationService.register(registerRequest);

        return new ResponseEntity<>(Map.of("message", "User registered successfully!"), HttpStatus.OK);
    }

    /**
     * The login endpoint of the application. Checks if the account with the given email is in the database. If it exists, makes a refresh and access token and sends it back.
     * @param loginRequest The credentials of the login from the request body. It contains an email and a password.
     * @param request The request that the endpoint gets.
     * @param response The response that the endpoint sends back.
     * @return It returns a new access token in response with status OK and a new refresh token in cookie. If the user is not in the database it returns a message with the status UNAUTHORIZED.
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response, HttpServletRequest request) {
        Optional<User> user = authenticationService.authenticate(loginRequest);

        if (user.isEmpty())
            return new ResponseEntity<>(Map.of("message", "Login unsuccessfully!"), HttpStatus.UNAUTHORIZED);

        response.addHeader(HttpHeaders.SET_COOKIE, authenticationService.makeRefreshCookie(user.get(), request) + "; Partitioned");
        return new ResponseEntity<>(authenticationService.makeLoginResponse(user.get()), HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity<?> signout(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");

        if (cookie == null)
            return new ResponseEntity<>(Map.of("message", "Refresh token not found in the header."), HttpStatus.UNAUTHORIZED);

        String token= cookie.getValue();

        Optional<RefreshToken> refreshToken = refreshTokenService.getRefreshTokenByToken(token);

        if (refreshToken.isEmpty())
            return new ResponseEntity<>(Map.of("message", "Refresh token not found in the database."), HttpStatus.UNAUTHORIZED);


        refreshTokenService.deleteRefreshToken(refreshToken.get());
        System.out.println("DELETED");

        return ResponseEntity.ok(Map.of("message", "Successfully logged out."));
    }

    /**
     * The refresh endpoint of the application. First checks if the cookie is in the request or not. If exists validates the token and search it in the database. If the request token is valid and found in the database the endpoint creates new refresh and access token. It makes a cookie with the new refresh token and sends a response with the new access token.
     * @param request The request that the endpoint gets.
     * @param response The response that the endpoint sends back.
     * @return It returns a new access token in response with status OK and a new refresh token in cookie. If the request cookie not exist or the refresh token not valid, or it is not found in the database it returns an UNAUTHORIZED response with the appropriate message.
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(HttpServletRequest request, HttpServletResponse response) {
        Cookie cookie = WebUtils.getCookie(request, "refreshToken");

        // Check if the cookie is existing
        if (cookie == null)
            return new ResponseEntity<>(Map.of("message", "Refresh token not found."), HttpStatus.UNAUTHORIZED);

        String refreshToken= cookie.getValue();

        try {
            String email = jwtService.extractSubject(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            // Validate refresh token
            if (!jwtService.isTokenValid(refreshToken, userDetails))
                return new ResponseEntity<>(Map.of("message", "Invalid refresh token."), HttpStatus.UNAUTHORIZED);

            Optional<RefreshToken> storedToken = refreshTokenService.getRefreshTokenByToken(refreshToken);

            // Check the token in the database
            if (storedToken.isEmpty())
                return new ResponseEntity<>(Map.of("message", "Refresh token not found in the database."), HttpStatus.UNAUTHORIZED);

            // Generate new refresh and access token
            //response.addCookie(authenticationService.makeNewRefreshCookie(storedToken.get()));
            response.addHeader(HttpHeaders.SET_COOKIE, authenticationService.makeNewRefreshCookie(storedToken.get()) + "; Partitioned");

            String accessToken = jwtService.generateAccessToken(
                    Map.of("role", "USER",
                            "username", storedToken.get().getUser().getUsername(),
                            "id", storedToken.get().getUser().getId()),
                    storedToken.get().getUser().getEmail());

            return new ResponseEntity<>(new LoginResponse(new UserDto(Long.toString(storedToken.get().getUser().getId()), storedToken.get().getUser().getUsername(), email), accessToken), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("message", "Failed to refresh access token."), HttpStatus.UNAUTHORIZED);
        }
    }
}

