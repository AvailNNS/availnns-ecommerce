"use client";

import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { cart, totalItems, updateItem, removeItem } = useCart();
  const { formatPrice } = useCurrency();

  if (!open) return null;

  const subtotal = Number(cart?.total || 0);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-white shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-5">
          <div>
            <h2 className="text-xl font-black">Shopping Cart</h2>
            <p className="text-sm text-gray-500 mt-1">{totalItems} items</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart?.items?.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag size={40} className="text-gray-400" />
              </div>
              <h3 className="mt-5 font-bold text-xl">Your cart is empty</h3>
              <Link
                href="/shop"
                onClick={onClose}
                className="mt-5 rounded-xl bg-black px-6 py-3 text-white"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            cart.items.map((item: any) => (
              <div key={item.product._id} className="flex gap-4 rounded-xl border p-4">
                {/* IMAGE */}
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.product?.images?.[0]?.url || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm line-clamp-2">{item.product.name}</h3>
                  <p className="font-bold mt-1">{formatPrice(item.price)}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() => updateItem(item.product._id, Math.max(1, item.quantity - 1))}
                        className="h-8 w-8 flex items-center justify-center"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.product._id, item.quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.product._id)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="border-t p-5 bg-white">
          <div className="rounded-xl bg-gray-50 p-4 mb-5">
            <p className="text-sm text-gray-500">Free Shipping on orders over 100</p>
            <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between mb-5">
            <span className="font-medium">Subtotal</span>
            <span className="text-xl font-black">{formatPrice(subtotal)}</span>
          </div>

          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-black py-4 text-white font-bold hover:bg-gray-800 transition"
          >
            View Cart
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}