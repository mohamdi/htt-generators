package <%=BasePackageName%>.security;

import org.springframework.security.core.GrantedAuthority;
import java.util.Collection;

public class TokenUser {
    private Long id;
    private boolean admin;
    private String username;
    private String password;
    private String lang;
    private boolean rememberMe;
    private String[] permissions;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isRememberMe() {
        return rememberMe;
    }

    public void setRememberMe(boolean rememberMe) {
        this.rememberMe = rememberMe;
    }

    public String[] getPermissions() {
        return permissions;
    }

    public void setPermissions(String[] permissions) {
        this.permissions = permissions;
    }

    /*
     * Set user permissions from a collection of GrantedAuthorities
     * */
    public void setPermissionsFromGrantedAuthorities(Collection<? extends GrantedAuthority> grantedAuthorities) {
        this.permissions = grantedAuthorities.stream()
                .map(GrantedAuthority::getAuthority)
                .toArray(String[]::new);
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }
}
