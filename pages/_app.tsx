import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>CSE4197</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.14.0/css/all.css" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
