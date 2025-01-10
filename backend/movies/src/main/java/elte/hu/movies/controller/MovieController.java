package elte.hu.movies.controller;

import elte.hu.movies.entity.Genre;
import elte.hu.movies.entity.Movie;
import elte.hu.movies.entity.Star;
import elte.hu.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/movies")
    public ResponseEntity<Page<Movie>> getMovies(Pageable pageable) {
        return new ResponseEntity<Page<Movie>>(movieService.getMovies(pageable), HttpStatus.OK);
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<?> getMovie(@PathVariable Long id) {
        //System.out.println(id);
        Optional<Movie> movie = movieService.getMovie(id);

        if (movie.isEmpty()) return new ResponseEntity<>(Map.of("message", "Movie not found with this id."), HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(movie.get(), HttpStatus.OK);
    }

    @GetMapping("/movies/recommanded&limit={limit}")
    public ResponseEntity<List<Movie>> getRecommandedMovies(@PathVariable Integer limit) {
        return new ResponseEntity<List<Movie>>(movieService.getRecommandedMovies(), HttpStatus.OK);
    }

    @GetMapping("/movies/trending&limit={limit}")
    public ResponseEntity<List<Movie>> getTrendingMovies(@PathVariable Integer limit) {
        return new ResponseEntity<List<Movie>>(movieService.getTrendingMovies(), HttpStatus.OK);
    }


    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getGenres() {
        return new ResponseEntity<List<Genre>>(movieService.getGenres(), HttpStatus.OK);
    }

    @GetMapping("/stars")
    public ResponseEntity<List<Star>> getStars() {
        return new ResponseEntity<List<Star>>(movieService.getStars(), HttpStatus.OK);
    }
}
