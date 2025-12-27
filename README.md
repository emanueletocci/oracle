# 👾 Oracle (Nav)

> *"The Phantom Thieves of Hearts' ultimate support system."*

<div align="center">
  <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExamU0ZTdsYzN5MDN6djA5OG9yczE3YnE1NmEycnZ6eHV6dWRieGgxciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mK2TbSNux5a6fOkxzC/giphy.gif" alt="Oracle System Online" width="600">
  <br>
  <h1>👾 Oracle (Nav)</h1>
</div>

## 🔰 Introduction

**Oracle** is a Discord bot built with **TypeScript** (Node.js), designed to manage the atmosphere and security of your "Palace" (Server). Heavily inspired by the aesthetic and support role of Futaba Sakura from *Persona 5 Royal*.

The bot combines a high-quality audio engine (powered by Lavalink) with essential moderation tools to keep Shadows at bay.

## ⚡ Features (Abilities)

### 🎧 Audio & Lofi (Leblanc Vibes)
* **24/7 Lofi Mode:** A continuous stream of Lofi beats for studying or relaxing (Cafe Leblanc style).
* **High-Res Streaming:** Lag-free music playback via search (YouTube/Spotify), handled by **Lavalink**.
* **Controls:** Play, Pause, Skip, Queue, Loop, and Volume adjustments.

### 🛡️ Security (Shadow Ops)
* **Auto-Moderation:** Warning system and logs to track "Shadows" within the server.
* **Ban & Kick:** Quick commands to remove hostile targets.
* **Audit Log:** detailed records of all actions taken by the staff.

## 🛠️ Tech Stack

* **Core:** [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/)
* **Library:** [Discord.js v14](https://discord.js.org/)
* **Audio Engine:** [Lavalink](https://github.com/lavalink-devs/Lavalink)
* **Database:** [MongoDB](https://www.mongodb.com/) (Persist warns and playlists)

## 🚀 Installation (Setup Protocol)

To start Oracle locally in your environment:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/emanueletocci/oracle.git](https://github.com/emanueletocci/oracle.git)
    cd oracle
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Rename `.env.example` to `.env` and enter your keys:
    ```env
    DISCORD_TOKEN=your_bot_token_here
    MONGO_URI=your_mongodb_connection_string
    LAVALINK_HOST=localhost
    LAVALINK_PASSWORD=youshallnotpass
    ```

4.  **Launch Support:**
    ```bash
    npm run build
    npm start
    ```
---
*"This isn't a game. I'm rewriting reality!"* — Oracle
