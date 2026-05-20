import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export default function Input({ className, label, ...props }) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <motion.input
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 transition shadow-sm",
          className,
        )}
        {...props}
      />
    </div>
  );
}
