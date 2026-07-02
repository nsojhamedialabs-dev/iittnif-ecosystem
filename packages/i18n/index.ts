// MOBILE-FIRST: see /MOBILE_FIRST.md — keep dictionary strings short;
// nav labels in particular must fit a mobile mega-menu without wrapping.

import en from './en/common.json'
import hi from './hi/common.json'

export const dictionaries = { en, hi } as const
export type Locale = keyof typeof dictionaries
