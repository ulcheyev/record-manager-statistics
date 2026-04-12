export const SkeletonCard = ({ h }: { h: number }) => (
  <div
    className={`rounded-xl bg-gray-50 border border-gray-100 animate-pulse`}
    style={{ height: h }}
  />
)
