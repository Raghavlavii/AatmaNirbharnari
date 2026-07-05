import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-100">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Side */}
        <div className="lg:w-1/2">

          <span className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-semibold">
            🌸 Empowering Women Entrepreneurs
          </span>

          <h1 className="text-6xl font-extrabold mt-8 leading-tight text-gray-900">
            Build Your Dream
            <br />
            <span className="text-purple-700">
              Business Today.
            </span>
          </h1>

          <p className="text-gray-600 mt-8 text-xl leading-8">
            Discover inspiring women-owned businesses,
            connect with entrepreneurs,
            and showcase your own venture on
            Aatmanirbhar Nari.
          </p>

          <div className="flex gap-5 mt-10">

            <Link
              href="/businesses"
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Explore Businesses
            </Link>

            <Link
              href="/register"
              className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Become an Entrepreneur
            </Link>

          </div>

        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 flex justify-center mt-16 lg:mt-0">

          <div className="bg-white rounded-3xl shadow-2xl p-10 w-[420px]">

            <div className="text-7xl text-center">
              🌸
            </div>

            <h2 className="text-3xl font-bold text-center mt-5 text-gray-900">
              Aatmanirbhar Nari
            </h2>

            <p className="text-gray-500 text-center mt-4">
              Supporting women entrepreneurs through
              technology, visibility, and opportunity.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}