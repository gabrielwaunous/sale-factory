'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import BackButton from '@/components/BackButton'
import toast, { Toaster } from 'react-hot-toast'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  createdAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]')
    setProducts(storedProducts)
  }, [])

  const handleDelete = (id: number) => {
    if (confirm('¿Está seguro de eliminar este producto?')) {
      const updatedProducts = products.filter(product => product.id !== id)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setProducts(updatedProducts)
      toast.success('Producto eliminado exitosamente')
    }
  }

  return (
    <div className="p-6">
      <BackButton href="/dashboard" label="Volver al Dashboard" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Link
          href="/products/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Nuevo Producto
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
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td className="px-6 py-4" colSpan={5}>
                  <p className="text-gray-500 text-center">No hay productos registrados</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-gray-900">{product.description}</td>
                  <td className="px-6 py-4 text-gray-900">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <div className="flex space-x-2">
                      <Link
                        href={`/products/${product.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  )
}
