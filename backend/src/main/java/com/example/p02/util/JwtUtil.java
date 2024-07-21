package com.example.p02.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a secure random key
    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    public static String generateToken(Long userId) {
        return Jwts.builder()
            .setSubject(String.valueOf(userId))
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(key)
            .compact();
    }

    public static Long validateToken(String token) {
        return Long.parseLong(Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject());
    }
}
