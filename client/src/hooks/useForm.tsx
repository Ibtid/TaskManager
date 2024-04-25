import { useState, ChangeEvent } from 'react';

interface FormData {
  title: string;
  description: string;
  date: Date;
  // status: "not_started" | "complete";
}

interface FormErrors {
  title: string;
  description: string;
  date: string;
}

interface FormHook {
  formData: FormData;
  formErrors: FormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validateForm: () => boolean;
}

const useForm = (initialState: FormData): FormHook => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = { title: '', description: '', date: '' };

    if (formData.title.trim() === '' || formData.title.length > 12) {
      newErrors.title = 'Title is required and should be less than 12 characters';
      valid = false;
    }

    if (formData.description.trim() === '' || formData.description.length > 40) {
      newErrors.description = 'Description is required and should be less than 40 characters';
      valid = false;
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
      valid = false;
    }

    setFormErrors(newErrors);

    return valid;
  };

  return {
    formData,
    formErrors,
    handleChange,
    validateForm,
  };
};

export default useForm;