import { Command, ExecuteFunction } from './Command';
import { Message } from 'discord.js';
import { VoiceState, voiceState } from '@util/state';
import { CreateVoiceStateIfNotExists } from '@util/decorators';
import removeAction from 'actions/remove';
class RemoveSong extends Command {
    constructor() {
        super({
            minArgs: 2,
            commandName: 'remove',
        });
    }
    async executeFunction(message: Message, fn: () => void = null) {
        super.executeFunction(message, fn);
        removeAction(this, fn);
    }
}
export default new RemoveSong();
