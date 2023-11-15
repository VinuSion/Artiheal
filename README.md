# 🟣 Artiheal

### 📱Live Demo: https://artiheal.onrender.com/
<br>

![artiheal](/client/public/Cover_Img.png)

## 🛠️ Tecnologias y Herramientas Usadas

- React
- Typescript
- MongoDB
- Tailwind CSS
- Shadcn
- Framer-Motion
- Zod
- Lucide Icons

<br>

## ⚡ Ejecutar Localmente 

Para ejecutar este proyecto localmente en tu computador, siga los siguientes pasos:

### 1. Clonar Repositorio

```
$ git clone https://github.com/VinuSion/Artiheal.git
$ cd artiheal
```

### 2. Crear archivo .env

- En la carpeta "server", crea un archivo ".env"

### 3. Crear la base de datos de MongoDB

Para crear la base de datos con MongoDB tienes 2 opciones:

- Ejecutar localmente en Compass
  - Instalar MongoDB Community Edition en este [sitio](https://www.mongodb.com/try/download/community)
  - En el archivo ".env" escribir lo siguiente:
  ```
  MONGODB_URL=mongodb://localhost/artiheal
  ```

- Crear nueva instancia en Atlas Cloud
  - Crear una BD tipo "M0" en [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - En el archivo ".env" escribir lo siguiente:
  ```
  MONGODB_URL=mongodb+srv://tu-conexion-mongodb
  ```

### 4. Ejecutar Server (Backend)

Abre un nuevo terminal en VS Code en el directorio del proyecto y ejecuta los siguientes comandos:
```
$ cd server
$ npm install
$ npm run server
```

### 5. Ejecutar Client (Frontend)
Abre otro terminal en VS Code en el directorio del proyecto y ejecuta:
```
$ cd client
$ npm install
$ npm run dev
```

### 6. Crear los datos base de rutina, tareas y alimentos
Crea las colecciones "routines", "tasks" y "foods" (Conteniendo +50 documentos):
- Abre el siguiente enlace en el navegador: http://localhost:4000/api/data

### 7. Crear nueva cuenta de usuario

Abre el siguiente enlace: http://localhost:3000/signup
- Digite sus datos y clic en el boton "Crear Cuenta"
- Iniciar sesion con tu nueva cuenta en: http://localhost:3000/login

<br>

Listo, ya puedes llenar el formulario de perfil de salud y posteriormente usar la aplicacion localmente en tu computador! 🎉

## 😀 ¡MUCHAS GRACIAS!
