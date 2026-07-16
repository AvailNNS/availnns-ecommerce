"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Loader2, User, CreditCard, Package, Edit2, 
  Check, MessageCircle, Mail, Printer, Copy 
} from "lucide-react";
import { toast } from "sonner";
import { getOrderById, updateOrderStatus, updatePayment } from "@/services/order.service";

const statusSteps = ["pending", "processing", "shipped", "delivered", "cancelled"];
const paymentMethods = ["Cash on Delivery", "bKash", "Nagad", "Credit Card"];
const paymentStatuses = ["pending", "paid", "failed", "refunded"];

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState("pending");
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [updatingPayment, setUpdatingPayment] = useState(false);
  const [paymentData, setPaymentData] = useState({ method: "", status: "" });

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/login");
        const res = await getOrderById(id, token);
        const data = res.order || res;
        setOrder(data);
        setStatus(data.orderStatus || "pending");
        setPaymentData({ method: data.paymentMethod || "Cash on Delivery", status: data.paymentStatus || "pending" });
      } catch { toast.error("Failed to load data"); } 
      finally { setLoading(false); }
    };
    if (id) loadOrder();
  }, [id, router]);

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      await updateOrderStatus(id, status, token!);
      setOrder((prev: any) => ({ ...prev, orderStatus: status }));
      toast.success("Status updated");
    } catch { toast.error("Update failed"); } finally { setUpdating(false); }
  };

  const handlePaymentUpdate = async () => {
    setUpdatingPayment(true);
    try {
      const token = localStorage.getItem("token");
      await updatePayment(id, paymentData.method, paymentData.status, token!);
      setOrder((prev: any) => ({ ...prev, paymentMethod: paymentData.method, paymentStatus: paymentData.status }));
      setIsEditingPayment(false);
      toast.success("Payment updated");
    } catch { toast.error("Update failed"); } finally { setUpdatingPayment(false); }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto p-10 animate-pulse space-y-8">
      <div className="h-10 bg-zinc-200 rounded-lg w-48"></div>
      <div className="h-32 bg-zinc-200 rounded-3xl"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-20 animate-in fade-in duration-500 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <Link href="/admin/orders" className="flex items-center gap-2 text-zinc-500 mb-3 hover:text-black font-medium transition-colors">
            <ArrowLeft size={18} /> Back to Orders
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Order #{order._id?.slice(-8).toUpperCase()}</h1>
        </div>
        <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold hover:bg-zinc-50">
          <Printer size={16} /> Print
        </button>
      </div>

      {/* STATUS CONTROL */}
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Fulfillment Status</h2>
          <p className="text-sm text-zinc-500">Current: <span className="font-bold text-black uppercase">{order.orderStatus}</span></p>
        </div>
        <div className="flex gap-3">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-zinc-50 border rounded-xl px-4 py-3 font-bold capitalize outline-none">
            {statusSteps.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={handleStatusUpdate} disabled={updating} className="bg-black text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
            {updating ? <Loader2 className="animate-spin" /> : <Check size={18} />} Update
          </button>
        </div>
      </div>

      {/* GRID: CUSTOMER & PAYMENT */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer Card */}
        <div className="rounded-3xl border p-6 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-3"><div className="p-2 bg-zinc-100 rounded-xl"><User /></div><h2 className="text-xl font-bold">Customer</h2></div>
          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between"><span>Name</span><span className="font-bold">{order.shippingAddress?.fullName}</span></div>
            <div className="flex justify-between"><span>Phone</span><span className="font-bold flex items-center gap-2">{order.shippingAddress?.phone} <a href={`https://wa.me/${order.shippingAddress?.phone}`} target="_blank" className="text-green-600"><MessageCircle size={16} /></a></span></div>
            <div className="flex justify-between"><span>Email</span><span className="font-bold flex items-center gap-2">{order.user?.email} <a href={`mailto:${order.user?.email}`} className="text-blue-600"><Mail size={16} /></a></span></div>
          </div>
        </div>

        {/* Payment Card */}
        <div className="rounded-3xl border p-6 bg-white shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3"><div className="p-2 bg-zinc-100 rounded-xl"><CreditCard /></div><h2 className="text-xl font-bold">Payment</h2></div>
            <button onClick={() => setIsEditingPayment(!isEditingPayment)} className="text-sm font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-lg">Edit</button>
          </div>
          {isEditingPayment ? (
             <div className="space-y-3">
               <select value={paymentData.method} onChange={e => setPaymentData({...paymentData, method: e.target.value})} className="w-full border p-2 rounded-lg">{paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}</select>
               <select value={paymentData.status} onChange={e => setPaymentData({...paymentData, status: e.target.value})} className="w-full border p-2 rounded-lg">{paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
               <button onClick={handlePaymentUpdate} className="w-full bg-black text-white p-2 rounded-lg font-bold">Save</button>
             </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-between"><span>Method</span><span className="font-bold">{order.paymentMethod}</span></div>
              <div className="flex justify-between"><span>Status</span><span className="font-bold px-2 bg-yellow-100 rounded uppercase">{order.paymentStatus}</span></div>
              <div className="flex justify-between font-black text-xl pt-2 border-t"><span>Total</span><span>৳ {order.totalPrice}</span></div>
            </div>
          )}
        </div>
      </div>

      {/* ITEMS TABLE WITH IMAGES */}
      <div className="rounded-3xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Package /> Order Items</h2>
        <div className="space-y-3">
          {order.items?.map((item: any) => (
             <div key={item._id} className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl border">
                <div className="flex items-center gap-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover border" />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-white border flex items-center justify-center"><Package size={24} /></div>
                  )}
                  <div><h4 className="font-bold">{item.name}</h4><p className="text-sm text-zinc-500">Qty: {item.quantity}</p></div>
                </div>
                <div className="font-black text-lg">৳ {item.price * item.quantity}</div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}