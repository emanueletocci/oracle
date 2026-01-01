const { SlashCommandBuilder } = require("discord.js");
const {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	AudioPlayerStatus,
	NoSubscriberBehavior,
} = require("@discordjs/voice");
const path = require("node:path");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lofi")
		.setDescription("Avvia la radio lofi nel canale audio!"),

	async execute(interaction) {
		const channel = interaction.member.voice.channel;
		if (!channel)
			return interaction.reply({
				content:
					"⛓️ **DETENUTO!** Che insolenza... Cerchi di ascoltare la musica senza essere in cella? Entra subito in vocale!",
				ephemeral: true,
			});
		await interaction.reply(
			"🐱 **Ehi Joker!** Basta combattere per oggi. Ascolta questa Lofi e vai a dormire!"
		);

		const musicPath = path.join(__dirname, "../../music/LOFI.mp3");

		// 1. File check
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

		// 2. Resource creation
		const resource = createAudioResource(musicPath, {
			inlineVolume: true,
		});

		console.log("▶️ Riproduzione avviata...");
		player.play(resource);

		player.on("error", (error) => {
			console.error("❌ Error:", error.message);
		});
	},
};
