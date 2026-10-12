import { common } from "./common";
import { sections } from "./home";
import { claims, pages } from "./pages";
import { productLabels, products, useCases } from "./products";
import { articles, journalCopy } from "./journal";
import { legalPages } from "./legal";
import { quoteForm } from "./quote";

/** Turkish dictionary. Its shape defines `Dictionary` for every other locale. */
export const tr = { ...common, sections, pages, claims, products, useCases, productLabels, quoteForm, legalPages, journalCopy, articles };
