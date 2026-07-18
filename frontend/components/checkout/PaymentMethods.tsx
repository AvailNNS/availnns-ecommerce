"use client";

import {
  CreditCard,
  Wallet,
  Banknote,
} from "lucide-react";

interface Props {
  paymentMethod: string;
  transactionId: string;
  selectPayment: (method: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PaymentMethods({
  paymentMethod,
  transactionId,
  selectPayment,
  handleChange,
}: Props) {
  const methods = [
    {
      value: "COD",
      label: "Cash On Delivery",
      icon: Banknote,
      description: "Pay after receiving your order",
    },
    {
      value: "CARD",
      label: "Card Payment",
      icon: CreditCard,
      description: "Visa / Mastercard / Online payment",
    },
    {
      value: "BKASH",
      label: "bKash",
      icon: Wallet,
      description: "Mobile payment",
    },
    {
      value: "NAGAD",
      label: "Nagad",
      icon: Wallet,
      description: "Mobile payment",
    },
  ];

  const needTransactionId = paymentMethod === "BKASH" || paymentMethod === "NAGAD";

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Payment Method</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {methods.map((method) => (
          <button
            key={method.value}
            type="button"
            onClick={() => selectPayment(method.value)}
            className={`rounded-2xl border p-5 text-left transition-all ${
              paymentMethod === method.value
                ? "border-black bg-zinc-100 shadow-md"
                : "border-zinc-200 hover:border-zinc-400"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100">
                <method.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold">{method.label}</h3>
                <p className="mt-1 text-sm text-zinc-500">{method.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {needTransactionId && (
        <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
          <label className="mb-2 block text-sm font-semibold">
            Transaction ID
          </label>
          <input
            name="transactionId"
            value={transactionId}
            onChange={handleChange}
            placeholder={`Enter ${paymentMethod} transaction ID`}
            className="w-full rounded-xl border bg-white p-4 outline-none transition focus:border-black"
          />
          <p className="mt-2 text-xs text-zinc-500">
            Please enter your payment transaction ID after completing payment.
          </p>
        </div>
      )}

      {paymentMethod === "CARD" && (
        <div className="mt-6 rounded-2xl bg-blue-50 p-5 text-sm text-blue-700">
          Card payment will redirect you to secure payment gateway.
        </div>
      )}

      {paymentMethod === "COD" && (
        <div className="mt-6 rounded-2xl bg-green-50 p-5 text-sm text-green-700">
          You can pay cash when your order arrives.
        </div>
      )}
    </div>
  );
}
