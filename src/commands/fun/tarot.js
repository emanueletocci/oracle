const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const tarotDeck = require('../../utils/tarotDeck'); 
// Non serve più importare 'colors' qui, perché è già dentro tarotDeck -> characters!

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tarot')
        .setDescription('Chihaya estrae un Arcano e ti rivela il tuo Confidente.'),

    async execute(interaction) {
        const card = tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
        const character = card.char; 
        const embed = new EmbedBuilder()
            .setColor(character.color) 
            .setTitle(`${character.emoji} ${character.arcana} (No. ${card.number})`)
            .setDescription(`*"${card.meaning}"*`)
            .addFields(
                { name: '🎭 Confidente', value: `**${character.name}**`, inline: true },
                { name: '🎴 Arcano', value: character.arcana, inline: true }
            )
            .setFooter({ text: 'Velvet Room • Destiny Reading', iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};