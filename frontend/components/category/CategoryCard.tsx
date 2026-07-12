import Image from "next/image";
import Link from "next/link";

import { Category } from "@/types/category";


interface Props {
  category: Category;
}


export default function CategoryCard({
  category,
}: Props) {


  return (

    <Link
      href={`/category/${category.slug}`}
      className="
      group
      overflow-hidden
      rounded-2xl
      border
      border-zinc-200
      bg-white
      transition
      hover:-translate-y-1
      hover:shadow-xl
      "
    >


      <div
        className="
        relative
        h-48
        w-full
        bg-zinc-100
        "
      >

        {category.image ? (

          <Image
            src={category.image}
            alt={category.name}
            fill
            className="
            object-cover
            transition
            duration-300
            group-hover:scale-105
            "
          />

        ) : (

          <div
            className="
            flex
            h-full
            items-center
            justify-center
            text-zinc-400
            "
          >
            No Image
          </div>

        )}

      </div>



      <div className="p-5">


        <h2
          className="
          text-lg
          font-bold
          text-zinc-900
          "
        >
          {category.name}
        </h2>



        {
          category.children &&
          category.children.length > 0 && (

            <p
              className="
              mt-2
              text-sm
              text-zinc-500
              "
            >
              {category.children.length} Subcategories
            </p>

          )
        }


      </div>


    </Link>

  );
}