## Configuración PLAN MARKET

1.- Ejecutar el siguiente comando
```bash
npm install
```

2.- Pasos a seguir dependiendo ambiente

##### Local
1.- Crear un archivo con la misma configuración de .env que ya viene en el repositorio que se llame .env.local y cambiar las configuraciones acorde a lo que se tenga configurado localmente. Variables de entorno importantes a considerar:
```bash
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true
```

2.- Ejecutar en consola desde la raíz del proyecto el comando:
```bash
npm start
```
En ese momento se inicializa el server y cualquier cambio que se haga en el código se va a reflejar en ese mismo momento.

##### Development
1.- Ejecutar en consola desde la raíz del proyecto el comando:
```bash
npm run start:dev
```
Lo que hace este comando es construir un build en Javascript y se inicia el server.

##### Staging
1.- Jalar la rama staging que no tendrá el archivo .env.development

2.- Crear un archivo .env.staging que tenga la configuración de staging. Variables de entorno importantes a considerar:
```bash
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = false
```
3.- Ejecutar en consola desde la raíz del proyecto el comando:
```bash
npm run start:stage
```
Lo que hace este comando es construir un build en Javascript y se inicia el server.

##### Production
1.- Jalar la rama master que no tendrá el archivo .env.development

2.- Crear un archivo .env.production que tenga la configuración de producción. Variables de entorno importantes a considerar:
```bash
TYPEORM_SYNCHRONIZE = false
TYPEORM_LOGGING = false
```
3.- Ejecutar desde la raíz del proyecto el comando
```bash
typeorm migration:run
```
Este comando creará la base de datos y la poblará con los datos iniciales. Este comando se debe ejecutar cada vez que se hagan cambios en base después de salir a producción

4.- Ejecutar en consola desde la raíz del proyecto el comando:
```bash
npm run start:prod
```
Lo que hace este comando es construir un build en Javascript y se inicia el server.

#### Explicación comandos package.json

##### start
```bash
npm start
```
Este comando inicializa el server y cualquier cambio que se haga en el código se va a reflejar en ese momento. Se lo debe usar en ambiente local.

##### dev
```bash
npm run dev
```
(Replica de npm start) Este comando inicializa el server y cualquier cambio que se haga en el código se va a reflejar en ese momento. Se lo debe usar en el ambiente local.

##### start:dev / start:stage / start:prod
```bash
npm run start:dev / start:stage / start:prod
```
Este comando crea un build en javascript y ejecuta el archivo server.js creado en la carpeta build utilizando el archivo .env respectivo dependiendo si se ejecuto start:dev, start:stage o start:prod

##### test
```bash
npm run test
```
Este comando ejecuta los tests usando jest

##### lint
```bash
npm run lint
```
Este comando revisa el linting de todo el proyecto y arroja errores en donde no se cumpla el lint

##### prettier
```bash
npm run prettier
```
Este comando revisa cualquier error de forma seteado en la librería prettier

##### format
```bash
npm run format
```
Este comando corrige automáticamente cualquier error de forma encontrado por prettier

##### check-format
```bash
npm run format
```
Este comando revisa cualquier error de forma encontrado por prettier y arroja errores en los archivos que no estén con el formato correcto

##### check-types
```bash
npm run check-types
```
Este comando revisa errores de typescript y arroja errores en los archivos que estén mal.

##### build
```bash
npm run build
```
Este comando transpila el typescript a javascript utilizando babel generando un build en javascript en la carpeta build

##### validate
```bash
npm run validate
```
Este comando ejecuta en paralelo los comandos check-types, check-format, lint y build

## Cómo utilizar este repositorio AMBIENTE DEV con DOCKER

- Cómo hacer deploy del proyecto?


1. Logearse docker repositorio azure, username y password brindados por aks
```
docker login crdes.azurecr.io
```

2. Construir la imagen
```
   sudo docker build -t crdes.azurecr.io/afiliacionesdesa:latest .
```

3. Subir la imagen al Docker Hub (ejecutar "docker login" en caso de no estar logueado desde consola en dockerhub)

```
sudo docker push crdes.azurecr.io/afiliacionesdesa:latest
```

4. En el server debe estar instalado y configurado Docker
5. Bajar la imagen el server a deployar

```
sudo docker pull crdes.azurecr.io/afiliacionesdesa:latest
```

6. Construir el contenedor, este comando deja corriendo el contenedor

```
sudo docker run -v /var/logs/afiliaciones:/var/www/html/afiliaciones/logs -d --network host --name afiliaciones --restart always crdes.azurecr.io/afiliacionesdesa:latest
```

7. Para iniciar el contenedor

```
sudo docker start afiliaciones




- Cómo hacer deploy del proyecto TEST?


1. Logearse docker repositorio azure, username y password brindados por aks
```
docker login crAmbienteTest.azurecr.io
```

2. Construir la imagen
```
   sudo docker build -t crAmbienteTest.azurecr.io/afiliar:dev .
```

3. Subir la imagen al Docker Hub (ejecutar "docker login" en caso de no estar logueado desde consola en dockerhub)

```
sudo docker push crAmbienteTest.azurecr.io/afiliar:dev
```

4. En el server debe estar instalado y configurado Docker
5. Bajar la imagen el server a deployar

```
sudo docker pull crAmbienteTest.azurecr.io/afiliar:dev
```

6. Construir el contenedor, este comando deja corriendo el contenedor

```
sudo docker run -v /var/logs/afiliaciones:/var/www/html/afiliaciones/logs -d --network host --name afiliaciones --restart always crAmbienteTest.azurecr.io/afiliar:dev
```

7. Para iniciar el contenedor

```
sudo docker start afiliaciones