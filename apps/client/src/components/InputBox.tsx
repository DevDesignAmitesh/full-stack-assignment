export const Input = ({
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    type={type}
    {...props}
    className="w-full rounded-lg bg-white/5 border border-neutral-700 px-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition"
  />
);
