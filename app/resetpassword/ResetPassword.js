"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  token: Yup.string().required("El token es requerido"),
  newPassword: Yup.string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

function ResetPasswordPage() {
  const searchParams = useSearchParams(); 
  const myParam = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const initialValues = { token: myParam, newPassword: "" };

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

    try {
      const response = await fetch(`${apiUrl}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error';
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Contraseña restablecida:', data);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-blue-300">
      <div className="w-full max-w-xs">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold mb-8">Restablecer Contraseña</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="bg-blue-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-blue-800 text-sm font-bold mb-2"
                  htmlFor="token"
                >
                  Token
                </label>
                <Field
                  name="token"
                  type="text"
                  placeholder="Ingrese su token"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-blue-600 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.token && touched.token ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="token"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-blue-800 text-sm font-bold mb-2"
                  htmlFor="newPassword"
                >
                  Nueva Contraseña
                </label>
                <Field
                  name="newPassword"
                  type="newPassword"
                  placeholder="Ingrese nueva contraseña"
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-blue-600 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.newPassword && touched.newPassword ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="newPassword"
                  component="p"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mt-4">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
                </button>
              </div>

              {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
              {success && <p className="text-green-500 text-xs italic mt-2">¡Contraseña restablecida con éxito!</p>}

              <div className="flex items-center justify-between mt-4">
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-700"
                  href="login"
                >
                  Inicia sesión
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
