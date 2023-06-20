package <%=BasePackageName%>.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import <%=BasePackageName%>.model.User;
import <%=BasePackageName%>.repository.UserRepository;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private TokenUser tokenUser = null;


    JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
    }

    @Override
    @SneakyThrows
    public Authentication attemptAuthentication(
            HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            tokenUser = new ObjectMapper().readValue(request.getInputStream(), TokenUser.class);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }


        UsernamePasswordAuthenticationToken authenticationToken = null;
        if (tokenUser != null && tokenUser.getUsername() != null && tokenUser.getPassword() != null) {
            Optional<User> user = userRepository.findByUsername(tokenUser.getUsername());
            if (!user.isPresent() || !user.get().getUserActive()) {
                throw new Exception(String.format("User not active"));
            }
            authenticationToken =
                    new UsernamePasswordAuthenticationToken(
                            tokenUser.getUsername(), tokenUser.getPassword(), new ArrayList<>());
        }
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult) {

        try {
            UserPrincipal userPrincipal = (UserPrincipal) authResult.getPrincipal();
            String token =
                    JwtProperties.generateTokenFromPrincipal(userPrincipal, false, tokenUser.isRememberMe());

            String tokenrefresh =
                    JwtProperties.generateTokenFromPrincipal(userPrincipal, true, tokenUser.isRememberMe());

            response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + token);
            response.addHeader(JwtProperties.HEADER_REFRESH, JwtProperties.TOKEN_PREFIX + tokenrefresh);
        } catch (IOException e) {
            logger.error(e.getMessage());
        }
    }
}
