/**
 * FONTS — the single place to swap typefaces.
 * Replace the imports below with any `next/font/google` family (keep
 * `latin-ext` for Turkish). The CSS variables feed the font roles in theme.css;
 * if the display face has a single weight, set `--display-weight` there to match.
 *
 * Roles:
 *   display → headlines          Instrument Serif
 *   body    → text, UI           Instrument Sans
 *   product → product names      Rosario — closest free match to Monini's
 *                                (custom, paid) TFarrow flared face
 *
 * Previous display/body pairing, for comparison: Cormorant_Garamond (400–600)
 * + Manrope, with `--display-weight: 500`.
 */
import { Instrument_Sans, Instrument_Serif, Rosario } from "next/font/google";

const display = Instrument_Serif({
  variable: "--font-display-family",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const body = Instrument_Sans({
  variable: "--font-body-family",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const product = Rosario({
  variable: "--font-product-family",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  display: "swap",
});

export const fontVariables = `${display.variable} ${body.variable} ${product.variable}`;
