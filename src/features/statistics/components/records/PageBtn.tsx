export const PageBtn = ({
  label,
  onClick,
  disabled = false,
  active = false,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`min-w-[28px] h-7 px-2 rounded text-xs font-medium transition-colors ${
      active
        ? 'bg-blue-500 text-white'
        : disabled
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-500 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
)
