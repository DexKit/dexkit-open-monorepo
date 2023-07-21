---
sidebar_position: 1
---

# Create a DexAppBuilder plugin

To create a DexAppBuilder Plugin you need to implement the follow functions:

- `function render({data}: {data: T}): React.ReactNode` - renders the component on DexAppBuilder
- `function renderControls(onChange({data}: {data: T}): void, onSave({data}: {data: T}): void   ): React.ReactNode` - renders form on DexAppBuilder Admin dashboard

and add Metadata to describe your plugin:

```ts
const metadata = {
  type: "plugin",
  title: string,
  subtitle: string,
  icon: string | React.ReactNode,
};
```

All these functions and metadata should be exported from a index.tsx file on packages plugin under `your-username/Plugin-name`

## Create your first plugin

We will create a plugin with **dexkit** username and called **ExampleButton**

First we create a folder `dexkit/ExampleButton` at `packages/plugins`, then inside the folder we create a file `index.tsx`.

Now we create the render function

```jsx title="packages/plugins/dexkit/Example/index.tsx"
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ExtensionIcon from "@mui/icons-material/Extension";
import { useState } from "react";

interface Props {
  data: {
    message: string,
  };
}

interface ControlProps {
  onSave(data: Props): void;
  onChange(data: Props): void;
}

const PluginButton = ({ data }: Props) => {
  return <button onClick={() => alert(data.message)}>message</button>;
};

/**
 * We export render function to be called by DexAppBuilder dinamically
 * @param data
 * @returns
 */
export function render({ data }: Props) {
  return <PluginButton data={data} />;
}
```

We created our `PluginButton` component and exported a function `render` to render this component on DexAppBuilder section. We defined `data` interfaces to be used on `render` and `renderControls`.

Now we want to create the form to help us inject data in our plugin on DexAppBuilder admin dashbboard, for that we need to create a `renderControls` function and export on the index.tsx . `OnChange` function add us preview capabilities and the `OnSave` generates the config file to be saved on DexAppBuilder server.

```jsx title="packages/plugins/dexkit/Example/index.tsx"
const defaultValues = {
  message: "dexkit rocks",
};

/**
 * Render controls is called by DexAppBuilder to render a form to update this section and add data
 * @param controls
 * @returns
 */
export function renderControls(controls: ControlProps) {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    controls.onChange({ data: defaultValues });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    controls.onSave({ data: defaultValues });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <TextField
            id="message-input"
            name="message"
            label="Name"
            type="text"
            value={formValues.message}
            onChange={handleInputChange}
          />
        </Grid>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Grid>
    </form>
  );
}
```

Now we have our render function and render Controls function done, we go to define the metadata of our plugin

```jsx title="packages/plugins/dexkit/Example/index.tsx"
/**
 * Metadata used to display plugin on DexAppBuilder
 */
export const metadata = {
  type: "plugin",
  title: "Example Button",
  subtitle: "Example Button to be used inside DexAppBuilder",
  category: "misc", // misc, swap, nft, exchange, web3
  icon: <ExtensionIcon />,
};
```

The metadata values help us describe our plugin on DexAppBuilder Dashboard.

Congrats, you built your first plugin. To help you build more powerfull plugins you can import UI components, hooks and services from `@dexkit` npm packages: `@dexkit/ui` , `@dexkit/core`, `@dexkit/web3forms`, `@dexkit/widgets`.

## Run and test your plugin in action

You have done your first plugin and want to see how it renders on `DexAppBuilder`. You can use `apps/dexapp` to run a test instance how DexAppBuilder will run your plugin

```jsx title="apps/dexapp/pages/plugin.tsx"
import { GetStaticProps, NextPage } from "next";
import { RenderDexAppBuilderFromConfig } from "@dexkit/dexappbuilder-viewer";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { useAppConfig } from "@dexkit/ui/hooks";
import { getConfig } from "@dexkit/ui/services/whitelabel";
import { AppPageSection } from "@dexkit/dexappbuilder-viewer/types";
import { AppConfig } from "@dexkit/ui/types/config";

const ExamplePage: NextPage = () => {
  // We can pass here directly JSON file if wanted
  const appConfig = useAppConfig();
  return (
    <>
      <RenderDexAppBuilderFromConfig config={appConfig} withLayout={true} />;
    </>
  );
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

  // inject our created plugin on the sections
  config.appConfig.pages.home.sections = [
    {
      type: "plugin",
      data: { message: "DexKit rocks" },
      pluginPath: "dexkit/ExampleButton",
    },
  ] as AppPageSection[];

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...config,
    },
    revalidate: 300,
  };
};

export default ExamplePage;
```

Congrats you built and tested your first DexAppBuilder plugin.
