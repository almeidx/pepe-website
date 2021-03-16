export type Snowflake = string;

/**
 * Resolves an emoji image url
 * @param id The Snowflake for the emoji
 * @param animated Whether this emoji is animated
 */
export const DISCORD_EMOJI_CDN = (id: Snowflake, animated: boolean) =>
  `https://cdn.discordapp.com/emojis/${id}.${animated ? 'gif' : 'png'}?v=1`;

/**
 * Resolves a guild icon url
 * @param id The Snowflake for the guild
 * @param icon The icon hash
 */
export const DISCORD_GUILD_CDN = (id: Snowflake, icon: string | null, allowGif = true) =>
  icon
    ? `https://cdn.discordapp.com/icons/${id}/${icon}.${icon.startsWith('a_') && allowGif ? 'gif' : 'webp'}?size=128`
    : null;

/**
 * Resolves a user avatar url
 * @param id The Snowflake for the user
 * @param hash The avatar hash
 */
export const DISCORD_USER_AVATAR_CDN = (id: Snowflake, hash: string) =>
  `https://cdn.discordapp.com/avatars/${id}/${hash}.${hash.startsWith('a_') ? 'gif' : 'webp'}`;

/**
 * Resolves a user default avatar url
 * @param discriminator The discriminator for the user
 */
export const DISCORD_USER_DEFAULT_AVATAR_CDN = (discriminator: number) =>
  `'https://cdn.discordapp.com/embed/avatars/${discriminator % 5}.png`;

export const API_BASE_URL = 'https://api.pepe-is.life' as const;

// https://discord.com/developers/docs/reference#snowflakes
export const MIN_SNOWFLAKE = 0b000000000000000000000000000000000000000000_00001_00001_000000000001;

// 0b111111111111111111111111111111111111111111_11111_11111_111111111111 without _ which BigInt doesn't support
export const MAX_SNOWFLAKE = BigInt('0b1111111111111111111111111111111111111111111111111111111111111111');

export const FALLBACK_AVATAR = '/assets/fallback-avatar.png';

export const DISCORD_API_BASE_URL = 'https://discord.com/api';

/* eslint-disable sort-keys */
export const DISCORD_PERMISSIONS = {
  CREATE_INSTANT_INVITE: 1 << 0,
  KICK_MEMBERS: 1 << 1,
  BAN_MEMBERS: 1 << 2,
  ADMINISTRATOR: 1 << 3,
  MANAGE_CHANNELS: 1 << 4,
  MANAGE_GUILD: 1 << 5,
  ADD_REACTIONS: 1 << 6,
  VIEW_AUDIT_LOG: 1 << 7,
  PRIORITY_SPEAKER: 1 << 8,
  STREAM: 1 << 9,
  VIEW_CHANNEL: 1 << 10,
  SEND_MESSAGES: 1 << 11,
  SEND_TTS_MESSAGES: 1 << 12,
  MANAGE_MESSAGES: 1 << 13,
  EMBED_LINKS: 1 << 14,
  ATTACH_FILES: 1 << 15,
  READ_MESSAGE_HISTORY: 1 << 16,
  MENTION_EVERYONE: 1 << 17,
  USE_EXTERNAL_EMOJIS: 1 << 18,
  VIEW_GUILD_INSIGHTS: 1 << 19,
  CONNECT: 1 << 20,
  SPEAK: 1 << 21,
  MUTE_MEMBERS: 1 << 22,
  DEAFEN_MEMBERS: 1 << 23,
  MOVE_MEMBERS: 1 << 24,
  USE_VAD: 1 << 25,
  CHANGE_NICKNAME: 1 << 26,
  MANAGE_NICKNAMES: 1 << 27,
  MANAGE_ROLES: 1 << 28,
  MANAGE_WEBHOOKS: 1 << 29,
  MANAGE_EMOJIS: 1 << 30,
};
/* eslint-enable sort-keys */
