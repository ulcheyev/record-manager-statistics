export const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center pt-20">
      <h2 className="text-xl font-semibold text-red-600">Access Denied</h2>

      <p className="text-sm text-gray-500 max-w-md">
        You do not have permission to view this page.
      </p>
    </div>
  )
}
