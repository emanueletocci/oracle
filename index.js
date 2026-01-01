const fs = require("node:fs"); // Node.js file system module
const path = require("node:path"); // Node.js path module
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// Initialize the client with the necessary intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Event listener for when the bot is ready and online
client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Create a new Collection to store commands in memory
client.commands = new Collection();

// -- COMMAND HANDLING LOGIC --

// Construct the path to the 'commands' directory
const foldersPath = path.join(__dirname, "commands");
// Read the list of category folders (e.g., 'utility', 'moderation')
const commandFolders = fs.readdirSync(foldersPath);

// Loop through each folder to find command files
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	// Filter for files ending with .js
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".js"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath); // Import the command file

		// Validate that the command has the required properties
		if ("data" in command && "execute" in command) {
			// Add the command to the client.commands Collection
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral,
			});
		}
	}
});

// Log in to Discord with your client's token
client.login(token);