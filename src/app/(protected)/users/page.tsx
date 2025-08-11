'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

interface User {
  id: number
  name: string
  email: string
  role?: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Cargar usuarios del localStorage
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    setUsers(savedUsers)
  }, [])

  return (
    <div className="p-6">
      <BackButton href="/dashboard" label="Volver al Dashboard" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuarios</h1>
        <Link
          href="/users/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Nuevo Usuario
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-900">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {user.role === 'admin' ? 'Administrador' : 'Vendedor'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-4">
                      <Link
                        href={`/users/${user.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Editar
                      </Link>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          if (confirm('¿Estás seguro de eliminar este usuario?')) {
                            const updatedUsers = users.filter(u => u.id !== user.id)
                            localStorage.setItem('users', JSON.stringify(updatedUsers))
                            setUsers(updatedUsers)
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
