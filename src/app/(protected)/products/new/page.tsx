'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import BackButton from '@/components/BackButton'

export default function NewProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Aquí simularemos el guardado del producto
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Guardamos en localStorage por ahora
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      products.push({
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        createdAt: new Date().toISOString()
      })
      localStorage.setItem('products', JSON.stringify(products))
      
      toast.success('Producto guardado exitosamente')
      router.push('/products')
    } catch (error) {
      toast.error('Error al guardar el producto')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <BackButton href="/products" label="Volver a Productos" />
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Nuevo Producto</h1>

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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="description"
              rows={3}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Precio
              </label>
              <input
                type="number"
                id="price"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                id="stock"
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
