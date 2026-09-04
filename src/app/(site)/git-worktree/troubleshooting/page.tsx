import type { Metadata } from "next";
import ContentHubPage from "@/components/ContentHub/ContentHubPage";
import { contentHubs } from "@/data/contentHubs";

const hub = contentHubs.troubleshooting;
export const metadata: Metadata = { title: `${hub.title} | WorktreeWise`, description: hub.description, alternates: { canonical: `https://www.worktreewise.com${hub.href}` } };
export default function Page() { return <ContentHubPage hub={hub} />; }
