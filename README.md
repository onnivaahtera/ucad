#Diagrammi tietokannan tauluista
![alt text](<images/Screenshot 2026-11-05 at 17.50.53.png>)

#Scriptit tietokannan sekä taulujen luomiseen

```sql
DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE UserLevels (
  user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  level_name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_level_id) REFERENCES UserLevels(user_level_id)
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE MediaLikes (
  comment_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  media_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
);
```

#Scriptit mock datan lisäämiseen

```sql
INSERT INTO UserLevels (user_level_id, level_name, description)
  VALUES (1, 'User', 'Standard user account');

INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null);
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);

INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type)
  VALUES ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
         ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
         ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');

INSERT INTO MediaLikes (media_id, user_id)
  VALUES (1, 260),
         (1, 305),
         (2, 260),
         (3, 305);
```

#Esimerkki queryjä

```sql
-- Get every media item and username of the owner
SELECT m.filename, u.username
  FROM MediaItems AS m
  JOIN Users AS u ON m.user_id = u.user_id;

-- Select media items by given user
SELECT m.title, m.filename
  FROM MediaItems as m
  JOIN Users AS u ON u.user_id = m.user_id
  WHERE u.username = '<username>';

-- Count likes for each media item
SELECT m.title, COUNT(ml.like_id) AS like_count
  FROM MediaItems AS m
  JOIN MediaLikes AS ml ON ml.media_id = m.media_id
  GROUP BY m.media_id, m.title
  ORDER BY like_count DESC;

-- Like a media item (user 260 likes media item 1)
INSERT INTO MediaLikes (media_id, user_id)
  VALUES (1, 260);

-- Unlike a media item (user 260 removes their like from media item 1)
DELETE FROM MediaLikes
  WHERE media_id = 1 AND user_id = 260;
```
