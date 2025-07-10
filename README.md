# 🧠 Project Management App

Aplicación web para la gestión de proyectos y tareas con control de usuarios por rol (Admin, Manager, Developer).

## 🚀 Tecnologías

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** FastAPI
- **Base de Datos:** PostgreSQL (Railway)
- **Autenticación:** JWT
- **Despliegue:** Vercel + Railway

---

## 📦 Funcionalidades

- CRUD de Proyectos
- CRUD de Tareas por proyecto
- Vista Kanban de tareas
- Roles: Admin, Manager, Developer
- Control de acceso según rol
- Panel de navegación con diseño responsivo

---

## 🧪 Usuarios de prueba

| Rol      | Email              | Contraseña  |
|----------|--------------------|-------------|
| Admin    | admin@test.com     | admin123    |
| Manager  | manager@test.com   | manager123  |
| Developer | dev@test.com      | dev123      |

---

## 🧭 Navegación

| Ruta            | Descripción                     |
|-----------------|---------------------------------|
| `/login`        | Página de inicio de sesión      |
| `/dashboard`    | Vista general del usuario       |
| `/projects`     | Listado de proyectos            |
| `/projects/[id]/tasks` | Tareas del proyecto en vista Kanban |

---

## 🛠️ Instalación local

1. Clona el repositorio:

``
git clone https://github.com/tuusuario/nombre-del-repo.git
cd nombre-del-repo
``

## ⚙️ Backend

El backend está desarrollado con **FastAPI**.

Incluye endpoints para:

- Autenticación (login)
- Gestión de usuarios
- Gestión de proyectos
- Gestión de tareas

📌 Puedes acceder a la documentación interactiva (Swagger) en:
[http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📄 Decisiones técnicas

- ✅ **Separación clara de componentes** en `/components`
- ✅ **Context API** para el manejo global de autenticación
- ✅ **TailwindCSS** para un diseño limpio, moderno y responsivo
- ✅ **Modales personalizados** sin dependencias externas para las operaciones de CRUD (crear, editar, eliminar)

---

## 👩‍💻 Manual básico de usuario

1. Inicia sesión con las credenciales de prueba proporcionadas
2. Crea, edita o elimina proyectos desde el panel principal
3. Haz clic en un proyecto para ingresar a sus tareas
4. Crea tareas o muévelas entre columnas tipo **Kanban** para organizar su estado (`TODO`, `In Progress`, etc.)
