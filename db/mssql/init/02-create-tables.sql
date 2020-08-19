CREATE TABLE [VCC].[content_posts] (
  id INT PRIMARY KEY CLUSTERED,
  title VARCHAR(100) NOT NULL,
  markdown VARCHAR(max) NULL,
  html VARCHAR(max) NULL,
  user_id INTEGER NOT NULL,
  created DATETIME2 NOT NULL
);


EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds blog posts for vue composition course db.' , @level0type=N'SCHEMA',@level0name=N'VCC', 
@level1type=N'TABLE',@level1name=N'content_posts'


CREATE TABLE [VCC].[admin_users] (
  id INT PRIMARY KEY CLUSTERED,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(100) CHECK(DATALENGTH(password) > 9) NOT NULL
);

CREATE UNIQUE INDEX users_username_idx ON  [VCC].[admin_users](username);

EXEC sys.sp_addextendedproperty @name=N'Comment', 
@value=N'This holds users for vue composition course db.' , @level0type=N'SCHEMA',@level0name=N'VCC', 
@level1type=N'TABLE',@level1name=N'admin_users'

ALTER TABLE [VCC].[content_posts] ADD FOREIGN KEY (user_id) REFERENCES [VCC].[admin_users](id) ON DELETE CASCADE ON UPDATE NO ACTION;


-- check COMMENT
-- https://stackoverflow.com/questions/378700/is-it-possible-to-add-a-description-comment-to-a-table-in-microsoft-sql-2000

-- SELECT *
-- FROM fn_listextendedproperty (NULL, 'schema','VCC', 'table', 'content_posts', default, default);

-- SELECT
-- p.name AS [Name],p.value
-- FROM
-- sys.tables AS tbl
-- INNER JOIN sys.extended_properties AS p ON p.major_id=tbl.object_id AND p.minor_id=0 AND p.class=1
-- WHERE
-- (tbl.name=N'content_posts' and SCHEMA_NAME(tbl.schema_id)=N'VCC')
-- ORDER BY
-- [Name] ASC
