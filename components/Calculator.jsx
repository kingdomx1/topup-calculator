"use client";

import { useEffect, useState } from "react";

export default function Calculator() {
  const [rate, setRate] = useState("28.8"); // ❗ manual rate
  const [fxRate, setFxRate] = useState(0);   // ❗ API THB rate

  const [rows, setRows] = useState(
    Array.from({ length: 15 }, () => ({
      usd: "0.99",
      sell: "35",
    }))
  );

  const handleChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // 🔥 REAL TIME API (USD → THB ONLY)
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate.host/latest?base=USD&symbols=THB"
        );
        const data = await res.json();

        setFxRate(data.rates.THB);
      } catch (err) {
        console.log(err);
        setFxRate(35);
      }
    };

    fetchRate();
  }, []);

  const manualRate = parseFloat(rate) || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-500 bg-clip-text text-transparent">
          TOPUP CALCULATOR
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          RATE (manual) + THB (live API)
        </p>
      </div>

      {/* RATE MANUAL */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-col items-center">
          <span className="text-xs text-cyan-300 mb-1">
            MANUAL RATE (SELL COST)
          </span>
          <input
            className="w-28 bg-slate-800/60 text-cyan-300 text-center rounded-lg px-2 py-1 outline-none"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
      </div>

      {/* LIVE FX INFO */}
      <div className="text-center mb-6 text-emerald-400 text-sm">
        1 USD = {fxRate.toFixed(2)} THB (Live API)
      </div>

      {/* TABLE */}
      <div className="space-y-3">
        {rows.map((row, i) => {
          const usd = parseFloat(row.usd) || 0;
          const sell = parseFloat(row.sell) || 0;

          // ❗ COST ใช้ manual rate
          const cost = usd * manualRate;

          // ❗ THB ใช้ API rate (real market)
          const thb = usd * fxRate;

          const profit = sell - cost;

          return (
            <div
              key={i}
              className="flex flex-wrap items-center justify-center gap-4
              bg-slate-900/40 border border-purple-500/10 rounded-2xl
              px-5 py-4 backdrop-blur-xl"
            >

              {/* USD */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-cyan-400 mb-1">USD</span>

                <input
                  className="w-20 bg-slate-800/60 text-cyan-300 text-center rounded-lg px-2 py-1 outline-none"
                  value={row.usd}
                  onChange={(e) =>
                    handleChange(i, "usd", e.target.value)
                  }
                />

                {/* 🔥 REAL THB FROM API */}
                <span className="text-[11px] text-emerald-400 mt-1">
                  ≈ {thb.toFixed(2)} THB (live)
                </span>
              </div>

              <span className="text-fuchsia-400 font-bold">×</span>

              {/* RATE (manual only) */}
              <div className="flex flex-col items-center opacity-70">
                <span className="text-xs text-cyan-300 mb-1">RATE</span>
                <span className="text-cyan-300 font-semibold">
                  {manualRate}
                </span>
              </div>

              <span className="text-purple-400 font-bold">=</span>

              {/* COST */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-green-400 mb-1">COST</span>
                <span className="text-green-400 font-semibold min-w-[90px] text-center">
                  {cost.toFixed(2)}
                </span>
              </div>

              <span className="text-purple-400 font-bold">&gt;</span>

              {/* SELL */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-yellow-400 mb-1">SELL</span>

                <input
                  className="w-20 bg-slate-800/60 text-yellow-300 text-center rounded-lg px-2 py-1 outline-none"
                  value={row.sell}
                  onChange={(e) =>
                    handleChange(i, "sell", e.target.value)
                  }
                />
              </div>

              <span className="text-purple-400 font-bold">&gt;</span>

              {/* PROFIT */}
              <div className="flex flex-col items-center">
                <span className="text-xs text-pink-400 mb-1">PROFIT</span>

                <span
                  className={`font-semibold min-w-[90px] text-center ${
                    profit >= 0 ? "text-pink-400" : "text-red-400"
                  }`}
                >
                  {profit.toFixed(2)}
                </span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}