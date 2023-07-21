# DexKit Open Monorepo

This is DexKit open monorepo, shows how to use dexappbuilder viewer and how to build custom plugins for it.

## What's inside?

DexKit open monorepo includes the following packages/apps:

### Apps and Packages

- `docs`: docs on how to use dexkit ui and dexappbuilder viewer packages.
- `dexapp`: A next js app running using dexappbuilder viewer
- `plugins`: Plugins to be used inside dexappbuilder, there is an plugin Example showing the needed functions to be implemented
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This repo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
yarn dev
```
