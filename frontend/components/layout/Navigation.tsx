"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  ShoppingBag,
  Grid2X2,
  Flame,
  Sparkles,
  Tag,
  Phone,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon?: string;
  badge?: string;
  badgeColor?: string;
}

const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    icon: "home",
  },
  {
    name: "Shop",
    href: "/shop",
    icon: "shop",
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
    badge: "New",
    badgeColor: "bg-emerald-500 text-white",
  },
  {
    name: "Deals",
    href: "/deals",
    icon: "tag",
    badge: "Hot",
    badgeColor: "bg-rose-500 text-white",
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
      case "home":
        return <Home size={16} className="text-blue-500" />;
      case "shop":
        return <ShoppingBag size={16} className="text-indigo-500" />;
      case "category":
        return <Grid2X2 size={16} className="text-emerald-500" />;
      case "flame":
        return <Flame size={16} className="text-amber-500" />;
      case "sparkles":
        return <Sparkles size={16} className="text-purple-500" />;
      case "tag":
        return <Tag size={16} className="text-rose-500" />;
      case "phone":
        return <Phone size={16} className="text-sky-500" />;
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
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <li
                key={item.href}
                className="shrink-0"
              >
                <Link
                  href={item.href}
                  className={`
                    relative
                    group
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
                      active
                        ? "bg-black text-white shadow-md"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-black"
                    }
                  `}
                >
                  {/* Icon */}
                  <span className={`transition-transform duration-300 group-hover:scale-110 ${active ? "text-white" : ""}`}>
                    {renderIcon(item.icon)}
                  </span>

                  {/* Name */}
                  <span>{item.name}</span>

                  {/* Optional Badge */}
                  {item.badge && (
                    <span
                      className={`
                        text-[10px]
                        font-bold
                        px-1.5
                        py-0.5
                        rounded-full
                        tracking-wider
                        uppercase
                        ${item.badgeColor}
                      `}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Bottom Indicator Line */}
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
                        active
                          ? "w-8 opacity-100"
                          : "w-0 opacity-0"
                      }
                    `}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
