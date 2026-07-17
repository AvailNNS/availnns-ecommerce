"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import api from "@/services/api";
import { createOrder } from "@/services/order.service";
import { initiatePayment } from "@/services/payment.service";
import useCart from "@/hooks/useCart";

// Components
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm from "@/components/checkout/ShippingForm";
import DeliveryOptions from "@/components/checkout/DeliveryOptions";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import CouponBox from "@/components/checkout/CouponBox";
import OrderSummary from "@/components/checkout/OrderSummary";
import SecureCheckout from "@/components/checkout/SecureCheckout";
import LocationPicker from "@/components/checkout/LocationPicker";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, loading: cartLoading } = useCart();
  const items = cart?.items || [];

  // States
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [applied, setApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    country: "Bangladesh",
    location: {
      formattedAddress: "",
      division: "",
      district: "",
      area: "",
      road: "",
      latitude: "",
      longitude: "",
      googleMapLink: "",
    },
    paymentMethod: "COD",
    transactionId: "",
  });

  // Load User Data
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, name: user.name || "", phone: user.phone || "" }));
    }
  }, [user]);

  // Price Calculation
  const subtotal = useMemo(() => items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0), [items]);
  const shipping = delivery === "express" ? 25 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax - discount;

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const selectPayment = (method: string) => setForm((prev) => ({ ...prev, paymentMethod: method }));

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
      setApplied(true);
      setCouponError("");
    } else {
      setDiscount(0);
      setApplied(false);
      setCouponError("Invalid coupon code");
    }
  };

  const setLocation = (data: any) => setForm((prev) => ({ ...prev, location: data }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (items.length === 0) throw new Error("Cart is empty");
      if (!/^01[3-9]\d{8}$/.test(form.phone)) throw new Error("Invalid Bangladesh phone number");
      if (!form.location.latitude || !form.location.longitude) throw new Error("Please select delivery location");

      const orderData = {
        shippingAddress: {
          fullName: form.name,
          phone: form.phone,
          address: form.address,
          country: "Bangladesh",
          location: form.location,
        },
        paymentMethod: form.paymentMethod,
        transactionId: form.transactionId || null,
        couponCode: coupon || null,
      };

      const res = await createOrder(orderData);
      const orderId = res.order._id;

      if (form.paymentMethod === "SSLCOMMERZ") {
        const payment = await initiatePayment({
          orderId,
          amount: total,
          customerName: form.name,
          phone: form.phone,
          address: form.location.formattedAddress,
        });

        if (payment?.payment?.GatewayPageURL) {
          window.location.href = payment.payment.GatewayPageURL;
        } else {
          throw new Error("Payment gateway error");
        }
      } else {
        await clearCart();
        router.push(`/checkout/success?order=${orderId}`);
      }
    } catch (err: any) {
      setError(err?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <CheckoutHeader />
        <CheckoutStepper />
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ShippingForm form={form} handleChange={handleChange} />
            <LocationPicker location={form.location} setLocation={setLocation} />
            <DeliveryOptions delivery={delivery} setDelivery={setDelivery} />
            <PaymentMethods paymentMethod={form.paymentMethod} transactionId={form.transactionId} selectPayment={selectPayment} handleChange={handleChange} />
            <CouponBox coupon={coupon} setCoupon={setCoupon} discount={discount} applied={applied} applyCoupon={applyCoupon} couponError={couponError} />
            <SecureCheckout />
            {error && <div className="rounded-xl bg-red-100 p-4 text-red-600">{error}</div>}
          </div>
          <div>
            <OrderSummary items={items} subtotal={subtotal} shipping={shipping} tax={tax} discount={discount} total={total} loading={loading} />
          </div>
        </form>
      </div>
    </main>
  );
}