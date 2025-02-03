import { useState } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((preValues)=>({
      ...preValues,
      [name]:value,
    }));
  };

  return { values, handleChange, setValues };
}