import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider as AuthProvider, signIn, signOut, useSession } from 'next-auth/client';
import { Scrollbars } from 'react-custom-scrollbars';

import SearchBarProvider from '../contexts/SearchBarContext';
import UserProvider from '../contexts/UserContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [session] = useSession();

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      universal
      style={{ height: '100vh', width: '100vw' }}
      renderThumbVertical={({ style, ...props }) => <div {...props} style={{ ...style, background: 'var(--black)' }} />}
    >
      <Head>
        <title>Pepe Emoji</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <nav className="navbarContainer">
        <span onClick={() => router.push('/')}>PEPE MANAGER</span>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/bot">Bot</Link>
          </li>
          <li>
            <Link href="/levels">Levels</Link>
          </li>
          <li>
            <Link href="/merch">Merch</Link>
          </li>
          <li>
            <Link href="https://discord.gg/pepe">Support Server</Link>
          </li>
        </ul>
        <div>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: window.location.href })}>
              {session.user.name} - Sign out
            </button>
          ) : (
            <button onClick={() => signIn('discord')}>Sign in</button>
          )}
        </div>
      </nav>
      <SearchBarProvider>
        <AuthProvider session={pageProps.session}>
          <UserProvider>
            <Component {...pageProps} />
          </UserProvider>
        </AuthProvider>
      </SearchBarProvider>
    </Scrollbars>
  );
}
