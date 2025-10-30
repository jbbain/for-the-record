import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

export default function GradientQRCode({ url, size=140 }){
  const ref = useRef(null);

  useEffect(()=>{
    const qr = new QRCodeStyling({
      data: url,
      width: size, height: size,
      type: "canvas",
      margin: 8,
      dotsOptions: { color: "#AEADAB", type: "rounded" },
      backgroundOptions: { color: "transparent" },
      cornersSquareOptions: { type: "extra-rounded", color: "#F2F0EF" },
      cornersDotOptions: { type: "dot", color: "#AEADAB" }
    });

    if (ref.current) qr.append(ref.current);

    const t = setTimeout(() => {
      const canvas = ref.current?.querySelector("canvas");
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;
      const grad = ctx.createLinearGradient(0,0,size,size);
      grad.addColorStop(0, "#F2F0EF");
      grad.addColorStop(.6, "#AEADAB");
      grad.addColorStop(1, "#312F2F");
      ctx.globalCompositeOperation = "source-atop";
      ctx.fillStyle = grad;
      ctx.fillRect(0,0,size,size);
      ctx.globalCompositeOperation = "source-over";
    }, 50);

    return () => {
      clearTimeout(t);
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [url, size]);

  return <div ref={ref} aria-label="QR code to donation page" />;
}

/* Fallback (if registry blocks):
import { QRCodeSVG } from "qrcode.react";
export default function GradientQRCode({ url, size=140 }){
  return (
    <div style={{ position:'relative', width:size, height:size }}>
      <QRCodeSVG value={url} size={size} bgColor="transparent" fgColor="#AEADAB" level="M"/>
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, rgba(242,240,239,0.85), rgba(174,173,171,0.5) 60%, rgba(49,47,47,0.6))', mixBlendMode:'screen', pointerEvents:'none', borderRadius:8 }}/>
    </div>
  );
}
*/
