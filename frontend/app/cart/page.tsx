"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Sparkles,
} from "lucide-react";
import useCart from "@/hooks/useCart";
import CartItem from "@/components/cart/CartItem";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const { cart, loading, totalItems } = useCart();
  const { formatPrice } = useCurrency();

  // Loading State
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Loading your cart...</div>
      </main>
    );
  }

  // Empty Cart State
  if (!cart?.items?.length) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white shadow">
            <ShoppingBag size={55} className="text-gray-400" />
          </div>
          <h1 className="mt-8 text-3xl font-black">Your cart is empty</h1>
          <p className="mt-3 text-gray-500">Discover amazing products and add them to your cart.</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-zinc-800"
          >
            Start Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  // Price Calculations
  const subtotal = Number(cart.total || 0);
  const shipping = subtotal >= 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;
  const progress = Math.min((subtotal / 100) * 100, 100);

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black tracking-tight">Shopping Cart</h1>
          <p className="mt-2 text-gray-500">{totalItems} products in your cart</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Products Section */}
          <section className="space-y-5 lg:col-span-2">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Products</h2>
                <span className="rounded-full bg-gray-100 px-4 py-1 text-sm font-medium">
                  {totalItems} Items
                </span>
              </div>
              <div className="space-y-4">
                {cart.items.map((item: any) => {
                  const itemId =
                    item.product?._id?.toString() ||
                    item.product?.toString() ||
                    Math.random().toString();

                  return <CartItem key={itemId} item={item} />;
                })}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Truck, title: "Fast Delivery", desc: "2-5 business days" },
                { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
                { icon: Sparkles, title: "Premium Quality", desc: "Verified products" },
              ].map((b, i) => (
                <div key={i} className="rounded-2xl border bg-white p-5">
                  <b.icon size={24} className="text-gray-700" />
                  <h3 className="mt-3 font-bold">{b.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary Aside */}
          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-black">Order Summary</h2>

              {/* Free Shipping Progress */}
              <div className="mb-6 rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between text-sm font-medium">
                  <span>Free Shipping Progress</span>
                  <span>{formatPrice(subtotal)} / {formatPrice(100)}</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full bg-black transition-all" style={{ width: `${progress}%` }} />
                </div>
                {subtotal < 100 ? (
                  <p className="mt-2 text-xs text-gray-500">
                    Add {formatPrice(100 - subtotal)} more to unlock free shipping
                  </p>
                ) : (
                  <p className="mt-2 text-xs font-semibold text-green-600">🎉 Free shipping unlocked</p>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t pt-5">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-black">{formatPrice(total)}</span>
              </div>

              {/* Actions */}
              <Link
                href="/checkout"
                className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-black py-4 font-bold text-white transition hover:bg-zinc-800"
              >
                Proceed To Checkout <ArrowRight size={18} />
              </Link>
              <Link
                href="/shop"
                className="mt-3 flex items-center justify-center rounded-xl border py-3 font-medium hover:bg-gray-50"
              >
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
