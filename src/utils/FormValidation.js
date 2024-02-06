import React, { useState, useCallback } from 'react';

export function FormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});

    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
  );

  return {
    values,
    setValues,
    errors,
    setErrors,
    isValid,
    setIsValid,
    handleChange,
    resetForm
  };
}
