const { Events, AttachmentBuilder } = require('discord.js');
const config = require('../config.json');
const Canvas = require('@napi-rs/canvas');
const path = require('path');
const fs = require('fs');

// --- REGISTRAZIONE FONT ---
// Tenta di registrare il font solo se il file esiste, altrimenti usa un fallback
const fontPath = path.join(__dirname, '../assets/fonts/earwig.otf');
const fontFamily = fs.existsSync(fontPath) ? 'PersonaFont' : 'Arial';

if (fontFamily === 'PersonaFont') {
    Canvas.GlobalFonts.registerFromPath(fontPath, 'PersonaFont');
    console.log('[DEBUG] Font Persona 5 caricato correttamente.');
} else {
    console.warn('[WARN] Font p5font.ttf non trovato nella cartella assets. Userò Arial.');
}

module.exports = {
    enabled: true,
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        console.log(`[DEBUG] Evento GuildMemberAdd scattato per: ${member.user.tag}`);

        const channelId = config.welcomeChannelId;
        const channel = member.guild.channels.cache.get(channelId);

        if (!channel) {
            console.error(`[ERRORE] Canale con ID ${channelId} non trovato!`);
            return;
        }

        console.log(`[DEBUG] Canale trovato: ${channel.name}. Inizio generazione Canvas...`);

        try {
            // 1. Creazione Canvas
            const canvas = Canvas.createCanvas(1024, 450);
            const ctx = canvas.getContext('2d');

            // 2. Caricamento Sfondo (FIXED con fs.readFileSync)
            const backgroundPath = path.join(__dirname, '..', 'assets', 'background.png');
            
            if (fs.existsSync(backgroundPath)) {
                const backgroundBuffer = fs.readFileSync(backgroundPath);
                const background = await Canvas.loadImage(backgroundBuffer);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            } else {
                // Fallback se manca l'immagine: sfondo rosso scuro
                console.warn('[WARN] Immagine background.png non trovata. Uso sfondo colorato.');
                ctx.fillStyle = '#330000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // --- STILE PERSONA 5 ROYAL ---

            // Overlay scuro leggero
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 3. Testo "WELCOME" (Ruotato)
            ctx.save();
            ctx.translate(canvas.width / 2, 280);
            ctx.rotate(-5 * Math.PI / 180); // Rotazione -5 gradi

            ctx.font = `90px "${fontFamily}"`;
            ctx.textAlign = 'center';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 8;
            ctx.strokeText('WELCOME', 0, 0);
            ctx.fillStyle = 'white';
            ctx.fillText('WELCOME', 0, 0);
            ctx.restore();

            // 4. Box Nome Utente (Forma irregolare stile P5)
            ctx.save();
            ctx.translate(canvas.width / 2, 380);
            ctx.rotate(-3 * Math.PI / 180); // Rotazione diversa per dinamismo

            // Disegno il poligono bianco "sporco"
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.moveTo(-320, -45); // In alto a sx
            ctx.lineTo(340, -55);  // In alto a dx (leggermente più su)
            ctx.lineTo(320, 45);   // In basso a dx
            ctx.lineTo(-340, 35);  // In basso a sx
            ctx.closePath();
            ctx.fill();

            // Testo del nome
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            
            // Adattamento dimensione font se il nome è lungo
            let fontSize = 60;
            ctx.font = `${fontSize}px "${fontFamily}"`;
            const username = member.user.username.toUpperCase();
            
            while (ctx.measureText(username).width > 600 && fontSize > 30) {
                fontSize -= 5;
                ctx.font = `${fontSize}px "${fontFamily}"`;
            }

            ctx.fillText(username, 0, 20); // 20 è l'offset verticale per centrare nel poligono
            ctx.restore();

            // 5. Avatar Utente
            // Nota: displayAvatarURL usa URL web, qui loadImage(stringa) va bene solitamente,
            // ma forziamo l'estensione png per sicurezza.
            const avatarURL = member.user.displayAvatarURL({ extension: 'png', size: 256 });
            
            try {
                // Carichiamo l'avatar dall'URL
                const avatar = await Canvas.loadImage(avatarURL);

                const avatarX = 512;
                const avatarY = 130;
                const avatarRadius = 85;

                ctx.save();
                // Creiamo la maschera circolare
                ctx.beginPath();
                ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip(); 
                ctx.drawImage(avatar, avatarX - avatarRadius, avatarY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
                ctx.restore();

                // Bordi Avatar (Doppio bordo: Bianco + Rosso P5)
                ctx.beginPath();
                ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2, true);
                ctx.lineWidth = 8;
                ctx.strokeStyle = 'white';
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(avatarX, avatarY, avatarRadius + 6, 0, Math.PI * 2, true);
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#d90018'; // Rosso Persona 5
                ctx.stroke();

            } catch (err) {
                console.error('[ERRORE] Impossibile caricare avatar utente:', err);
                // Se fallisce l'avatar, il canvas viene inviato senza (o potresti mettere un placeholder)
            }

            // 6. Invio
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome.png' });
            
            await channel.send({ 
                content: `Benvenuto nei Phantom Thieves, ${member}!`, 
                files: [attachment] 
            });

            console.log(`[SUCCESS] Messaggio di benvenuto inviato per ${member.user.tag}!`);

        } catch (error) {
            console.error(`[ERRORE CRITICO]`, error);
        }
    },
};