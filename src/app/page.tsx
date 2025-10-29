export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
            <main className="flex flex-col items-center justify-center gap-6 p-16 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-black dark:text-white">
                    Test Page
                </h1>
                <p className="text-zinc-600 dark:text-zinc-300 text-center">
                    This is a simple page for testing purposes.
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Test Button
                </button>
            </main>
        </div>
    );
}

