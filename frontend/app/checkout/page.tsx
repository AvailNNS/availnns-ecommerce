"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useRouter,
} from "next/navigation";
import {
  Loader2,
} from "lucide-react";
import api from "@/services/api";
import useCart from "@/hooks/useCart";
import {
  useCurrency,
} from "@/context/CurrencyContext";
import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import ShippingForm from "@/components/checkout/ShippingForm";
import LocationPicker from "@/components/checkout/LocationPicker";
import {
  getDeliveryZones,
} from "@/services/deliveryZone.service";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    loading: cartLoading
  } = useCart();

  const {
    formatPrice
  } = useCurrency();

  const items = useMemo(
    () => cart?.items || [],
    [cart]
  );

  const [
    user,
    setUser
  ] = useState<any>(null);

  const [
    userLoading,
    setUserLoading
  ] = useState(true);

  const [
    zones,
    setZones
  ] = useState<any[]>([]);

  const [
    selectedZone,
    setSelectedZone
  ] = useState("");

  const [
    error,
    setError
  ] = useState("");

  const [
    form,
    setForm
  ] = useState({
    name: "",
    phone: "",
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
    }
  });

  // =====================
  // LOAD USER
  // =====================
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/login?redirect=/checkout");
          return;
        }

        const res = await api.get("/users/me");
        setUser(res.data.user);
      } catch (error) {
        console.log("USER ERROR", error);
        router.replace("/login?redirect=/login");
      } finally {
        setUserLoading(false);
      }
    };

    loadUser();
  }, [router]);

  // =====================
  // LOAD DELIVERY ZONE
  // =====================
  useEffect(() => {
    const loadZones = async () => {
      try {
        const data = await getDeliveryZones();
        setZones(
          data.filter((z: any) => z.active)
        );
      } catch (error) {
        console.log("ZONE ERROR", error);
      }
    };

    loadZones();
  }, []);

  // =====================
  // AUTO FILL USER
  // =====================
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // =====================
  // LOCATION UPDATE
  // =====================
  const setLocation = (data: any) => {
    setForm(prev => ({
      ...prev,
      location: data
    }));
  };

  // =====================
  // CONTINUE PAYMENT
  // =====================
  const continuePayment = () => {
    setError("");

    if (!form.name.trim()) {
      setError("Name required");
      return;
    }

    if (!form.phone.trim()) {
      setError("Phone required");
      return;
    }

    if (!form.location.latitude || !form.location.longitude) {
      setError("Please select map location");
      return;
    }

    if (!selectedZone) {
      setError("Select delivery area");
      return;
    }

    // save checkout data
    sessionStorage.setItem(
      "checkoutData",
      JSON.stringify({
        ...form,
        deliveryZone: selectedZone
      })
    );

    router.push("/checkout/payment");
  };

  if (cartLoading || userLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CheckoutHeader />
        <CheckoutStepper currentStep={2} />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-2">
            {/* SHIPPING */}
            <ShippingForm
              form={form}
              handleChange={handleChange}
            />

            {/* LOCATION */}
            <LocationPicker
              location={form.location}
              setLocation={setLocation}
            />

            {/* DELIVERY AREA */}
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-black">
                Delivery Area
              </h2>

              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="w-full rounded-xl border p-4 outline-none"
              >
                <option value="">
                  Select delivery area
                </option>

                {zones.map((zone: any) => (
                  <option
                    key={zone._id}
                    value={zone._id}
                  >
                    {zone.name} - {formatPrice(zone.deliveryFee)}
                  </option>
                ))}
              </select>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-600">
                {error}
              </div>
            )}

            {/* CONTINUE PAYMENT */}
            <button
              type="button"
              onClick={continuePayment}
              className="w-full rounded-xl bg-black py-4 font-bold text-white transition hover:bg-zinc-800"
            >
              Continue Payment
            </button>
          </div>

          {/* RIGHT */}
          <div className="lg:sticky lg:top-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black mb-5">
                Order Items
              </h2>

              <div className="space-y-5">
                {items.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex gap-4 border-b pb-4 last:border-0"
                  >
                    {/* IMAGE */}
                    <div className="h-20 w-20 overflow-hidden rounded-xl bg-zinc-100">
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

                    {/* DETAILS */}
                    <div className="flex-1">
                      <h3 className="font-bold line-clamp-2">
                        {item.product?.name}
                      </h3>

                      <div className="mt-2 flex justify-between text-sm text-zinc-500">
                        <span>
                          Qty: {item.quantity}
                        </span>
                        <span>
                          {formatPrice(
                            item.product?.discountPrice ||
                            item.product?.price ||
                            item.price
                          )}
                        </span>
                      </div>

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
          </div>
        </div>
      </div>
    </main>
  );
}
