# Práctica 22: Config APK (usuarioApi) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure `usuarioApi` (Expo SDK 54 app) so it can produce an installable Android APK via `eas build -p android --profile preview`.

**Architecture:** Replace default Expo template assets with placeholder icons themed around user management, point `app.json` at them, fix a display-name/icon-path bug, and (once the developer has logged into EAS) add `eas.json` with `development`/`preview`/`production` build profiles.

**Tech Stack:** Expo SDK 54, expo-router 6, Python 3 + Pillow (`py -3`, already installed) for placeholder image generation, EAS CLI (`npx eas-cli` — no separate install needed, `npx` resolves it).

## Global Constraints

- Repo: `EmilianoLedesma/PM204`, project dir `usuarioApi/`, managed workflow (no `/ios`, `/android` folders) — do not create them.
- Do not modify screen logic (`AltaUsuariosScreen`, `ConsultaUsuariosScreen`, `ActualizarUsuarioScreen`, `DetalleUsuariosScreen`) or routes under `usuarioApi/app/`.
- Do not modify `expo.ios` section in `app.json`.
- Do not modify `miAPI/app/main.py` or any backend file.
- Do not run `eas build` — that command is for Emiliano to run himself.
- Do not run `eas login` or any EAS authentication — Task 4 is blocked until Emiliano confirms he has logged in himself.
- Branch: `practica-22-apk`, created from `main`, one commit per task.
- Commit messages: Spanish, indicative mood, matching repo style (e.g. "Agregar...", "Configurar...").

---

### Task 1: Placeholder icon/splash assets

**Files:**
- Create/overwrite: `usuarioApi/assets/icon.png` (1024x1024, RGB, no alpha)
- Create/overwrite: `usuarioApi/assets/adaptive-icon.png` (1024x1024, RGBA, transparent bg, foreground within ~66% safe area)
- Create/overwrite: `usuarioApi/assets/splash-icon.png` (512x512, RGBA, transparent bg)
- Create (scratch, not committed): `usuarioApi/scripts/gen_placeholder_icons.py`

**Interfaces:**
- Produces: three PNG files at the paths above, consumed by Task 2 (`app.json` references) and Task 3 (validation).

- [ ] **Step 1: Write the generator script**

Create `usuarioApi/scripts/gen_placeholder_icons.py`:

```python
from PIL import Image, ImageDraw

BLUE = (46, 90, 172, 255)
WHITE = (255, 255, 255, 255)
TRANSPARENT = (0, 0, 0, 0)


def draw_person(draw, cx, cy, scale, fill):
    head_r = scale * 0.16
    head_cy = cy - scale * 0.14
    draw.ellipse(
        [cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r],
        fill=fill,
    )
    body_w = scale * 0.44
    body_h = scale * 0.30
    body_top = head_cy + head_r * 0.6
    draw.pieslice(
        [cx - body_w / 2, body_top, cx + body_w / 2, body_top + body_h * 2],
        180,
        360,
        fill=fill,
    )


def make_icon(size, bg, fg, person_scale, mode="RGBA"):
    im = Image.new("RGBA", (size, size), bg)
    d = ImageDraw.Draw(im)
    draw_person(d, size / 2, size / 2, person_scale, fg)
    return im.convert(mode) if mode != "RGBA" else im


if __name__ == "__main__":
    # icon.png: 1024x1024, sin transparencia (spec: "sin transparencia")
    icon = make_icon(1024, BLUE, WHITE, person_scale=1024, mode="RGB")
    icon.save("usuarioApi/assets/icon.png")

    # adaptive-icon.png: 1024x1024, fondo transparente, gráfico centrado
    # en ~66% del lienzo (safe area de Android adaptive icons)
    adaptive = make_icon(1024, TRANSPARENT, BLUE, person_scale=1024 * 0.66)
    adaptive.save("usuarioApi/assets/adaptive-icon.png")

    # splash-icon.png: 512x512, fondo transparente (splash backgroundColor
    # ya es #ffffff en app.json, así que se ve consistente)
    splash = make_icon(512, TRANSPARENT, BLUE, person_scale=512 * 0.66)
    splash.save("usuarioApi/assets/splash-icon.png")

    print("done")
```

- [ ] **Step 2: Run the generator**

Run from repo root:
```
py -3 usuarioApi/scripts/gen_placeholder_icons.py
```
Expected output: `done`

- [ ] **Step 3: Verify output files**

Run:
```
py -3 -c "from PIL import Image; [print(f, Image.open('usuarioApi/assets/'+f).size, Image.open('usuarioApi/assets/'+f).mode) for f in ['icon.png','adaptive-icon.png','splash-icon.png']]"
```
Expected:
```
icon.png (1024, 1024) RGB
adaptive-icon.png (1024, 1024) RGBA
splash-icon.png (512, 512) RGBA
```

- [ ] **Step 4: Delete the generator script (scratch only, not part of the deliverable)**

```bash
rm usuarioApi/scripts/gen_placeholder_icons.py
rmdir usuarioApi/scripts 2>/dev/null || true
```

- [ ] **Step 5: Commit**

```bash
git add usuarioApi/assets/icon.png usuarioApi/assets/adaptive-icon.png usuarioApi/assets/splash-icon.png
git commit -m "Agregar iconos placeholder para build APK de usuarioApi"
```

Note in commit body or PR: these are placeholders (simple person silhouette), not final branding — Emiliano replaces with real design.

---

### Task 2: Fix `app.json` (name + icon path)

**Files:**
- Modify: `usuarioApi/app.json`

**Interfaces:**
- Consumes: `usuarioApi/assets/icon.png` from Task 1 (must exist before this task's validation step).
- Produces: updated `app.json` consumed by Task 3 (`expo config` validation) and Task 4 (`eas.json`, which reads project id but not these fields directly).

- [ ] **Step 1: Edit `expo.name`**

In `usuarioApi/app.json`, change:
```json
    "name": "repa2",
```
to:
```json
    "name": "Gestión de Usuarios",
```
Leave `"slug": "repa2"` unchanged.

- [ ] **Step 2: Fix `expo.icon` path**

In `usuarioApi/app.json`, change:
```json
    "icon": "./assets/splash-icon.png",
```
to:
```json
    "icon": "./assets/icon.png",
```

- [ ] **Step 3: Confirm unrelated fields untouched**

Diff the file and confirm only `name` and `icon` changed — `splash`, `ios`, `android.adaptiveIcon`, `web.favicon`, `plugins` must be identical to before:
```
git diff usuarioApi/app.json
```
Expected: only 2 changed lines (`name` and `icon` values).

- [ ] **Step 4: Commit**

```bash
git add usuarioApi/app.json
git commit -m "Configurar nombre visible y icono en app.json de usuarioApi"
```

---

### Task 3: Validate config

**Files:**
- None modified — read-only verification of Tasks 1-2.

**Interfaces:**
- Consumes: `usuarioApi/app.json` (Task 2), `usuarioApi/assets/*.png` (Task 1).

- [ ] **Step 1: Run expo-doctor**

```bash
cd usuarioApi && npx expo-doctor
```
Expected: no errors (warnings about unrelated things, e.g. EAS project not configured, are acceptable and expected at this stage — the point is no errors tied to `app.json`/icons).

- [ ] **Step 2: Run expo config resolution**

```bash
cd usuarioApi && npx expo config --type public
```
Expected: command succeeds, output JSON shows `"name": "Gestión de Usuarios"` and `"icon": "./assets/icon.png"`.

- [ ] **Step 3: If either command errors on app.json/icons, fix and re-run**

Do not proceed to Task 4 until both commands pass cleanly with respect to `app.json` and asset paths.

(No commit — this task is verification only.)

---

### Task 4: `eas.json` — BLOCKED on manual EAS login

**Files:**
- Create: `usuarioApi/eas.json`

**Interfaces:**
- Consumes: nothing from Tasks 1-3 directly (independent file), but logically depends on Emiliano's EAS account/project being reachable.
- Produces: `eas.json` used by the `eas build -p android --profile preview` command Emiliano runs himself (out of scope of this plan).

- [ ] **Step 0: STOP — wait for explicit confirmation**

Do NOT run `eas login`, `eas build:configure`, or any EAS CLI command that touches authentication in this task. This task starts only when Emiliano says he has already run `npx eas login` himself and confirms it (e.g. "eas login hecho"). If that confirmation hasn't been given, stop here and leave this task unchecked.

- [ ] **Step 1: Write `eas.json` by hand**

Create `usuarioApi/eas.json`:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

- [ ] **Step 2: Validate JSON syntax**

```bash
py -3 -c "import json; json.load(open('usuarioApi/eas.json')); print('valid json')"
```
Expected: `valid json`

- [ ] **Step 3: Commit**

```bash
git add usuarioApi/eas.json
git commit -m "Agregar eas.json con perfiles development, preview y production"
```

- [ ] **Step 4: Document the build command in the PR**

PR description must include the exact command Emiliano runs to build:
```
cd usuarioApi && eas build -p android --profile preview
```
And a note that the APK download link appears in the Expo dashboard / CLI output after the build finishes — this plan does not trigger that build.

---

## PR Summary Checklist (after all tasks)

- [ ] List placeholder assets pending real-design replacement (Task 1 output).
- [ ] Confirm `npx expo-doctor` and `npx expo config --type public` pass (Task 3).
- [ ] Note whether Task 4 (`eas.json`) is done or still blocked on login.
- [ ] Include the `eas build -p android --profile preview` command for Emiliano to run.
