package elte.hu.movies.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Entity
@Table(name="refresh_tokens")
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private long id;

    @Setter
    private String token;

    @Setter
    private String address;

    @Setter
    private String deviceDetails;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Setter
    private User user;

}
