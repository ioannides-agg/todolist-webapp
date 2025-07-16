export default function LoaderOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-desert-sand/30 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-dark-blue rounded-full animate-spin"/>
        </div>
    )
}