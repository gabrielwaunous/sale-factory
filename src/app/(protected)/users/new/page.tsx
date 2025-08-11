'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'

export default function NewUserPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller', // Por defecto será vendedor
  })
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // Obtener usuarios existentes
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      
      // Verificar si el email ya existe
      if (users.some(user => user.email === formData.email)) {
        alert('Ya existe un usuario con este email')
        return
      }

      // Agregar el nuevo usuario
      const newUser = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      users.push(newUser)
      
      // Guardar en localStorage
      localStorage.setItem('users', JSON.stringify(users))
      
      // Redirigir a la lista de usuarios
      router.push('/users')
    } catch (error) {
      console.error('Error al guardar el usuario:', error)
      alert('Error al guardar el usuario')
    }
  }

  return (
    <div className="p-6">
      <BackButton href="/users" label="Volver a Usuarios" />
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Nuevo Usuario</h1>

      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Rol
            </label>
            <select
              id="role"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="seller">Vendedor</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
