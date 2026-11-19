import type { ComponentProps } from "react";
import { assetPath } from "@/lib/asset-path";

/** Echte Dokumentnavigation: Der statische Host benötigt keine RSC-Rewrites. */
export default function Link({ href, ...eigenschaften }: ComponentProps<"a">) {
  return (
    <a
      {...eigenschaften}
      href={href?.startsWith("/") ? assetPath(href) : href}
    />
  );
}
