# Cars Auto

A demonstration dealership website for **Cars Auto** in Accra. It is a Next.js application with a local vehicle catalogue, working filters, enquiry forms, and WhatsApp handoff.

The vehicles, prices, specifications, and photographs are sample content. They are not confirmation that a vehicle is in stock or available to buy.

## Contact details used on the site

These values live in `src/config/site.ts`.

- Email: carsauto@dealers.com
- Hotline: 0505701248 (`tel:+233505701248`)
- WhatsApp: 0597374457 (`https://wa.me/233597374457`)
- Address: Boundary Road, 10 Blackberry Street, Accra, Ghana

## Requirements

- Node.js 20 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` to the public site URL before deployment so canonical links, the sitemap, and Open Graph URLs are absolute. If it is unset, the site uses `http://localhost:3000`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run the Next.js linter |

## What is real and what is sample data

- Business name, email, phone numbers, WhatsApp number, and address are the details supplied for Cars Auto.
- Inventory in `src/data/vehicles.ts` is demonstration data. Pages say so.
- Prices are sample figures in Ghanaian cedis. The site does not convert currencies.
- Photographs are representative automotive images used to show layout. They are not photographs of specific Cars Auto vehicles. Cards and galleries are labelled "Representative photo".
- Customer testimonials are not invented. The homepage explains that verified reviews are not published yet.
- Forms validate in the browser. A successful form does **not** send email. The visitor can choose to open WhatsApp with the prepared message.
- The newsletter form only checks the email format. It does not subscribe anyone to a mailing list.

## Production integrations still required

- A real inventory source, if listings should reflect vehicles the dealership can actually discuss.
- Email delivery for contact, trade-in, sourcing, logistics, after-sales, and modification forms.
- A newsletter provider, if the email field should create a subscription.
- The production site URL in `NEXT_PUBLIC_SITE_URL`.
- Replacement of representative photographs with photos of the dealership's own vehicles, if those assets are provided.

No opening hours, staff list, awards, warranty terms, or financing offers are published, because they were not supplied.
