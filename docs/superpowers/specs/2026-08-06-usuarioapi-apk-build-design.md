# Práctica 22: Config APK (EAS Build) para usuarioApi

## Contexto

Repo `EmilianoLedesma/PM204`, proyecto `usuarioApi` (Expo SDK 54, expo-router 6,
managed workflow, sin carpetas `/ios` ni `/android`). No existe `eas.json`.
`app.json` tiene `name`/`slug` `"repa2"` y usa assets de plantilla Expo.

## Alcance

**Qué cambia:** `usuarioApi/app.json` (name visible, icon, adaptive icon,
splash) y nuevo `usuarioApi/eas.json` con perfil `preview` para generar APK.

**Qué NO cambia:** lógica de pantallas (`AltaUsuariosScreen`,
`ConsultaUsuariosScreen`, `ActualizarUsuarioScreen`, `DetalleUsuariosScreen`),
rutas de `app/`, sección `expo.ios`, backend `miAPI/app/main.py`.

**Fuera de alcance explícito:** configuración iOS, EAS Submit / publicación
Google Play.

## Criterio de éxito

- `npx expo-doctor` sin errores.
- `npx expo config --type public` resuelve `app.json` sin errores.
- `eas.json` es JSON válido y respeta schema EAS (verificado manualmente,
  sin correr `eas build:configure`).
- Build `eas build -p android --profile preview` (a correr por Emiliano)
  produce APK instalable.

## Componentes

### 1. Assets placeholder (`usuarioApi/assets/`)

- `icon.png`: 1024x1024, sin transparencia, placeholder simple relacionado
  con gestión de usuarios.
- `adaptive-icon.png`: 1024x1024, gráfico centrado con margen de seguridad
  (~66% del lienzo), fondo transparente.
- `splash-icon.png`: fondo consistente con `backgroundColor` actual
  (`#ffffff`).
- Son placeholders explícitos — se marcan en el PR para reemplazo posterior
  por Emiliano con diseño real. No se inventan datos de diseño final.

### 2. `usuarioApi/app.json`

- `expo.name`: `"repa2"` → `"Gestión de Usuarios"`.
- `expo.slug`: se mantiene `"repa2"` (no renombrar proyecto en Expo).
- `expo.icon`: corregir de `./assets/splash-icon.png` (bug actual) a
  `./assets/icon.png`.
- `expo.splash.image`: se mantiene `./assets/splash-icon.png`,
  `resizeMode: "contain"` sin cambios.
- `expo.android.adaptiveIcon.foregroundImage`: ya apunta a
  `./assets/adaptive-icon.png`, sin cambios.
- `expo.ios`: sin cambios (fuera de alcance).

### 3. `usuarioApi/eas.json`

**Bloqueado en este ciclo.** Requiere `eas login` interactivo de Emiliano
(el agente no se autentica contra la cuenta Expo). Cuando el login esté
confirmado, se genera con `eas build:configure` o se escribe a mano, con
perfiles:

```json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal", "android": { "buildType": "apk" } },
    "production": { "android": { "buildType": "app-bundle" } }
  }
}
```

### 4. Validación

- `npx expo-doctor`
- `npx expo config --type public`
- Revisión manual de `eas.json` como JSON válido (cuando se cree).
- No se ejecuta `eas build` — comando exacto documentado en el PR para que
  Emiliano lo corra.

## Flujo de trabajo

- Rama nueva `practica-22-apk`, nunca directo sobre `main`.
- Un commit por tarea (assets, app.json, eas.json cuando desbloquee),
  mensajes en español modo indicativo ("Agregar...", "Configurar...").
- Checkpoint de revisión de spec-compliance antes de cada commit
  (subagent-driven-development).
- PR final documenta: assets placeholder pendientes de reemplazo, comando
  de build (`eas build -p android --profile preview`), y nota de que
  `eas.json` queda pendiente hasta `eas login`.

## Riesgos / decisiones abiertas

- `eas.json` no se crea en este ciclo — tarea de plan queda marcada como
  bloqueada hasta que Emiliano confirme login hecho.
