import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSeller from "@/components/home/BestSeller";
import NewArrivals from "@/components/home/NewArrivals";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <CategorySection />
      <NewArrivals />
      <BestSeller />
      <FeaturedProducts />

    </main>
  );
}