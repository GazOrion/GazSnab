type Props = {
  desktopSrc: string;
  mobileSrc?: string | null;
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
};

export function ResponsiveBannerImage({
  desktopSrc,
  mobileSrc,
  className,
  fetchPriority = "auto"
}: Props) {
  return (
    <picture>
      {mobileSrc ? <source media="(max-width: 768px)" srcSet={mobileSrc} /> : null}
      {/* eslint-disable-next-line @next/next/no-img-element -- responsive banner sources */}
      <img
        src={desktopSrc}
        alt=""
        className={className}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}
