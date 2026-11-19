import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, Playfair_Display } from "next/font/google";
import { site } from "@/data/site";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { IntroLoader } from "@/components/motion/IntroLoader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: site.url,
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.seo.ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
    images: ["/og.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FBF5E6",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const introBoot = `(function(){try{var root=document.documentElement;if(root.getAttribute("data-intro")!=="on")return;if(location.pathname==="/login"||location.pathname.indexOf("/admin")===0){var office=document.createElement("style");office.id="intro-skip";office.textContent="#intro{display:none !important}";document.head.appendChild(office);return;}var key=${JSON.stringify(site.ui.introStorageKey)};var reduce=false;try{reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){}var seen=false;try{seen=sessionStorage.getItem(key)==="1";}catch(e){}if(reduce||seen){var skip=document.createElement("style");skip.id="intro-skip";skip.textContent="#intro{display:none !important}";document.head.appendChild(skip);return;}var done=false;function finish(){if(done)return;done=true;try{sessionStorage.setItem(key,"1");}catch(e){}var intro=document.getElementById("intro");if(intro)intro.setAttribute("hidden","");var page=document.getElementById("page");if(page)page.removeAttribute("inert");document.body.style.overflow="";if(!document.getElementById("intro-skip")){var css=document.createElement("style");css.id="intro-skip";css.textContent="#intro{display:none !important}";document.head.appendChild(css);}}document.addEventListener("DOMContentLoaded",function(){var page=document.getElementById("page");if(page)page.setAttribute("inert","");document.body.style.overflow="hidden";var intro=document.getElementById("intro");if(intro)intro.addEventListener("click",finish,{once:true});var curtain=document.getElementById("intro-curtain");if(curtain)curtain.addEventListener("animationend",finish);window.setTimeout(finish,1800);});}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-intro={site.features.introLoader ? "on" : "off"}
      className={`${inter.variable} ${playfair.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-cream font-sans text-ink antialiased" suppressHydrationWarning>
        <Script id="intro-boot" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: introBoot }} />
        <JsonLd />
        <div className="grain" aria-hidden="true" />
        {site.features.introLoader ? <IntroLoader /> : null}
        {site.features.customCursor ? <CustomCursor /> : null}
        <div id="page">
          <a className="skip-link" href="#main">
            {site.ui.skipToContent}
          </a>
          <SmoothScroll>
            <Nav />
            {children}
          </SmoothScroll>
        </div>
        <noscript>
          <style>{`#intro{display:none !important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
