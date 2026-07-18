"use client";

import { useEffect, useState } from "react";

import {
  Truck,
  Plus,
  Trash2,
} from "lucide-react";

import {
  getDeliveryZones,
  createDeliveryZone,
  deleteDeliveryZone,
} from "@/services/deliveryZone.service";

export default function DeliveryZonesPage() {
  const [zones, setZones] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    deliveryFee: 0,
    freeDeliveryAbove: 0,
    estimatedDays: "2-5 Days",
    active: true,
  });

  const loadZones = async () => {
    try {
      const data = await getDeliveryZones();
      setZones(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  const handleCreate = async () => {
    try {
      if (!form.name.trim()) {
        alert("Zone name is required");
        return;
      }

      const token =
        localStorage.getItem("token") || "";

      await createDeliveryZone(
        form,
        token
      );

      setForm({
        name: "",
        deliveryFee: 0,
        freeDeliveryAbove: 0,
        estimatedDays: "2-5 Days",
        active: true,
      });

      loadZones();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this delivery zone?"
      );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token") || "";

      await deleteDeliveryZone(
        id,
        token
      );

      loadZones();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="flex items-center gap-3 text-3xl font-black">
          <Truck size={32} />
          Delivery Zones
        </h1>

        <p className="mt-2 text-gray-500">
          Manage delivery fees and
          shipping zones
        </p>
      </div>

      {/* Create Form */}

      <div className="rounded-3xl border bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-bold">
          Add New Zone
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Zone Name"
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={form.deliveryFee}
            onChange={(e) =>
              setForm({
                ...form,
                deliveryFee: Number(
                  e.target.value
                ),
              })
            }
            placeholder="Delivery Fee"
            className="rounded-xl border p-3"
          />

          <input
            type="number"
            value={form.freeDeliveryAbove}
            onChange={(e) =>
              setForm({
                ...form,
                freeDeliveryAbove:
                  Number(
                    e.target.value
                  ),
              })
            }
            placeholder="Free Delivery Above"
            className="rounded-xl border p-3"
          />

          <input
            value={form.estimatedDays}
            onChange={(e) =>
              setForm({
                ...form,
                estimatedDays:
                  e.target.value,
              })
            }
            placeholder="Estimated Days"
            className="rounded-xl border p-3"
          />
        </div>

        <div className="mt-5 flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm({
                ...form,
                active:
                  e.target.checked,
              })
            }
          />

          <span className="font-medium">
            Active Zone
          </span>
        </div>

        <button
          onClick={handleCreate}
          className="
          mt-6
          flex
          items-center
          gap-2
          rounded-xl
          bg-black
          px-6
          py-3
          font-semibold
          text-white
          "
        >
          <Plus size={18} />
          Add Zone
        </button>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-left">
                Zone
              </th>

              <th className="p-4 text-left">
                Delivery Fee
              </th>

              <th className="p-4 text-left">
                Free Above
              </th>

              <th className="p-4 text-left">
                ETA
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {zones.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="
                  p-8
                  text-center
                  text-gray-500
                  "
                >
                  No delivery zones found
                </td>
              </tr>
            ) : (
              zones.map((zone) => (
                <tr
                  key={zone._id}
                  className="border-b"
                >
                  <td className="p-4 font-semibold">
                    {zone.name}
                  </td>

                  <td className="p-4">
                    ৳
                    {zone.deliveryFee}
                  </td>

                  <td className="p-4">
                    ৳
                    {zone.freeDeliveryAbove}
                  </td>

                  <td className="p-4">
                    {
                      zone.estimatedDays
                    }
                  </td>

                  <td className="p-4">
                    <span
                      className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        zone.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                      `}
                    >
                      {zone.active
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleDelete(
                          zone._id
                        )
                      }
                      className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-red-500
                      px-3
                      py-2
                      text-white
                      "
                    >
                      <Trash2
                        size={16}
                      />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}