"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import useCart from "@/hooks/useCart";

type Props = {
  item: {
    product: {
      _id: string;
      name: string;
      price: number;
      images?: {
        url: string;
      }[];
    };
    quantity: number;
    price: number;
  };
};

export default function CartItem({ item }: Props) {
  const {
    updateItem,
    removeItem,
  } = useCart();

  const increase = async () => {
    await updateItem(
      item.product._id,
      item.quantity + 1
    );
  };

  const decrease = async () => {
    if (item.quantity <= 1) {
      await removeItem(item.product._id);
      return;
    }

    await updateItem(
      item.product._id,
      item.quantity - 1
    );
  };

  return (
    <div className="flex gap-4 border-b py-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={
            item.product.images?.[0]?.url ||
            "/placeholder.png"
          }
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="line-clamp-2 font-semibold">
          {item.product.name}
        </h3>

        <p className="mt-1 text-lg font-bold">
          ${item.price}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center rounded-full border">
            <button
              onClick={decrease}
              className="p-2 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>

            <span className="min-w-8 text-center font-semibold">
              {item.quantity}
            </span>

            <button
              onClick={increase}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() =>
              removeItem(item.product._id)
            }
            className="text-red-500 transition hover:text-red-700"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}