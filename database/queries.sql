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
