"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  X,
  Trash2,
  MessageCircle,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWSModal, setShowWSModal] = useState(false);
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useCart();
  const WHATSAPP_NUMBER = "5493446123456";

  const generateWSMessage = () => {
    const productList = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.title} - $${(Number(item.price) * item.quantity).toLocaleString("es-AR")}`,
      )
      .join("\n");

    return `NUEVO PEDIDO - MARUKIS 🧉\n\nHola! Me gustaría encargar la siguiente selección:\n\n${productList}\n\nTOTAL ESTIMADO: $${totalPrice.toLocaleString("es-AR")}\n\nPor favor, confírmenme disponibilidad para coordinar el pago y retiro.`;
  };

  const handleFinalSend = () => {
    const message = generateWSMessage();
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setShowWSModal(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* BOTÓN DISPARADOR */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center p-2 text-foreground/70 hover:text-primary transition-colors"
      >
        <ShoppingBag className="size-6" strokeWidth={2} />
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 size-5 bg-primary text-[9px] text-background flex items-center justify-center rounded-full font-semibold shadow-sm border-2 border-background"
            >
              {cart.reduce((acc, item) => acc + item.quantity, 0)}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* DRAWER Y MODAL */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-120 bg-black/60 backdrop-blur-sm min-h-screen"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md z-130 bg-background shadow-2xl flex flex-col"
            >
              {/* HEADER */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    Tu Selección
                  </span>
                  <h2 className="text-xl font-bold text-foreground">
                    Caja de Alfajores
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* LISTA */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/40">
                    <ShoppingBag className="size-16 mb-4 opacity-20" />
                    <p className="text-xs font-bold uppercase tracking-widest">
                      Tu caja está vacía
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 border border-border rounded-xl bg-card shadow-sm"
                    >
                      <div className="flex-1">
                        <span className="text-[9px] font-bold text-primary uppercase tracking-tighter">
                          {item.category}
                        </span>
                        <h4 className="text-sm font-bold leading-tight mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs font-medium text-muted-foreground">
                          ${Number(item.price).toLocaleString("es-AR")}
                        </p>
                      </div>

                      {/* CONTROLES DE CANTIDAD */}
                      <div className="flex flex-col items-end justify-between gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                        <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-background rounded-md transition-all disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-background rounded-md transition-all"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <div>
                          Total:
                          <b>
                            $
                            {(
                              item.quantity * Number(item.price)
                            ).toLocaleString("es-AR")}
                          </b>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              {cart.length > 0 && (
                <div className="p-6 bg-card border-t border-border space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-bold uppercase text-muted-foreground">
                      Total Estimado
                    </span>
                    <span className="text-2xl font-black text-foreground">
                      ${totalPrice.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <Button
                    onClick={() => setShowWSModal(true)}
                    className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95"
                  >
                    Revisar Pedido
                    <MessageCircle className="size-5" />
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* MODAL SIMULADOR WHATSAPP */}
        {showWSModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-black/80  h-screen"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#e5ddd5] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
            >
              {/* Header WhatsApp */}
              <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                <div className="size-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  M
                </div>
                <div>
                  <h3 className="font-bold text-sm">Marukis Alfajores</h3>
                  <p className="text-[10px] opacity-70">En línea ahora</p>
                </div>
              </div>

              {/* Cuerpo del Chat */}
              <div className="p-4 space-y-4 min-h-50 flex flex-col justify-end">
                <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] self-start text-[11px] leading-relaxed">
                  ¡Hola! ¿Cómo estás? Contanos qué sabores te gustaría pedir hoy
                  🍪
                </div>
                <div className="bg-[#dcf8c6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] self-end text-[11px] whitespace-pre-wrap leading-relaxed relative">
                  {generateWSMessage()}
                  <span className="block text-[9px] text-right opacity-50 mt-1">
                    10:45 AM
                  </span>
                </div>
              </div>

              {/* Botones Acción */}
              <div className="p-4 bg-white/50 flex gap-2">
                <button
                  onClick={() => setShowWSModal(false)}
                  className="flex-1 py-3 text-xs font-bold uppercase text-muted-foreground hover:text-foreground transition-colors"
                >
                  Volver
                </button>
                <button
                  onClick={handleFinalSend}
                  className="flex-2 py-3 bg-[#25d366] text-white rounded-xl font-bold uppercase text-xs shadow-md hover:bg-[#1ebe57] flex items-center justify-center gap-2"
                >
                  <Check className="size-4" /> Enviar ahora
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
