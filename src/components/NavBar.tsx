'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const router = useRouter()

  const handleLogout = () => {
    // Eliminar el token o la sesión
    localStorage.removeItem('isAuthenticated')
    // Redireccionar al login
    router.push('/login')
  }

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="font-bold text-xl">
              Sale Factory
            </Link>
            <Link href="/products" className="hover:text-gray-300">
              Productos
            </Link>
            <Link href="/sales" className="hover:text-gray-300">
              Ventas
            </Link>
            <Link href="/users" className="hover:text-gray-300">
              Usuarios
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  )
}
