# Proposta di Consegna

## Descrizione
Game Cache è un'applicazione web sviluppata in React che permette agli utenti di scoprire, cercare e salvare videogiochi. L'applicazione si interfaccia con l'API esterna RAWG.io per ottenere informazioni sui giochi (dettagli, generi, date di rilascio) e utilizza Supabase come Backend as a Service (BaaS) per gestire l'autenticazione degli utenti e il salvataggio dei loro giochi preferiti in un database

## API
* API Esterna: L'applicazione utilizza l'API di RAWG.io (https://api.rawg.io/api/games) per recuperare i dati sui videogiochi. Le chiamate vengono gestite tramite il custom hook useFetchSolution, come visibile nelle pagine home, genre, game e search.

* Backend as a Service (BaaS): Il progetto è integrato con Supabase per i servizi di backend. La configurazione del client Supabase si trova nel file src/supabase/supabase-client.js. Supabase viene utilizzato per:
    Autenticazione (registrazione e login)
    Storage (per l'upload degli avatar utenti)
    Database (per salvare i preferiti e i messaggi della chat)
    
## Stile
* La soluzione di stile principale è Tailwind CSS
* Oltre a Tailwind, è stato utilizzato un file CSS personalizzato (src/index.css) per definire variabili globali (es. --color-bg, --color-accent) e classi custom (es. .text-texture, .register-button)
* Il progetto integra anche librerie di componenti e animazioni come @headlessui/react (usata ad esempio nell'Header per il menu mobile) e framer-motion (usata per le animazioni del menu mobile)

## Pagine
L'applicazione include diverse pagine gestite tramite react-router (configurato in src/routing/Router.jsx):
1. Home Page (/): Mostra una lista degli ultimi giochi recuperati dall'API RAWG.
2. Pagina Dettaglio Gioco (/games/:slug/:id): Mostra informazioni dettagliate su un singolo gioco, inclusa una chat in tempo reale.
3. Pagina Registrazione (/register): Un modulo che permette ai nuovi utenti di registrarsi sulla piattaforma tramite Supabase.
4. Pagina Login (/login): Un modulo per l'autenticazione degli utenti esistenti.
5. Pagina Profilo/Favoriti (/profile): Una pagina privata dove l'utente autenticato può vedere la lista dei suoi giochi preferiti.
6. Pagina Account (/account): Pagina privata dove l'utente può aggiornare le proprie informazioni (username, nome, cognome) e caricare un avatar.
7. Pagina Genere (/games/:genre): Mostra i giochi filtrati per genere.
8. Pagina Ricerca (/search): Mostra i risultati di una ricerca effettuata tramite la Searchbar.

## User Interactions
* Lista di interazioni degli utenti autenticati vs non autenticati
1. Utente non autenticato: Può navigare nella home page, visualizzare i giochi per genere, e vedere i dettagli di ogni singolo gioco.
2. Utente non autenticato: Può cercare giochi specifici usando la barra di ricerca nell'header.
3. Utente non autenticato: Può registrarsi e accedere alla piattaforma.
4. Utente autenticato: Può aggiungere o rimuovere giochi dalla propria lista di preferiti (tramite il componente ToggleFavorites visibile nella pagina del gioco).
5. Utente autenticato: Può visualizzare la sua lista di preferiti nella pagina del profilo.
6. Utente autenticato: Può modificare i dati del proprio profilo e caricare un'immagine avatar nella pagina "Account".
7. Utente autenticato: Può partecipare alla chat in tempo reale (componente Chatbox) presente nella pagina di dettaglio di un gioco.

## Context
L'applicazione utilizza il Context API di React per la gestione dello stato globale, come definito nel file src/App.jsx:
1. SessionContext (src/context/session/SessionProvider.jsx): Mantiene e distribuisce lo stato della session dell'utente (recuperata da Supabase), rendendo disponibili i dati dell'utente (come ID ed email) a tutti i componenti che ne hanno bisogno.
2. FavoritesContext (src/context/favorites/FavoritesProvider.jsx): Gestisce la lista dei favorites dell'utente. Espone le funzioni per ottenere i preferiti, aggiungere (addFavorites) e rimuovere (removeFavorites) giochi

## Deployment
https://rehacktor-project-dipasquale.vercel.app/