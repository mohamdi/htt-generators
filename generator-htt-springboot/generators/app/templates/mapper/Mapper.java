package <%=BasePackageName%>.mapper;

import <%=BasePackageName%>.model.<%=EntityName%>;
import <%=BasePackageName%>.model.dto.<%=EntityName%>DTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface <%=EntityName%>Mapper extends BasicMapper<<%=EntityName%>, <%=EntityName%>DTO> {
}
