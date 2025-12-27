# 👾 Oracle (Nav)

> *"The Phandom Thieves of Hearts' support system."*

![Oracle Banner](https://i.imgur.com/your-banner-placeholder.png)
*(Suggerimento: Qui potresti mettere una GIF di Futaba che digita al computer o il logo dei Phantom Thieves)*

## 🔰 Introduzione

**Oracle** è un bot Discord sviluppato in **TypeScript** (Node.js) progettato per gestire l'atmosfera e la sicurezza del tuo "Palazzo" (Server). Ispirato all'estetica e alle funzionalità di supporto di Futaba Sakura da *Persona 5 Royal*.

Il bot combina un motore audio ad alta qualità (basato su Lavalink) con strumenti di moderazione essenziali.

## ⚡ Funzionalità (Abilità)

### 🎧 Audio & Lofi (Leblanc Vibes)
* **Lofi Mode 24/7:** Uno stream continuo di musica Lofi per studiare o rilassarsi (Cafe Leblanc style).
* **High-Res Streaming:** Riproduzione musicale tramite ricerca (YouTube/Spotify) gestita da **Lavalink** per zero lag.
* **Comandi:** Play, Pause, Skip, Queue, Loop.

### 🛡️ Sicurezza (Shadow Ops)
* **Moderazione Automatica:** Sistema di warn e log per tenere traccia delle "Shadows" nel server.
* **Ban & Kick:** Comandi rapidi per rimuovere elementi indesiderati.
* **Audit Log:** Registro delle azioni intraprese dallo staff.

## 🛠️ Tech Stack

* **Core:** [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
* **Library:** [Discord.js v14](https://discord.js.org/)
* **Audio Engine:** [Lavalink](https://github.com/lavalink-devs/Lavalink)
* **Database:** [MongoDB](https://www.mongodb.com/) (per salvare warn e playlist)

## 🚀 Installazione (Setup Protocol)

Per avviare Oracle localmente:

1.  **Clona il repository:**
    ```bash
    git clone [https://github.com/emanueletocci/oracle.git](https://github.com/emanueletocci/oracle.git)
    cd oracle
    ```

2.  **Installa le dipendenze:**
    ```bash
    npm install
    ```

3.  **Configura le variabili d'ambiente:**
    Rinomina il file `.env.example` in `.env` e inserisci le tue chiavi:
    ```env
    DISCORD_TOKEN=il_tuo_token_qui
    MONGO_URI=la_tua_stringa_connessione_mongo
    LAVALINK_HOST=localhost
    LAVALINK_PASSWORD=youshallnotpass
    ```

4.  **Avvia il supporto:**
    ```bash
    npm run build
    npm start
    ```

## 📜 Roadmap (Mementos Request)

- [ ] Aggiungere risposte casuali con citazioni di Futaba ("Mwehehe!").
- [ ] Implementare dashboard web.
- [ ] Sistema di livelli (Confidant Rank).

---
*"Non è un gioco. Sto riscrivendo la realtà!"* — Oracle
