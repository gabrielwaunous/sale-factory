'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'

interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
  })
  const router = useRouter()

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    const product = products.find((p: Product) => p.id === parseInt(params.id))
    if (product) {
      setFormData(product)
    } else {
      router.push('/products')
    }
  }, [params.id, router])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const updatedProducts = products.map((p: Product) =>
        p.id === formData.id ? formData : p
      )
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      router.push('/products')
    } catch (error) {
      console.error('Error al actualizar el producto:', error)
      alert('Error al actualizar el producto')
    }
  }

  return (
    <div className="p-6">
      <BackButton href="/products" label="Volver a Productos" />
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>

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
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
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
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              />
            </div>
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
