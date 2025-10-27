import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-500 via-blue-400 to-blue-300 dark:from-blue-950 dark:via-blue-900 dark:to-blue-800 text-center px-6 transition-colors duration-300">
            {/* Logo */}
            <div className="mb-6">
                <Image
                    src="/logo.png"
                    alt="phCareHub Logo"
                    width={90}
                    height={90}
                />
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
                404 - Page Not Found
            </h1>

            {/* Description */}
            <p className="text-gray-100 dark:text-gray-300 mb-8 max-w-md">
                Sorry, we couldn’t find the page you’re looking for. It may have been
                moved, deleted, or the link is incorrect.
            </p>

            {/* Return Home Button */}
            <Link
                href="/"
                className="bg-white text-blue-700 dark:bg-blue-800 dark:text-blue-100 font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-100 dark:hover:bg-blue-700 transition-transform transform hover:-translate-y-1"
            >
                Return to Home
            </Link>

            {/* Footer */}
            <p className="mt-10 text-sm text-gray-50 dark:text-gray-400">
                &copy; {new Date().getFullYear()} phCareHub. All rights reserved.
            </p>
        </div>
    );
};