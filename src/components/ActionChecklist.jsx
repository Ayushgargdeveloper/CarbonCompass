export default function ActionChecklist({ actions, state, onToggle }) {
  return (
    <ul className="grid gap-3">
      {actions.map((action, index) => (
        <li key={action} className="rounded-xl bg-forest-50 p-4">
          <label className="flex cursor-pointer items-start gap-3 font-medium text-forest-900">
            <input
              type="checkbox"
              checked={Boolean(state[index])}
              onChange={() => onToggle(index)}
              className="mt-1 h-5 w-5 accent-forest-700"
              aria-label={`Mark action completed: ${action}`}
            />
            <span className={state[index] ? "line-through decoration-2" : ""}>{action}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
