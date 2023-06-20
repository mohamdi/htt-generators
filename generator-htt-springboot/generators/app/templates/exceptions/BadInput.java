package <%=BasePackageName%>.exceptions;

public class BadInput extends RuntimeException{
    public BadInput(String e) {
        super(e);
    }
}
