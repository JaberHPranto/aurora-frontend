import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="absolute top-0 left-0 w-1/2 h-full bg-primary-100 transform -skew-x-12 -translate-x-16 z-0" />

      <div className="relative z-10">
        <main className="container mx-auto px-4 flex flex-col md:flex-row items-center h-screen">
          <div className="w-full">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Whooops!</h1>
            <p className="text-gray-600 mb-8">
              Sorry, the page you are looking for doesn't exist.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              Go Back
            </Link>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-[500px] h-[500px]">
              <img src="/not-found.png" alt="not-found" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
