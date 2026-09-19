import type { ReactNode } from "react";

/** Top of every inner page. Sits under the floating header. */
export function PageHead({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <div className="bg-[radial-gradient(70%_90%_at_100%_0%,rgb(158_88_69/0.22),transparent_70%)] pt-[calc(112px+env(safe-area-inset-top,0px))] pb-9">
      <div className="wrap">
        <h1 className="t-h1 max-w-[16ch]">{title}</h1>
        {lead && <p className="lead mt-4">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
