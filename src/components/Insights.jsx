import { memo } from "react";
import PropTypes from "prop-types";

function Insights({ tips }) {
  return (
    <ul className="grid gap-3">
      {tips.map((tip) => (
        <li key={tip} className="rounded-xl bg-forest-50 p-4 text-slate-700">
          {tip}
        </li>
      ))}
    </ul>
  );
}

Insights.propTypes = {
  tips: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default memo(Insights);
