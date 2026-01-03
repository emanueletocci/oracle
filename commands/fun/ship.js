const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ship")
		.setDescription(
			"Valuta il Social Link tra due persone (Persona 5 Style) 🎭"
		)
		.addUserOption((option) =>
			option
				.setName("utente1")
				.setDescription("Il primo Confidant")
				.setRequired(true)
		)
		.addUserOption((option) =>
			option
				.setName("utente2")
				.setDescription("Il secondo Confidant (opzionale)")
				.setRequired(false)
		),

	async execute(interaction) {
		// Retrieve users
		let user1 = interaction.options.getUser("utente1");
		let user2 = interaction.options.getUser("utente2");

		// If user2 is not provided, ship user1 with the command invoker
		if (!user2) {
			user2 = user1;
			user1 = interaction.user;
		}

		// --- EASTER EGGS THEME P5 ---

		// 1. Self-Ship
		if (user1.id === user2.id) {
			return interaction.reply({
				content: "😼 Morgana: Ehi Joker! Smettila di guardarti allo specchio!",
				ephemeral: true,
			});
		}

		// 2. Bot-Ship
		if (
			user1.id === interaction.client.user.id ||
			user2.id === interaction.client.user.id
		) {
			return interaction.reply(
				"😼 **Morgana:** Ehi Joker! Niente distrazioni, devi andare a dormire! Lascia stare il bot."
			);
		}

		// --- PERCENTAGE CALCULATION ---
		const lovePercent = Math.floor(Math.random() * 101);

		// --- RANK CONFIDANT (Star Bar) ---
		const rank = Math.round(lovePercent / 10);
		const filledStars = "⭐".repeat(rank);
		const emptyStars = "▪️".repeat(10 - rank);
		const visualBar = `${filledStars}${emptyStars}`;

		// --- CUSTOM MESSAGES ---

		let resultMessage;
		let arcane;

		// --- EASTER EGGS NUMERICI (Priorità Alta) ---
		if (lovePercent === 0) {
			resultMessage =
				"⚰️ **Nulla.** Il vuoto cosmico. Nemmeno Arsène può rubare questo cuore, perché non c'è.";
			arcane = "THE VOID";
		} else if (lovePercent === 69) {
			resultMessage = "💀 **Ryuji:** For real?! Che numero assurdo!";
			arcane = "THE CHARIOT";
		} else if (lovePercent === 77) {
			resultMessage =
				"🔮 **Jackpot!** La veggente di Shinjuku predice una fortuna sfacciata tra voi due!";
			arcane = "THE FORTUNE";
		} else if (lovePercent === 99) {
			resultMessage =
				"🃏 **Take Your Heart!** Manca solo l'1%... serve solo inviare la Lettera di Sfida!";
			arcane = "JOLLY";
		}
		else if (lovePercent < 15) {
			resultMessage =
				"💉 Questa relazione è tossica. Vi serve una visita medica urgente.";
			arcane = "THE DEATH";
		} else if (lovePercent < 35) {
			resultMessage =
				"🐱 Ehi... credo che tu sia nella Friendzone, proprio come me con Lady Ann.";
			arcane = "THE MAGICIAN";
		} else if (lovePercent < 55) {
			resultMessage =
				"⚖️ Vi odiate o vi amate? C'è una strana tensione... una rivalità mortale.";
			arcane = "THE JUSTICE";
		} else if (lovePercent < 70) {
			resultMessage =
				"🍸 È una relazione complicata e adulta. Forse dovreste parlarne davanti a un drink.";
			arcane = "THE DEVIL";
		} else if (lovePercent < 85) {
			resultMessage =
				"🤝 Un legame indissolubile! Siete pronti per il Mementos.";
			arcane = "THE LOVERS";
		} else {
			resultMessage =
				"🦋 Io sono te, tu sei me... Hai trasformato una promessa in un patto di sangue.";
			arcane = "THE WORLD";
		}

		// --- EMBED CREATION ---
		const embed = new EmbedBuilder()
			.setTitle(`🎭 CONFIDANT ASSESSMENT`)
			.setDescription(`**${user1}** ❤️ **${user2}**`)
			.addFields(
				{ name: "Arcano", value: `🎴 **${arcane}**`, inline: true },
				{ name: "Affinità", value: `📈 **${lovePercent}%**`, inline: true },
				{ name: "Social Link Rank", value: `${visualBar}\n\n${resultMessage}` }
			)
			.setColor(0xe61c24)
			.setThumbnail("https://imgur.com/gallery/phantom-thieves-BbUWtk8") // Logo Phantom Thieves
			.setImage(
				"https://imgur.com/gallery/phantom-thieves-BbUWtk8"
			) 
			.setFooter({
				text: `Take Your Heart ❤️‍🩹`,
			});

		await interaction.reply({ embeds: [embed] });
	},
};
