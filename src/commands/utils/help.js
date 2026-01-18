const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const colors = require('../../utils/colors');   

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lista tutti i comandi disponibili'),

    async execute(interaction) {
        // Access the commands collection 
        const commands = interaction.client.commands;

        // Create an Embed to make the list looks nice
        const embed = new EmbedBuilder()
            .setTitle('📚 Lista Comandi')
            .setColor(colors.p5_red)
            .setDescription('Ecco tutti i comandi che puoi usare:');

        // Transform the collection into a list of fields for the embed
        const fields = commands.map(cmd => {
            // Hiding disabled commands
            if (cmd.enabled === false) return null;

            return {
                name: `/${cmd.data.name}`,
                value: cmd.data.description || 'Nessuna descrizione',
                inline: false 
            };
        }).filter(field => field !== null); 

        embed.addFields(fields);
        await interaction.reply({ embeds: [embed] });
    },
};