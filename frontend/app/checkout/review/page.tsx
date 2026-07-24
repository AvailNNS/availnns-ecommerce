"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  Loader2,
} from "lucide-react";
import CheckoutHeader 
from "@/components/checkout/CheckoutHeader";
import CheckoutStepper 
from "@/components/checkout/CheckoutStepper";
import {
  createOrder,
} from "@/services/order.service";
import {
  initiatePayment,
} from "@/services/payment.service";
import useCart 
from "@/hooks/useCart";
import {
  useCurrency,
} from "@/context/CurrencyContext";

export default function ReviewPage() {
  const router = useRouter();

  const {
    cart,
    clearCart
  } = useCart();

  const {
    formatPrice
  } = useCurrency();

  const [
    loading,
    setLoading
  ] = useState(false);

  const [
    isPending,
    startTransition
  ] = useTransition();

  const [
    checkout,
    setCheckout
  ] = useState<any>(null);

  const items = useMemo(() => {
    return cart?.items || [];
  }, [cart]);

  // =======================
  // LOAD CHECKOUT DATA
  // =======================
  useEffect(() => {
    const data = sessionStorage.getItem("checkoutData");

    if (!data) {
      router.replace("/checkout");
      return;
    }

    setCheckout(JSON.parse(data));
  }, [router]);

  // =======================
  // PRICE CALCULATION
  // =======================
  const subtotal = useMemo(() => {
    return items.reduce(
      (sum: number, item: any) => {
        const price = Number(
          item.product?.discountPrice ||
          item.product?.price ||
          item.price ||
          0
        );
        return sum + (price * item.quantity);
      },
      0
    );
  }, [items]);

  const shipping = checkout?.deliveryFee || 0;
  const tax = subtotal * 0.05;
  const discount = checkout?.discount || 0;

  const total = Math.max(
    0,
    subtotal + shipping + tax - discount
  );

  // =======================
  // LOADING
  // =======================
  if (!checkout) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  // =======================
  // CONFIRM ORDER
  // =======================
  const confirmOrder = async () => {
    try {
      setLoading(true);

      const orderData = {
        shippingAddress: {
          fullName: checkout.name,
          phone: checkout.phone,
          country: checkout.country || "Bangladesh",
          address: checkout.location?.formattedAddress || "",
          location: checkout.location,
        },
        deliveryZone: checkout.deliveryZone,
        deliveryFee: shipping,
        paymentMethod: checkout.paymentMethod,
        transactionId: checkout.transactionId || null,
        couponCode: checkout.couponCode || null,
        discount: discount,
      };

      const res = await createOrder(orderData);
      const orderId = res.order._id;

      if (
        checkout.paymentMethod === "CARD" ||
        checkout.paymentMethod === "SSLCOMMERZ"
      ) {
        const payment = await initiatePayment({
          orderId,
          amount: total,
          customerName: checkout.name,
          phone: checkout.phone,
          address: checkout.location.formattedAddress,
        });

        if (payment?.payment?.GatewayPageURL) {
          router.push(
            `/checkout/payment-redirect?url=${encodeURIComponent(
              payment.payment.GatewayPageURL
            )}`
          );
        } else {
          throw new Error("Payment gateway failed");
        }
      } else {
        await clearCart();
        sessionStorage.removeItem("checkoutData");

        startTransition(() => {
          router.push(`/checkout/success?order=${orderId}`);
        });
      }
    } catch (error: any) {
      console.log(error);
      alert(error?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <CheckoutHeader />
        <CheckoutStepper currentStep={4} />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* LEFT SIDE */}
          <div className="space-y-6 lg:col-span-2">
            {/* ORDER ITEMS */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-black">
                Order Items
              </h2>

              <div className="space-y-5">
                {items.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b pb-4 last:border-0"
                  >
                    <div className="h-24 w-24 overflow-hidden rounded-xl bg-zinc-100">
                      <img
                        src={
                          item?.product?.images?.[0]?.url ||
                          item?.product?.images?.[0] ||
                          "/placeholder.png"
                        }
                        alt={
                          item?.product?.name || "Product"
                        }
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold">
                        {item.product?.name}
                      </h3>

                      <p className="text-sm text-zinc-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 font-black">
                        {formatPrice(
                          (
                            item.product?.discountPrice ||
                            item.product?.price ||
                            item.price
                          ) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERY INFO */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-black">
                Delivery Information
              </h2>

              <div className="space-y-3 text-sm">
                <p>
                  Name:
                  <b className="ml-2">{checkout.name}</b>
                </p>

                <p>
                  Phone:
                  <b className="ml-2">{checkout.phone}</b>
                </p>

                <p>
                  Address:
                  <b className="ml-2">{checkout.location.formattedAddress}</b>
                </p>

                <p>
                  Payment:
                  <b className="ml-2">{checkout.paymentMethod}</b>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-black">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{formatPrice(shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <hr />

                <div className="flex justify-between text-xl font-black">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={confirmOrder}
                disabled={loading || isPending}
                className="mt-6 w-full rounded-xl bg-black py-4 font-bold text-white disabled:opacity-50"
              >
                {loading ? "Processing..." : "Confirm Order"}
              </button>

              <button
                onClick={() => router.push("/checkout/payment")}
                className="mt-3 w-full rounded-xl border py-4 font-bold"
              >
                Back To Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
