export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
            <p className="text-gray-500">You don’t have permission to view this page.</p>
        </div>
    );
}