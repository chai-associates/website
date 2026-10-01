import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";

// 生成 WhatsApp 链接，自动带上开场白
export function whatsappLink(lang: Locale) {
  const text = encodeURIComponent(site.whatsappMessage[lang]);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function mapsLink(address: string) {
  const q = encodeURIComponent(`Chai & Associates ${address}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
