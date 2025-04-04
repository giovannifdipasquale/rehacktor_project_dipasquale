import { useState } from "react";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import { useNavigate } from "react-router";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });
      if (error) {
        alert("Signing up error 👎🏻!");
      } else {
        alert("Signed up 👍🏻!");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };
  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-4 w-full max-w-md border border-gray-300 rounded-xl p-6 bg-white shadow-md"
      >
        <h1 className="text-2xl font-bold text-center">Register</h1>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={setField("email")}
            onBlur={onBlur("email")}
            aria-invalid={isInvalid("email")}
            required
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.email && (
            <small className="text-red-500 text-sm">{formErrors.email}</small>
          )}
        </div>

        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formState.firstName}
            onChange={setField("firstName")}
            onBlur={onBlur("firstName")}
            aria-invalid={isInvalid("firstName")}
            required
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.firstName && (
            <small className="text-red-500 text-sm">
              {formErrors.firstName}
            </small>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formState.lastName}
            onChange={setField("lastName")}
            onBlur={onBlur("lastName")}
            aria-invalid={isInvalid("lastName")}
            required
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.lastName && (
            <small className="text-red-500 text-sm">
              {formErrors.lastName}
            </small>
          )}
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formState.username}
            onChange={setField("username")}
            onBlur={onBlur("username")}
            aria-invalid={isInvalid("username")}
            required
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.username && (
            <small className="text-red-500 text-sm">
              {formErrors.username}
            </small>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={setField("password")}
            onBlur={onBlur("password")}
            aria-invalid={isInvalid("password")}
            required
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.password && (
            <small className="text-red-500 text-sm">
              {formErrors.password}
            </small>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
