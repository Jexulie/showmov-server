# ShowMov -  Back-end Side

Tiny Server for ShowMov-App.
 
Shamelessly scrapped from a certain site with web-scapper.

### Usage

#### Movies:
---

> "GET" Fetching Movies for Database.

``` 
    /api/v1/movies/fetch
```

> "GET" Fetching Movies.

``` 
    /api/v1/movies/get
```

> "DELETE" Clearing Movie Database Collection.

``` 
    /api/v1/movies/clear
```

#### Coming Soon:
---

> "GET" Fetching Comingsoons for Database.

``` 
    /api/v1/comingsoons/fetch
```

> "GET" Fetching Comingsoons.

``` 
    /api/v1/comingsoons/get
```

> "DELETE" Clearing Comingsoon Database Collection.

``` 
    /api/v1/comingsoons/clear
```


#### Archives:
---

> "GET" Archiving Movies to the Database.

``` 
    /api/v1/archive/save
```

> "GET" Fetching archive.

``` 
    /api/v1/archive/get
```

#### Api-Key:
---

> "GET" Getting an Api-Key.

``` 
    /api/v1/auth/get
```

>  Api-Key Usage.

``` 
    /api/v1/movies/get?apikey=YOUR_API_KEY
```

---

### Todo:

- [x] Add Api-Key
- [ ] Proper Logging
- [x] `Coming Soon` Grabber
- [ ] Fix Strings in WebScapper
- [x] Add an Archive for Movies
- [ ] Better Error Control
- [x] Add Misc Routes
