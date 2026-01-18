const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const path = require('node:path');

const chars = require('../../data/characters'); // Ensure the path is correct based on your folder structure
const colors = require('../../utils/colors');   // Import colors for special cases (e.g., 0% or 99%)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ship")
        .setDescription("Valuta il legame sociale tra due persone 🎭") // UI description (kept in IT for users)
        .addUserOption((option) =>
            option.setName("utente1").setDescription("Il primo confidente").setRequired(true)
        )
        .addUserOption((option) =>
            option.setName("utente2").setDescription("Il secondo confidente").setRequired(false)
        ),

    async execute(interaction) {
        // --- USER MANAGEMENT ---
        let user1 = interaction.options.getUser("utente1");
        let user2 = interaction.options.getUser("utente2");

        // If user2 is missing, ship user1 with the command invoker (self-ship or user-to-bot logic)
        if (!user2) {
            user2 = user1;
            user1 = interaction.user;
        }

        // --- INITIAL EASTER EGGS ---
        
        // 1. Self-Ship check
        if (user1.id === user2.id) {
            return interaction.reply({
                content: `😼 Ehi ${user1}! Smettila di guardarti allo specchio! (Narcisismo: 100%)`,
                ephemeral: true,
            });
        }

        // 2. Bot-Ship check
        if (user1.id === interaction.client.user.id || user2.id === interaction.client.user.id) {
            return interaction.reply(
                `😼 Ehi ${interaction.client.user}! Niente distrazioni, devi andare a dormire!`
            );
        }

        // --- PERCENTAGE CALCULATION ---
        const lovePercent = Math.floor(Math.random() * 101);

        // --- RANK CALCULATION (Star Bar) ---
        const rank = Math.round(lovePercent / 10);
        // Create a visual bar with 10 slots (filled stars + empty squares)
        const visualBar = "⭐".repeat(rank) + "▪️".repeat(10 - rank);

        // --- CHARACTER SELECTION (CORE LOGIC) ---
        // Here we decide which "character" object to fetch from the database based on the percentage.
        
        let outcome = {}; // Will contain: char (object), message (string), optional overrides
        
        // Fallback image (e.g., the Phantom Thieves logo or a generic hat)
        let defaultImage = "hat.png"; 

        if (lovePercent === 0) {
            outcome.char = chars.igor; // Absolute zero -> Igor
            outcome.message = "⚰️ Il vuoto cosmico. Nemmeno Arsène può rubare questo cuore, perché non c'è.";
        } 
        else if (lovePercent === 69) {
            outcome.char = chars.skull; // Ryuji
            outcome.message = "💀 For real?! Che numero assurdo!";
        } 
        else if (lovePercent === 77) {
            outcome.char = chars.chihaya; // Chihaya
            outcome.message = "🔮 **Jackpot!** Le carte prevedono una fortuna sfacciata tra voi due!";
        } 
        else if (lovePercent === 99) {
            // Special Case: Calling Card (Not a character in the DB, so we manually set props)
            outcome.specialImage = "callingCard.png"; 
            outcome.color = colors.p5_red;
            outcome.arcana = "THE JOLLY";
            outcome.message = "🃏 **Take Your Heart!** Manca solo l'1%... serve solo inviare la Lettera di Sfida!";
        }
        else if (lovePercent < 15) {
            outcome.char = chars.takemi; // Death
            outcome.message = "💉 Questa relazione è tossica. Vi serve una visita medica urgente.";
        } 
        else if (lovePercent < 35) {
            outcome.char = chars.mona; // Magician
            outcome.message = "🐱 Ehi... credo che tu sia nella Friendzone, proprio come me con Lady Ann.";
        } 
        else if (lovePercent < 55) {
            outcome.char = chars.crow; // Justice (Akechi)
            outcome.message = "⚖️ Vi odiate o vi amate? C'è una strana tensione... una rivalità mortale.";
        } 
        else if (lovePercent < 70) {
            outcome.char = chars.ohya; // Devil
            outcome.message = "🍸 È una relazione complicata e adulta. Forse dovreste parlarne davanti a un drink.";
        } 
        else if (lovePercent < 85) {
            outcome.char = chars.panther; // Lovers
            outcome.message = "🤝 Un legame indissolubile! Siete pronti per i Memento.";
        } 
        else {
            outcome.char = chars.lavenza; // World
            outcome.message = "🦋 Io sono te, tu sei me... Hai trasformato una promessa in un patto di sangue.";
        }

        // --- FINAL DATA EXTRACTION ---
        // If a character was selected from DB, use its properties.
        // Otherwise, fallback to manual overrides (used for the 99% case).
        
        const finalImageName = outcome.char ? outcome.char.image : (outcome.specialImage || defaultImage);
        const finalColor = outcome.char ? outcome.char.color : (outcome.color || colors.p5_red);
        const finalArcana = outcome.char ? outcome.char.arcana : (outcome.arcana || "???");
        const finalEmoji = outcome.char ? outcome.char.emoji : "🃏";

        // Construct the full system path for the attachment
        const finalPath = path.join(process.cwd(), 'assets/images/characters', finalImageName);
        const attachment = new AttachmentBuilder(finalPath, { name: 'ship_result.png' });

        // --- EMBED CREATION ---
        const embed = new EmbedBuilder()
            .setTitle(`🎭 CONFIDANT ASSESSMENT`)
            .setDescription(`**${user1}** ❤️ **${user2}**`)
            .addFields(
                // Dynamic data from the database
                { name: "Arcano", value: `${finalEmoji} **${finalArcana}**`, inline: true },
                { name: "Affinità", value: `📈 **${lovePercent}%**`, inline: true },
                { name: "Social Link Rank", value: `${visualBar}\n\n${outcome.message}` }
            )
            .setColor(finalColor) // Dynamic color (e.g., Yellow for Ryuji, Blue for Igor)
            .setThumbnail("attachment://ship_result.png")
            .setFooter({
                text: `Take Your Heart ❤️‍🩹`,
                iconURL: interaction.client.user.displayAvatarURL()
            });

        await interaction.reply({ embeds: [embed], files: [attachment] });
    },
};