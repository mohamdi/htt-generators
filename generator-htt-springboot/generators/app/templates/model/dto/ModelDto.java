package <%=BasePackageName%>.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
<% for(field of entity.fields) {%><% if(enumerations.includes(field.type)){%>
import <%=BasePackageName%>.enumeration.<%=field.type%>;<% } %><% } %>
<% for(relation of relationships.manytoone){ %><% if(relation.from==entity.name){%>
import <%=BasePackageName%>.model.dto.<%=relation.to=="AppUser"?"User":relation.to%>DTO;<% } %><% } %>

@AllArgsConstructor
@NoArgsConstructor
@Data
public class <%=entity.name%>DTO {
    private Long id;
    <% for(field of entity.fields) {%>
    private <%=field.type%> <%=field.name%>;<% } %>
    <% for(relation of relationships?.manytoone){ %><% if(relation.from==entity.name){
        var toName = relation.to=="AppUser"?"User":relation.to;
        %>
    private <%=toName%>DTO <%=relation.fk_name.toLowerCase()%>;<% } %><% } %>
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
