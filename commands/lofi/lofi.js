const { SlashCommandBuilder } = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    NoSubscriberBehavior
} = require("@discordjs/voice");
const path = require("node:path");
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lofi")
        .setDescription("Test Audio Diretto"),

    async execute(interaction) {
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply({ content: "Entra in vocale!", ephemeral: true });

        await interaction.reply("🎧 Test Audio RAW (Senza controllo volume)...");

        const musicPath = path.join(__dirname, "../../music/LOFI.mp3");

        // 1. Controllo File
        if (!fs.existsSync(musicPath)) {
            return interaction.followUp(`❌ File non trovato: ${musicPath}`);
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });

        connection.subscribe(player);

        // 2. Creazione Risorsa SENZA VOLUME (Raw)
        // Usiamo un delay casuale per evitare conflitti di cache
        const resource = createAudioResource(musicPath, {
            inlineVolume: false // ⚠️ IMPORTANTE: Disattivato per test
        });

        console.log("▶️ Riproduzione avviata...");
        player.play(resource);

        player.on(AudioPlayerStatus.Playing, () => {
            console.log("🔊 STATUS: PLAYING - Se non senti nulla ora, è un problema di Discord/PC, non del codice.");
        });

        player.on('error', error => {
            console.error('❌ Error:', error.message);
        });
    },
};