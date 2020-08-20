-- :r "/usr/src/app/00-create-schema.sql";
-- GO
-- :r "/usr/src/app/01-create-user.sql";
-- GO
-- :r "/usr/src/app/02-create-tables.sql";
-- GO
-- :r "/usr/src/app/03-seed-data.sql";
-- GO

--  USE master;
--  ALTER DATABASE shortpoetdb SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
--  DROP DATABASE shortpoetdb;
--  DROP USER test
--  DROP ROLE VCCAppUser_Role
--  DROP LOGIN test
-- :setvar MSSQL_PASSWORD ''

-- https://github.com/lkurzyniec/netcore-boilerplate/blob/master/db/mssql/mssql-cars.sql
IF DB_ID('shortpoetdb') IS NOT NULL
  set noexec on               -- prevent creation when already exists

CREATE DATABASE shortpoetdb;

GO

USE shortpoetdb;

GO

CREATE SCHEMA VCC;

GO


DECLARE @user varchar(32);
DECLARE @defaultSchema varchar(32);
DECLARE @role varchar(32);
DECLARE @authorization varchar(32);
DECLARE @pass varchar(64);
DECLARE @test varchar(64);


SET @user = 'test';
SET @defaultSchema = 'VCC';
SET @role = 'VCCAppUser_Role';
SET @authorization = 'dbo';
SET @pass = '$(MSSQL_PASSWORD)';
-- PRINT('##########################')
-- PRINT(@pass)
-- PRINT('##########################')
-- SET @test = '$(MSSQL_PASSWORD)';
-- PRINT(@test)
-- vs --
-- w/o single quote which fails
-- SET @test = $(MSSQL_PASSWORD);
-- PRINT(@test)

--create @user user login
--create user in  database
--create role
--apply permissions to schemas
--ensure role membership is correct
--allow users to create tables in defaultSchema
--Allow user to connect to database
DECLARE @cmd nvarchar(max);
SET @cmd = 
'BEGIN
	CREATE LOGIN '+ @user + ' WITH PASSWORD=N''' + @pass + '''
	
	CREATE USER ' + @user + ' FOR LOGIN ' + @user + ' WITH DEFAULT_SCHEMA=' + @defaultSchema + '
	
	CREATE ROLE ' + @role + ' AUTHORIZATION ' + @authorization + '
	
	GRANT ALTER ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT CONTROL ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT SELECT ON SCHEMA::' + @defaultSchema +' TO ' + @role + '
	
	GRANT DELETE ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT INSERT ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT SELECT ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT UPDATE ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	GRANT REFERENCES ON SCHEMA::' + @authorization + ' TO ' + @role + '
	
	EXEC sp_addrolemember N''' + @role +''', ' + @user + '
	
	GRANT CREATE TABLE TO ' + @role + '
	
	GRANT CONNECT TO ' + @user +
' END';
-- PRINT(@cmd)
EXEC sp_executesql @cmd;

GO

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

GO

USE shortpoetdb;

GO

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

GO