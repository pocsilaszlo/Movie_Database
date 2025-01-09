package elte.hu.movies.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@Getter
@Entity
@Table(name="stars")
@RequiredArgsConstructor
@AllArgsConstructor
public class Star {

    @Id
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Star star = (Star) o;
        return Objects.equals(name, star.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
