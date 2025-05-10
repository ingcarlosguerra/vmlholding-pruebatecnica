
'use client'
import React, { useState } from 'react';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir o mostrar mensaje de éxito
        alert('Usuario registrado con éxito');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Crear Cuenta</h2>

      {errorMessage && (
        <div className="mb-4 text-red-500">{errorMessage}</div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingresa tu nombre"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingresa tu correo"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contraseña</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-500"
      >
        Registrarse
      </button>
    </form>
  );
};

export default RegisterForm;
