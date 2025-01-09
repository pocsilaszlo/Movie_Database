package elte.hu.movies.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Stream;

@Getter
@Entity
@Table(name="genres")
@RequiredArgsConstructor
@AllArgsConstructor
public class Genre {

    @Id
    String name;


}
