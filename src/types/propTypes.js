import PropTypes from "prop-types";

export const actionStateShape = PropTypes.objectOf(PropTypes.bool);

export const breakdownItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
});

export const calculatorErrorsShape = PropTypes.objectOf(PropTypes.string);

export const calculatorValuesShape = PropTypes.shape({
  dietType: PropTypes.string.isRequired,
  electricityKwh: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  recyclingHabit: PropTypes.string.isRequired,
  transportMode: PropTypes.string.isRequired,
  travelKm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
});

export const recordShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired
});
