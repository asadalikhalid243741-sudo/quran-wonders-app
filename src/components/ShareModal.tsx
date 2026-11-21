import { useState } from 'react';
import { Check, Copy, Download, X } from 'lucide-react';
import type { Language, SharePayload } from '../types';
import type { UIStrings } from '../data/translations';

interface ShareModalProps {
  payload: SharePayload | null;
  language: Language;
  ui: UIStrings;
  onClose: () => void;
}

export function ShareModal({ payload, language, ui, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!payload) return null;

  const formattedShareText = `${payload.title}\n\n${payload.arabicText}\n\n${payload.explanation}\n\n— ${payload.surahLabel} (${payload.verseRef}) | ${ui.appTitle}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedShareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback copy via textarea
      const el = document.createElement('textarea');
      el.value = formattedShareText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    const width = 1080;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Deep Islamic Emerald manuscript background
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#072A20');
    grad.addColorStop(1, '#0C3D2E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Subtle double gold border frame
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
    ctx.lineWidth = 3;
    ctx.strokeRect(42, 42, width - 84, height - 84);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(56, 56, width - 112, height - 112);

    // Header label
    ctx.fillStyle = '#E5BE53';
    ctx.font = '600 26px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${payload.kindLabel} · ${payload.surahLabel} (${payload.verseRef})`, width / 2, 128);

    // Title
    ctx.fillStyle = '#F7F3E8';
    ctx.font = '600 40px "Cormorant Garamond", Georgia, serif';
    wrapText(ctx, payload.title, width / 2, 196, 860, 50);

    // Arabic verse
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '400 44px "Amiri", Georgia, serif';
    const nextY = wrapText(ctx, payload.arabicText, width / 2, 340, 880, 74);

    // Divider line
    ctx.strokeStyle = 'rgba(229, 190, 83, 0.4)';
    ctx.beginPath();
    ctx.moveTo(width / 2 - 140, nextY + 20);
    ctx.lineTo(width / 2 + 140, nextY + 20);
    ctx.stroke();

    // Explanation snippet
    ctx.fillStyle = '#D7E2DC';
    ctx.font = '400 26px "Plus Jakarta Sans", sans-serif';
    wrapText(ctx, payload.explanation, width / 2, nextY + 80, 860, 40, 6);

    // Footer branding
    ctx.fillStyle = '#E5BE53';
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(ui.appTitle, width / 2, height - 92);

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `quran-wonder-${payload.verseRef.replace(/[:\s]/g, '-')}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-[#FBF9F4] dark:bg-[#111C18] border border-[#E5DFD2] dark:border-[#23352E] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5DFD2] dark:border-[#23352E]">
          <h2
            id="share-modal-title"
            className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9]"
          >
            {ui.shareModalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.closeModal}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Share Card Visual Preview */}
        <div className="p-6">
          <div className="rounded-xl bg-gradient-to-br from-[#063829] to-[#0B4B37] text-[#FBF9F4] p-6 sm:p-8 border border-[#D4AF37]/40 shadow-inner">
            <div className="text-xs text-[#E5BE53] font-medium mb-3 text-center">
              {payload.kindLabel} · {payload.surahLabel} ({payload.verseRef})
            </div>

            <h3
              className={`text-center font-semibold text-white mb-5 ${
                language === 'en' ? 'font-display text-2xl' : 'text-xl'
              }`}
            >
              {payload.title}
            </h3>

            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl sm:text-2xl text-center text-white leading-[2.1] mb-5"
            >
              {payload.arabicText}
            </p>

            <div className="w-24 h-px bg-[#E5BE53]/45 mx-auto mb-5" />

            <p
              className={`text-sm text-[#DCE7E1] text-center leading-relaxed line-clamp-4 ${
                language === 'ur' ? 'font-urdu text-base leading-[2.2]' : ''
              }`}
            >
              {payload.explanation}
            </p>

            <div className="mt-6 text-center text-xs text-[#E5BE53]/90 font-medium">
              {ui.appTitle}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-[#D8D0C0] dark:border-[#2A4037] text-sm font-medium text-[#1A221E] dark:text-[#F2EFE9] hover:bg-[#F2EDE2] dark:hover:bg-[#192A23] inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? ui.copiedText : ui.copyText}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPng}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0B1210] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Download className="w-4 h-4" />
              <span>{ui.downloadImage}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 4
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let lineCount = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && i > 0) {
      lineCount++;
      if (lineCount >= maxLines) {
        ctx.fillText(line.trim() + '…', x, currentY);
        return currentY + lineHeight;
      }
      ctx.fillText(line.trim(), x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line.trim()) {
    ctx.fillText(line.trim(), x, currentY);
  }
  return currentY + lineHeight;
}
