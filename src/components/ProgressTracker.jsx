import { getProgressMessage } from "../utils/storage";

export default function ProgressTracker({ records, onSave }) {
  const maxTotal = Math.max(...records.map((record) => record.total), 1);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={onSave}
        className="rounded-xl border border-forest-600 px-5 py-3 font-bold text-forest-700 transition hover:bg-forest-50"
      >
        Save current result
      </button>

      <p className="rounded-xl bg-forest-50 p-3 text-sm font-semibold text-forest-900">{getProgressMessage(records)}</p>

      <div className="rounded-2xl border border-forest-100 bg-white p-4" aria-label="Previous footprint records chart">
        {records.length > 0 ? (
          <ol className="grid gap-3">
            {records.map((record) => (
              <li key={record.id}>
                <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>{record.label}</span>
                  <span>{record.total} kg</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-forest-100">
                  <div
                    className="h-full rounded-full bg-forest-600"
                    style={{ width: `${Math.max((record.total / maxTotal) * 100, 6)}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="py-10 text-center text-slate-600">
            No saved records yet. Save your first result to start tracking.
          </p>
        )}
      </div>
    </div>
  );
}
