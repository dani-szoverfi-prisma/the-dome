# Website structure — The Dome Restaurant

## Pages

### Home (/)

- Hero: fullscreen video or high-res image + restaurant slogan
- CTA button: "Rezervare masă" (prominent, above fold)
- Restaurant intro + main cuisine categories
- Menu preview section with CTA to full menu
- Wine & drinks section (Vinotecă) with CTA to drinks list
- Atmosphere photo gallery
- Quick reservation form (inline, not redirect)

### Menu (/menu)

- Interactive digital catalog — PDF format, browsable
- Separate sections: food / drinks / wine list

### Gallery (/gallery)

- Interior, terrace, Vinotecă zone
- High-res imagery, lazy loaded

### Contact (/contact)

- Full contact details
- Google Maps embed
- General enquiry contact form

### Reservation (/reservation)

- Standalone reservation form page
- Fields: name, date, time, party size, phone, notes

## Languages

All pages available in: ro / hu / en / de
Use Next.js i18n routing: /ro/ /hu/ /en/ /de/
hreflang tags required on every page for all 4 locales

## SEO notes

- Primary market: Satu Mare, Romania
- Target keywords per page to be added as research is done
- Schema.org type: Restaurant on homepage, with address and opening hours
