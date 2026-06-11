export default function Card({ title, eyebrow, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-forest-100 bg-white p-5 shadow-sm ${className}`}>
      {eyebrow ? <p className="text-xs font-bold uppercase tracking-wide text-forest-600">{eyebrow}</p> : null}
      {title ? <h2 className="mt-1 text-xl font-bold text-forest-900">{title}</h2> : null}
      <div className={title || eyebrow ? "mt-4" : ""}>{children}</div>
    </section>
  );
}
