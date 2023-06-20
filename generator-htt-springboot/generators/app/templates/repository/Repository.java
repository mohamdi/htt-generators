package <%=BasePackageName%>.repository;

import <%=BasePackageName%>.model.<%=EntityName%>;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface <%=EntityName%>Repository extends JpaRepository<<%=EntityName%>, Long> {
}
