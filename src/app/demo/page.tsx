'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="min-h-screen bg-[#e8e8ed] flex flex-col items-center justify-center gap-16 p-8">
      <h1 className="text-2xl font-medium text-gray-600">Glass Button Demo</h1>

      {/* Button States Display */}
      <div className="flex flex-wrap gap-12 items-start justify-center">
        {/* Primary State */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm text-purple-500 font-medium">Variant 1 · Primary</span>
          <button className="glass-button">
            PathFinder
          </button>
        </div>

        {/* Hover State (shown as static) */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm text-purple-500 font-medium">Hover</span>
          <button className="glass-button glass-button-hover">
            PathFinder
          </button>
        </div>
      </div>

      {/* Pressed State */}
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm text-purple-500 font-medium">Hover · Pressed</span>
        <button className="glass-button glass-button-pressed">
          PathFinder
        </button>
      </div>

      {/* Interactive Demo */}
      <div className="flex flex-col items-center gap-4 mt-8">
        <span className="text-sm text-gray-500 font-medium">Interactive Demo (try hovering and clicking)</span>
        <button
          className="glass-button-interactive"
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
        >
          Start Assessment
        </button>
      </div>

      {/* Different Sizes */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <span className="text-sm text-gray-500 font-medium">Size Variants</span>
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <button className="glass-button-interactive text-sm px-6 py-3">
            Small
          </button>
          <button className="glass-button-interactive">
            Medium
          </button>
          <button className="glass-button-interactive text-xl px-12 py-5">
            Large
          </button>
        </div>
      </div>

      <style jsx>{`
        .glass-button {
          position: relative;
          padding: 16px 48px;
          font-size: 18px;
          font-weight: 500;
          color: #1d1d1f;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.9) 100%
          );
          border: none;
          border-radius: 100px;
          cursor: pointer;
          box-shadow:
            /* Outer shadow for depth */
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            /* Inner top shadow (dark) for 3D effect */
            inset 0 -4px 12px rgba(0, 0, 0, 0.06),
            /* Inner bottom highlight */
            inset 0 4px 12px rgba(255, 255, 255, 0.9),
            /* Subtle inner glow */
            inset 0 0 0 1px rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-button::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 100px;
          background: linear-gradient(
            180deg,
            rgba(180, 180, 190, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.4) 100%
          );
          pointer-events: none;
        }

        .glass-button::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-bottom-color: rgba(255, 255, 255, 0.9);
          pointer-events: none;
        }

        .glass-button-hover {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(255, 255, 255, 0.95) 100%
          );
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.1),
            inset 0 -2px 8px rgba(0, 0, 0, 0.04),
            inset 0 4px 16px rgba(255, 255, 255, 1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.7);
        }

        .glass-button-pressed {
          transform: translateY(2px);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.75) 50%,
            rgba(255, 255, 255, 0.85) 100%
          );
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.1),
            0 1px 4px rgba(0, 0, 0, 0.08),
            inset 0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 -2px 8px rgba(255, 255, 255, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.4);
        }

        /* Interactive version with all states */
        .glass-button-interactive {
          position: relative;
          padding: 16px 48px;
          font-size: 18px;
          font-weight: 500;
          color: #1d1d1f;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.9) 100%
          );
          border: none;
          border-radius: 100px;
          cursor: pointer;
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 -4px 12px rgba(0, 0, 0, 0.06),
            inset 0 4px 12px rgba(255, 255, 255, 0.9),
            inset 0 0 0 1px rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-button-interactive::before {
          content: '';
          position: absolute;
          inset: 1px;
          border-radius: 100px;
          background: linear-gradient(
            180deg,
            rgba(180, 180, 190, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.4) 100%
          );
          pointer-events: none;
          transition: all 0.2s ease;
        }

        .glass-button-interactive::after {
          content: '';
          position: absolute;
          inset: 2px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-bottom-color: rgba(255, 255, 255, 0.9);
          pointer-events: none;
        }

        .glass-button-interactive:hover {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(255, 255, 255, 0.85) 50%,
            rgba(255, 255, 255, 0.95) 100%
          );
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.1),
            inset 0 -2px 8px rgba(0, 0, 0, 0.04),
            inset 0 4px 16px rgba(255, 255, 255, 1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.7);
        }

        .glass-button-interactive:active {
          transform: translateY(2px);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.75) 50%,
            rgba(255, 255, 255, 0.85) 100%
          );
          box-shadow:
            0 4px 16px rgba(0, 0, 0, 0.1),
            0 1px 4px rgba(0, 0, 0, 0.08),
            inset 0 2px 8px rgba(0, 0, 0, 0.08),
            inset 0 -2px 8px rgba(255, 255, 255, 0.6),
            inset 0 0 0 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
