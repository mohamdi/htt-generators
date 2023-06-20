package <%=BasePackageName%>.model;

import <%=BasePackageName%>.enumeration.UserRole;
import <%=BasePackageName%>.security.TokenUser;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fullName;
    @NotNull
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserRole role;
    private Boolean userActive;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public TokenUser toTokenUser() {
        TokenUser tokenUser = new TokenUser();
        tokenUser.setId(getId());
        tokenUser.setPermissions(new String[]{getRole().name()});
        tokenUser.setUsername(getUsername());
        tokenUser.setPassword(null);
        tokenUser.setRememberMe(false);
        return tokenUser;
    }
}
