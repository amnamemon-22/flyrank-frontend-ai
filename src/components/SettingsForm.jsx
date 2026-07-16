import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validateField(name, value, allValues) {
  switch (name) {
    case "displayName":
      return value.trim() ? "" : "Display name is required.";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address.";
      return "";
    case "password":
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters.";
      return "";
    case "confirmPassword":
      if (!value) return "Please confirm your password.";
      if (value !== allValues.password) return "Passwords do not match.";
      return "";
    default:
      return "";
  }
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const showError = (field) => touched[field] && errors[field];

  const updateErrors = (field, value, allValues) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value, allValues),
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);

    if (touched[name]) {
      updateErrors(name, value, nextValues);
    }

    if (name === "password" && touched.confirmPassword) {
      updateErrors("confirmPassword", nextValues.confirmPassword, nextValues);
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setTouched((prev) => ({ ...prev, [name]: true }));
    updateErrors(name, value, values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const allTouched = Object.keys(INITIAL_VALUES).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    const nextErrors = Object.keys(INITIAL_VALUES).reduce((acc, key) => {
      const error = validateField(key, values[key], values);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      // Form is valid — ready to submit to an API.
    }
  };

  return (
    <div className="settings-form">
      <h2>Account Settings</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="displayName">Display Name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={values.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("displayName") ? "true" : "false"}
            aria-describedby={showError("displayName") ? "displayName-error" : undefined}
            autoComplete="name"
          />
          {showError("displayName") && (
            <span id="displayName-error" className="field-error" role="alert">
              {errors.displayName}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("email") ? "true" : "false"}
            aria-describedby={showError("email") ? "email-error" : undefined}
            autoComplete="email"
          />
          {showError("email") && (
            <span id="email-error" className="field-error" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("password") ? "true" : "false"}
            aria-describedby={showError("password") ? "password-error" : undefined}
            autoComplete="new-password"
          />
          {showError("password") && (
            <span id="password-error" className="field-error" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError("confirmPassword") ? "true" : "false"}
            aria-describedby={
              showError("confirmPassword") ? "confirmPassword-error" : undefined
            }
            autoComplete="new-password"
          />
          {showError("confirmPassword") && (
            <span id="confirmPassword-error" className="field-error" role="alert">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}

export default SettingsForm;
