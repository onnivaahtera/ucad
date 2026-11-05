-- file path
-- /Users/onniva/code/ucad/database/test-data.sql

-- Insert test data
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