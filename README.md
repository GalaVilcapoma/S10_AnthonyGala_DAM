# Desarrollo de Aplicaciones Móviles — Semana 10 (AP5)

## 📌 Actividad Individual: Formularios y Validaciones

### 🎯 Descripción del Proyecto
Aplicación móvil desarrollada en **React Native + Expo** para la gestión e implementación de formularios interactivos con validación de datos en tiempo real y manejo de estado (`useState`).

---

## 🛠️ Estructura del Repositorio

```text
S10_AnthonyGala_DAM/
├── FormularioApp/             # Proyecto Expo React Native
│   ├── src/
│   │   └── components/
│   │       ├── ProductForm.js     # Formulario con validaciones en tiempo real
│   │       ├── ProductList.js     # Vista de productos registrados en memoria
│   │       └── SuccessModal.js    # Modal de confirmación de registro
│   ├── App.js                 # Componente principal con contenedor de pestañas
│   ├── package.json
│   └── app.json
└── README.md                  # Documentación del proyecto
```

---

## ⚙️ Opción Seleccionada: 1. Registro de Producto

### 📋 Campos e Inputs:
- **Nombre del Producto**: `TextInput` (Obligatorio, mínimo 3 caracteres).
- **Precio (S/)**: `TextInput` (Obligatorio, numérico estrictamente `> 0`).
- **Categoría**: Selector interactivo tipo *chips* (Electrónica, Ropa, Hogar, Alimentos, Deportes, Otros).
- **Stock**: `TextInput` (Obligatorio, entero mayor o igual a `0`).

### 🔍 Validaciones Implementadas:
1. Validaciones en tiempo real (`onChangeText`) y al perder el foco (`onBlur`).
2. Mensajes de error específicos en rojo debajo de cada campo con íconos indicativos.
3. Banner de advertencia general si hay errores al presionar el botón de envío.
4. Modal de confirmación con resumen de datos procesados al completar un registro válido.

---

## 🚀 Cómo Ejecutar la Aplicación

1. Navegar a la carpeta del proyecto:
   ```bash
   cd FormularioApp
   ```

2. Instalar dependencias (si es necesario):
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo de Expo:
   ```bash
   npx expo start
   ```

4. Opciones de visualización:
   - Presionar **`w`** para abrir en el navegador web.
   - Escanear el código QR con la app **Expo Go** en un dispositivo móvil.
