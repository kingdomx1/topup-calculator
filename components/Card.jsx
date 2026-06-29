export default function Card({
  title,
  value,
  onChange,
  editable = true,
}) {
  return (
    <div
      className="
      w-56
      rounded-3xl
      border
      border-cyan-500/20
      bg-slate-900/50
      backdrop-blur-xl
      p-6
      transition-all
      duration-300
      hover:border-purple-500/40
      hover:shadow-[0_0_30px_rgba(168,85,247,.35)]
    "
    >
      <h2 className="text-slate-400 text-sm uppercase tracking-wider">
        {title}
      </h2>

      <input
        type="number"
        value={value}
        disabled={!editable}
        onChange={onChange}
        className="
          mt-5
          w-full
          bg-transparent
          text-center
          text-4xl
          font-bold
          outline-none
          disabled:text-cyan-400
        "
      />
    </div>
  );
}