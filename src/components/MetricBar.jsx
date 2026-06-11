import { memo } from "react";
import PropTypes from "prop-types";

function MetricBar({ color = "#2f7d4c", label, maxValue, value }) {
  const width = `${Math.max((value / maxValue) * 100, 6)}%`;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>{label}</span>
        <span>{value} kg</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-forest-100">
        <div className="h-full rounded-full" style={{ width, backgroundColor: color }} />
      </div>
    </div>
  );
}

MetricBar.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default memo(MetricBar);
