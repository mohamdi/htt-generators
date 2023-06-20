package <%=BasePackageName%>.mapper;

import <%=BasePackageName%>.model.User;
import <%=BasePackageName%>.model.dto.UserDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper extends BasicMapper <User, UserDTO> {
    @Override
    @Mapping(target = "password", ignore = true)
    UserDTO toDto(User model);
}
