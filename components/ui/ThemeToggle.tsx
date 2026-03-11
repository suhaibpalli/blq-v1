"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-(--color-border-strong) bg-(--color-bg-2) hover:bg-(--color-surface) transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          animate={{
            y: theme === "dark" ? 0 : -25,
            opacity: theme === "dark" ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={18} className="text-(--color-ink)" />
        </motion.div>
        <motion.div
          animate={{
            y: theme === "light" ? 0 : 25,
            opacity: theme === "light" ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={18} className="text-(--color-cyan)" />
        </motion.div>
      </div>
    </motion.button>
  );
}
