import Link from "next/link";


const categories = [
  "Electronics",
  "Fashion",
  "Watches",
  "Shoes",
  "Mobiles",
  "Laptops",
];


export default function CategorySection(){

  return (

    <section className="py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold mb-8">
          Shop By Category
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {
            categories.map((category)=>(
              
              <Link
                key={category}
                href={`/shop?category=${category}`}
                className="border rounded-xl p-6 text-center hover:shadow-lg transition"
              >

                {category}

              </Link>

            ))
          }


        </div>

      </div>

    </section>

  );
}