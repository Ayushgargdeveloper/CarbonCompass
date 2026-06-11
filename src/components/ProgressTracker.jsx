import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import MetricBar from "./MetricBar";
import { getProgressMessage } from "../services/storageService";
import { recordShape } from "../types/propTypes";

function ProgressTracker({ records, onSave }) {
  const maxTotal = useMemo(() => Math.max(...records.map((record) => record.total), 1), [records]);
  const progressMessage = useMemo(() => getProgressMessage(records), [records]);

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={onSave}
        className="rounded-xl border border-forest-600 px-5 py-3 font-bold text-forest-700 transition hover:bg-forest-50"
      >
        Save current result
      </button>

      <p className="rounded-xl bg-forest-50 p-3 text-sm font-semibold text-forest-900">{progressMessage}</p>

      <div
        className="rounded-2xl border border-forest-100 bg-white p-4"
        aria-label="Previous footprint records chart"
      >
        {records.length > 0 ? (
          <ol className="grid gap-3">
            {records.map((record) => (
              <li key={record.id}>
                <MetricBar label={record.label} value={record.total} maxValue={maxTotal} />
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

ProgressTracker.propTypes = {
  onSave: PropTypes.func.isRequired,
  records: PropTypes.arrayOf(recordShape).isRequired
};

export default memo(ProgressTracker);
