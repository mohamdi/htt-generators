--liquibase formatted sql

--changeset HTT:init-data/1
INSERT INTO app_user(id, username, email, full_name, password, user_active, role)
VALUES (1, 'admin', 'admin@<%=AppName%>.com', 'Admin', '$2a$10$X0Dn6THuWo2t49OQUhIsOe.UCB.lc63wGvTkl4GUxGOaH5Tg0bu7.', TRUE, 'ADMIN');