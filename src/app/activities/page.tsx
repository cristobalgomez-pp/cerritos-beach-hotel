import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import ActivitySections from "./ActivitySections";

export const metadata: Metadata = {
  title: "Activities in Cerritos Beach | Desert Moon Hotel",
  description:
    "Discover activities near Desert Moon Hotel — surf lessons, hiking, Todos Santos, Balandra, ATVs, fishing, and Cabo San Lucas. Adventure awaits in Baja California Sur.",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader subtitle="Activities" title="What to do in Cerritos Beach" />
      <ActivitySections />
    </>
  );
}
