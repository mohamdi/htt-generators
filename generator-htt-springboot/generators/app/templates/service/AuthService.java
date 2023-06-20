package <%=BasePackageName%>.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import <%=BasePackageName%>.model.User;
import <%=BasePackageName%>.model.dto.Token;
import <%=BasePackageName%>.model.dto.UserPass;
import <%=BasePackageName%>.repository.UserRepository;
import <%=BasePackageName%>.security.JwtProperties;
import <%=BasePackageName%>.security.TokenUser;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Optional;

@Service
@Slf4j
@Transactional
public class AuthService {

    private final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository repository, PasswordEncoder passwordEncoder){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean userExists(String username) {
        Optional<User> userExists = repository.findByUsername(username);
        return userExists.isPresent();
    }

    public ResponseEntity<Token> connect(UserPass userPass) {
        Token token = new Token();
        HttpStatus status = HttpStatus.FORBIDDEN;

        Optional<User> userOptional = repository.findByUsername(userPass.username);
        if (userOptional.isPresent() && isUserValid(userOptional.get(), userPass.password)) {
            User user = userOptional.get();
            try {
                if(!user.getUserActive()){
                    token.isActive = user.getUserActive();
                    return ResponseEntity.status(status).body(token);
                }
                TokenUser tokenUser = user.toTokenUser();

                status = HttpStatus.OK;
                token.user = user.toTokenUser();
                token.authenticated = true;
                token.authToken =
                        JwtProperties.generateToken(tokenUser, false, true);
                token.refreshToken =
                        JwtProperties.generateToken(tokenUser, true, true);
                token.isActive = user.getUserActive();
            } catch (JsonProcessingException e) {
                log.error("Unable to generate auth token {}", Arrays.toString(e.getStackTrace()));
            }
        }
        return ResponseEntity.status(status).body(token);
    }

    private boolean isUserValid(User user, String password) {
        return user != null && user.getUserActive() != null && passwordEncoder.matches(password, user.getPassword());
    }

}
