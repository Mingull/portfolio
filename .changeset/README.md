# Changesets

This repository uses Changesets for package versioning and changelogs.

## Common commands

- `pnpm changeset`: Create a changeset entry for user-facing changes.
- `pnpm version:packages`: Apply version bumps and changelog updates.
- `pnpm release`: Publish packages that were versioned, but only after packages are configured for publishing (for example, they are no longer marked `private: true`).

## Current release intent

There is no current release intent. Changesets will be used for future releases when needed. And only for user-facing changes. Internal changes that do not affect users will not require a changeset entry.
