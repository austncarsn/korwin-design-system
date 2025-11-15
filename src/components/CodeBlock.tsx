import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, Code2 } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = memo(function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative group"
    >
      {/* Header */}
      {(title || language) && (
        <div
          className="flex items-center justify-between px-5 py-3 border-b rounded-t-2xl"
          style={{
            backgroundColor: '#18181B',
            borderColor: '#27272A',
          }}
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" style={{ color: '#10B981' }} />
            {title && (
              <span className="label-sm" style={{ color: '#FAFAFA' }}>
                {title}
              </span>
            )}
            {!title && language && (
              <span
                className="caption px-2 py-0.5 rounded"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#10B981',
                }}
              >
                {language}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Code Container */}
      <div
        className={`relative overflow-hidden ${title || language ? 'rounded-b-2xl' : 'rounded-2xl'}`}
        style={{
          backgroundColor: '#18181B',
        }}
      >
        {/* Copy Button */}
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth backdrop-blur-sm"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="copied"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" style={{ color: 'var(--state-success)' }} />
                  <span className="caption" style={{ color: 'var(--state-success)' }}>
                    Copied!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="caption">Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto">
          <pre
            className="p-6 pr-24"
            style={{
              color: '#FAFAFA',
            }}
          >
            {showLineNumbers ? (
              <code className="code">
                {lines.map((line, index) => (
                  <div key={index} className="flex">
                    <span
                      className="select-none inline-block w-8 text-right mr-6 opacity-40"
                      style={{ color: '#FAFAFA' }}
                    >
                      {index + 1}
                    </span>
                    <span>{line}</span>
                  </div>
                ))}
              </code>
            ) : (
              <code className="code" style={{ color: '#FAFAFA' }}>{code}</code>
            )}
          </pre>
        </div>

        {/* Bottom gradient fade for long code */}
        {lines.length > 15 && (
          <div
            className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, #18181B, transparent)',
            }}
          />
        )}
      </div>
    </motion.div>
  );
});