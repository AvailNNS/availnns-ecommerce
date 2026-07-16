"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  Eye,
  Search,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  PackageX,
  Download,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
} from "lucide-react";
import { getAdminOrders } from "@/services/order.service"; // Bulk Update API থাকলে সেটিও ইমপোর্ট করতে হবে
import { toast } from "sonner";

const statusOptions = [
  { label: "All Status", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const dateOptions = [
  { label: "All Time", value: "all" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
];

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered": return "bg-green-100 text-green-700 border-green-200";
    case "cancelled": return "bg-red-100 text-red-700 border-red-200";
    case "processing": return "bg-blue-100 text-blue-700 border-blue-200";
    case "shipped": return "bg-purple-100 text-purple-700 border-purple-200";
    case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default: return "bg-zinc-100 text-zinc-700 border-zinc-200";
  }
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  // Pagination & Bulk Actions
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  // =========================
  // LOAD ORDERS
  // =========================
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getAdminOrders(token);
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  // =========================
  // DEBOUNCED SEARCH (Performance Boost)
  // =========================
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1); // Reset to page 1 on search
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // =========================
  // FILTER LOGIC
  // =========================
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Search Filter
      const keyword = debouncedSearch.toLowerCase();
      const matchSearch =
        order._id?.toLowerCase().includes(keyword) ||
        order.user?.name?.toLowerCase().includes(keyword) ||
        order.user?.email?.toLowerCase().includes(keyword);

      // 2. Status Filter
      const matchStatus = status === "all" ? true : order.orderStatus === status;

      // 3. Date Filter (Requires `createdAt` field from DB)
      let matchDate = true;
      if (dateRange !== "all" && order.createdAt) {
        const orderDate = new Date(order.createdAt).getTime();
        const now = new Date().getTime();
        const diffDays = (now - orderDate) / (1000 * 3600 * 24);
        if (dateRange === "7days") matchDate = diffDays <= 7;
        if (dateRange === "30days") matchDate = diffDays <= 30;
      }

      return matchSearch && matchStatus && matchDate;
    });
  }, [orders, debouncedSearch, status, dateRange]);

  // =========================
  // PAGINATION LOGIC
  // =========================
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =========================
  // BULK ACTIONS
  // =========================
  const toggleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map((o) => o._id));
    }
  };

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (!selectedOrders.length) return;
    const confirmUpdate = window.confirm(`Update ${selectedOrders.length} orders to ${newStatus}?`);
    if (!confirmUpdate) return;

    setIsBulkUpdating(true);
    try {
      // TODO: আপনার backend এ bulk update API তৈরি করতে হবে।
      // আপাতত ফ্রন্টএন্ডে স্টেট আপডেট করে দিচ্ছি ডেমোর জন্য।
      setOrders(orders.map(o => 
        selectedOrders.includes(o._id) ? { ...o, orderStatus: newStatus } : o
      ));
      setSelectedOrders([]);
      toast.success(`Successfully updated ${selectedOrders.length} orders`);
    } catch (error) {
      toast.error("Failed to update orders");
    } finally {
      setIsBulkUpdating(false);
    }
  };

  // =========================
  // EXPORT TO CSV
  // =========================
  const exportToCSV = () => {
    if (!filteredOrders.length) return toast.error("No data to export");
    
    const headers = ["Order ID", "Customer Name", "Customer Email", "Total Amount", "Status", "Date"];
    const csvData = filteredOrders.map(o => [
      o._id,
      `"${o.user?.name || o.shippingAddress?.fullName || 'Guest'}"`,
      o.user?.email || "",
      o.totalPrice,
      o.orderStatus,
      o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "N/A"
    ].join(","));

    const csvString = [headers.join(","), ...csvData].join("\n");
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `orders_export_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  // Stats
  const stats = [
    { title: "Total Orders", value: orders.length, icon: ShoppingCart, color: "bg-blue-500" },
    { title: "Pending", value: orders.filter((o) => o.orderStatus === "pending").length, icon: Clock, color: "bg-yellow-500" },
    { title: "Delivered", value: orders.filter((o) => o.orderStatus === "delivered").length, icon: CheckCircle, color: "bg-green-500" },
    { title: "Cancelled", value: orders.filter((o) => o.orderStatus === "cancelled").length, icon: XCircle, color: "bg-red-500" },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-zinc-500">
        <Loader2 size={32} className="animate-spin text-black" />
        <p className="font-medium animate-pulse">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      
      {/* HEADER & EXPORT */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Orders</h1>
          <p className="mt-2 text-zinc-500 font-medium">Manage your fulfillment process efficiently.</p>
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 rounded-xl bg-white border border-zinc-200 px-5 py-2.5 text-sm font-bold text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm active:scale-95"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-wider">{item.title}</p>
                <h2 className="mt-2 text-3xl font-black text-zinc-900">{item.value}</h2>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-sm ${item.color}`}>
                <item.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADVANCED FILTERS */}
      <div className="flex flex-col gap-4 lg:flex-row bg-white p-4 rounded-3xl border border-zinc-200 shadow-sm">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Name, or Email..."
            className="w-full rounded-2xl bg-zinc-50 py-3 pl-12 pr-4 outline-none border border-transparent focus:border-zinc-300 focus:bg-white transition-all font-medium"
          />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
          <div className="relative flex-shrink-0">
            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
            <select
              value={dateRange}
              onChange={(e) => { setDateRange(e.target.value); setCurrentPage(1); }}
              className="pl-10 pr-8 py-3 rounded-2xl border border-zinc-200 bg-zinc-50 outline-none focus:border-zinc-300 focus:bg-white font-medium cursor-pointer transition-all appearance-none"
            >
              {dateOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="px-5 py-3 rounded-2xl border border-zinc-200 bg-zinc-50 outline-none focus:border-zinc-300 focus:bg-white font-medium min-w-[150px] cursor-pointer transition-all"
          >
            {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* BULK ACTION BAR (Shows only when items are selected) */}
      {selectedOrders.length > 0 && (
        <div className="flex items-center justify-between bg-black text-white p-4 rounded-2xl shadow-lg animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-3">
            <CheckSquare size={20} className="text-zinc-300" />
            <span className="font-bold">{selectedOrders.length} orders selected</span>
          </div>
          <div className="flex items-center gap-3">
            <select
              onChange={(e) => handleBulkStatusUpdate(e.target.value)}
              disabled={isBulkUpdating}
              className="bg-zinc-800 text-white border border-zinc-700 rounded-xl px-3 py-2 text-sm font-medium outline-none"
            >
              <option value="">Update Status...</option>
              {statusOptions.filter(s => s.value !== 'all').map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ORDERS TABLE */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-800 uppercase tracking-wider text-xs font-bold">
            <tr>
              <th className="px-6 py-5 w-10">
                <input
                  type="checkbox"
                  checked={paginatedOrders.length > 0 && selectedOrders.length === paginatedOrders.length}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black cursor-pointer"
                />
              </th>
              <th className="px-6 py-5">Order ID</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Amount</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-zinc-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => toggleSelectOrder(order._id)}
                      className="w-4 h-4 rounded border-zinc-300 text-black focus:ring-black cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-zinc-900">
                    #{order._id?.slice(-8).toUpperCase()}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-zinc-900">{order.user?.name || order.shippingAddress?.fullName || "Guest"}</p>
                      <p className="text-xs font-medium text-zinc-500 mt-0.5">{order.user?.email || "No email"}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-zinc-900 text-base">
                    ৳ {order.totalPrice}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                      {order.orderStatus || "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-100 px-4 py-2 font-bold text-zinc-700 hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                      <Eye size={16} /> View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <PackageX size={48} className="mb-3 opacity-20" />
                    <p className="font-bold text-lg text-zinc-500">No orders found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION FOOTER */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-zinc-200 bg-white px-6 py-4">
            <span className="text-sm text-zinc-500 font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-zinc-200 text-zinc-500 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE CARDS VIEW (Skipped bulk actions for mobile for better UX, kept pagination) */}
      <div className="space-y-4 md:hidden">
        {paginatedOrders.length > 0 ? (
          paginatedOrders.map((order) => (
             <div key={order._id} className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm space-y-4">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-xs font-bold text-zinc-400 uppercase">Order ID</p>
                 <h3 className="font-mono font-black text-zinc-900 mt-0.5">#{order._id?.slice(-8).toUpperCase()}</h3>
               </div>
               <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(order.orderStatus)}`}>
                 {order.orderStatus || "Pending"}
               </span>
             </div>
             <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
               <div className="mb-3">
                 <p className="text-xs font-bold text-zinc-400 uppercase">Customer</p>
                 <p className="font-bold text-zinc-900">{order.user?.name || order.shippingAddress?.fullName || "Guest"}</p>
               </div>
               <div className="flex justify-between items-end border-t border-zinc-200 pt-3">
                 <span className="text-xs font-bold text-zinc-400 uppercase">Total</span>
                 <span className="font-black text-lg text-zinc-900">৳ {order.totalPrice}</span>
               </div>
             </div>
             <Link href={`/admin/orders/${order._id}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-white font-bold hover:bg-zinc-800 transition-colors">
               <Eye size={18} /> View Order Details
             </Link>
           </div>
          ))
        ) : (
          <div className="rounded-3xl border border-zinc-200 bg-white py-16 px-6 text-center shadow-sm">
            <p className="font-bold text-lg text-zinc-500">No orders found</p>
          </div>
        )}
        
        {/* MOBILE PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4">
             <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-xl font-medium bg-white disabled:opacity-50">Prev</button>
             <span className="text-sm font-bold text-zinc-500">{currentPage} / {totalPages}</span>
             <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-xl font-medium bg-white disabled:opacity-50">Next</button>
          </div>
        )}
      </div>

    </div>
  );
}