export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <h1 className="text-8xl font-bold text-green-900">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>

      <a
        href="/"
        className="btn bg-green-900 hover:bg-green-900 text-white mt-6"
      >
        Go Home
      </a>
    </div>
  );
}