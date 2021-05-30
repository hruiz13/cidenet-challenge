# CHALLENGE CIDENET

- Github del codigo fuente: https://github.com/hruiz13/cidenet-challenge
- Pagina de la demo: 

## Instalacion
- Cuenta con 2 carpetas, una para front (client), y una para back (api).
- npm install para cada una de ellas
- archivo .env para cada una de ellas con lo siguiente: (ejemplos)

Front: \
REACT_APP_API_URL= http://192.168.1.100:4000/api (ruta al backend)

Back: \
PORT=4000 (puerto del backend) \
DB_USER=root (usuario de db) \
DB_PASSWORD=  (contraseña de db) \
DB_HOST=192.168.1.100 (host base de datos) \
DB_NAME=cedinet (nombre de la db) 

- DB utilizada. PostgresSQL
- npm start [para el front-end]
- npm start [para el backend]

## Scripts
No se require un script adicional, el backend se encarga de generar las tablas necesarias. Solo se debe crear el nombre de la db principal que se configura en el .env del backend.

## Tecnologias utilizadas:
- React
- Redux
- Antdesign
- Nodejs
- express
- Sequelize

## Datos:
Creado por Hector Ruiz
