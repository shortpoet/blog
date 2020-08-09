begin;

-- Insert rows into table 'users'
INSERT INTO "admin"."users"
( -- columns to insert data into
 id, username, password
)
VALUES
( 
 1, 'Shortpoet', 'haiku7'
),
( 
 2, 'Poetshort', 'loeku7'
),
( 
 3, 'Ryuken', 'uprku7'
);

-- -- Insert rows into table 'posts'
-- INSERT INTO posts
-- ( -- columns to insert data into
--  id, title, markdown, html, userId, created
-- )
-- VALUES
-- ( 
--  1, 'To Do', ''
-- ),
-- ( 
--  2, 'Doing', 1
-- ),
-- ( 
--  3, 'Done', 1
-- );

commit;