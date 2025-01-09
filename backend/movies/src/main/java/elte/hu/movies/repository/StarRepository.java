package elte.hu.movies.repository;

import elte.hu.movies.entity.Star;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StarRepository extends CrudRepository<Star, String> {
    public List<Star> findAll();
}
