import { CacheProvider, EmotionCache } from "@emotion/react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";

import createEmotionCache from "../src/createEmotionCache";

import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import type {} from "@mui/material/themeCssVarsAugmentation";
import { AppConfigContext } from "@dexkit/ui/context/AppConfigContext";
import { AppProvider } from "../src/components/AppProvider";
import { AppConfig } from "@dexkit/ui/types/config";
import { AssetAPI } from "@dexkit/ui/modules/nft/types";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ dehydratedState: DehydratedState }> {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { appConfig, appNFT } = pageProps as {
    appConfig: AppConfig;
    appNFT: AssetAPI;
    dehydratedState: DehydratedState;
  };
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);

  const [queryClient] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          suspense: false,
        },
      },
    })
  );

  const getLayout = (Component as any).getLayout || ((page: any) => page);

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
    router.events.on("routeChangeError", () => {
      setLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setLoading(false);
      });
      router.events.off("routeChangeComplete", () => {
        setLoading(false);
      });
      router.events.off("routeChangeError", () => {
        setLoading(false);
      });
    };
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <link rel="shortcut icon" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AppConfigContext.Provider value={{ appConfig, appNFT }}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AppProvider>
              <Backdrop open={loading}>
                <CircularProgress color="inherit" size={80} />
              </Backdrop>
              {getLayout(<Component {...pageProps} />)}
            </AppProvider>
          </Hydrate>
        </QueryClientProvider>
      </AppConfigContext.Provider>
    </CacheProvider>
  );
}
