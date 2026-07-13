"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Flame,
  Sparkles,
  Tag,
  Phone,
  Grid2X2,
} from "lucide-react";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "Category",
    href: "/category",
    icon: "category",
  },
  {
    name: "Best Sellers",
    href: "/best-sellers",
    icon: "flame",
  },
  {
    name: "New Arrivals",
    href: "/new-arrivals",
    icon: "sparkles",
  },
  {
    name: "Deals",
    href: "/deals",
    icon: "tag",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: "phone",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case "category":
        return <Grid2X2 size={16} />;

      case "flame":
        return <Flame size={16} />;

      case "sparkles":
        return <Sparkles size={16} />;

      case "tag":
        return <Tag size={16} />;

      case "phone":
        return <Phone size={16} />;

      default:
        return null;
    }
  };

  return (
    <nav
      className="
      sticky
      top-0
      z-40
      border-b
      border-zinc-200
      bg-white/95
      backdrop-blur-md
      "
    >
      <div
        className="
        mx-auto
        max-w-7xl
        px-6
        "
      >
        <ul
          className="
          flex
          items-center
          gap-2
          overflow-x-auto
          py-3
          whitespace-nowrap
          scrollbar-hide
          "
        >
          {navItems.map((item) => (
            <li
              key={item.href}
              className="shrink-0"
            >
              <Link
                href={item.href}
                className={`
                  relative
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    isActive(item.href)
                      ? "bg-black text-white shadow-md"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
                  }
                `}
              >
                {renderIcon(item.icon)}

                <span>{item.name}</span>

                <span
                  className={`
                    absolute
                    left-1/2
                    -bottom-[13px]
                    h-[3px]
                    -translate-x-1/2
                    rounded-full
                    bg-black
                    transition-all
                    duration-300

                    ${
                      isActive(item.href)
                        ? "w-8 opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}