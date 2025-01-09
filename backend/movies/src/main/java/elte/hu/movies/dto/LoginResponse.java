package elte.hu.movies.dto;

public record LoginResponse(UserDto user, String accessToken) {
}
