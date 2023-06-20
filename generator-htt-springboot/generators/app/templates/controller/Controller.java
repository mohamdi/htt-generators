package <%=BasePackageName%>.controller;

import <%=BasePackageName%>.model.dto.Ack;
import <%=BasePackageName%>.model.dto.<%=EntityName%>DTO;
import <%=BasePackageName%>.service.<%=EntityName%>Service;
import <%=BasePackageName%>.mapper.<%=EntityName%>Mapper;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/v1/<%=EntityName.toLowerCase()%>")
public class <%=EntityName%>Controller {

    private final <%=EntityName%>Service service;
    private final <%=EntityName%>Mapper mapper;

    public <%=EntityName%>Controller(<%=EntityName%>Service service, <%=EntityName%>Mapper mapper){
        this.service = service;
        this.mapper = mapper;
    }

    @GetMapping
    public List<<%=EntityName%>DTO> findAll(){
        return mapper.toDtos(service.findAll());
    }

    @GetMapping("/{id}")
    public <%=EntityName%>DTO findById(@PathVariable Long id){
        return mapper.toDto(service.findById(id));
    }

    @PostMapping
    public Ack add(@RequestBody <%=EntityName%>DTO dto){
        return service.add(mapper.toModel(dto));
    }

    @PutMapping
    public Ack update(@RequestBody <%=EntityName%>DTO dto){
        return service.update(mapper.toModel(dto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.delete(id);
    }
}
