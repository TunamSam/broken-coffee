import { createContext, useContext, useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Instagram, Menu as MenuIcon, X } from "lucide-react";
import { Lines, Photo, ease } from "./ui";

const IG = "https://www.instagram.com/broken.coffee/";
const links = [["/", "Home"], ["/about", "About"], ["/menu", "Menu"], ["/experience", "Experience"], ["/visit", "Visit us"]] as const;
const names: Record<string, string> = { "/": "Broken Coffee", "/about": "About", "/menu": "Menu", "/experience": "Experience", "/visit": "Visit us" };

function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 text-white mix-blend-difference md:px-8">
      <Link to="/" className="display text-2xl">Broken Coffee</Link>
      <nav className="hidden gap-7 md:flex">{links.map(([to, l]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm font-semibold ${isActive ? "underline decoration-2 underline-offset-8" : ""}`}>{l}</NavLink>)}</nav>
      <button className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <MenuIcon />}</button>
      {open && <div className="fixed inset-0 -z-10 flex flex-col justify-center gap-2 bg-ink px-6 md:hidden">{links.map(([to, l]) => <Link key={to} to={to} className="display text-6xl text-cream">{l}</Link>)}</div>}
    </header>
  );
}

const DestName = createContext("");

/** Always shows the destination page name, even while the old page is exiting. */
function Curtain() {
  const name = useContext(DestName);
  return (
    <>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-brk" initial={{ y: "0%" }} animate={{ y: "-100%", transition: { duration: 0.9, ease, delay: 0.25 } }} exit={{ y: ["100%", "0%"], transition: { duration: 0.75, ease } }}>
        <span className="display px-4 text-center text-[14vw] text-cream">{name}</span>
      </motion.div>
      <motion.div className="fixed inset-0 z-[49] bg-ink" initial={{ y: "0%" }} animate={{ y: "-100%", transition: { duration: 0.9, ease, delay: 0.38 } }} exit={{ y: ["100%", "0%"], transition: { duration: 0.75, ease, delay: 0.08 } }} />
    </>
  );
}

function Page({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <><Curtain /><main>{children}</main><Footer /></>;
}

const Cta = ({ to, children }: { to: string; children: string }) => (
  <Link to={to} className="display inline-flex items-center gap-3 bg-brk px-7 py-4 text-2xl text-cream transition-transform hover:-translate-y-1 hover:bg-ink">{children}<ArrowUpRight /></Link>
);

function Home() {
  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-ink px-5 pb-10 pt-28 text-cream md:px-8">
        <Photo src="/images/hero.png" label="Kuta beach at sunrise" tone="#1c1c1c" speed={18} className="absolute inset-0" />
        <div className="absolute inset-0 bg-ink/35" />
        <Lines as="h1" delay={0.9} className="relative z-10 text-[22vw] md:text-[17vw]" lines={["Built for", "early", "mornings."]} />
        <div className="relative z-10 mt-8 flex flex-wrap items-end justify-between gap-6">
          <Cta to="/about">Explore Broken</Cta>
          <p className="max-w-xs text-sm font-semibold">Early morning lovers, running lovers and wave lovers. Open every day, 06:30 AM – 08:00 PM.</p>
          <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="flex items-center gap-2 text-sm font-semibold">Scroll <ArrowDown size={18} /></motion.span>
        </div>
      </section>
      <section className="overflow-hidden bg-sun py-5"><motion.div className="display flex w-max gap-10 text-5xl" animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }}>{Array.from({ length: 12 }, (_, i) => <span key={i}>Coffee ✺ Bakery ✺ Kuta ✺</span>)}</motion.div></section>
      <section className="grid gap-8 px-5 py-24 md:grid-cols-12 md:px-8">
        <Lines className="text-[15vw] md:col-span-8 md:text-[9vw]" lines={["Fuel your", "next wave."]} />
        <Photo src="/images/panini.png" label="Chicken Pesto Panini" tone="#3a2a1a" speed={10} className="h-[60vh] md:col-span-4 md:mt-32" />
        <Photo src="/images/banana-bread.png" label="Ubud Banana Bread" tone="#5a3a20" speed={22} className="h-[45vh] md:col-span-5 md:col-start-2" />
        <div className="self-center md:col-span-4 md:col-start-8"><p className="mb-6 text-lg font-semibold">Panini, banana bread, bagels and coffee. Baked and brewed a few steps from the sand.</p><Cta to="/menu">See the menu</Cta></div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <section className="px-5 pb-16 pt-36 md:px-8"><Lines as="h1" delay={0.9} className="text-[17vw] md:text-[12vw]" lines={["More than", "just a", "coffee stop."]} /></section>
      <section className="grid gap-6 px-5 pb-24 md:grid-cols-12 md:px-8">
        <Photo src="/images/about-counter.png" label="Early morning at the counter" tone="#2a2a2a" speed={14} className="h-[70vh] md:col-span-7" />
        <div className="md:col-span-4 md:col-start-9 md:pt-24">
          <p className="mb-4 text-lg font-semibold">Broken Coffee is a coffee shop at Pantai Kuta, Bali. It is made for early morning lovers, running lovers and wave lovers.</p>
          <p className="mb-6 text-sm opacity-70">
            More than coffee, it's about the moments in between.
            The morning runs, the salty air, the good conversations,
            and everything that makes a day feel right.
          </p>
          <span className="hand text-4xl text-brk">coffee + bakery + beach</span>
        </div>
      </section>
      <section className="grid gap-px bg-ink md:grid-cols-4">{[["Coffee", "#D6322B"], ["Early mornings", "#F2C230"], ["Running", "#069ef7ff"], ["Waves", "#fff"]].map(([t, c]) => <div key={t} className="display flex min-h-[40vh] items-end p-6 text-5xl" style={{ background: c }}>{t}</div>)}</section>
    </>
  );
}

type Item = { name: string; price: string; note: string; tone: string; image?: string };
const items: Item[] = [
  {
    name: "Chicken Pesto Panini",
    price: "80K + tax",
    note: "Golden toasted bread, tender chicken, and rich pesto. A little comfort in every bite.",
    tone: "#3a2a1a",
    image: "/images/panini.png",
  },
  {
    name: "Ubud Banana Bread",
    price: "32K",
    note: "Soft, moist, and naturally sweet. A homemade classic worth slowing down for.",
    tone: "#5a3a20",
    image: "/images/banana-bread.png",
  },
  {
    name: "Churros Butter Tteok",
    price: "15K",
    note: "A playful twist on two favorites. Crispy on the outside, soft and chewy inside.",
    tone: "#7a5530",
    image: "/images/churros-butter-tteok.png",
  },
  {
    name: "Bagel & Latte Set",
    price: "40K",
    note: "A freshly baked bagel paired with your coffee companion. Simple mornings, done right.",
    tone: "#4a3320",
    image: "/images/bagels.png",
  },
  {
    name: "Korean Salt Bread",
    price: "27K",
    note: "Light, buttery, and perfectly golden with a delicate touch of salt.",
    tone: "#6a3f18",
    image: "/images/korean-salt-bread.png",
  },
  {
    name: "Ube Latte",
    price: "33K",
    note: "A creamy blend of earthy ube and smooth milk. A little purple magic in your cup.",
    tone: "#6b3f8a",
    image: "/images/ube-latte.png",
  },
];

function Menu() {
  return (
    <>
      <section className="px-5 pb-10 pt-36 md:px-8"><Lines as="h1" delay={0.9} className="text-[22vw] md:text-[14vw]" lines={["Menu"]} /><p className="mt-4 max-w-md text-sm font-semibold">A selection of good coffee, freshly baked treats, and comforting bites. Made for every little moment.</p></section>
      {items.map((it, i) => (
        <section key={it.name} className={`grid items-center gap-6 border-t-4 border-ink px-5 py-12 md:grid-cols-12 md:px-8 ${i % 2 ? "bg-ink text-cream" : ""}`}>
          <Photo src={it.image} label={it.name} tone={it.tone} speed={10 + i * 3} className={`h-[55vh] md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`} />
          <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
            <Lines className="text-[13vw] md:text-[7vw]" lines={it.name.split(" ").reduce<string[]>((a, w) => (a.length && a[a.length - 1].length < 9 ? [...a.slice(0, -1), `${a[a.length - 1]} ${w}`] : [...a, w]), [])} />
            <p className="mt-5 max-w-sm text-lg">{it.note}</p>
            <span className="hand mt-3 text-5xl text-sun">{it.price}</span>
          </div>
        </section>
      ))}
    </>
  );
}

function Experience() {
  const rows: [string, string, string, number, string][] = [
    ["Sunrise on the sand", "Kuta beach at sunrise", "#e0883a", 20, "/images/sunrise-on-the-sand.png"],
    ["Run club", "Runners on the beach", "#2f4f6a", 12, "/images/run.png"],
    ["Wave check", "Surfers at Kuta", "#1f6a7a", 24, "/images/wave-check.png"],
    ["Fresh from the oven", "Bakery preparation", "#7a5530", 14, "/images/bakery.png"],
  ];
  return (
    <>
      <section className="px-5 pb-10 pt-36 md:px-8">
        <Lines as="h1" delay={0.9} className="text-[17vw] md:text-[11vw]" lines={["Sand. Waves.", "Coffee. Bread."]} />
      </section>
      {rows.map(([t, l, c, s, img], i) => (
        <section key={t} className="relative h-[85vh] overflow-hidden text-cream">
          <Photo src={img} label={l} tone={c} speed={s} className="absolute inset-0" />
          <div className="absolute inset-0 bg-ink/30" />
          <div className={`relative z-10 flex h-full items-end p-6 md:p-10 ${i % 2 ? "justify-end text-right" : ""}`}>
            <Lines
              className="text-[16vw] md:text-[10vw]"
              lines={t.split(" ").length > 2 ? [t.split(" ").slice(0, 2).join(" "), t.split(" ").slice(2).join(" ")] : [t]}
            />
          </div>
        </section>
      ))}
    </>
  );
}

function Visit() {
  return (
    <>
      <section className="px-5 pb-16 pt-36 md:px-8"><Lines as="h1" delay={0.9} className="text-[19vw] md:text-[12vw]" lines={["See you in", "the morning."]} /></section>
      <section className="grid gap-6 px-5 pb-24 md:grid-cols-2 md:px-8">
        <div className="min-h-[50vh] border-4 border-ink md:min-h-[60vh]">
          <iframe
            title="Broken Coffee location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4488.007079255111!2d115.16792181112359!3d-8.720483891292862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd241c12eb3b59d%3A0x8d4127d993f40e8b!2sBROKEN%20COFFEE!5e1!3m2!1sid!2sid!4v1795747376627!5m2!1sid!2sid"
            className="h-full min-h-[50vh] w-full md:min-h-[60vh]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="space-y-6 text-xl font-semibold">
          <p>Pantai Kuta, Bali, Indonesia</p>
          <p>Open every day<br /><span className="display text-6xl">06:30 AM – 08:00 PM</span></p>
          <a href={IG} target="_blank" rel="noreferrer" className="display inline-flex items-center gap-3 bg-ink px-6 py-4 text-2xl text-cream hover:bg-brk"><Instagram /> @broken.coffee</a>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="overflow-hidden bg-ink px-5 pb-6 pt-16 text-cream md:px-8">
      <div className="mb-10 flex flex-wrap justify-between gap-8 text-sm font-semibold">
        <nav className="flex flex-col gap-1">{links.map(([to, l]) => <Link key={to} to={to} className="hover:text-sun">{l}</Link>)}</nav>
        <p>Open every day<br />06:30 AM – 08:00 PM</p>
        <p>Pantai Kuta<br />Bali, Indonesia</p>
        <a href={IG} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-sun"><Instagram size={18} />@broken.coffee</a>
      </div>
      <p className="display text-[20vw] leading-[.8] text-brk">Broken Coffee</p>
    </footer>
  );
}

export default function App() {
  const location = useLocation();
  useReducedMotion();
  return (
    <DestName.Provider value={names[location.pathname] ?? ""}>
      <Nav />
      <AnimatePresence mode="wait" initial>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/menu" element={<Page><Menu /></Page>} />
          <Route path="/experience" element={<Page><Experience /></Page>} />
          <Route path="/visit" element={<Page><Visit /></Page>} />
        </Routes>
      </AnimatePresence>
    </DestName.Provider>
  );
}
