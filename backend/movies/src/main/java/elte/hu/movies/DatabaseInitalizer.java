package elte.hu.movies;


import elte.hu.movies.entity.Genre;
import elte.hu.movies.entity.Movie;
import elte.hu.movies.entity.Star;
import elte.hu.movies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

// Poster_Link,Series_Title,Released_Year,Certificate,Runtime,Genre,IMDB_Rating,Overview,Meta_score,Director,Star1,Star2,Star3,Star4,No_of_Votes,Gross
@Component
public class DatabaseInitalizer implements CommandLineRunner {

    private final MovieService movieService;

    @Autowired
    public DatabaseInitalizer(MovieService movieService) {
        this.movieService = movieService;
    }

    @Override
    public void run(String... args) throws IOException {

        List<Movie> movies = DataReader.readData().stream()
                .filter(line -> line.size() == 16)
                .skip(1)//.limit(100)
                .map(line -> Movie.builder()
                        .imagePath(line.getFirst())
                        .title(line.get(1))
                        .releaseDate(Integer.parseInt(line.get(2)))
                        .certificate(line.get(3).isEmpty() ? null : line.get(3))
                        .runtime(Integer.parseInt(line.get(4).split(" ")[0]))
                        .genres(Arrays.stream(line.get(5).split(", "))
                                .map(Genre::new)
                                .toList())
                        .imdbRating(Double.parseDouble(line.get(6)))
                        .overview(line.get(7))
                        .metaScore(line.get(8).isEmpty() ? null : Double.parseDouble(line.get(8)))
                        .director(line.get(9))
                        .stars(Arrays.asList(
                                new Star(line.get(10)),
                                new Star(line.get(11)),
                                new Star(line.get(12)),
                                new Star(line.get(13))
                        ))
                        .numberOfVotes(Integer.parseInt(line.get(14)))
                        .revenue(line.get(15).isEmpty() ? null : Long.parseLong(line.get(15).replace(",", "")))
                        .build())
                .toList();

        //movies.forEach(movie -> movie.getStars().forEach(star -> System.out.println(star.getName())));

        movieService.saveMovies(movies);

        System.out.println("Success!");
    }


}

