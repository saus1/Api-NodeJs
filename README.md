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

4. Abre `http://localhost:3000` en el navegador para usar el formulario web. Inicia sesión con el usuario de demostración actual:

   - Correo: `admin@gmail.com`
   - Contraseña: `123456`

   Completa nombre, categoría, precio, stock y descripción; la URL de imagen es opcional. El formulario envía los datos a la ruta protegida de creación y los guarda en la colección `products` de Firestore.

## Rutas disponibles

| Método | Ruta | Descripción | Autenticación |
|---|---|---|---|
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

Los tokens tienen una duración de una hora. El campo `categoria` debe coincidir con el valor usado para filtrar. Los documentos de producto se guardan tal como se reciben; la API no define un esquema fijo para sus campos. El formulario web usa `nombre`, `categoria`, `precio`, `stock`, `descripcion` e `imagen` (opcional).

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
