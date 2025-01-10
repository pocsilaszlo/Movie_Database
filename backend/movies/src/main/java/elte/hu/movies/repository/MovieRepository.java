package elte.hu.movies.repository;

import elte.hu.movies.entity.Movie;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends CrudRepository<Movie, Long> {
    public Page<Movie> findAll(Pageable pageable);

    Page<Movie> findByOrderByReleaseDateDescImdbRatingDesc(Pageable pageable);

    List<Movie> findByMetaScoreNotNullOrderByMetaScoreDescImdbRatingDesc(Limit limit);

    List<Movie> findByOrderByImdbRatingDescReleaseDateDesc(Limit limit);
}
