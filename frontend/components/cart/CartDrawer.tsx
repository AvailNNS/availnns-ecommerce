"use client";

import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";

import useCart from "@/hooks/useCart";
import CartItem from "./CartItem";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({
  open,
  onClose,
}: Props) {
  const {
    cart,
    loading,
  } = useCart();

  const subtotal =
    cart?.items?.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    ) || 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">
            Shopping Cart
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6">
          {loading ? (
            <div className="py-10 text-center">
              Loading...
            </div>
          ) : cart?.items?.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag
                size={60}
                className="text-gray-300"
              />

              <h3 className="mt-4 text-lg font-semibold">
                Your cart is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Add some products to start shopping.
              </p>

              <button
                onClick={onClose}
                className="mt-6 rounded-full bg-black px-6 py-3 text-white"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-2 py-4">
              {cart.items.map((item: any) => (
                <CartItem
                  key={item.product._id}
                  item={item}
                />
              ))}
            </div>
          )}
        </div>

                {/* Footer */}
        {cart?.items?.length > 0 && (
          <div className="border-t bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-base font-medium text-gray-600">
                Subtotal
              </span>

              <span className="text-2xl font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="space-y-3">
              <Link
                href="/cart"
                onClick={onClose}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-300
                  py-3
                  font-semibold
                  transition
                  hover:bg-gray-100
                "
              >
                View Cart
              </Link>

              <Link
                href="/checkout"
                onClick={onClose}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  bg-black
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-gray-800
                "
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}