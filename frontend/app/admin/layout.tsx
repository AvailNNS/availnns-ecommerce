import Link from "next/link";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Ticket,
} from "lucide-react";


export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {


  const menu = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      name: "Coupons",
      href: "/admin/coupons",
      icon: Ticket,
    },
  ];



  return (

    <div className="min-h-screen flex bg-gray-100">


      {/* Sidebar */}

      <aside className="
        w-72
        bg-gray-950
        text-white
        flex
        flex-col
        shadow-xl
      ">


        {/* Logo */}

        <div className="
          p-6
          border-b
          border-gray-800
        ">

          <h1 className="
            text-2xl
            font-bold
          ">
            AvailNNS Admin
          </h1>

          <p className="
            text-sm
            text-gray-400
            mt-1
          ">
            Management Panel
          </p>

        </div>



        {/* Menu */}

        <nav className="
          flex-1
          p-5
          space-y-2
        ">


          {
            menu.map((item)=>{

              const Icon = item.icon;


              return (

                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-gray-300
                    hover:bg-gray-800
                    hover:text-white
                    transition
                  "
                >

                  <Icon size={20}/>

                  <span>
                    {item.name}
                  </span>


                </Link>

              );

            })
          }


        </nav>




        {/* Footer */}

        <div className="
          p-5
          border-t
          border-gray-800
          text-sm
          text-gray-400
        ">

          © 2026 AvailNNS

        </div>


      </aside>




      {/* Main Content */}

      <main className="
        flex-1
        p-8
        overflow-y-auto
      ">

        {children}

      </main>



    </div>

  );

}