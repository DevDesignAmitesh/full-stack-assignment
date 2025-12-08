export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="
          h-5 w-5 
          border-2 border-black border-t-transparent 
          rounded-full animate-spin
        "
      />
    </div>
  );
};
