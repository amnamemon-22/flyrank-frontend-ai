import { useState } from "react";

const initialForm = {
  displayName: "",
  email: "",
  bio: "",
  emailNotifications: true,
};

function validateField(name, value) {
  switch (name) {
    case "displayName": {
      const trimmed = value.trim();
      if (!trimmed) return "Display name is required";
      if (trimmed.length < 2) return "Display name must be at least 2 characters";
      if (trimmed.length > 50) return "Display name must be 50 characters or less";
      return "";
    }
    case "email": {
      const trimmed = value.trim();
      if (!trimmed) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return "Enter a valid email address";
      }
      return "";
    }
    case "bio": {
      if (value.length > 200) return "Bio must be 200 characters or less";
      return "";
    }
    default:
      return "";
  }
}

function validateForm(values) {
  const errors = {};
  for (const key of ["displayName", "email", "bio"]) {
    const error = validateField(key, values[key]);
    if (error) errors[key] = error;
  }
  return errors;
}

function SettingsForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    const nextValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({ ...prev, [name]: nextValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValue) }));
    }
  }

  function handleBlur(event) {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  return (
    <div className="settings-form">
      <h2>Settings</h2>
      <p className="settings-form__subtitle">Update your profile and preferences.</p>

      {submitted ? (
        <p className="settings-form__success" role="status">
          Settings saved successfully.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} noValidate>
        <div className="settings-form__field">
          <label htmlFor="displayName">Display name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={form.displayName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.displayName)}
            aria-describedby={errors.displayName ? "displayName-error" : undefined}
          />
          {errors.displayName ? (
            <p id="displayName-error" className="settings-form__error" role="alert">
              {errors.displayName}
            </p>
          ) : null}
        </div>

        <div className="settings-form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className="settings-form__error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="settings-form__field">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.bio)}
            aria-describedby={errors.bio ? "bio-error" : undefined}
          />
          {errors.bio ? (
            <p id="bio-error" className="settings-form__error" role="alert">
              {errors.bio}
            </p>
          ) : null}
        </div>

        <div className="settings-form__field settings-form__field--checkbox">
          <label htmlFor="emailNotifications">
            <input
              id="emailNotifications"
              name="emailNotifications"
              type="checkbox"
              checked={form.emailNotifications}
              onChange={handleChange}
            />
            Receive email notifications
          </label>
        </div>

        <button type="submit" className="settings-form__submit">
          Save settings
        </button>
      </form>
    </div>
  );
}

export default SettingsForm;
