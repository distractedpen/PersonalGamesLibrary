﻿SELECT 'CREATE DATABASE gamelibrary'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'gamelibrary' )\gexec;