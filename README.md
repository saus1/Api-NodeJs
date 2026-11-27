# API de productos

Proyecto de una API REST desarrollada con Node.js y Express para consultar y administrar productos. Los datos se almacenan en una colección de Cloud Firestore y las operaciones para crear y eliminar productos requieren autenticación mediante JWT.

## Tecnologías

- 🟢 Node.js con módulos ES.
- 🚀 Express para las rutas HTTP.
- 🔥 Firebase Cloud Firestore como base de datos.
- 🔐 JSON Web Tokens (JWT) para proteger operaciones.

## Requisitos

- Node.js y npm.
- Un proyecto de Firebase con Cloud Firestore configurado.

## Instalación y ejecución

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto con la configuración necesaria:

   ```env
   apiKey=tu_api_key_de_firebase
   authDomain=tu_auth_domain_de_firebase
   storageBucket=tu_storage_bucket_de_firebase
   appId=tu_app_id_de_firebase
   JWT_SECRET_KEY=una_clave_secreta_para_firmar_tokens
   ```

   El identificador del proyecto de Firebase está definido en `src/data/data.js`. Asegúrate de que corresponda a tu proyecto.

3. Inicia el servidor:

   ```bash
   npm run dev
   ```

   Para iniciar sin modo de desarrollo:

   ```bash
   npm start
   ```

   El servidor escucha en `http://localhost:3000`.

4. Abre `http://localhost:3000` en el navegador. Ingresa en la página de acceso y, si las credenciales son correctas, pasarás al formulario de productos. El usuario de demostración actual es:

   - Correo: `admin@gmail.com`
   - Contraseña: `123456`

   Después del acceso, el menú permite dar de alta productos o consultarlos por nombre y por categoría. En los resultados puedes seleccionar un producto y eliminarlo; el ID interno de Firestore se utiliza para borrarlo, pero no se muestra en la interfaz. También puedes imprimir los resultados con **Imprimir resultados**. Para dar de alta, completa nombre, categoría, precio, stock y descripción; la URL de imagen es opcional. El botón **Cerrar sesión** termina la sesión del navegador.

## Rutas disponibles

| Método | Ruta | Descripción | Autenticación |
|---|---|---|---|
| `GET` | `/` | Muestra la página de acceso. | No |
| `GET` | `/productos` | Muestra el formulario para guardar productos; requiere una sesión iniciada en el navegador. | No |
| `POST` | `/auth/login` | Inicia sesión y devuelve un JWT. Recibe `email` y `password` en el cuerpo JSON. | No |
| `GET` | `/api/products` | Devuelve todos los productos. | No |
| `GET` | `/api/products?category=valor` | Filtra productos por el campo `categoria`. | No |
| `GET` | `/api/products/:id` | Busca un producto por su ID de Firestore. | No |
| `POST` | `/api/products/create` | Crea un producto a partir del cuerpo JSON. | Sí |
| `DELETE` | `/api/products/:id` | Elimina un producto por su ID de Firestore. | Sí |

Para las rutas protegidas, envía el token obtenido al iniciar sesión en el encabezado:

```http
Authorization: Bearer <token>
```

Los tokens tienen una duración de una hora. El campo `categoria` debe coincidir con el valor usado para filtrar. Los documentos de producto se guardan tal como se reciben; la API no define un esquema fijo para sus campos. El formulario web usa `nombre`, `categoria`, `precio`, `stock`, `descripcion` e `imagen` (opcional). La búsqueda por nombre se realiza sobre los productos devueltos por la API; la búsqueda por categoría usa el filtro exacto de Firestore. El ID de Firestore se conserva internamente para la operación de borrado y no se presenta en las consultas ni en el listado.

## Estructura principal

```text
.
├── index.js
└── src/
    ├── controllers/   # Manejo de solicitudes y respuestas
    ├── data/          # Inicialización de Firebase y Firestore
    ├── middlewares/   # Verificación de autenticación
    ├── models/        # Consultas a Firestore
    ├── routes/        # Rutas de productos y autenticación
    ├── services/      # Lógica de acceso a productos
    └── utils/         # Generación de tokens
```

## Nota de configuración

La autenticación actual usa el usuario de demostración indicado arriba, definido en el controlador de autenticación. Estas credenciales son solo para desarrollo. Antes de desplegar el proyecto, reemplázalas por un mecanismo de usuarios seguro y protege las claves del archivo `.env`; no compartas ese archivo.
