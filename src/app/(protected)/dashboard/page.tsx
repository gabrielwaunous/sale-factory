'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  stock: number
  price: number
}

interface Sale {
  id: number
  productName: string
  quantity: number
  price: number
  createdAt: string
}

export default function DashboardPage() {
  const [sales, setSales] = useState<any[]>([])
  const [lowStockProducts, setLowStockProducts] = useState<any[]>([])
  const LOW_STOCK_THRESHOLD = 10 // Definimos que bajo stock es menos de 10 unidades

  useEffect(() => {
    const userRole = localStorage.getItem('userRole')
    const userEmail = localStorage.getItem('userEmail')
    
    // Cargar ventas
    const savedSales = JSON.parse(localStorage.getItem('sales') || '[]')
    // Filtrar ventas según el rol
    const filteredSales = userRole === 'seller' 
      ? savedSales.filter((sale: any) => sale.sellerEmail === userEmail)
      : savedSales
    
    // Ordenar por fecha descendente y tomar las últimas 5
    const recentSales = [...filteredSales]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
    setSales(recentSales)

    // Cargar productos con bajo stock
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    const lowStock = products.filter(product => product.stock < LOW_STOCK_THRESHOLD)
    setLowStockProducts(lowStock)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Panel de Control
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Ventas Recientes</h2>
          <div className="space-y-3">
            {sales.length === 0 ? (
              <p className="text-gray-500">No hay ventas recientes</p>
            ) : (
              <div className="space-y-3">
                {sales.map(sale => (
                  <div key={sale.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800">{sale.productName}</span>
                      <span className="text-green-600 font-bold">${(sale.price * sale.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        Cantidad: {sale.quantity}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-500">{new Date(sale.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Stock Bajo</h2>
          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-gray-500">No hay productos con stock bajo</p>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.map(product => (
                  <div key={product.id} className="border-b pb-3 last:border-b-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-gray-800">{product.name}</span>
                      <span className="text-red-600 font-bold flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {product.stock} unidades
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        Precio: ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Acciones Rápidas</h2>
          <div className="space-y-4">
            <Link 
              href="/products/new" 
              className="block w-full text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Agregar Producto
            </Link>
            <Link 
              href="/sales/new" 
              className="block w-full text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Nueva Venta
            </Link>
            <Link 
              href="/users" 
              className="block w-full text-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Gestionar Usuarios
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
