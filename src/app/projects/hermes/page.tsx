import type { Metadata } from "next";
import { GeschuetztesProjekt } from "@/components/geschuetztes-projekt";

export const metadata: Metadata = { title: "Hermes — Multi-Agent AI Orchestrator", description: "ChatGPT, Hermes und mehrere KI-Werkzeuge: Missionszustände, Modellauswahl, kontrollierte Parallelität und synthetische Demonstration." };
export default function HermesSeite() { return <GeschuetztesProjekt slug="hermes" />; }
