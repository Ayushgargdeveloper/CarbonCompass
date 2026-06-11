import { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { actionStateShape } from "../types/propTypes";

function ActionChecklist({ actions, state, onToggle }) {
  return (
    <ul className="grid gap-3">
      {actions.map((action, index) => (
        <ActionItem
          key={action}
          action={action}
          completed={Boolean(state[index])}
          index={index}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}

function ActionItem({ action, completed, index, onToggle }) {
  const handleChange = useCallback(() => {
    onToggle(index);
  }, [index, onToggle]);

  return (
    <li className="rounded-xl bg-forest-50 p-4">
      <label className="flex cursor-pointer items-start gap-3 font-medium text-forest-900">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleChange}
          className="mt-1 h-5 w-5 accent-forest-700"
          aria-label={`Mark action completed: ${action}`}
        />
        <span className={completed ? "line-through decoration-2" : ""}>{action}</span>
      </label>
    </li>
  );
}

ActionChecklist.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggle: PropTypes.func.isRequired,
  state: actionStateShape.isRequired
};

ActionItem.propTypes = {
  action: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default memo(ActionChecklist);
