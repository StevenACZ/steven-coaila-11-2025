# 🔴 Pokédex

Una aplicación web moderna para explorar Pokémon de la primera generación, construida con Vue 3 y la PokeAPI.

![Pokédex Preview](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png)

## 📋 Resumen del Proyecto

Pokédex es una Single Page Application (SPA) que permite:

- 🔍 **Explorar** los 151 Pokémon de la primera generación
- 🎯 **Filtrar** por tipo (Fuego, Agua, Planta, etc.)
- 🔎 **Buscar** Pokémon por nombre
- ⭐ **Crear un equipo** de hasta 6 Pokémon
- 📱 **Ver detalles** como estadísticas, altura, peso y cadena evolutiva
- 🔊 **Escuchar el grito** de cada Pokémon
- 🌙 **Modo oscuro/claro** con persistencia en localStorage

## ✨ Funcionalidades Extras

- 🎬 **Animaciones y transiciones** - Transiciones suaves entre páginas usando Vue Transition
- 💫 **Microinteracciones** - Animación de "grito" en imágenes de Pokémon al reproducir sonido
- 💾 **Persistencia local** - El equipo y el tema se guardan en localStorage
- 🔍 **Filtrado y búsqueda avanzada** - Filtrar por múltiples tipos simultáneamente
- 🌓 **Dark Mode** - Tema oscuro/claro con toggle y persistencia
- 🚀 **Transiciones del Router** - Animación scale al cambiar de página
- ⚡ **Lazy Loading de imágenes** - Carga optimizada con `loading="lazy"`
- 📦 **Caché de datos** - Almacenamiento en memoria para reducir llamadas a la API

## 🏗️ Estructura de Carpetas

```
src/
├── assets/
│   └── styles/           # Estilos globales y mixins SCSS
├── components/
│   ├── common/           # Componentes base reutilizables
│   │   ├── BaseButton.vue
│   │   ├── BaseLoader.vue
│   │   ├── BaseModal.vue
│   │   ├── BasePagination.vue
│   │   └── BaseSearchInput.vue
│   ├── layout/           # Layout de la aplicación
│   │   ├── TheLayout.vue
│   │   └── TheNavbar.vue
│   └── pokemon/          # Componentes específicos de Pokémon
│       ├── EvolutionChain.vue
│       ├── PokemonCard.vue
│       ├── PokemonCry.vue
│       ├── PokemonStats.vue
│       ├── PokemonTeamCard.vue
│       ├── PokemonTypes.vue
│       ├── TypeBadge.vue
│       └── TypeFilter.vue
├── composables/          # Lógica reutilizable (hooks)
│   ├── usePokemon.ts
│   ├── usePokemonDetail.ts
│   ├── usePokemonGrid.ts
│   ├── useTeam.ts
│   ├── useTeamPokemon.ts
│   └── useTheme.ts
├── constants/            # Constantes globales
│   └── pokemonTypes.ts
├── router/               # Configuración de rutas
│   └── index.ts
├── services/             # Llamadas a la API
│   ├── api.ts
│   └── pokemonService.ts
├── stores/               # Estado global (Pinia)
│   ├── pokemonStore.ts   # Caché de datos de la API
│   └── teamStore.ts      # Gestión del equipo
├── types/                # Tipos de TypeScript
│   └── pokemon.ts
└── views/                # Páginas principales
    ├── HomeView.vue      # Lista de Pokémon
    ├── TeamView.vue      # Mi equipo
    └── PokemonDetailView.vue
```

## 🚀 Instalación

### Requisitos previos

- [Node.js](https://nodejs.org/) v18+ o [Bun](https://bun.sh/)
- Git

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/steven-coaila-11-2025.git
cd steven-coaila-11-2025
```

2. **Instalar dependencias**

```bash
# Con Bun (recomendado)
bun install

# O con npm
npm install
```

3. **Ejecutar en modo desarrollo**

```bash
bun dev
# o
npm run dev
```

4. **Abrir en el navegador**

```
http://localhost:5173
```

## 📦 Dependencias Clave

| Dependencia    | Versión | Propósito                |
| -------------- | ------- | ------------------------ |
| **Vue 3**      | ^3.5.25 | Framework principal      |
| **Vue Router** | ^4.6.3  | Navegación entre páginas |
| **Pinia**      | ^3.0.4  | Manejo de estado global  |
| **Axios**      | ^1.13.2 | Cliente HTTP para la API |
| **TypeScript** | ^5.x    | Tipado estático          |
| **Vite**       | ^6.x    | Build tool y dev server  |
| **SCSS**       | -       | Preprocesador de estilos |

## 🧪 Guía para Probar la Aplicación

### Flujo principal de pruebas

1. **Página de inicio (`/`)**
   - ✅ Verificar que se cargan los 151 Pokémon
   - ✅ Usar la barra de búsqueda para filtrar por nombre
   - ✅ Usar los filtros de tipo para filtrar por tipo
   - ✅ Cambiar de página con la paginación
   - ✅ Hacer click en un Pokémon para seleccionarlo (máximo 6)

2. **Ver equipo (`/team`)**
   - ✅ Verificar que se muestran los Pokémon seleccionados
   - ✅ Hacer click en el botón de reproducir grito
   - ✅ Verificar que la imagen del Pokémon se anima al gritar
   - ✅ Eliminar un Pokémon del equipo

3. **Detalle del Pokémon (`/team/:id`)**
   - ✅ Verificar que se muestra la información completa
   - ✅ Ver estadísticas, altura, peso
   - ✅ Ver descripción del Pokémon
   - ✅ Ver cadena evolutiva
   - ✅ Reproducir el grito

4. **Funcionalidades adicionales**
   - ✅ Cambiar entre modo oscuro/claro (botón 🌙/☀️)
   - ✅ Verificar que el tema persiste al recargar
   - ✅ Verificar que el equipo persiste en localStorage
   - ✅ Probar en móvil (diseño responsive)

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
bun dev

# Build de producción
bun run build

# Verificar tipos
bun run type-check

# Linting
bun lint
```

## 📄 Licencia

MIT License

---

Desarrollado con ❤️ por StevenACZ
