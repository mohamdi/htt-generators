package <%=BasePackageName%>.service;

import <%=BasePackageName%>.exceptions.NotFoundException;
import <%=BasePackageName%>.model.dto.Ack;
import <%=BasePackageName%>.model.<%=EntityName%>;
import <%=BasePackageName%>.repository.<%=EntityName%>Repository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class <%=EntityName%>Service {

    private final <%=EntityName%>Repository repository;


    public <%=EntityName%>Service(<%=EntityName%>Repository repository){
        this.repository = repository;
    }

    public List<<%=EntityName%>> findAll(){
        return repository.findAll();
    }

    public <%=EntityName%> findById(Long id){
        return repository.findById(id).orElseThrow(NotFoundException::new);
    }

    public Ack add(<%=EntityName%> <%=EntityName.toLowerCase()%>){
        if(<%=EntityName.toLowerCase()%>.getId()!=null){
            throw new IllegalArgumentException("Cannot add <%=EntityName%> with existing id value!");
        }
        repository.save(<%=EntityName.toLowerCase()%>);
        return new Ack();
    }

    public Ack update(<%=EntityName%> <%=EntityName.toLowerCase()%>){
        if(<%=EntityName.toLowerCase()%>.getId()==null){
            throw new IllegalArgumentException("Cannot update <%=EntityName%> with no existing id value!");
        }
        repository.save(<%=EntityName.toLowerCase()%>);
        return new Ack();
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

}
