import { dietTypes, recyclingHabits, transportModes } from "../data/options";

export default function CalculatorForm({ values, errors, onChange, onSubmit }) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <div>
        <label className="font-semibold text-forest-900" htmlFor="electricityKwh">
          Monthly electricity usage in kWh
        </label>
        <input
          id="electricityKwh"
          name="electricityKwh"
          type="number"
          min="0"
          inputMode="decimal"
          value={values.electricityKwh}
          onChange={onChange}
          aria-invalid={Boolean(errors.electricityKwh)}
          aria-describedby={errors.electricityKwh ? "electricity-error" : undefined}
          className="mt-2 w-full rounded-xl border border-forest-100 px-4 py-3"
        />
        {errors.electricityKwh ? (
          <p id="electricity-error" className="mt-1 text-sm font-medium text-red-700">
            {errors.electricityKwh}
          </p>
        ) : null}
      </div>

      <div>
        <label className="font-semibold text-forest-900" htmlFor="travelKm">
          Weekly travel distance in km
        </label>
        <input
          id="travelKm"
          name="travelKm"
          type="number"
          min="0"
          inputMode="decimal"
          value={values.travelKm}
          onChange={onChange}
          aria-invalid={Boolean(errors.travelKm)}
          aria-describedby={errors.travelKm ? "travel-error" : undefined}
          className="mt-2 w-full rounded-xl border border-forest-100 px-4 py-3"
        />
        {errors.travelKm ? (
          <p id="travel-error" className="mt-1 text-sm font-medium text-red-700">
            {errors.travelKm}
          </p>
        ) : null}
      </div>

      <SelectField label="Transport mode" name="transportMode" value={values.transportMode} options={transportModes} onChange={onChange} error={errors.transportMode} />
      <SelectField label="Diet type" name="dietType" value={values.dietType} options={dietTypes} onChange={onChange} error={errors.dietType} />
      <SelectField label="Recycling habit" name="recyclingHabit" value={values.recyclingHabit} options={recyclingHabits} onChange={onChange} error={errors.recyclingHabit} />

      <button
        type="submit"
        className="rounded-xl bg-forest-700 px-5 py-3 font-bold text-white transition hover:bg-forest-900"
      >
        Calculate footprint
      </button>
    </form>
  );
}

function SelectField({ label, name, value, options, onChange, error }) {
  return (
    <div>
      <label className="font-semibold text-forest-900" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className="mt-2 w-full rounded-xl border border-forest-100 bg-white px-4 py-3"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${name}-error`} className="mt-1 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
