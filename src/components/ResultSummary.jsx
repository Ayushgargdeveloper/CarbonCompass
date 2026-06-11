import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import MetricBar from "./MetricBar";
import { breakdownItemShape } from "../types/propTypes";

const COLORS = ["#2f7d4c", "#86b86f", "#f0b84b", "#6f8f7a"];

function ResultSummary({ result }) {
  const chartData = useMemo(() => result.breakdown.filter((item) => item.value > 0), [result.breakdown]);
  const maxValue = useMemo(() => Math.max(...chartData.map((item) => item.value), 1), [chartData]);

  return (
    <div aria-live="polite" className="grid gap-4">
      <div className="rounded-2xl bg-forest-900 p-5 text-white">
        <p className="text-sm font-semibold text-forest-100">Estimated weekly footprint</p>
        <p className="mt-2 text-5xl font-black">{result.total}</p>
        <p className="text-forest-100">kg CO2e per week</p>
      </div>

      <div
        className="grid gap-3 rounded-2xl border border-forest-100 bg-white p-4"
        aria-label="Category-wise carbon breakdown chart"
      >
        {chartData.map((item, index) => (
          <MetricBar
            key={item.name}
            label={item.name}
            value={item.value}
            maxValue={maxValue}
            color={COLORS[index % COLORS.length]}
          />
        ))}
        {chartData.length === 0 ? (
          <p className="text-center text-slate-600">Enter values to see a category breakdown.</p>
        ) : null}
      </div>

      <ul className="grid gap-2 text-sm text-slate-700">
        {result.breakdown.map((item) => (
          <li key={item.name} className="flex items-center justify-between rounded-xl bg-forest-50 px-4 py-2">
            <span>{item.name}</span>
            <strong>{item.value} kg</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

ResultSummary.propTypes = {
  result: PropTypes.shape({
    breakdown: PropTypes.arrayOf(breakdownItemShape).isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
};

export default memo(ResultSummary);
