import { TokenWhitelabelApp } from "@dexkit/core/types";
import { DexkitProvider } from "@dexkit/ui/components";
import { ThemeMode } from "@dexkit/ui/constants/enum";
import { useAppConfig, useThemeMode } from "@dexkit/ui/hooks";
import { AppNotification } from "@dexkit/ui/types";
import { atom } from "jotai";
import { useMemo } from "react";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { getTheme } from "../theme";

export interface AppContextProps {
  children: React.ReactNode | React.ReactNode[];
}

export function AppProvider({ children }: AppContextProps) {
  const appConfig = useAppConfig();
  const { mode } = useThemeMode();

  const theme = useMemo(() => {
    let tempTheme = extendTheme({});
    let fontFamily;
    if (appConfig?.font) {
      fontFamily = `'${appConfig.font.family}', ${appConfig.font.category}`;
    }

    if (appConfig) {
      tempTheme = getTheme({
        name: appConfig.theme,
      })?.theme;
    }

    if (appConfig && appConfig.theme === "custom") {
      let customTheme = {
        dark: {},
        light: {},
      };
      if (appConfig.customTheme) {
        const parsedCustomTheme = JSON.parse(appConfig.customTheme);
        if (parsedCustomTheme.palette.mode === ThemeMode.light) {
          customTheme.light = parsedCustomTheme;
        } else {
          customTheme.dark = parsedCustomTheme;
        }
      }

      if (mode === ThemeMode.light && appConfig.customThemeLight) {
        customTheme.light = JSON.parse(appConfig.customThemeLight);
      }
      if (mode === ThemeMode.dark && appConfig.customThemeDark) {
        customTheme.dark = JSON.parse(appConfig.customThemeDark);
      }

      if (customTheme) {
        return fontFamily
          ? extendTheme({
              typography: {
                fontFamily,
              },
              colorSchemes: {
                ...customTheme,
              },
            })
          : extendTheme({
              colorSchemes: {
                ...customTheme,
              },
            });
      }
    }

    let temp: any = tempTheme;

    delete temp["vars"];

    return fontFamily
      ? extendTheme({
          ...temp,
          typography: {
            fontFamily,
          },
        })
      : extendTheme({ ...temp });
  }, [appConfig]);

  return (
    <DexkitProvider
      theme={theme}
      locale="en-US"
      assetsAtom={atom({})}
      currencyUserAtom={atom("")}
      tokensAtom={atom<TokenWhitelabelApp[]>([])}
      notificationTypes={{}}
      notificationsAtom={atom<AppNotification[]>([])}
      onChangeLocale={() => {}}
      transactionsAtom={atom<{}>({})}
      selectedWalletAtom={atom<string>("")}
    >
      {children}
    </DexkitProvider>
  );
}
