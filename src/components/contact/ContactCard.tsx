import { siteConfig } from "@/config/site";
import { emailHref, mapsHref, phoneHref, whatsappHref } from "@/lib/contactLinks";

export function ContactCard() {
  return (
    <aside className="h-fit rounded-2xl border border-line bg-canvas p-5 lg:sticky lg:top-24">
      <h2 className="text-lg font-semibold">Contact Cars Auto</h2>
      <ul className="mt-4 space-y-3 text-sm leading-6">
        <li>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Email</p>
          <a className="font-medium underline-offset-4 hover:underline" href={emailHref()}>
            {siteConfig.email}
          </a>
        </li>
        <li>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Hotline</p>
          <a className="font-medium underline-offset-4 hover:underline" href={phoneHref()}>
            {siteConfig.phoneDisplay}
          </a>
        </li>
        <li>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">WhatsApp</p>
          <a className="font-medium underline-offset-4 hover:underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            {siteConfig.whatsappDisplay}
          </a>
        </li>
        <li>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Address</p>
          <a className="font-medium underline-offset-4 hover:underline" href={mapsHref()} target="_blank" rel="noopener noreferrer">
            {siteConfig.address.full}
          </a>
        </li>
      </ul>
    </aside>
  );
}
