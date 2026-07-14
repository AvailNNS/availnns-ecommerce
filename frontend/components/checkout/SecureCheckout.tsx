"use client";

import {
  Lock,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function SecureCheckout() {
  return (
    <div className="rounded-3xl border border-green-200 bg-green-50 p-6">

      <div className="flex items-start gap-4">

        <div className="rounded-full bg-white p-3">

          <ShieldCheck className="text-green-600" />

        </div>

        <div>

          <h3 className="text-lg font-bold">

            Secure Checkout

          </h3>

          <p className="mt-2 text-sm text-zinc-600">

            Your payment information is protected
            with SSL encryption.

          </p>

          <div className="mt-5 flex flex-wrap gap-4 text-sm">

            <span className="flex items-center gap-2">

              <Lock size={16} />

              SSL Protected

            </span>

            <span className="flex items-center gap-2">

              <BadgeCheck size={16} />

              Secure Payment

            </span>

          </div>

        </div>

      </div>

    </div>
  );
}