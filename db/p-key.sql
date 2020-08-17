-- get and reset primary key SEQUENCE
-- https://www.postgresql.org/message-id/4B194EBD.4050803%40fmed.uba.ar
-- https://stackoverflow.com/questions/4448340/postgresql-duplicate-key-violates-unique-constraint/21639138#21639138
-- https://github.com/typeorm/typeorm/issues/4122

SELECT table_name, column_name, column_default from
information_schema.columns where table_name='users';

SELECT MAX(id) FROM admin.users;
SELECT nextval('admin.users_id_seq');

-- update content.posts set created = (select current_date - integer '6') where id = 2;
SELECT setval(
    pg_get_serial_sequence('admin.users', 'id'),
    (SELECT MAX("id") FROM admin.users) + 1
);


-- get primary key columns 
-- https://stackoverflow.com/questions/1214576/how-do-i-get-the-primary-keys-of-a-table-from-postgres-via-plpgsql

-- SELECT a.attname
-- FROM   pg_index i
-- JOIN   pg_attribute a ON a.attrelid = i.indrelid
--                      AND a.attnum = ANY(i.indkey)
-- WHERE  i.indrelid = 'admin.users'::regclass
-- AND    i.indisprimary;

-- SELECT c.column_name, c.data_type
-- FROM information_schema.table_constraints tc 
-- JOIN information_schema.constraint_column_usage AS ccu USING (constraint_schema, constraint_name) 
-- JOIN information_schema.columns AS c ON c.table_schema = tc.constraint_schema
--   AND tc.table_name = c.table_name AND ccu.column_name = c.column_name
-- WHERE constraint_type = 'PRIMARY KEY' and tc.table_name = 'users';

-- SELECT               
--   pg_attribute.attname, 
--   format_type(pg_attribute.atttypid, pg_attribute.atttypmod) 
-- FROM pg_index, pg_class, pg_attribute, pg_namespace 
-- WHERE 
--   pg_class.oid = 'admin.users'::regclass AND 
--   indrelid = pg_class.oid AND 
--   nspname = 'admin' AND 
--   pg_class.relnamespace = pg_namespace.oid AND 
--   pg_attribute.attrelid = pg_class.oid AND 
--   pg_attribute.attnum = any(pg_index.indkey)
--  AND indisprimary