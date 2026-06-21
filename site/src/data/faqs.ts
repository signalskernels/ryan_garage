/* FAQs. CMS-editable in src/content/data/faqs.json. Powers /faq + FAQ JSON-LD. */
import data from '../content/data/faqs.json';

export interface Faq { q: string; a: string; }

export const faqs = data.faqs as Faq[];
