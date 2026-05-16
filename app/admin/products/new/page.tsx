"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Check, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function NewDropPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: 2999,
    category: "club",
    description: "",
    stock: 10,
    featured: false,
    new_drop: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let finalImageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('product-images')
        .upload(fileName, imageFile);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message + "\nMake sure you created the 'product-images' bucket and made it public.");
        setIsSubmitting(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
        
      finalImageUrl = publicUrl;
    } else {
      alert("Please select an image file.");
      setIsSubmitting(false);
      return;
    }
    
    const { error } = await supabase
      .from('products')
      .insert([
        { 
          ...formData,
          image_url: finalImageUrl,
          price: Number(formData.price),
          stock: Number(formData.stock)
        }
      ]);

    if (!error) {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/admin');
      }, 1500);
    } else {
      alert("Error adding product: " + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/admin" className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors text-sm uppercase tracking-widest font-bold">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="mb-12">
        <h1 className="font-bebas text-5xl text-white tracking-widest mb-2">Publish New Drop</h1>
        <p className="text-zinc-500 text-sm uppercase tracking-tighter">Add a premium piece to your catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 shadow-2xl">
          <h2 className="text-white font-bebas text-2xl tracking-widest mb-8 flex items-center">
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs mr-4">01</span>
            Core Specifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Product Title</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-white transition-all"
                placeholder="e.g. REAL MADRID 24/25 HOME"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Price (INR)</label>
              <input 
                required
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-white transition-all font-mono"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Category</label>
              <select 
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-white transition-all appearance-none uppercase tracking-widest text-xs"
              >
                <option value="club">Club Jerseys</option>
                <option value="national">National Teams</option>
                <option value="retro">Retro Classics</option>
                <option value="player">Player Editions</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Product Image Upload</label>
              <div className="flex items-center gap-6">
                {imagePreview && (
                  <div className="w-24 h-24 bg-zinc-950 rounded-sm overflow-hidden flex-shrink-0 border border-zinc-800">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <label className="flex items-center justify-center w-full px-4 py-4 bg-zinc-950 border border-zinc-800 border-dashed hover:border-white hover:bg-zinc-900 transition-all cursor-pointer rounded-sm group">
                    <Upload className="w-5 h-5 mr-3 text-zinc-500 group-hover:text-white transition-colors" />
                    <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Select an image from your computer</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Product Narrative</label>
              <textarea 
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-white transition-all resize-none"
                placeholder="Describe the fabric, fit, and heritage..."
              />
            </div>
          </div>
        </div>

        {/* Inventory & Status */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-sm p-8 shadow-2xl">
          <h2 className="text-white font-bebas text-2xl tracking-widest mb-8 flex items-center">
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs mr-4">02</span>
            Inventory Control
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">Initial Stock</label>
              <input 
                required
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-sm px-4 py-4 text-white focus:outline-none focus:border-white transition-all font-mono"
              />
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <input 
                type="checkbox" 
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded-none bg-zinc-950 border-zinc-800 text-white focus:ring-0 accent-white"
              />
              <label htmlFor="featured" className="text-xs font-bold text-white uppercase tracking-widest cursor-pointer">
                Feature on Hero
              </label>
            </div>
            
            <div className="flex items-center space-x-4 pt-6">
              <input 
                type="checkbox" 
                id="new_drop"
                name="new_drop"
                checked={formData.new_drop}
                onChange={handleChange}
                className="w-5 h-5 rounded-none bg-zinc-950 border-zinc-800 text-white focus:ring-0 accent-white"
              />
              <label htmlFor="new_drop" className="text-xs font-bold text-white uppercase tracking-widest cursor-pointer">
                New Drop Tag
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-8">
          <button 
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`flex items-center px-12 py-5 font-bold uppercase tracking-[0.3em] transition-all rounded-sm shadow-2xl ${
              isSuccess 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-black hover:bg-zinc-200 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <RefreshCwIcon className="w-5 h-5 mr-3 animate-spin" />
            ) : isSuccess ? (
              <>
                <Check className="w-5 h-5 mr-3" />
                Live Now
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-3" />
                Publish to Store
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

function RefreshCwIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
