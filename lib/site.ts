// ─────────────────────────────────────────────────────────────
//  Edit your details here. Everything on the site reads from this file.
// ─────────────────────────────────────────────────────────────

export const site = {
  brandName: "Pixlo",

  // WhatsApp number in international format, digits only (94 = Sri Lanka).
  // Example: 0771234567 → "94771234567"
  whatsapp: "94700000000",
  // How the phone number is shown on the page
  phoneDisplay: "070 000 0000",
  email: "hello@example.com",

  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  pinterest: "https://www.pinterest.com/",

  // Used for search engines and link previews
  url: "https://example.com",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
