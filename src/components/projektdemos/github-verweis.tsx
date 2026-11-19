"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { assetPath } from "@/lib/asset-path";

export function GitHubVerweis({ projekt, repository }: { projekt: string; repository: string }) {
  const [bereit, setzen] = useState(["CNN", "RNN", "QUIZ", "JP"].includes(projekt));
  useEffect(() => {
    if (["CNN", "RNN", "QUIZ", "JP"].includes(projekt)) return;
    const abbruch = new AbortController();
    fetch(assetPath("/projektstand.json"), { signal: abbruch.signal, cache: "no-store" })
      .then(a => a.ok ? a.json() : null)
      .then(d => { if (!abbruch.signal.aborted) setzen(d?.projekte?.[projekt]?.verfuegbar === true); })
      .catch(() => {});
    return () => abbruch.abort();
  }, [projekt]);
  return <a href={bereit ? repository : "https://github.com/Jorxas?tab=repositories"} target="_blank" rel="noopener noreferrer">{bereit ? "Zum Projekt auf GitHub" : "Repository-Veröffentlichung läuft"} <ArrowUpRight size={17} /></a>;
}
