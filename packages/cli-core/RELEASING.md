# Releasing @mingull/cli-core

Use this checklist when `@mingull/cli-core` is stable enough to publish.

## 1) Make package publishable

In `packages/cli-core/package.json`:

- set `"private": false`
- keep a real semver in `"version"` (Changesets will manage it after first release)
- add `"publishConfig": { "access": "public" }`

## 2) Record changes as you build

Run:

`pnpm changeset`

Pick `@mingull/cli-core` and select bump type:

- `patch`: bug fix or internal polish with no API break
- `minor`: backwards-compatible new feature
- `major`: breaking change

## 3) Cut a release

1. `pnpm version:packages`
2. review generated changelog/version updates
3. commit changes
4. `pnpm release`

## 4) First publish notes

- Ensure npm login is active (`npm whoami`).
- If package name is scoped and public, keep `publishConfig.access = public`.
