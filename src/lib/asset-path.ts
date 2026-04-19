/**
 * Préfixe les chemins absolus (`/images/...`) avec `basePath` en production (ex. GitHub Pages).
 * Les URLs externes (`https://...`) sont laissées inchangées.
 * `NEXT_PUBLIC_BASE_PATH` est injecté au build via `next.config.ts`.
 */
export function assetPath(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;

  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  if (!path.startsWith("/")) {
    return base ? `${base}/${path}` : path;
  }
  if (!base) return path;
  return `${base}${path}`;
}
