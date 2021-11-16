USE ecommerce_api_prj;

CREATE table user (
	id int NOT null auto_increment primary key,
    name varchar(30) NOT NULL,
    email varchar(50) not null unique,
    password varchar(255) not null
);

CREATE TABLE product (
	id int NOT null AUTO_INCREMENT primary key,
	product_name varchar(50) not null,
    product_description varchar(255) not null,
    brand_id int,
    category_id int,
    foreign key (brand_id) references brand (id),
    foreign key (category_id) references category (id)
);

CREATE table brand (
	id int not null auto_increment primary key,
    brand_name varchar(30) not null
);

CREATE TABLE category (
	id int not null auto_increment primary key,
    category_name varchar(50) not null
);

-- CREATE TABLE favorite (
-- 	user_id int not null,
--     product_id int not null,
--     brand_id int not null,
--     primary key(user_id, product_id),
--     foreign key (user_id) references user (id),
--     foreign key (product_id) references product (id),
--     foreign key (brand_id) references brand (id)
-- );


DROP TABLE ecommerce_api_prj.user;

    SELECT * FROM user;