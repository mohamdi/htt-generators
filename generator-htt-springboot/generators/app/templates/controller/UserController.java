package <%=BasePackageName%>.controller;

import <%=BasePackageName%>.model.dto.UserDTO;
import <%=BasePackageName%>.service.UserService;
import <%=BasePackageName%>.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService service;
    private final UserMapper mapper;
    public UserController(UserService service, UserMapper mapper) {
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<UserDTO> findAll(){
        return mapper.toDtos(service.findAll());
    }

    @GetMapping("/{id}")
    public UserDTO findById(@PathVariable Long id){
        return mapper.toDto(service.findById(id));
    }

}
