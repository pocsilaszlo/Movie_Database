package elte.hu.movies.repository;

import elte.hu.movies.entity.RefreshToken;
import elte.hu.movies.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {

    List<RefreshToken> findByUser(User user);

    Optional<RefreshToken> findByToken(String token);

    void deleteByToken(String token);
}
