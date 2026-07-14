"use client";

import { ShieldCheck } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <section className="mb-10">

      <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

        <ShieldCheck size={18} />

        Secure Checkout

      </div>

      <h1 className="mt-5 text-4xl font-extrabold text-zinc-900">

        Complete Your Order

      </h1>

      <p className="mt-3 max-w-2xl text-zinc-600 leading-7">

        Review your items, choose your preferred delivery
        option and payment method, then place your order
        securely. Your information is protected with
        industry-standard SSL encryption.

      </p>

    </section>
  );
}