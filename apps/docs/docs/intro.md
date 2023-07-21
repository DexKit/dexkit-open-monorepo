---
sidebar_position: 1
---

# Tutorial Intro

Let's start creating plugins or running DexAppBuilder in your local machine.

## Getting Started

Get started by cloning **[DexKit/dexkit-open-monorepo](https://github.com/DexKit/dexkit-open-monorepo)** if you want to contribute.

Or **try DexAppBuilder** low/no code tool **[dexappbuilder.dexkit.com/admin/create](https://dexappbuilder.dexkit.com/admin/create)** if you want to build an dapp without efforts.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.17 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Start DexAppBuilder render

After cloning the monorepo, run the following command to install all dependencies on the monorepo root folder:

```bash
yarn install
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

Run the development server:

```bash
yarn dev:dexapp
```

The `yarn dev:dexapp` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `apps/dexapp/pages/index.tsx` (this page) and play with it, if you have an app created on DexAppBuilder, you can try replace with your app slug there.

If you want to create plugins check `packages/plugins` and see `dexkit/Example` to know the interface that DexAppBuilder uses.
