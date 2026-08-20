import { useCallback, useState } from 'react';

// Manejo comun de los formularios: valores, cambios y validacion nativa del navegador
export function useForm(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value, validationMessage } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: validationMessage }));
    setIsValid(event.target.closest('form').checkValidity());
  }, []);

  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setIsValid(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, isValid, setValues, handleChange, reset };
}

export default useForm;
