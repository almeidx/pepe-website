import { useContext, useState } from 'react';

import { GuildContext } from '../../../contexts/GuildContext';
import type { Channel, DatabaseGuild } from '../../../graphql/queries/DashboardGuild';
import Field from '../../form/Field';
import Fieldset from '../../form/Fieldset';
import Label from '../../form/Label';
import Selector from '../../form/Selector';
import Header from '../Header';

interface EmojiListProps {
  channels: Channel[];
  database: DatabaseGuild;
}

export default function EmojiList({ channels, database }: EmojiListProps) {
  const [emojiList, setEmojiList] = useState<boolean>(database.emojiList);
  const { addChange } = useContext(GuildContext);

  return (
    <>
      <div className="flex flex-row justify-between">
        <Header description="Automatically populate a channel with all the emojis in your server." title="Emoji List" />

        <div>
          <div className="flex flex-row gap-x-4 items-center">
            <label className="text-white" htmlFor="emojiList">
              Enabled
            </label>

            <input
              checked={emojiList}
              className="w-4 h-4"
              type="checkbox"
              id="emojiList"
              onChange={() => {
                setEmojiList(!emojiList);
                addChange('emojiList', !emojiList);
              }}
            />
          </div>
        </div>
      </div>

      <Fieldset>
        <Field>
          <Label
            htmlFor="emojiListChannel"
            name="Emoji List Channel"
            url="https://docs.pepemanager.com/guides/automatically-controlled-emoji-list"
          />
          <Selector
            id="emojiListChannel"
            limit={1}
            initialItems={database.emojiListChannel ? [database.emojiListChannel] : []}
            items={channels}
            onSelect={(channelId, type) => {
              const resolvedChannel = type === 'add' ? channelId : null;
              addChange('emojiListChannel', resolvedChannel);
            }}
            type="channel"
          />
        </Field>
      </Fieldset>
    </>
  );
}
