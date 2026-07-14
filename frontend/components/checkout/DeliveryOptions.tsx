"use client";

import { Truck, Zap } from "lucide-react";

interface Props {
  delivery: "standard" | "express";
  setDelivery: (
    value: "standard" | "express"
  ) => void;
}

export default function DeliveryOptions({
  delivery,
  setDelivery,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-bold">
        Delivery Option
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        <button
          type="button"
          onClick={() =>
            setDelivery("standard")
          }
          className={`rounded-2xl border p-5 text-left transition ${
            delivery === "standard"
              ? "border-black bg-zinc-100"
              : "border-zinc-200 hover:border-zinc-400"
          }`}
        >
          <Truck className="mb-3" />

          <h3 className="font-semibold">
            Standard Delivery
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Delivery in 3–5 business days.
          </p>

          <p className="mt-4 font-bold">
            $10
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setDelivery("express")
          }
          className={`rounded-2xl border p-5 text-left transition ${
            delivery === "express"
              ? "border-black bg-zinc-100"
              : "border-zinc-200 hover:border-zinc-400"
          }`}
        >
          <Zap className="mb-3" />

          <h3 className="font-semibold">
            Express Delivery
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Delivery in 24–48 hours.
          </p>

          <p className="mt-4 font-bold">
            $25
          </p>
        </button>

      </div>
    </div>
  );
}