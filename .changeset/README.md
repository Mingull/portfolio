# Changesets

This repository uses Changesets for package versioning and changelogs.

## Common commands

- `pnpm changeset`: Create a changeset entry for user-facing changes.
- `pnpm version:packages`: Apply version bumps and changelog updates.
- `pnpm release`: Publish packages that were versioned.

## Current release intent

The primary target for publishing is `@mingull/cli-core`.

Only packages included in changeset files are versioned and published.
