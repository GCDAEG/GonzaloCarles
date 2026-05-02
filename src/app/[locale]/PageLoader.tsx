"use client";
import { usePageLoader } from "@/lib/hooks/usePageLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const loading = usePageLoader();

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
