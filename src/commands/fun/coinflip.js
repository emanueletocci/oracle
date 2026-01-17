const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('node:path');
const { randomInt } = require('node:crypto');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Sfida la sorte nel Metaverso: Ladri Fantasma o Ombre? 🃏'),

    async execute(interaction) {
        // Generating random number ranging from 0 to 1, using system
        const outcome = randomInt(0, 2);
        const isPhantom = outcome === 0;


        await interaction.reply(`😼${interaction.user}! Tieni pronto il coltello, percepisco qualcosa...*`);
        let resultTitle;
        let resultDescription;
        let imageName;
        let color;

        if (isPhantom) {
            // Head Win
            resultTitle = "🎭 PHANTOM THIEVES WIN! - TESTA";
            resultDescription = "**The show's over.**\nIl nemico è stato annientato con stile. Vittoria perfetta.";
            imageName = 'coinJoker.png'; 
            color = 0xE61C24;
        } else {
            // Cross Win
            resultTitle = "💀 SHADOWS WIN! - CROCE";
            resultDescription = "**Senti il rumore di catene...**\nIl Mietitore ti ha trovato. Non c'è via di fuga. *Despair.*";
            imageName = 'coinShadow.png'; 
            color = 0x000000; 
        }

        const imagePath = path.join(__dirname, `../../assets/images/coins/${imageName}`);
        let file;

        try {
            file = new AttachmentBuilder(imagePath, { name: imageName });
        } catch (e) {
            console.error("Immagine mancante:", imagePath);
            return interaction.editReply("Errore: Non trovo l'immagine della moneta nella cartella assets!");
        }

        const embed = new EmbedBuilder()
            .setTitle(resultTitle)
            .setDescription(resultDescription)
            .setColor(color)
            .setThumbnail(`attachment://${imageName}`) 

        await interaction.editReply({ 
            content: null, 
            embeds: [embed], 
            files: [file] 
        });
    },
};