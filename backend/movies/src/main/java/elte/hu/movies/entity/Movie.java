package elte.hu.movies.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.stream.Stream;

@Entity
@Table(name="movies")
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    @Getter
    Long id;

    @Getter
    @Setter
    String title;

    @Getter
    @Setter
    @Column(length = 2000)
    String overview;

    @Getter
    @Setter
    String imagePath;

    @Getter
    @Setter
    String certificate;

    @Getter
    @Setter
    String director;

    @Getter
    @Setter
    int releaseDate;

    @Getter
    @Setter
    int runtime;

    @Getter
    @Setter
    int numberOfVotes;

    @Getter
    @Setter
    Long revenue;

    @Getter
    @Setter
    Double metaScore;

    @Getter
    @Setter
    double imdbRating;

    @Setter
    @ManyToMany
    @JoinTable(
            name = "movies_genres",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_name"))
    List<Genre> genres;

    @Setter
    @ManyToMany
    @JoinTable(
            name = "movies_stars",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "star_name"))
    List<Star> stars;


    public Stream<Genre> getGenres() {
        return genres.stream();
    }

    public Stream<Star> getStars() {
        return stars.stream();
    }

}
