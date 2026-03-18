## IMDB Clone Project — Context API Notes (How we used it)

### Goal in this project
We needed a way to let multiple components (and multiple routes/pages) interact with the **same watchlist** without passing props through many layers.

We used React Context to share:
- **`watchlist`** (the list of saved movies)
- **`addToWatchList(movieObj)`** (action to add a movie)
- **`setWatchList`** (state setter used by the watchlist page)

---

### 1) Creating the context
File: `src/components/MovieContext.jsx`

```js
import React from "react";
export const MovieContext = React.createContext();
```

This creates a context object that can be used across the app.

---

### 2) Providing the context at the top of the app
File: `src/App.jsx`

We wrapped the router (all routes) with a Provider:

```jsx
<MovieContext.Provider value={{ watchlist, addToWatchList, setWatchList }}>
  <BrowserRouter>
    <NavBar />
    <Routes>...</Routes>
  </BrowserRouter>
</MovieContext.Provider>
```

Why this matters:
- Every page/route can access the same watchlist state.
- `MovieCard` (deep inside the Movies page) can add a movie to the watchlist.
- `WatchList` page can read and update the list.

---

### 3) Loading & saving watchlist (localStorage)
We used `localStorage` to persist the watchlist.

#### Load once when app starts
In `App.jsx`, the watchlist is initialized from localStorage:

```js
useEffect(() => {
  const moviesFromLS = localStorage.getItem("movies");
  if (!moviesFromLS) return;
  try {
    setWatchList(JSON.parse(moviesFromLS));
  } catch {
    // ignore invalid localStorage value
  }
}, []);
```

This ensures the app remembers saved movies after refresh.

#### Add movie (avoid duplicates + persist)
Still in `App.jsx`:

```js
function addToWatchList(movieObj) {
  setWatchList((prev) => {
    if (prev.some((m) => m.id === movieObj.id)) return prev;
    const next = [...prev, movieObj];
    localStorage.setItem("movies", JSON.stringify(next));
    return next;
  });
}
```

Key concepts shown here:
- **immutability**: we build a new array instead of mutating the old one
- **duplicate prevention**: we check `id` before adding
- **persistence**: we save updated list in localStorage

---

### 4) Consuming context inside a component (MovieCard)
File: `src/components/MovieCard.jsx`

`MovieCard` needs to add movies to the watchlist when user clicks the “+” button.
Instead of receiving `addToWatchList` as a prop, it reads it directly from context:

```js
import { useContext } from "react";
import { MovieContext } from "./MovieContext";

const { addToWatchList } = useContext(MovieContext);
```

Then on click:

```jsx
onClick={() => addToWatchList(movieObject)}
```

Why this is useful:
- `Movies -> MovieCard` tree can be deep.
- Context removes the need to pass `addToWatchList` through every layer.

---

### 5) WatchList page (reading data + filtering UI)
File: `src/components/WatchList.jsx`

This component receives `watchList` and `setWatchList` as props *right now*:

```jsx
<WatchList watchList={watchlist} setWatchList={setWatchList} />
```

It uses `watchList` to:
- render a table of movies
- filter by genre
- (future) remove movies

Important note:
- Since `setWatchList` is already provided in Context (`value={{..., setWatchList}}`),
  you can refactor WatchList to use `useContext(MovieContext)` too and remove props.

---

### Improvements (next steps)
- **Remove movie feature**: implement remove and update localStorage.
- **Use context in WatchList**: avoid passing `watchList` and `setWatchList` as props.
- **Create a `MovieProvider` component**: move watchlist logic out of `App.jsx`.
- **Fix `Movies.jsx` props**: the `Movies` component currently accepts `watchlist` and `handleAddToWatchList` props but they aren’t passed by `App.jsx`. Since we use Context in `MovieCard`, these props can be removed to reduce confusion.

