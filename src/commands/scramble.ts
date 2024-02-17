import { ChatInputCommandInteraction, SlashCommandBuilder, AttachmentBuilder } from 'discord.js';

import { randomScrambleForEvent } from "cubing/scramble";
import { commandData } from '../utilities.js';
import axios from 'axios';
import { Resvg } from '@resvg/resvg-js';


export default {
    data: new SlashCommandBuilder().setName('scramble').setDescription('Scramble!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.deferReply();

        const scramble = (await randomScrambleForEvent("333")).toString();

        const response = await axios.get(`https://puzzle-generator.robiningelbrecht.be/cube?cube[case]=${scramble}`, { responseType: 'arraybuffer' })
        const buffer = Buffer.from(response.data, "utf-8")
        const resvg = new Resvg(buffer)
        const pngData = resvg.render()
        const pngBuffer = pngData.asPng()
        const attachment = new AttachmentBuilder(pngBuffer, { name: 'scramble-image.png' });

        await interaction.editReply({ 
            content: `scramble ${scramble}`,
            files: [attachment] 
        });
    }
} as commandData;
