## Context API — Detailed Notes (React)

### What problem does Context solve?
In React, data normally flows **parent → child** via props. This is great until you have to pass the same props through many layers of components that don’t actually use the data (this is called **prop drilling**).

**Context** lets you store a value at a high level and read it in deeply nested components without manually passing props through every level.

Common use-cases:
- **auth/user** information
- **theme** (dark/light)
- **global UI state** (language, layout)
- **shared app data** like a cart, watchlist, etc.

---

### Core pieces of Context API
Context has 3 main parts:

#### 1) `createContext()`
You create a Context object.

```js
import React from "react";
export const MovieContext = React.createContext();
```

This creates:
- a **Provider** component (`MovieContext.Provider`)
- a Context “channel” that consumers can subscribe to

#### 2) Provider
You wrap the part of your UI tree that needs access.

```jsx
<MovieContext.Provider value={{ watchlist, addToWatchList }}>
  <AppRoutes />
</MovieContext.Provider>
```

The `value` prop is what gets shared. It can be:
- primitive (string/number)
- object (most common)
- functions (actions like add/remove)

#### 3) Consumer (`useContext`)
Any component under that Provider can read the value:

```js
import { useContext } from "react";
import { MovieContext } from "./MovieContext";

const { watchlist, addToWatchList } = useContext(MovieContext);
```

---

### When should you use Context?
Use Context when:
- Many components need the same data/actions
- You want **global-ish state** shared across routes/pages
- You want to avoid prop drilling

Avoid Context when:
- Data is only needed by 1–2 nearby components
- State updates extremely frequently (Context causes re-renders of consumers)

Tip: For large apps, you can combine Context with:
- `useReducer` for predictable updates
- memoization (`useMemo`, `React.memo`) to reduce re-renders

---

### A “best practice” Context pattern
Create a file like `MovieContext.jsx` and export:
- the context (`MovieContext`)
- a provider component (`MovieProvider`) that owns the state

Example:

```jsx
export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movie) {
    setWatchList(prev => [...prev, movie]);
  }

  return (
    <MovieContext.Provider value={{ watchlist, addToWatchList }}>
      {children}
    </MovieContext.Provider>
  );
}
```

Then wrap your app once:

```jsx
<MovieProvider>
  <App />
</MovieProvider>
```

This keeps `App.jsx` cleaner and makes Context reusable.

---

### Important details / interview-style points
- **Context is not a state manager by itself**: it’s a “transport mechanism” for shared values.
- If you pass a new object in `value` on every render, consumers re-render. (This is why actions/state are often memoized.)
- Context is ideal for **app-wide** state; for server state (API caching), tools like React Query are often better.

---

### Mini glossary
- **Prop drilling**: passing props through intermediate components
- **Provider**: component that sets the context value
- **Consumer**: any component reading the context (`useContext`)

