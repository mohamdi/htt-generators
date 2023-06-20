package <%=BasePackageName%>.service;

import <%=BasePackageName%>.exceptions.NotFoundException;
import <%=BasePackageName%>.model.User;
import <%=BasePackageName%>.model.User;
import <%=BasePackageName%>.repository.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public List<User> findAll(){
        return repository.findAll();
    }

    public User findById(Long id){
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    public User getConnectedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) throw new IllegalStateException("Couldn't get authentication object");
        Optional<User> result = repository.findByUsername(auth.getName());
        if (!result.isPresent()) throw new IllegalStateException("Connected user couldn't be found in database");
        return result.get();
    }

}
