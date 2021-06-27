import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { ChangeEvent, useCallback, useContext, useMemo, useState } from 'react';
import { BsFillShiftFill } from 'react-icons/bs';
import { ImCog } from 'react-icons/im';
import { RiShieldUserLine } from 'react-icons/ri';

import Header from '../../../components/dashboard/Header';
import Menu from '../../../components/dashboard/Menu';
import Selector from '../../../components/dashboard/Selector';
import Failure from '../../../components/Failure';
import Input from '../../../components/Input';
import { UserContext } from '../../../contexts/UserContext';
import { initializeApollo } from '../../../graphql/client';
import USER_GUILD, { UserGuild } from '../../../graphql/queries/UserGuild';
import { isValidSnowflake } from '../../../utils/utils';
interface GuildProps {
  database: UserGuild['getDatabaseGuild'];
  guild: UserGuild['getDiscordGuild'];
}

export const getServerSideProps: GetServerSideProps<GuildProps> = async (ctx) => {
  if (typeof ctx.params?.id !== 'string' || !isValidSnowflake(ctx.params.id)) return { notFound: true };

  ctx.req.headers.accept = '';

  const apolloClient = initializeApollo(null, ctx.req.headers);

  const { data } = await apolloClient.query<UserGuild>({
    query: USER_GUILD,
    variables: { id: ctx.params.id, includeChannels: true, withPermissions: true },
  });

  return {
    props: {
      database: data.getDatabaseGuild,
      guild: data.getDiscordGuild,
    },
  };
};

export default function Guild({ database, guild }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { authenticated } = useContext(UserContext);
  const [prefix, setPrefix] = useState(database?.prefix ?? 'p!');

  const handlePrefixChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length <= 5) {
      setPrefix(value);
    }
  }, []);

  const memoizedSortedChannels = useMemo(
    () => [...(guild?.channels ?? [])].sort((a, b) => a.name.localeCompare(b.name)),
    [guild],
  );

  if (!authenticated) {
    return <Failure message="You need to sign in to view this page." />;
  }

  if (!guild) {
    return <Failure message="Could not find the guild you were trying to edit." />;
  }

  return (
    <div className="bg-discord-dark min-h-screen flex flex-row divide-x-2 divide-gray-600">
      <Head>
        <title>{guild.name} Dashboard | Pepe Manager</title>
      </Head>

      <Menu guild={guild} />

      <main className="pt-5 w-full">
        <div className="block sm:hidden flex justify-center bg-discord-slightly-darker h-16 mb-4 px-2 text-white">
          <div className="px-10 py-5">
            <ImCog className="h-6 w-6 fill-current" />
          </div>
          <div className="px-10 py-5">
            <BsFillShiftFill className="h-6 w-6 fill-current" />
          </div>
          <div className="px-10 py-5">
            <RiShieldUserLine className="h-6 w-6 fill-current" />
          </div>
        </div>

        <div className="px-4">
          <Header description="This panel controls the bot in your server." title="Settings" />
        </div>

        <div className="flex flex-col bg-discord-slightly-darker rounded-xl w-full px-4 py-7 gap-6">
          <div className="flex flex-col gap-3">
            <label className="text-gray-300" htmlFor="prefix">
              Bot Prefix
            </label>

            <Input
              id="prefix"
              maxLength={5}
              onChange={handlePrefixChange}
              onClear={() => setPrefix('')}
              placeholder="Enter the bot prefix"
              value={prefix}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-gray-300" htmlFor="blacklistedChannels">
              Blacklisted Channels
            </label>

            <Selector items={memoizedSortedChannels} type="channel" />
          </div>
        </div>
      </main>
    </div>
  );
}
