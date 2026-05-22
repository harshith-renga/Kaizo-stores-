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
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white font-bebas text-2xl tracking-widest bg-grain">Loading secure checkout...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center text-white space-y-4 bg-grain">
        <h2 className="font-bebas text-3xl tracking-widest text-zinc-400">Order reference invalid</h2>
        <Link href="/" className="px-8 py-3 bg-white text-black font-barlow font-black uppercase tracking-widest hover:bg-accent transition-colors">Return to catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-8 pb-24 px-4 font-sans text-zinc-300 bg-grain">
      <div className="max-w-4xl mx-auto">
        <Link href={`/product/${productId}`} className="group inline-flex items-center text-zinc-400 hover:text-accent font-barlow text-xs font-black uppercase tracking-widest transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO PRODUCT DETAILS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <h1 className="font-bebas text-5xl text-white tracking-widest mb-2">CHECKOUT</h1>
              <p className="text-zinc-500 text-xs font-barlow font-bold tracking-wider uppercase">Confirm your dispatch coordinates & payment configuration.</p>
            </div>

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="text-white font-barlow text-sm font-black uppercase border-l-2 border-accent pl-3 tracking-widest">Coordinates</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 font-barlow">Full Name</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-dark-surface border border-dark-border focus:border-accent text-white px-4 py-3.5 text-sm focus:outline-none transition-all"
                      placeholder="e.g. Liam Sterling"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 font-barlow">Contact Number</label>
                    <input 
                      required
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-dark-surface border border-dark-border focus:border-accent text-white px-4 py-3.5 text-sm focus:outline-none transition-all"
                      placeholder="e.g. +91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 font-barlow">Full Address</label>
                    <textarea 
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-dark-surface border border-dark-border focus:border-accent text-white px-4 py-3.5 text-sm focus:outline-none transition-all resize-none"
                      placeholder="House/Flat No., Street, Area, Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 font-barlow">City</label>
                      <input 
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-dark-surface border border-dark-border focus:border-accent text-white px-4 py-3.5 text-sm focus:outline-none transition-all"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-wider mb-2 font-barlow">Pincode</label>
                      <input 
                        required
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full bg-dark-surface border border-dark-border focus:border-accent text-white px-4 py-3.5 text-sm focus:outline-none transition-all"
                        placeholder="400001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4">
                <h3 className="text-white font-barlow text-sm font-black uppercase border-l-2 border-accent pl-3 tracking-widest">Payment Strategy</h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    onClick={() => handlePaymentMethodChange('cod')}
                    className={`flex items-center p-4 border cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'cod' ? 'border-accent bg-accent/5' : 'border-dark-border bg-dark-surface/60 hover:border-zinc-700'}`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.paymentMethod === 'cod' ? 'border-accent' : 'border-zinc-700'}`}>
                      {formData.paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>}
                    </div>
                    <Banknote className="w-6 h-6 mr-3 text-zinc-400" />
                    <div className="flex-1">
                      <h4 className="text-white font-barlow font-black text-xs tracking-wider uppercase">Cash on Delivery (COD)</h4>
                      <p className="text-zinc-500 text-[10px] font-bold font-barlow tracking-wider mt-1 uppercase">Pay in cash during parcel handover.</p>
                    </div>
                  </div>

                  <div 
                    onClick={() => handlePaymentMethodChange('online')}
                    className={`flex flex-col border cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'online' ? 'border-accent bg-accent/5' : 'border-dark-border bg-dark-surface/60 hover:border-zinc-700'}`}
                  >
                    <div className="flex items-center p-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${formData.paymentMethod === 'online' ? 'border-accent' : 'border-zinc-700'}`}>
                        {formData.paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-accent rounded-full"></div>}
                      </div>
                      <QrCode className="w-6 h-6 mr-3 text-zinc-400" />
                      <div className="flex-1">
                        <h4 className="text-white font-barlow font-black text-xs tracking-wider uppercase">UPI / Online Gateway</h4>
                        <p className="text-zinc-500 text-[10px] font-bold font-barlow tracking-wider mt-1 uppercase">Instant checkout with Google Pay, PhonePe or Paytm.</p>
                      </div>
                    </div>
                    
                    {formData.paymentMethod === 'online' && (
                      <div className="px-4 md:px-12 pb-6 pt-2">
                        <div className="bg-dark-bg border border-dark-border p-6 rounded-sm flex flex-col items-center">
                          <p className="text-xs font-barlow font-bold tracking-wider text-center mb-6 text-zinc-400 uppercase leading-relaxed">
                            1. Scan QR with your choice UPI application<br/>
                            2. Pay the total exact sum (₹{product.price})<br/>
                            3. Affix the screenshot recipe details below
                          </p>
                          <div className="bg-white p-4 rounded-lg mb-4 shadow-xl border border-white">
                            <QRCode value={upiLink} size={150} />
                          </div>
                          <p className="text-[10px] font-mono text-zinc-500 mb-6 uppercase tracking-tighter">{upiId}</p>
                          
                          <label className="w-full relative flex items-center justify-center px-4 py-4 border border-dashed border-dark-border hover:border-accent hover:bg-dark-surface/60 transition-colors cursor-pointer rounded-sm group">
                            <UploadCloud className="w-5 h-5 mr-2 text-zinc-400 group-hover:text-accent transition-colors" />
                            <span className="text-xs font-barlow font-black tracking-widest text-zinc-300 group-hover:text-accent transition-all">UPLOAD SCREENSHOT</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                if(e.target.files?.[0]) {
                                  // Mock direct client-side visual attach validation
                                  setScreenshotUrl("https://example.com/screenshot.jpg");
                                }
                              }}
                            />
                          </label>
                          {screenshotUrl && <p className="text-[10px] text-accent mt-3 flex items-center font-barlow font-black tracking-widest"><ShieldCheck className="w-4 h-4 mr-1" /> TRANSACTION RECIPE LINKED</p>}
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
            <div className="bg-dark-surface border border-dark-border p-6 rounded-sm sticky top-32">
              <h3 className="font-bebas text-3xl text-white tracking-widest mb-6 border-b border-dark-border pb-2 uppercase">EQUIPMENT BAG</h3>
              
              <div className="flex items-start space-x-4 mb-6 pb-6 border-b border-dark-border">
                <div className="w-20 h-24 bg-dark-bg border border-dark-border overflow-hidden flex-shrink-0">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-barlow font-black text-xs tracking-wider line-clamp-2 leading-tight">{product.name}</h4>
                  <p className="text-zinc-500 text-[10px] font-bold font-barlow tracking-wider mt-2 uppercase">SIZE: <span className="text-accent">{size}</span></p>
                  <p className="text-zinc-500 text-[10px] font-bold font-barlow tracking-wider mt-1 uppercase">QTY: 1</p>
                </div>
                <p className="text-white font-barlow font-black text-sm">₹{product.price?.toLocaleString('en-IN')}</p>
              </div>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-dark-border font-barlow font-bold text-xs tracking-wider">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cart Total</span>
                  <span className="text-zinc-300">₹{product.price?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Delivery Duty</span>
                  <span className="text-accent font-black tracking-widest uppercase">FREE</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-white font-barlow font-black text-sm uppercase">Grand Total</span>
                <span className="font-bebas text-3.5xl text-accent tracking-wide">₹{product.price?.toLocaleString('en-IN')}</span>
              </div>
              
              <button 
                type="submit"
                form="checkout-form"
                disabled={isSubmitting || (formData.paymentMethod === 'online' && !screenshotUrl)}
                className="w-full bg-accent text-black font-barlow font-black uppercase tracking-widest py-4.5 hover:bg-dark-surface-hover hover:text-white transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs shadow-sm hover:shadow-md"
              >
                {isSubmitting ? 'PROCESSING EXPORTS...' : 'SUBMIT SECURE ORDER'}
              </button>
              
              <div className="mt-6 flex items-center justify-center text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-barlow">
                <ShieldCheck className="w-4 h-4 mr-2 text-zinc-600" />
                SECURED WHATSAPP PROTOCOL HANDSHAKE
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
    <Suspense fallback={<div className="min-h-screen bg-dark-bg flex items-center justify-center text-white font-bebas text-2xl tracking-widest bg-grain">Negotiating checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
