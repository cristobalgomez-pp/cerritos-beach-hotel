"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BOOKING_URL } from "@/lib/constants";

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-offwhite z-50 lg:hidden shadow-2xl"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="p-2 text-ocean" aria-label="Close menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="px-6 flex flex-col gap-1">
              {links.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <button
                      onClick={() => toggleExpand(link.label)}
                      className="w-full flex items-center justify-between py-3 text-ocean font-medium text-lg"
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          expandedItem === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedItem === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2 flex flex-col gap-1">
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="py-2 text-charcoal/70 hover:text-gold transition-colors"
                            >
                              All Rooms
                            </Link>
                            {link.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="py-2 text-charcoal/70 hover:text-gold transition-colors"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="py-3 text-ocean font-medium text-lg hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 bg-gold text-white text-center py-3 rounded font-semibold tracking-wider hover:bg-gold/90 transition-colors"
              >
                BOOK NOW
              </a>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
