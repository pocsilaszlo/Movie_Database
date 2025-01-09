package elte.hu.movies.repository;

import elte.hu.movies.entity.Genre;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GenreRepository extends CrudRepository<Genre, String> {
    public List<Genre> findAll();
}
