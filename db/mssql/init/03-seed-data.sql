USE shortpoetdb


-- Insert rows into table 'users'
INSERT INTO [VCC].[admin_users]
( -- columns to insert data into
 username, password
)
VALUES
( 
 'Shortpoet', 'haikuukiah'
),
( 
 'Poetshort', 'loekutterr'
),
( 
 'Ryuken', 'uprkutterr'
),
( 
 'username', 'passwordkk'
);

-- Insert rows into table 'posts'
INSERT INTO [VCC].[content_posts]
( -- columns to insert data into
 title, markdown, html, user_id, created
)
VALUES
( 
 'Today', 'Content', '<p>Content</p>', 4, GETDATE()
),
( 
 'This Week','Content', '<p>Content</p>', 4,  DATEADD(day, -7, GETDATE())
),
( 
 'This Month','Content', '<p>Content</p>', 4, DATEADD(day, -14, GETDATE())
);
