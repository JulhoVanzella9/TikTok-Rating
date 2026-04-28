"use client";

import { useState, useEffect } from "react";

export default function VSLPage() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedBalance = localStorage.getItem("userBalance");
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold text-sm tracking-wider">SUPER VIP</span>
        </div>
        <div className="flex items-center gap-2 bg-zinc-800 rounded-full px-4 py-2">
          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
          <span className="text-green-400 font-bold">${balance.toFixed(2)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full space-y-8">
          {/* Trophy Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-1.17a3.001 3.001 0 01-5.66 0H8.83a3.001 3.001 0 01-5.66 0H2a2 2 0 110-4h1.17A3.001 3.001 0 015 5zm4 1a1 1 0 10-2 0 1 1 0 002 0zm6 0a1 1 0 10-2 0 1 1 0 002 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Congratulations Text */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Parabens! Voce foi selecionado!
            </h1>
            <p className="text-muted-foreground text-lg">
              Seu saldo atual e de <span className="text-green-400 font-bold">${balance.toFixed(2)}</span>
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="bg-zinc-900 rounded-2xl aspect-video flex items-center justify-center border border-border">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-muted-foreground">Video de apresentacao</p>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
            SACAR AGORA
          </button>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verificado</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
