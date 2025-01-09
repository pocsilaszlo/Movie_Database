package elte.hu.movies.service;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;


@Service
public class JwtService {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Value("${security.jwt.access.expiration-time}")
    @Getter
    private long jwtAccessExpiration;

    @Value("${security.jwt.refresh.expiration-time}")
    @Getter
    private long jwtRefreshExpiration;

    public String generateToken(Map<String, Object> claims, String subject, long expirationMillis) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(key)
                .compact();
    }

    public String generateAccessToken(Map<String, Object> claims, String subject) {
        return generateToken(claims, subject, jwtAccessExpiration);
    }

    public String generateRefreshToken(String subject) {
        return generateToken(new HashMap<>(), subject, jwtRefreshExpiration);
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractSubject(token);
        //Set<?> cl = extractClaim(token, Claims::keySet);
        //cl.forEach(c -> System.out.println(c));
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
}

