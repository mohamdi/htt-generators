package <%=BasePackageName%>.controller;

import <%=BasePackageName%>.model.dto.Token;
import <%=BasePackageName%>.model.dto.UserPass;
import <%=BasePackageName%>.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping("/token")
    public ResponseEntity<Token> connect(@RequestBody UserPass userPass) {
        return service.connect(userPass);
    }

}
