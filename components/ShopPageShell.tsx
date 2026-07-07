import type { ReactNode } from "react";
import clsx from "clsx";
import { SiteHeader } from "@/components/SiteHeader";

type Props = {
  className?: string;
  children: ReactNode;
};

export function ShopPageShell({ className, children }: Props) {
  return (
    <div className="shop-page-shell">
      <SiteHeader />
      <main className={clsx(className)}>{children}</main>
    </div>
  );
}
