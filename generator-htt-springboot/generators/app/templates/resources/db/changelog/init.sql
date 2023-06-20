--liquibase formatted sql

--changeset HTT:init/1
CREATE SEQUENCE hibernate_sequence START 100 INCREMENT 1;

CREATE TABLE app_user
(
    id          BIGINT PRIMARY KEY NOT NULL,
    email       VARCHAR(255) not null,
    username    VARCHAR(255) not null,
    full_name   VARCHAR(255),
    password    VARCHAR(255) not null,
    role        VARCHAR(255) not null,
    user_active BOOLEAN not null default false,
    created_at  timestamp,
    updated_at timestamp
);

ALTER TABLE app_user
    ADD CONSTRAINT uk_email_in_table_app_user UNIQUE (email);

ALTER TABLE app_user
    ADD CONSTRAINT uk_username_in_table_app_user UNIQUE (username);

<% for(entity of entities) { 
    var entityName = entity.name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase();
    %>
create table <%=entityName%> (
    id bigint primary key not null,<% for(field of entity.fields) { %>
    <% switch (field.type) {
        case 'String' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> varchar(255),<% break;
        case 'Double' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> real,<% break;
        case 'Integer' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> integer,<% break;
        case 'Long' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> bigint,<% break;
        case 'LocalDate' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> timestamp,<% break;
        case 'LocalDateTime' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> timestamp,<% break;
        case 'Boolean' : %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> boolean,<% break;
        default: %><%=field.name.replace(/([a-z])([A-Z])/g, "$1_$2")
        .replace(/[\s_]+/g, '_')
        .toLowerCase()%> varchar(255),<% break;} %><% } %>
    created_at timestamp,
    updated_at timestamp
);
<% } %>

<% for(relation of relationships.manytoone){ %><%
    var fromTableName = relation.from.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase();
    var toTableName = relation.to.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase();
    var fkName = relation.fk_name.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s_]+/g, '_').toLowerCase();%>
alter table <%=fromTableName%> add column <%=fkName%>_id bigint not null;
alter table <%=fromTableName%>
    add constraint fk_<%=fromTableName%>_<%=toTableName%>_<%=fkName%> foreign key (<%=fkName%>_id) references <%=toTableName%>(id);
<% }%>
