USE shortpoetdb


-- Insert rows into table 'users'
INSERT INTO [VCC].[admin_users]
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
INSERT INTO [VCC].[content_posts]
( -- columns to insert data into
 id, title, markdown, html, user_id, created
)
VALUES
( 
 1, 'Today', 'Content', '<p>Content</p>', 4, GETDATE()
),
( 
 2, 'This Week','Content', '<p>Content</p>', 4,  DATEADD(day, -7, GETDATE())
),
( 
 3, 'This Month','Content', '<p>Content</p>', 4, DATEADD(day, -14, GETDATE())
);
