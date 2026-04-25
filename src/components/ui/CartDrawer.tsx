"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  X,
  Trash2,
  MessageCircle,
  Plus,
  Minus,
  Check,
  Truck,
  Store,
  ChevronLeft,
  ArrowRight,
  MapPin,
  FileText,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [showWSModal, setShowWSModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">(
    "pickup",
  );
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Configuración específica para Gromet Concordia
  const WHATSAPP_NUMBER = "5493454284625"; // Número de ejemplo de Concordia
  const DELIVERY_FEE = 1200;

  const finalTotal =
    deliveryType === "delivery" ? totalPrice + DELIVERY_FEE : totalPrice;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  useEffect(() => {
    const isOpenOrNo = () => {
      if (cart.length === 0 && isOpen) setIsOpen(false);
    };
    isOpenOrNo();
  }, [cart.length, isOpen]);

  const generateWSMessage = (): string => {
    const productList = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.title.toUpperCase()} ($${(Number(item.price) * item.quantity).toLocaleString("es-AR")})`,
      )
      .join("\n");

    const header = `🛍️ *NUEVO PEDIDO - GROMET TAKE AWAY*`;
    const deliveryInfo =
      deliveryType === "delivery"
        ? `🛵 *ENTREGA A DOMICILIO*\n📍 *DIRECCIÓN:* ${address}`
        : `🏪 *RETIRO EN LOCAL (Mitre y San Juan)*`;

    const notesInfo = notes ? `\n\n📝 *NOTAS:* ${notes}` : "";

    return `${header}\n\n${deliveryInfo}${notesInfo}\n\n*DETALLE DEL PEDIDO:*\n${productList}\n\n*SUBTOTAL:* $${totalPrice.toLocaleString("es-AR")}\n${deliveryType === "delivery" ? `*ENVÍO:* $${DELIVERY_FEE.toLocaleString("es-AR")}\n` : ""}*TOTAL FINAL: $${finalTotal.toLocaleString("es-AR")}*\n\n_(Enviado desde la Web de Gromet)_`;
  };

  const handleFinalSend = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(generateWSMessage())}`,
      "_blank",
    );
    setShowWSModal(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* --- BARRA FLOTANTE (TRIGGER) --- */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.div
            initial={{ y: 100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            exit={{ y: 100, x: "-50%" }}
            className="fixed bottom-6 left-1/2 w-[92%] max-w-md z-[500]"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary w-full h-18 px-6 flex items-center justify-between shadow-[0_20px_40px_rgba(230,57,70,0.3)]"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="size-6 text-white" />
                  <span className="absolute -top-2 -right-2 size-5 bg-white text-[var(--primary)] text-[11px] font-black rounded-full flex items-center justify-center border-2 border-[var(--primary)]">
                    {totalItems}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-none">
                    Mi Carrito
                  </p>
                  <p className="text-sm font-bold">Verificar pedido</p>
                </div>
              </div>
              <span className="text-xl font-black italic tracking-tighter">
                ${finalTotal.toLocaleString("es-AR")}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- DRAWER PRINCIPAL --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-[550] flex justify-center bg-[var(--background)]"
          >
            <div className="flex flex-col h-full w-full max-w-2xl lg:max-w-3xl">
              {/* Header Gromet Style */}
              <div className="px-6 py-6 flex items-center justify-between border-b border-[var(--border)] bg-white">
                <div className="flex items-center gap-2">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="p-2 -ml-2 text-[var(--primary)]"
                    >
                      <ChevronLeft size={28} strokeWidth={3} />
                    </button>
                  )}
                  <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                    {step === 1 ? "Tu Pedido" : "Envío"}
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="size-11 bg-[var(--background)] rounded-2xl flex items-center justify-center border border-[var(--border)] active:scale-90 transition-transform"
                >
                  <X
                    size={24}
                    className="text-[var(--muted)]"
                    strokeWidth={3}
                  />
                </button>
              </div>

              {/* Items / Forms Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--background)]">
                {step === 1 ? (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white p-4 rounded-[var(--radius)] border border-[var(--border)] shadow-sm flex gap-4 relative"
                      >
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-3 right-3 text-red-200 hover:text-[var(--primary)] transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="relative size-20 rounded-2xl overflow-hidden shrink-0 border border-[var(--border)]">
                          <Image
                            src={item.image || ""}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-1">
                          <h4 className="font-black italic uppercase text-[15px] leading-none pr-8 line-clamp-1 italic">
                            {item.title}
                          </h4>
                          <div className="flex items-center justify-between mt-auto">
                            <p className="text-[var(--primary)] font-black text-lg tracking-tighter italic">
                              $
                              {(
                                Number(item.price) * item.quantity
                              ).toLocaleString("es-AR")}
                            </p>

                            <div className="flex items-center gap-3 bg-[var(--background)] p-1 rounded-xl border border-[var(--border)]">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="size-8 flex items-center justify-center text-[var(--muted)] disabled:opacity-20"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              <span className="font-black text-sm w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="size-8 flex items-center justify-center bg-[var(--primary)] text-white rounded-lg shadow-md"
                              >
                                <Plus size={16} strokeWidth={3} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 pt-2">
                    {/* Selectores de entrega estilo App */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setDeliveryType("pickup")}
                        className={cn(
                          "flex flex-col items-center gap-3 py-6 rounded-[var(--radius)] border-2 transition-all",
                          deliveryType === "pickup"
                            ? "border-[var(--primary)] bg-red-50/50 text-[var(--primary)]"
                            : "border-[var(--border)] bg-white",
                        )}
                      >
                        <Store size={28} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase italic tracking-widest">
                          Retiro Local
                        </span>
                      </button>
                      <button
                        onClick={() => setDeliveryType("delivery")}
                        className={cn(
                          "flex flex-col items-center gap-3 py-6 rounded-[var(--radius)] border-2 transition-all",
                          deliveryType === "delivery"
                            ? "border-[var(--primary)] bg-red-50/50 text-[var(--primary)]"
                            : "border-[var(--border)] bg-white",
                        )}
                      >
                        <Truck size={28} strokeWidth={2.5} />
                        <span className="text-xs font-black uppercase italic tracking-widest">
                          Delivery
                        </span>
                      </button>
                    </div>

                    <div className="bg-white p-6 rounded-[var(--radius)] border border-[var(--border)] space-y-5 shadow-sm">
                      {deliveryType === "delivery" && (
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10px] font-black text-[var(--muted)] uppercase tracking-widest">
                            <MapPin
                              size={14}
                              className="text-[var(--primary)]"
                            />{" "}
                            Dirección en Concordia
                          </label>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ej: San Juan 450, Piso 2"
                            className="w-full p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl focus:border-[var(--primary)] outline-none font-bold text-sm"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] font-black text-[var(--muted)] uppercase tracking-widest">
                          <FileText
                            size={14}
                            className="text-[var(--primary)]"
                          />{" "}
                          Notas para la cocina
                        </label>
                        <textarea
                          rows={3}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Ej: Sin mayonesa, papas bien crocantes..."
                          className="w-full p-4 bg-[var(--background)] border border-[var(--border)] rounded-2xl focus:border-[var(--primary)] outline-none font-bold text-sm resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Total */}
              <div className="p-8 bg-white border-t-4 border-[var(--background)]">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-[var(--muted)] font-bold text-sm uppercase italic tracking-tighter">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString("es-AR")}</span>
                  </div>
                  {deliveryType === "delivery" && (
                    <div className="flex justify-between items-center text-[var(--accent)] font-bold text-sm uppercase italic tracking-tighter">
                      <span>Envío</span>
                      <span>${DELIVERY_FEE.toLocaleString("es-AR")}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
                    <span className="text-lg font-black uppercase italic tracking-tighter">
                      Total Final
                    </span>
                    <span className="text-3xl font-black text-[var(--card-foreground)] italic tracking-tighter">
                      ${finalTotal.toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    step === 1 ? setStep(2) : setShowWSModal(true)
                  }
                  disabled={deliveryType === "delivery" && !address.trim()}
                  className="btn-primary w-full h-16 text-lg uppercase italic tracking-tighter disabled:grayscale disabled:opacity-30"
                >
                  {step === 1
                    ? "Continuar con el pago"
                    : "Confirmar por WhatsApp"}
                  <ArrowRight size={22} strokeWidth={3} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PREVIEW WHATSAPP (MANTENIENDO TU LÓGICA) --- */}
      <AnimatePresence>
        {showWSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <div className="bg-[#075E54] p-6 text-white flex items-center gap-4">
                <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="font-black italic uppercase tracking-widest leading-none">
                    Gromet Take Away
                  </p>
                  <p className="text-[10px] font-bold opacity-75 uppercase mt-1 tracking-widest">
                    Listo para recibir
                  </p>
                </div>
              </div>
              <div className="bg-[#E5DDD5] p-6 min-h-[300px] flex items-end">
                <div className="bg-[#DCF8C6] p-4 rounded-2xl rounded-tr-none text-[13px] font-medium leading-relaxed shadow-sm border border-black/5 whitespace-pre-wrap">
                  {generateWSMessage()}
                </div>
              </div>
              <div className="p-6 flex gap-3 bg-white">
                <button
                  onClick={() => setShowWSModal(false)}
                  className="flex-1 py-4 text-xs font-black uppercase text-[var(--muted)] hover:bg-[var(--background)] rounded-2xl transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleFinalSend}
                  className="flex-[2] py-4 bg-[#25D366] text-white rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-200"
                >
                  <Check size={18} strokeWidth={4} /> ¡Enviar ahora!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
