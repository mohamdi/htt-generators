export enum <%=enumeration.name%>{
  <% var i=0;
  for(value of enumeration.values) { %>
    <%=value.toUpperCase()%>="<%=value.toUpperCase()%>"<%if(i<enumeration.values.length-1){%>,
  <%} i++;} %>
}
