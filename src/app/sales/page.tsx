'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import BackButton from '@/components/BackButton'

export default function SalesPage() {
  const [sales, setSales] = useState<any[]>([])

  useEffect(() => {
    // Cargar ventas del localStorage
    const savedSales = JSON.parse(localStorage.getItem('sales') || '[]')
    setSales(savedSales)
  }, [])

  return (
    <div className="p-6">
      <BackButton href="/dashboard" label="Volver al Dashboard" />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ventas</h1>
        <Link
          href="/sales/new"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Nueva Venta
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sales.length === 0 ? (
              <tr>
                <td className="px-6 py-4" colSpan={5}>
                  <p className="text-gray-500 text-center">No hay ventas registradas</p>
                </td>
              </tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-6 py-4 text-gray-900">{sale.productName}</td>
                  <td className="px-6 py-4 text-gray-900">{sale.quantity}</td>
                  <td className="px-6 py-4 text-gray-900">${sale.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">${(sale.price * sale.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-900">{new Date(sale.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
