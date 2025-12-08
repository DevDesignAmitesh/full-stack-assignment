export const PrimaryButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="mt-4 w-full py-3 rounded-lg bg-white text-black font-medium hover:scale-[1.02] active:scale-100 transition group"
  >
    {children}
  </button>
);
