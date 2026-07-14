"use client";

import {
  CreditCard,
  MapPin,
  ShoppingBag,
} from "lucide-react";

export default function CheckoutStepper() {
  return (
    <section className="mb-10">

      <div className="grid gap-5 md:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">

            <MapPin
              className="text-green-600"
            />

          </div>

          <h3 className="font-bold text-lg">

            Shipping Address

          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            Enter delivery information.

          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">

            <CreditCard
              className="text-blue-600"
            />

          </div>

          <h3 className="font-bold text-lg">

            Payment

          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            Select payment method.

          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">

            <ShoppingBag
              className="text-orange-600"
            />

          </div>

          <h3 className="font-bold text-lg">

            Review

          </h3>

          <p className="mt-2 text-sm text-zinc-500">

            Confirm and place order.

          </p>

        </div>

      </div>

    </section>
  );
}