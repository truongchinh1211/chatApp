function Loading() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50">
            <div className="flex items-center justify-center h-screen bg-gray-100 bg-opacity-50">
                <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-25"></div>
                    <p className="mt-4 text-lg text-gray-700">Loading...</p>
                </div>
            </div>
        </div>
    )
}
export default Loading;