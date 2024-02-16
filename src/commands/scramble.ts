import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import { randomScrambleForEvent } from "cubing/scramble";
import { commandData } from '../utilities.js';

export default {
    data: new SlashCommandBuilder().setName('scramble').setDescription('Scramble!'),
    async execute(interaction: ChatInputCommandInteraction) {
        const scramble = await randomScrambleForEvent("333");
        await interaction.reply(`scramble ${scramble.toString()}`);
    }
} as commandData;
