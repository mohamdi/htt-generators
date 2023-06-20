package <%=BasePackageName%>.security;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Date;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JwtProperties {
    public static final String SECRET = "HJgkjhjooihjgGUYYGGUJHhjfgjgJHGJGFvjhftyGJVHgftjh";

    public static final int EXPIRATION_TIME = 3600000; // 1 hour
    public static final int EXPIRATION_TIME_REFRESH = 5400000; // 1 hour + 30 min
    public static final int EXPIRATION_TIME_REMEMBER_ME = 864000000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String HEADER_REFRESH = "X-refresh-token";

    public static String generateTokenFromPrincipal(UserPrincipal userPrincipal,
                                                    boolean isRefresh,
                                                    boolean isRememberMe) throws JsonProcessingException {
        TokenUser tokenUser = userPrincipal.toTokenUser();
        return JwtProperties.generateToken(tokenUser, isRefresh, isRememberMe);
    }

    public static String generateToken(TokenUser tokenUser, boolean isRefresh, boolean isRememberMe)
            throws JsonProcessingException {

        // convert User to json
        ObjectMapper objectMapper = new ObjectMapper();
        String user = objectMapper.writeValueAsString(tokenUser);

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date exp;
        if (!isRefresh) {
            exp =
                    new Date(
                            nowMillis
                                    +
                                    // if remember me is selected set the time to EXPIRATION_TIME_REMEMBER_ME
                                    (isRememberMe
                                            ? JwtProperties.EXPIRATION_TIME_REMEMBER_ME
                                            : JwtProperties.EXPIRATION_TIME));
        } else {
            exp =
                    new Date(
                            nowMillis
                                    +
                                    // if remember me is selected set the time to EXPIRATION_TIME_REMEMBER_ME
                                    (isRememberMe
                                            ? JwtProperties.EXPIRATION_TIME_REMEMBER_ME
                                            : JwtProperties.EXPIRATION_TIME_REFRESH));
        }


        // Create JWT Token
        return JWT.create()
                .withIssuer("<%=AppName%>")
                .withSubject(tokenUser.getUsername())
                .withClaim("user", user)
                .withNotBefore(now)
                .withIssuedAt(now)
                .withExpiresAt(exp)
                .sign(HMAC512(JwtProperties.SECRET.getBytes()));
    }
}
