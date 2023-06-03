import { useState } from "react";

const useInput = (initialValue) => {
    const [formData, setFormData] = useState(initialValue);

    function handleInputChange(event) {
        event.preventDefault();

        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    }

    return {
        formData,
        handleInputChange,
    };
};

export default useInput;
