<% relationships.forEach(relation => {
  let modelPath = '';
  if(relation.to == 'AppUser'){
    relation.to = 'User';
    modelPath = 'user';
  }else{
    modelPath = relation.to.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '-').toLowerCase();
  }%>import {<%=relation.to%>} from "./<%= modelPath%>";
<% }); %>

export class <%=entity.name%>{
  id?: number;
  <% for(field of entity.fields) {%>
  <%=field.name%>?: <% switch(field.type) {
    case 'Double' : case 'Integer': case 'Long': %>number;<% break;
    case 'String' : %>string; <%break;
    case 'LocalDate': case 'LocalDateTime': %> Date;<%break;
    case 'Boolean' : %>boolean;<%break;
    default : %><%=field.type%>;<%break;} %>
  <% } %>
<% relationships.forEach(relation => {%>  <%=relation.fk_name%>: <%=relation.to%>;
<% }); %>
}
