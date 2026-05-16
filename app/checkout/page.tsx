"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, QrCode, UploadCloud, Banknote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import QRCode from "react-qr-code";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const size = searchParams.get("size") || "M";
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod" // 'cod' or 'online'
  });
  
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const upiId = process.env.NEXT_PUBLIC_UPI_ID || "harshithmanu13-3@okhdfcbank";
  const upiLink = `upi://pay?pa=${upiId}&pn=KAIZO%20STORE&am=${product?.price || 0}&cu=INR`;

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
        
        if (!error && data) {
          setProduct(data);
        }
        setLoading(false);
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct WhatsApp Message
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9442282342";
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    const paymentStatusText = formData.paymentMethod === 'cod' 
      ? 'CASH ON DELIVERY 💵' 
      : 'ONLINE PAYMENT COMPLETED ✅';
      
    let message = `*NEW KAIZO STORE ORDER* 🛍️\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${formData.fullName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n\n`;
    
    message += `*Order Details*\n`;
    message += `Item: ${product?.name}\n`;
    message += `Size: ${size}\n`;
    message += `Price: ₹${product?.price}\n`;
    message += `Payment: ${paymentStatusText}\n`;
    
    if (formData.paymentMethod === 'online' && screenshotUrl) {
      message += `Payment Screenshot: ${screenshotUrl}\n`;
    }
    
    const storeOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    message += `\nImage: ${storeOrigin}/image/${product?.id}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  if (loading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white font-bebas text-2xl tracking-widest">Loading checkout...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white space-y-4">
        <h2 className="font-bebas text-3xl">Product not found.</h2>
        <Link href="/" className="px-6 py-2 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-8 pb-24 px-4 font-sans text-zinc-300">
      <div className="max-w-4xl mx-auto">
        <Link href={`/product/${productId}`} className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Product
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Form Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <h1 className="font-bebas text-4xl text-white tracking-widest mb-2">Checkout</h1>
              <p className="text-zinc-400 text-sm">Please enter your details to complete the order.</p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="text-white font-medium text-lg border-b border-zinc-800 pb-2">Shipping Details</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Full Address</label>
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                      placeholder="House No, Street, Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">City</label>
                      <input 
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Pincode</label>
                      <input 
                        required
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-zinc-500 transition-colors"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4">
                <h3 className="text-white font-medium text-lg border-b border-zinc-800 pb-2">Payment Method</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    onClick={() => handlePaymentMethodChange('cod')}
                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-white bg-zinc-900/50' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.paymentMethod === 'cod' ? 'border-white' : 'border-zinc-600'}`}>
                      {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                    </div>
                    <Banknote className="w-6 h-6 mr-3 text-zinc-400" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">Cash on Delivery</h4>
                      <p className="text-xs text-zinc-500 mt-1">Pay when you receive the product.</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => handlePaymentMethodChange('online')}
                    className={`flex flex-col border rounded-sm cursor-pointer transition-all ${formData.paymentMethod === 'online' ? 'border-white bg-zinc-900/50' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}
                  >
                    <div className="flex items-center p-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.paymentMethod === 'online' ? 'border-white' : 'border-zinc-600'}`}>
                        {formData.paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                      </div>
                      <QrCode className="w-6 h-6 mr-3 text-zinc-400" />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">UPI / Online Payment</h4>
                        <p className="text-xs text-zinc-500 mt-1">Pay securely via Google Pay / PhonePe.</p>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'online' && (
                      <div className="px-4 md:px-12 pb-6 pt-2 animate-in slide-in-from-top-4 fade-in duration-300">
                        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-sm flex flex-col items-center">
                          <p className="text-sm text-center mb-6 text-zinc-300">
                            1. Scan the QR code below<br/>
                            2. Pay the exact amount (₹{product.price})<br/>
                            3. Upload the payment screenshot
                          </p>
                          <div className="bg-white p-4 rounded-xl mb-6 shadow-2xl">
                            <QRCode value={upiLink} size={180} />
                          </div>
                          <p className="text-xs font-mono text-zinc-500 mb-6 uppercase tracking-tighter">{upiId}</p>
                          
                          <label className="w-full relative flex items-center justify-center px-4 py-4 border border-dashed border-zinc-700 hover:border-white hover:bg-zinc-900 transition-colors cursor-pointer rounded-sm group">
                            <UploadCloud className="w-5 h-5 mr-2 text-zinc-400 group-hover:text-white transition-colors" />
                            <span className="text-sm font-medium text-white">Upload Screenshot</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                if(e.target.files?.[0]) {
                                  // In a real implementation, upload to Supabase Storage
                                  setScreenshotUrl("https://example.com/screenshot.jpg");
                                }
                              }}
                            />
                          </label>
                          {screenshotUrl && <p className="text-xs text-green-400 mt-3 flex items-center font-bold tracking-widest"><ShieldCheck className="w-4 h-4 mr-1" /> SCREENSHOT ATTACHED</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-sm sticky top-32">
              <h3 className="font-bebas text-2xl text-white tracking-widest mb-6 border-b border-zinc-800 pb-2">Order Summary</h3>
              
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-zinc-800">
                <div className="w-20 h-24 bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm leading-snug">{product.name}</h4>
                  <p className="text-zinc-500 text-sm mt-1 uppercase tracking-widest font-bold">Size: <span className="text-zinc-100">{size}</span></p>
                  <p className="text-zinc-500 text-sm mt-1">Qty: 1</p>
                </div>
                <p className="text-white font-medium">₹{product.price}</p>
              </div>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-800 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-white">₹{product.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="text-green-400 font-bold uppercase tracking-widest">FREE</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-white font-medium">Total</span>
                <span className="font-bebas text-3xl text-white tracking-wide">₹{product.price}</span>
              </div>
              
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || (formData.paymentMethod === 'online' && !screenshotUrl)}
                className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </button>
              
              <div className="mt-6 flex items-center justify-center text-xs text-zinc-500 uppercase tracking-widest font-bold">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Secure WhatsApp Checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white font-bebas text-2xl tracking-widest animate-pulse">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

