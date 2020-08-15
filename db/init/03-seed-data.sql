\connect vcc test


-- Insert rows into table 'users'
INSERT INTO "admin"."users"
( -- columns to insert data into
 id, username, password
)
VALUES
( 
 1, 'Shortpoet', 'haikuukiah'
),
( 
 2, 'Poetshort', 'loekutterr'
),
( 
 3, 'Ryuken', 'uprkutterr'
),
( 
 4, 'username', 'passwordkk'
);

-- Insert rows into table 'posts'
INSERT INTO "content"."posts"
( -- columns to insert data into
 id, title, markdown, html, user_id, created
)
VALUES
( 
 1, 'Today', 'Content', '<p>Content</p>', 4, NOW()
),
( 
 2, 'This Week','Content', '<p>Content</p>', 4, CURRENT_DATE - integer '6'
),
( 
 3, 'This Month','Content', '<p>Content</p>', 4, CURRENT_DATE - integer '13'
);

-- update content.posts set created = (select current_date - integer '6') where id = 2;
