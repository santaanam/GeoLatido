# GeoLatido MVP (Expo + React Native + TypeScript)

MVP navegable de GeoLatido con mapa, layers, halos de latido, sheet de grupos, cámara mock, y flujo SOS con alertas mock.

## Stack
- Expo + React Native + TypeScript
- React Navigation (tabs)
- Zustand (estado global)
- react-native-maps
- @gorhom/bottom-sheet + gesture-handler + reanimated

## Estructura
- `src/screens`: pantallas principales
- `src/components`: UI reusable (markers, sheet, modales)
- `src/store`: estado y acciones
- `src/models`: tipos TypeScript
- `src/mock`: dataset local
- `src/utils`: filtrado y clustering grid básico

## Ejecutar
```bash
npm install
npx expo start
```

## Reglas MVP incluidas
- Layers con toggle y long-press (modo solo layer).
- Render con prioridad funcional (`FAMILIA > ALERTAS > GRUPOS > PÚBLICO > COMERCIAL`) aplicada vía filtros y composición de marcador.
- Zoom lejano con clusters por grid (en lugar de avatares individuales).
- Sheet de grupos con master `GRUPOS`.
- SOS crea alerta mock en layer `ALERTAS`.
- Cámara mock crea latido local para usuario actual y activa halo.
