import Link from "next/link";
import { Product } from "@/types/product";


interface Props {
  product: Product;
}


export default function ProductCard({
  product,
}: Props) {


  return (

    <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">


      {/* Image */}

      <div className="h-52 bg-gray-100 flex items-center justify-center">

        {
          product.images?.[0]?.url ? (

            <img
              src={product.images[0].url}
              alt={product.name}
              className="h-full w-full object-cover"
            />

          ) : (

            <span>
              No Image
            </span>

          )
        }

      </div>



      {/* Content */}

      <div className="p-5">


        <h3 className="font-bold text-lg">
          {product.name}
        </h3>


        <p className="text-gray-600 mt-2">
          ${product.price}
        </p>



        <Link
          href={`/products/${product._id}`}
          className="inline-block mt-4 bg-black text-white px-5 py-2 rounded-full"
        >
          View Details
        </Link>


      </div>


    </div>

  );

}