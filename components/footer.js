"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    // ✅ Safe client-side rendering of year
    setYear(new Date().getFullYear());
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-orange-500 py-8"
    >
      <div className="max-w-9xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="StartupIdeas Logo"
            width={50}
            height={50}
            className="rounded-full border-2 border-orange-500"
          />
          <span className="text-xl font-bold">StartupIdeas</span>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <p className="text-sm">📧 sanyamcsekuk@gmail.com</p>
          <p className="text-sm">📞 9993478912</p>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right text-sm">
          Copyright © {year || "2025"}{" "}
          <span className="font-semibold">StartupIdeas</span>
          <br className="md:hidden" /> All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
}
