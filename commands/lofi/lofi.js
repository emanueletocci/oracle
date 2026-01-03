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

		const musicPath = path.join(__dirname, "../../music/lofi.mp3");

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
		// function to play the song
        const playSong = () => {
            const resource = createAudioResource(musicPath, {
                inlineVolume: true,
            });
            player.play(resource);
        };

		playSong();
		
		// Loop the song
        player.on(AudioPlayerStatus.Idle, () => {
            console.log("🔄 Loop: Riavvio la traccia...");
            playSong();
        });

		player.on("error", (error) => {
			console.error("❌ Error:", error.message);
		});
	},
};
