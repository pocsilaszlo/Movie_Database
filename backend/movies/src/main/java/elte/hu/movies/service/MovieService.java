package elte.hu.movies.service;

import elte.hu.movies.entity.Genre;
import elte.hu.movies.entity.Movie;
import elte.hu.movies.entity.Star;
import elte.hu.movies.repository.GenreRepository;
import elte.hu.movies.repository.MovieRepository;
import elte.hu.movies.repository.StarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Limit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    private final MovieRepository movieRepository;
    public final GenreRepository genreRepository;
    public final StarRepository starRepository;


    @Autowired
    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository, StarRepository starRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
        this.starRepository = starRepository;
    }

    public Page<Movie> getMovies(Pageable pageable) {
        return movieRepository.findByOrderByReleaseDateDescImdbRatingDesc(pageable);
    }

    public Optional<Movie> getMovie(Long id) {return movieRepository.findById(id);}

    public List<Movie> getRecommandedMovies(Integer limit) {
        return movieRepository.findByOrderByMetaScoreDesc(Limit.of(limit));
    }

    public List<Movie> getTrendingMovies(Integer limit) {
        return movieRepository.findByOrderByImdbRatingDesc(Limit.of(limit));
    }

    public List<Genre> getGenres() {
        return genreRepository.findAll();
    }

    public List<Star> getStars() {
        return  starRepository.findAll();
    }

    public void saveMovie(Movie movie) {
        genreRepository.saveAll(movie.getGenres().toList());
        starRepository.saveAll(movie.getStars().toList());
        movieRepository.save(movie);
    }

    public void saveMovies(List<Movie> movies) {
        movies.forEach(movie -> genreRepository.saveAll(movie.getGenres().toList()));
        movies.forEach(movie -> starRepository.saveAll(movie.getStars().toList()));
        movieRepository.saveAll(movies);
    }

    public void deleteMovie(Movie movie) {
        movieRepository.delete(movie);
    }

    public void deleteMovies(List<Movie> movies) {
        movieRepository.deleteAll(movies);
    }
}
