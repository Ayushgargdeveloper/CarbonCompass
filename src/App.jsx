import { useMemo, useState } from "react";
import ActionChecklist from "./components/ActionChecklist";
import CalculatorForm from "./components/CalculatorForm";
import Card from "./components/Card";
import Insights from "./components/Insights";
import ProgressTracker from "./components/ProgressTracker";
import ResultSummary from "./components/ResultSummary";
import { defaultFormValues, ecoActions } from "./data/options";
import { calculateFootprint } from "./utils/carbon";
import { generateRecommendations } from "./utils/recommendations";
import { hasErrors, sanitizeCalculatorInput, validateCalculatorInput } from "./utils/validation";
import { loadActionState, loadRecords, saveActionState, saveRecord } from "./utils/storage";

export default function App() {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(() => calculateFootprint(defaultFormValues));
  const [records, setRecords] = useState(() => loadRecords());
  const [actionState, setActionState] = useState(() => loadActionState(ecoActions.length));

  const tips = useMemo(() => generateRecommendations(result.input, result), [result]);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextValue = event.target.type === "number" && Number(value) < 0 ? "0" : value;
    setFormValues((current) => ({ ...current, [name]: nextValue }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateCalculatorInput(formValues);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setResult(calculateFootprint(sanitizeCalculatorInput(formValues)));
  }

  function handleSaveRecord() {
    const savedAt = new Date();
    const record = {
      id: crypto.randomUUID(),
      date: savedAt.toISOString(),
      label: savedAt.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      total: result.total
    };
    setRecords(saveRecord(record));
  }

  function handleToggleAction(index) {
    const nextState = { ...actionState, [index]: !actionState[index] };
    setActionState(nextState);
    saveActionState(nextState);
  }

  return (
    <main className="min-h-screen">
      <header className="bg-forest-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wide text-forest-100">Carbon Footprint Awareness Platform</p>
          <div className="grid min-w-0 gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
            <div className="min-w-0">
              <h1 className="text-4xl font-black leading-tight sm:text-5xl">Carbon Compass</h1>
              <p className="mt-4 max-w-2xl break-words text-base leading-relaxed text-forest-100 sm:text-lg">
                Calculate, track, and reduce your footprint with simple personalized eco actions.
              </p>
            </div>
            <div className="min-w-0 rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-forest-100">Phase 1 scope</p>
              <p className="mt-2 max-w-full whitespace-normal text-xl font-bold leading-snug sm:text-2xl">
                <span className="block">Calculator + insights</span>
                <span className="block">Progress + checklist</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <Card title="Carbon footprint calculator" eyebrow="Step 1">
          <CalculatorForm values={formValues} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
        </Card>

        <Card title="Your result" eyebrow="Step 2">
          <ResultSummary result={result} />
        </Card>

        <Card title="Personalized insights" eyebrow="Step 3">
          <Insights tips={tips} />
        </Card>

        <Card title="Progress tracker" eyebrow="Step 4">
          <ProgressTracker records={records} onSave={handleSaveRecord} />
        </Card>

        <Card title="Eco action checklist" eyebrow="Step 5" className="lg:col-span-2">
          <ActionChecklist actions={ecoActions} state={actionState} onToggle={handleToggleAction} />
        </Card>
      </div>
    </main>
  );
}
