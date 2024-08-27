create schema shop collate utf8mb4_general_ci;
use shop;

create table categories
(
    id          int auto_increment
        primary key,
    title       varchar(255) not null,
    description text         null
);

create table products
(
    id          int auto_increment
        primary key,
    category_id int                                not null,
    title       varchar(255)                       not null,
    description text                               null,
    price       bigint                             not null,
    image       varchar(255)                       null,
    created_at  datetime default CURRENT_TIMESTAMP null,
    constraint products_categories_id_fk
        foreign key (category_id) references categories (id)
);

insert into categories (id, title, description)
values  (1, 'CPUs', 'A very large selection of CPUs'),
        (2, 'GPUs', 'Most powerful GPUs on the market'),
        (3, 'SSDs', null);

insert into products (id, category_id, title, description, price, image, created_at)
values  (1, 1, 'Intel Core i9', 'Testing', 400, '1.jpg', '2024-08-20 14:26:29'),
        (3, 3, 'Samsung 970 EVO', 'SSD description', 154, '3.jpg', '2024-08-20 14:28:44');