import Link from "next/link";

import { Category } from "@/types/category";


interface Props {
  category: Category;
}



export default function CategorySidebar({
  category,
}: Props) {


  return (

    <aside
      className="
      rounded-2xl
      border
      border-zinc-200
      bg-white
      p-5
      "
    >

      <h2
        className="
        mb-4
        text-lg
        font-bold
        text-zinc-900
        "
      >
        Categories
      </h2>


      <div
        className="
        space-y-3
        "
      >

      {
        category.children?.map((item)=>(

          <Link
            key={item._id}
            href={`/category/${item.slug}`}
            className="
            block
            text-sm
            text-zinc-600
            hover:text-black
            transition
            "
          >

            {item.name}

          </Link>

        ))
      }


      </div>


    </aside>

  );
}