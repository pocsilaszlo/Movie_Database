package elte.hu.movies.service;

import elte.hu.movies.entity.RefreshToken;
import elte.hu.movies.entity.User;
import elte.hu.movies.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public List<RefreshToken> getRefreshTokenByUser(User user) {
        return refreshTokenRepository.findByUser(user);
    }

    public Optional<RefreshToken> getRefreshTokenByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public void saveToken(RefreshToken refreshToken) {
        refreshTokenRepository.save(refreshToken);
    }

    public void deleteRefreshToken(RefreshToken refreshToken) {
        refreshTokenRepository.delete(refreshToken);
    }

}
