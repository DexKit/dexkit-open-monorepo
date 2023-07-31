import { GetStaticProps, NextPage } from "next";
import {
  RenderDexAppBuilderFromConfig,
  RenderDexAppBuilder,
} from "@dexkit/dexappbuilder-viewer";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useAppConfig } from "@dexkit/ui/hooks";
import { getConfig } from "@dexkit/ui/services/whitelabel";
import { AppConfig } from "@dexkit/ui/types/config";

const ExamplePage: NextPage = () => {
  // We can pass here directly JSON file if wanted
  const appConfig = useAppConfig();
  return <RenderDexAppBuilderFromConfig config={appConfig} withLayout={true} />;
  /* return (
    <RenderDexAppBuilder
      slug={"wizard"}
      withLayout={true}
    ></RenderDexAppBuilder>
  );*/
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  const configResponse = await (
    await getConfig({ slug: "wizard", appPage: "home" })
  ).data;

  const config = {
    appConfig: JSON.parse(configResponse.config) as AppConfig,
    appNFT: configResponse.nft === undefined ? null : configResponse.nft,
    siteId: configResponse?.id,
  };
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...config,
    },
    revalidate: 300,
  };
};

export default ExamplePage;
