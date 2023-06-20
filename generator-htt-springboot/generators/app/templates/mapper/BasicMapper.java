package <%=BasePackageName%>.mapper;

import java.util.List;

public interface BasicMapper<M, D> {
    List<M> toModels(List<D> dtos);
    List<D> toDtos(List<M> models);
    M toModel(D dto);
    D toDto(M model);
}
