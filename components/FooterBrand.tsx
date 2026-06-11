import Link from "next/link";

export function FooterBrand() {
  return (
    <Link className="store-footer-brand-logo" href="/">
      <span className="store-footer-brand-name">
        <span className="store-footer-brand-name__orion">ОРИОН</span>
        <span className="store-footer-brand-name__gazsnab">ГАЗСНАБ</span>
      </span>
    </Link>
  );
}
