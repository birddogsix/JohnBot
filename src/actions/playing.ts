import { ClearIfNoVoiceConnection, CreateVoiceStateIfNotExists } from '@util/decorators';
import { voiceState } from '@util/state';
import { VoiceState } from '@util/state';
import { EmbedBuilder } from 'discord.js';
import { Action, ActionContext, SlashAction, SlashActionContext } from './types';
function pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
}
const playingAction: SlashAction = async function ({ interaction, guild }: SlashActionContext, fn) {
    const guildVoiceState: VoiceState = voiceState[guild.id];
    if (!guildVoiceState.playing) return interaction.editReply('Nothing is playing!');
    const content = await guildVoiceState.nowPlaying.content;
    const resource = content.audioResource;
    const durationSeconds = Math.round(resource.playbackDuration / 1000);
    const durationMinutes = Math.floor(durationSeconds / 60);
    const durationRemaining = Math.floor(durationSeconds % 60);
    const lengthMinutes = Math.floor(content.duration / 60);

    const lengthSeconds = Math.round(content.duration % 60);

    const songRequestEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Now Playing')

        .setDescription(
            `[${content.title}](${guildVoiceState.nowPlaying.link})\n\`\`\`${pad(
                durationMinutes,
                2,
            )}:${pad(durationRemaining, 2)} - ${pad(lengthMinutes, 2)}:${pad(
                lengthSeconds,
                2,
            )}\`\`\`\nRequester:<@${interaction.member.user.id}>`,
        )
        .setThumbnail(content.thumbnail);
    interaction.editReply({ embeds: [songRequestEmbed] });
};

export const actionName = 'playing';
export const type = 'action';
let decorated = CreateVoiceStateIfNotExists()(playingAction);
decorated = ClearIfNoVoiceConnection()(decorated)
export default decorated;
