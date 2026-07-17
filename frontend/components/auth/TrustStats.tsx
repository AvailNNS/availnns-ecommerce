"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function TrustStats() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/public/stats");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 mt-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-2xl font-bold">
          {stats.totalProducts}
        </h3>
        <p className="text-sm text-slate-400">
          Products
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-2xl font-bold">
          {stats.totalOrders}
        </h3>
        <p className="text-sm text-slate-400">
          Orders
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-2xl font-bold">
          {stats.totalCustomers}
        </h3>
        <p className="text-sm text-slate-400">
          Customers
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <h3 className="text-2xl font-bold">
          {stats.totalCategories}
        </h3>
        <p className="text-sm text-slate-400">
          Categories
        </p>
      </div>
    </div>
  );
}