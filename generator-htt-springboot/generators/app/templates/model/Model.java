package <%=BasePackageName%>.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.time.LocalDateTime;
<% for(field of entity.fields) {%><% if(enumerations.includes(field.type)){%>
import <%=BasePackageName%>.enumeration.<%=field.type%>;<% } %><% } %>
<% for(relation of relationships.manytoone){ %><% if(relation.from==entity.name){%>
import <%=BasePackageName%>.model.<%=relation.to=="AppUser"?"User":relation.to%>;<% } %><% } %>

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "<%=entity.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase()%>")
public class <%=entity.name%> {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    <% for(field of entity.fields) {%><% if(enumerations.includes(field.type)){%>
    @Enumerated(EnumType.STRING)<% } %>
    private <%=field.type%> <%=field.name%>;<% } %>
    <% for(relation of relationships?.manytoone){ %><% if(relation.from==entity.name){
        var toName = relation.to=="AppUser"?"User":relation.to;
        %>
    @ManyToOne
    @JoinColumn(name = "<%=relation.fk_name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase();%>_id")
    private <%=toName%> <%=relation.fk_name.toLowerCase()%>;<% } %><% } %>
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
