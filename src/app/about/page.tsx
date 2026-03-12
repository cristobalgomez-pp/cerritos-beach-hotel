import type { Metadata } from "next";
import PageHeader from "@/components/shared/PageHeader";
import AboutPreview from "@/components/home/AboutPreview";
import CTABanner from "@/components/shared/CTABanner";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";

export const metadata: Metadata = {
  title: "About Us | Desert Moon Hotel — Cerritos Beach",
  description:
    "Learn about Desert Moon Hotel — the closest hotel to the surf point in Cerritos Beach, Baja California Sur. 14 ocean view rooms, infinity pool, free breakfast.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader subtitle="CERRITOS BEACH HOTEL" title="About Us" />
      <AboutPreview />
      <CTABanner />
      <Features />
      <Testimonials />
    </>
  );
}
