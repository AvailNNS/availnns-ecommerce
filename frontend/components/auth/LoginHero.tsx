export default function LoginHero() {
  return (
    <div className="relative z-10 flex flex-col justify-center h-full">

      {/* Logo */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
          <span className="text-white text-2xl font-black">
            A
          </span>
        </div>
      </div>

      {/* Heading */}
      <div className="space-y-4">

        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
          Trusted E-commerce Platform
        </span>

        <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
          Welcome to
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            AvailNNS
          </span>
        </h1>

        <p className="max-w-md text-lg text-slate-400 leading-relaxed">
          Manage products, orders, customers, payments and analytics from a single powerful dashboard.
        </p>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-12">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <h3 className="text-2xl font-bold text-white">
            10K+
          </h3>
          <p className="text-xs text-slate-400">
            Customers
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <h3 className="text-2xl font-bold text-white">
            50K+
          </h3>
          <p className="text-xs text-slate-400">
            Orders
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <h3 className="text-2xl font-bold text-white">
            99%
          </h3>
          <p className="text-xs text-slate-400">
            Satisfaction
          </p>
        </div>

      </div>

      {/* Features */}
      <div className="mt-10 space-y-3">

        <div className="flex items-center gap-3 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          Secure Authentication
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          Real-time Order Tracking
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          Advanced Analytics Dashboard
        </div>

      </div>

    </div>
  );
}