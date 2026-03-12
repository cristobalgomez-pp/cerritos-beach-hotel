import HeroCarousel from "@/components/home/HeroCarousel";
import AboutPreview from "@/components/home/AboutPreview";
import RoomCards from "@/components/home/RoomCards";
import CTABanner from "@/components/shared/CTABanner";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutPreview />
      <RoomCards />
      <CTABanner />
      <Features />
      <Testimonials />
    </>
  );
}
