import CategoryCard from "@/components/category/CategoryCard";
import { getCategoryTree } from "@/services/category.service";


export default async function CategoriesPage() {


  const categories = await getCategoryTree();



  return (

    <main
      className="
      min-h-screen
      bg-white
      "
    >


      <section
        className="
        mx-auto
        max-w-7xl
        px-5
        py-12
        "
      >


        <div className="mb-10">


          <h1
            className="
            text-4xl
            font-bold
            text-zinc-900
            "
          >
            Categories
          </h1>


          <p
            className="
            mt-3
            text-zinc-500
            "
          >
            Explore our products by category
          </p>


        </div>




        <div
          className="
          grid
          grid-cols-2
          gap-5
          md:grid-cols-3
          lg:grid-cols-4
          "
        >


          {
            categories.map((category:any)=>(
              
              <CategoryCard
                key={category._id}
                category={category}
              />

            ))
          }


        </div>



      </section>


    </main>

  );
}