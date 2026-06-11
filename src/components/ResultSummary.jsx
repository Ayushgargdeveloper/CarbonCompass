import { memo, useMemo } from "react";

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

      <div className="grid gap-3 rounded-2xl border border-forest-100 bg-white p-4" aria-label="Category-wise carbon breakdown chart">
        {chartData.map((item, index) => (
          <BreakdownBar key={item.name} item={item} maxValue={maxValue} color={COLORS[index % COLORS.length]} />
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

function BreakdownBar({ item, maxValue, color }) {
  const width = `${Math.max((item.value / maxValue) * 100, 6)}%`;

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>{item.name}</span>
        <span>{item.value} kg</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-forest-100">
        <div className="h-full rounded-full" style={{ width, backgroundColor: color }} />
      </div>
    </div>
  );
}

export default memo(ResultSummary);
