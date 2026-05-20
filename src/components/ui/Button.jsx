import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const base =
    "px-5 py-2 rounded-2xl text-sm font-semibold shadow-soft transition disabled:opacity-50";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
