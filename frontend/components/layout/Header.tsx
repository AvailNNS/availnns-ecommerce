import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TopBar />
      <Navbar />
      <Navigation />
    </header>
  );
}