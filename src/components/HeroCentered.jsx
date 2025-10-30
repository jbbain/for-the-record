import { asset } from "../utils/asset";

export default function HeroCentered({
  title = "For the Record — Platinum Edition",
  subtitle = "Cornell's 40th Birthday Celebration",
  image = "media/hero-bw.jpg",
  fit = "contain",
  height = "80vh",
  alt = "Event hero"
}){
  const imgUrl = image?.startsWith("http") ? image: asset(image);
  
  return (
    <section className="hero-centered" style={{minHeight: height}} aria-label="Event hero">
      <div className="hero-media">
        <img
            src={imgUrl}
            alt={alt}
            className={`hero-img ${fit == "contain" ? "contain" : "cover"}`}
            loading="eager"
            decoding="async"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-divider top" aria-hidden="true" />
        <h1 className="hero-title">{title}</h1>
        {subtitle && (
          <div className="hero-subtitle">
            {subtitle}
          </div>
        )}
        <div className="hero-divider bottom" aria-hidden="true" />
      </div>
    </section>
  );
}
