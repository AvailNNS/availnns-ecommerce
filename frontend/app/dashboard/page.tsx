"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, Package, Heart, Settings, LogOut, 
  MapPin, ShoppingCart, CreditCard, Bell, ChevronRight 
} from "lucide-react";
import api from "@/services/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { router.push("/login"); return; }
        const { data } = await api.get("/users/me");
        setUser(data.user);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  const stats = [
    { label: "Total Orders", value: "12", icon: <Package className="text-blue-600" /> },
    { label: "Pending", value: "2", icon: <ShoppingCart className="text-orange-600" /> },
    { label: "Wishlist", value: "5", icon: <Heart className="text-red-600" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black">Welcome back, {user?.name.split(" ")[0]}!</h1>
            <p className="text-gray-500">Manage your account and track your orders here.</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 font-semibold hover:underline">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-2">
            {[
              { title: "Profile", icon: <User />, href: "/dashboard/settings" },
              { title: "My Orders", icon: <Package />, href: "/dashboard/orders" },
              { title: "Addresses", icon: <MapPin />, href: "/dashboard/addresses" },
              { title: "Payments", icon: <CreditCard />, href: "/dashboard/payments" },
              { title: "Notifications", icon: <Bell />, href: "/dashboard/notifications" },
            ].map((link) => (
              <Link key={link.title} href={link.href} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:bg-gray-100 transition border">
                <div className="flex items-center gap-3">
                  {link.icon} <span className="font-medium">{link.title}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </Link>
            ))}
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-6 rounded-3xl border shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-gray-100 rounded-2xl">{stat.icon}</div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-black">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-8 rounded-3xl border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Account Overview</h2>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Current Plan</p>
                    <p className="text-sm text-gray-500">Standard Member</p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}