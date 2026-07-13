import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSeller from "@/components/home/BestSeller";
import NewArrivals from "@/components/home/NewArrivals";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <NewArrivals />
      <BestSeller />
      <FeaturedProducts />

    </main>
  );
}