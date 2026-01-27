"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#171717',
          border: '1px solid #262626',
          color: '#ededed',
        },
        className: 'font-sans',
      }}
    />
  );
}
