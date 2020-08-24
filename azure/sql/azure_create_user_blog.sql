--create @user user login
--create user in  database
--create role
--apply permissions to schemas6
--ensure role membership is correct
--allow users to create tables in defaultSchema
--Allow user to connect to database

-- start in master

CREATE LOGIN vcc_client WITH PASSWORD=N''

-- manually switch to shortpoetdb

DECLARE @defaultSchema varchar(32);
SET @defaultSchema = 'vcc';

IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = @defaultSchema)
  BEGIN
    EXEC ('CREATE SCHEMA ' + @defaultSchema + ';');
  END;


DECLARE @user varchar(32);
DECLARE @role varchar(32);
DECLARE @authorization varchar(32);


SET @user = 'vcc_client';
SET @role = 'VccAppUser_Role';
SET @authorization = 'dbo';

DECLARE @cmd nvarchar(max);
SET @cmd = 
'BEGIN

  CREATE USER '+ @user + ' FOR LOGIN '+ @user + ' WITH DEFAULT_SCHEMA=' + @defaultSchema + '

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
PRINT(@cmd)
EXEC sp_executesql @cmd;
