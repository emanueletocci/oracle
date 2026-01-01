const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('lofi').setDescription('Start Lofi music.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};