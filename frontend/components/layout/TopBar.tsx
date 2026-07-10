import Link from "next/link";
import { Phone, Truck, Globe, DollarSign } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-slate-900 text-white text-sm">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <Truck size={16} />
            <span>Free shipping on orders over $100</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+880 1234-567890</span>
          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-6">

          <Link
            href="/track-order"
            className="hover:text-gray-300"
          >
            Track Order
          </Link>

          <div className="flex items-center gap-1">
            <Globe size={16} />
            <span>EN</span>
          </div>

          <div className="flex items-center gap-1">
            <DollarSign size={16} />
            <span>USD</span>
          </div>

        </div>

      </div>
    </div>
  );
}