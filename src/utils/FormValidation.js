import React, { useState, useCallback } from 'react';

export function FormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsvalid] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage});

    setIsvalid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsvalid(newIsValid);
      },
      [setValues, setErrors, setIsvalid]
  );

  return {
    values,
    setValues,
    errors,
    isValid,
    setIsvalid,
    handleChange,
    resetForm
  };
}
