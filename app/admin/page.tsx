"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleSoldOut = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ sold_out: !currentStatus, stock: !currentStatus ? 0 : 10 })
      .eq('id', id);
    
    if (!error) {
      fetchProducts();
    } else {
      alert("Error updating product: " + error.message);
    }
  };

  const deleteProduct = async (id: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (!error) {
      setDeletingId(null);
      fetchProducts();
    } else {
      alert("Error deleting product: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-widest mb-2">Products Dashboard</h1>
          <p className="text-zinc-400 text-sm uppercase tracking-tighter">Manage your premium inventory.</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button 
            onClick={fetchProducts}
            className="p-3 bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors rounded-sm"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link 
            href="/admin/products/new" 
            className="flex items-center bg-white text-black font-bold uppercase tracking-widest px-6 py-3 hover:bg-zinc-200 transition-colors rounded-sm shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Drop
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Products</p>
          <p className="font-bebas text-4xl text-white tracking-wider">{products.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Sold Out</p>
          <p className="font-bebas text-4xl text-red-500 tracking-wider">{products.filter(p => p.sold_out).length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Featured</p>
          <p className="font-bebas text-4xl text-amber-500 tracking-wider">{products.filter(p => p.featured).length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm">
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Stock</p>
          <p className="font-bebas text-4xl text-green-500 tracking-wider">{products.reduce((acc, p) => acc + (p.stock || 0), 0)}</p>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800/50 text-zinc-500 text-[10px] uppercase tracking-[0.2em]">
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold">Stock</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-sm">
              {loading ? (
                 <tr>
                    <td colSpan={6} className="p-12 text-center text-zinc-500 font-bebas text-xl tracking-widest">Loading database...</td>
                 </tr>
              ) : products.length === 0 ? (
                <tr>
                   <td colSpan={6} className="p-12 text-center text-zinc-500">No products found.</td>
                </tr>
              ) : products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-12 bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0">
                         <img src={product.image_url} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-400 capitalize">{product.category}</td>
                  <td className="p-4 text-zinc-300">₹{product.price}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${product.stock > 10 ? 'bg-green-900/30 text-green-400' : product.stock > 0 ? 'bg-amber-900/30 text-amber-400' : 'bg-red-900/30 text-red-400'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-4">
                    {product.sold_out ? (
                      <span className="flex items-center text-red-500 text-[10px] font-bold uppercase tracking-widest">
                        <XCircle className="w-3 h-3 mr-1" /> Sold Out
                      </span>
                    ) : (
                      <span className="flex items-center text-green-500 text-[10px] font-bold uppercase tracking-widest">
                        <CheckCircle className="w-3 h-3 mr-1" /> Available
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => toggleSoldOut(product.id, product.sold_out)}
                        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm transition-colors ${product.sold_out ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-900/50'}`}
                      >
                        {product.sold_out ? 'Enable' : 'Sold Out'}
                      </button>
                      {deletingId === product.id ? (
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="px-2 py-1.5 text-[10px] font-bold text-white bg-red-600 hover:bg-red-700 rounded-sm transition-colors uppercase tracking-wider"
                          >
                            Confirm Delete
                          </button>
                          <button 
                            onClick={() => setDeletingId(null)}
                            className="px-2 py-1.5 text-[10px] font-bold text-zinc-400 bg-zinc-800 hover:text-white rounded-sm transition-colors uppercase tracking-wider"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setDeletingId(product.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 bg-red-900/20 rounded-sm transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
