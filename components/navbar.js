"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.jpg"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full border-2 border-orange-500 transition-transform duration-300 group-hover:scale-105"
            />
            <span className="ml-3 text-2xl font-bold text-orange-600 group-hover:text-orange-500 transition-colors">
              StartupIdeas
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {/* Permanent Form Button */}
            <Link href="/form">
              <button className="px-4 py-2 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-800 transition">
                Form
              </button>
            </Link>

            <SignedOut>
              <SignInButton mode="redirect">
                <button className="px-4 py-2 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-800 transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="redirect">
                <button className="px-4 py-2 rounded-lg font-semibold bg-white text-orange-600 border border-orange-600 hover:bg-orange-800 hover:text-white transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-orange-600 rounded-full transition hover:ring-orange-800",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-orange-600 text-3xl focus:outline-none"
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl shadow-lg border-t border-orange-200">
          <div className="flex flex-col items-center gap-4 py-6">
            {/* Permanent Form Button */}
            <Link href="/form" className="w-4/5">
              <button className="w-full px-4 py-2 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-800 transition">
                Form
              </button>
            </Link>

            <SignedOut>
              <SignInButton mode="redirect">
                <button className="w-4/5 px-4 py-2 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-800 transition">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="redirect">
                <button className="w-4/5 px-4 py-2 rounded-lg font-semibold bg-white text-orange-600 border border-orange-600 hover:bg-orange-800 hover:text-white transition">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-12 h-12 ring-2 ring-orange-600 rounded-full transition hover:ring-orange-800",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
