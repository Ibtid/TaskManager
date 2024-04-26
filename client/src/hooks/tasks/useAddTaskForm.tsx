import { useState, ChangeEvent } from 'react';

export interface AddTaskFormData {
  title: string;
  description: string;
  date: Date|null;
  // status: "not_started" | "complete";
}

export interface AddTaskFormErrors {
  title: string;
  description: string;
  date: string;
}

export interface AddTaskFormHook {
  addTaskFormData: AddTaskFormData;
  addTaskFormErrors: AddTaskFormErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  validateForm: () => boolean;
}

const useAddTaskForm = (initialState: AddTaskFormData): AddTaskFormHook => {
  const [addTaskFormData, setaddTaskFormData] = useState<AddTaskFormData>(initialState);
  const [addTaskFormErrors, setAddTaskFormErrors] = useState<AddTaskFormErrors>({
    title: '',
    description: '',
    date: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setaddTaskFormData({
      ...addTaskFormData,
      [name]: value,
    });
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: AddTaskFormErrors = { title: '', description: '', date: '' };

    if (addTaskFormData.title.trim() === '' || addTaskFormData.title.length > 12) {
      newErrors.title = 'Title is required and should be less than 12 characters';
      valid = false;
    }

    if (addTaskFormData.description.trim() === '' || addTaskFormData.description.length > 40) {
      newErrors.description = 'Description is required and should be less than 40 characters';
      valid = false;
    }

    if (!addTaskFormData.date) {
      newErrors.date = 'Please select a date';
      valid = false;
    }

    setAddTaskFormErrors(newErrors);

    return valid;
  };

  return {
    addTaskFormData,
    addTaskFormErrors,
    handleChange,
    validateForm,
  };
};

export default useAddTaskForm;