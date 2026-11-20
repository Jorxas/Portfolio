import type { Metadata } from "next";
import { GeschuetztesProjekt } from "@/components/geschuetztes-projekt";

export const metadata: Metadata = { title: "THOT — Multi-Platform Publishing SaaS", description: "Kampagnen, gebundene Freigaben und Terminplanung: lokale Anwendung und SaaS-Prototyp mit klar getrennten Entwicklungs- und Prüfständen." };
export default function ThotSeite() { return <GeschuetztesProjekt slug="thot" />; }
