import { asset } from "../utils/asset";

export default function QuoteBand({
  text = "Every era a verse. Every friendship a feature. Every memory a track.",
  author = "C.A. Lynch",
  bowtieSrc = "media/bowtie.svg",
  cinematic = true
}) {
  const bow = bowtieSrc?.startsWith("http") ? bowtieSrc : asset(bowtieSrc);

  return (
    <section className={`quote-band ${cinematic ? "cinematic" : ""}`} aria-label="Event tagline">
      <div className="container quote-inner">
        {/* Bowtie icon */}
        <div className="quote-bowtie" aria-hidden="true">
          <img src={bow} alt="" />
        </div>

        {/* Sheen sweep overlay */}
        <div className="quote-sheen" aria-hidden="true" />

        {/* Decorative divider, quote, and attribution */}
        <div className="quote-rule" aria-hidden="true" />
        <blockquote className="quote-text">“{text}”</blockquote>
        <div className="quote-author">— {author}</div>
        <div className="quote-rule" aria-hidden="true" />
      </div>
    </section>
  );
}
