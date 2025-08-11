'use client'

import { FormEvent, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import BackButton from '@/components/BackButton'

export default function NewSalePage() {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
  })
  const [products, setProducts] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Cargar productos del localStorage
    const savedProducts = JSON.parse(localStorage.getItem('products') || '[]')
    setProducts(savedProducts)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      // Encontrar el producto seleccionado
      const product = products.find(p => p.id.toString() === formData.productId)
      if (!product) {
        alert('Por favor selecciona un producto válido')
        return
      }

      // Verificar stock
      if (parseInt(formData.quantity) > product.stock) {
        alert('No hay suficiente stock disponible')
        return
      }

      // Actualizar el stock del producto
      const updatedProducts = products.map(p => {
        if (p.id.toString() === formData.productId) {
          return {
            ...p,
            stock: p.stock - parseInt(formData.quantity)
          }
        }
        return p
      })
      localStorage.setItem('products', JSON.stringify(updatedProducts))

      // Crear la venta
      const sales = JSON.parse(localStorage.getItem('sales') || '[]')
      const newSale = {
        id: Date.now(),
        productId: formData.productId,
        productName: product.name,
        quantity: parseInt(formData.quantity),
        price: product.price,
        sellerEmail: localStorage.getItem('userEmail'),
        createdAt: new Date().toISOString()
      }
      sales.push(newSale)
      localStorage.setItem('sales', JSON.stringify(sales))

      router.push('/sales')
    } catch (error) {
      console.error('Error al registrar la venta:', error)
      alert('Error al registrar la venta')
    }
  }

  return (
    <div className="p-6">
      <BackButton href="/sales" label="Volver a Ventas" />
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Nueva Venta</h1>

      <div className="max-w-2xl bg-white p-6 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
              Producto
            </label>
            <select
              id="productId"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.productId}
              onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
            >
              <option value="">Seleccionar producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} - ${product.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              required
              min="1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
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
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Registrar Venta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
