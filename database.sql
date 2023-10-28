 CREATE DATABASE finalproject;

 create table userlogin(
    username varchar(255) not null,
    password varchar(255) not null,
    primary key (username)
);

create table place(
    id int not null auto_increment,
    title varchar(255) not null,
    description text not null,
    imagename varchar(255) not null,
    location varchar(255) not null,
    date timestamp not null default current_timestamp on update current_timestamp,
    primary key (id)
);

ALTER TABLE place
DROP COLUMN imagename;

CREATE TABLE images (
    imageid int not null auto_increment,
    imagename varchar (255) NOT NULL,  
    id int not null,  
    FOREIGN KEY (id) REFERENCES place (id),
    primary key (imageid)  
);  

select place.title,place.description,place.location,images.image from place inner join images on place.id=images.id;

SELECT
  JSON_ARRAYAGG(JSON_OBJECT('title', place.title))
FROM
    place
    LEFT JOIN (
        SELECT 
            place, 
            JSON_ARRAYAGG(JSON_OBJECT('id', id, 'imagename',imagename)) 
        FROM images
        GROUP BY place
    )  ON images.id = place.id;