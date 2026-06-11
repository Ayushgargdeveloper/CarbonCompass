import { useCallback, useMemo, useState } from "react";
import { defaultFormValues, ecoActions } from "../data/options";
import { loadActionState, loadRecords, saveActionState, saveRecord } from "../services/storageService";
import { calculateFootprint } from "../utils/carbon";
import { createFootprintRecord } from "../utils/records";
import { generateRecommendations } from "../utils/recommendations";
import { hasErrors, sanitizeCalculatorInput, validateCalculatorInput } from "../utils/validation";

export function useCarbonDashboard() {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(() => calculateFootprint(defaultFormValues));
  const [records, setRecords] = useState(() => loadRecords());
  const [actionState, setActionState] = useState(() => loadActionState(ecoActions.length));

  const tips = useMemo(() => generateRecommendations(result.input, result), [result]);

  const updateFormValue = useCallback((event) => {
    const { name, type, value } = event.target;
    const nextValue = type === "number" && Number(value) < 0 ? "0" : value;
    setFormValues((currentValues) => ({ ...currentValues, [name]: nextValue }));
  }, []);

  const submitCalculator = useCallback(
    (event) => {
      event.preventDefault();
      const nextErrors = validateCalculatorInput(formValues);
      setErrors(nextErrors);

      if (hasErrors(nextErrors)) {
        return;
      }

      setResult(calculateFootprint(sanitizeCalculatorInput(formValues)));
    },
    [formValues]
  );

  const saveCurrentRecord = useCallback(() => {
    setRecords(saveRecord(createFootprintRecord(result.total)));
  }, [result.total]);

  const toggleAction = useCallback((index) => {
    setActionState((currentState) => {
      const nextState = { ...currentState, [index]: !currentState[index] };
      saveActionState(nextState);
      return nextState;
    });
  }, []);

  return {
    actionState,
    errors,
    formValues,
    records,
    result,
    tips,
    saveCurrentRecord,
    submitCalculator,
    toggleAction,
    updateFormValue
  };
}
