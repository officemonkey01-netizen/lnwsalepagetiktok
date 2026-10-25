import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Copy,
  ExternalLink,
  Eye,
  Flame,
  Globe2,
  GripVertical,
  LayoutDashboard,
  Link2,
  Menu,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings2,
  Share2,
  ShoppingCart,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  Users,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";

type ThemeName = "coral" | "midnight" | "mint" | "sunset";

type PageButton = {
  id: string;
  title: string;
  description: string;
  url: string;
  event: string;
  tone: string;
};

type SalePage = {
  id: string;
  name: string;
  slug: string;
  note: string;
  description: string;
  status: "published" | "draft";
  theme: ThemeName;
  accent: string;
  hero: string;
  cta: string;
  ctaUrl: string;
  visits: number;
  clicks: number;
  updated: string;
  buttons: PageButton[];
};

const STORAGE_KEY = "lnwsalepagetiktok.pages.v1";

const themeMeta: Record<ThemeName, { label: string; bg: string; text: string; card: string; accent: string }> = {
  coral: { label: "Coral Pop", bg: "#fff8f4", text: "#17243a", card: "#ffffff", accent: "#ff6b4a" },
  midnight: { label: "Midnight", bg: "#101827", text: "#f4f7fb", card: "#1c293d", accent: "#7c8cff" },
  mint: { label: "Mint Studio", bg: "#effaf5", text: "#153b32", card: "#ffffff", accent: "#28a879" },
  sunset: { label: "Sunset", bg: "#fff1e8", text: "#3e2319", card: "#ffffff", accent: "#e16b29" },
};

const eventOptions = [
  { value: "", label: "นับคลิกปกติ" },
  { value: "view_content", label: "ดูสินค้า (ViewContent)" },
  { value: "add_to_cart", label: "หยิบใส่ตะกร้า (AddToCart)" },
  { value: "initiate_checkout", label: "เริ่มชำระเงิน (InitiateCheckout)" },
  { value: "purchase", label: "ซื้อสำเร็จ (Purchase)" },
  { value: "lead", label: "กรอกข้อมูลลูกค้า (Lead)" },
  { value: "contact", label: "ติดต่อเรา (Contact)" },
];

const initialPages: SalePage[] = [
  {
    id: "page-skin",
    name: "เซรั่มหน้าใส สูตร TikTok",
    slug: "skin-glow",
    note: "แคมเปญ TikTok — ต.ค.",
    description: "ผิวฉ่ำแบบสาวเกาหลี ตัวช่วยที่คนรีวิวแน่นที่สุดตอนนี้",
    status: "published",
    theme: "coral",
    accent: "#ff6b4a",
    hero: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=85",
    cta: "สั่งซื้อเซรั่มตอนนี้",
    ctaUrl: "https://example.com/order",
    visits: 12840,
    clicks: 1512,
    updated: "วันนี้ 09:42",
    buttons: [
      { id: "b1", title: "สั่งซื้อผ่าน TikTok Shop", description: "ส่งฟรีทั่วประเทศ • เก็บเงินปลายทาง", url: "https://example.com/tiktok", event: "purchase", tone: "dark" },
      { id: "b2", title: "ดูรีวิวจากลูกค้าจริง", description: "รีวิวกว่า 2,000 คน", url: "https://example.com/reviews", event: "view_content", tone: "soft" },
      { id: "b3", title: "แอด LINE รับโค้ดลด 15%", description: "ตอบไว มีแอดมินดูแล", url: "https://line.me", event: "lead", tone: "line" },
    ],
  },
  {
    id: "page-bag",
    name: "กระเป๋าผ้า everyday tote",
    slug: "everyday-tote",
    note: "ยิงแอดชุด Retarget",
    description: "กระเป๋าผ้าใบใหญ่ จุของเยอะ น้ำหนักเบา ใช้ได้ทุกวัน",
    status: "published",
    theme: "mint",
    accent: "#28a879",
    hero: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    cta: "ช้อปคอลเลกชันนี้",
    ctaUrl: "https://example.com/tote",
    visits: 8490,
    clicks: 940,
    updated: "เมื่อวาน 18:20",
    buttons: [
      { id: "b4", title: "เลือกสีที่ชอบ", description: "มี 6 สี พร้อมส่ง", url: "https://example.com/colors", event: "view_content", tone: "dark" },
      { id: "b5", title: "สั่งซื้อใน Shopee", description: "โค้ดลดพิเศษเฉพาะวันนี้", url: "https://shopee.co.th", event: "purchase", tone: "orange" },
    ],
  },
  {
    id: "page-coffee",
    name: "กาแฟดริป Morning Club",
    slug: "morning-club",
    note: "หน้าเก็บ Lead",
    description: "กลิ่นหอม นุ่มละมุน คัดเมล็ดพิเศษสำหรับเช้าวันใหม่",
    status: "draft",
    theme: "midnight",
    accent: "#7c8cff",
    hero: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    cta: "รับโปรเปิดตัว",
    ctaUrl: "https://example.com/coffee",
    visits: 3260,
    clicks: 401,
    updated: "25 ต.ค. 14:05",
    buttons: [
      { id: "b6", title: "รับคูปองส่วนลด 20%", description: "กรอกอีเมล รับโค้ดทันที", url: "https://example.com/coupon", event: "lead", tone: "dark" },
      { id: "b7", title: "รู้จัก Morning Club", description: "เรื่องราวของกาแฟแก้วนี้", url: "https://example.com/about", event: "view_content", tone: "soft" },
    ],
  },
];

function loadPages(): SalePage[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as SalePage[];
  } catch {
    // fall back to the seed content if storage is unavailable
  }
  return initialPages;
}

function usePages() {
  const [pages, setPages] = useState<SalePage[]>(loadPages);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    } catch {
      // localStorage can be disabled in private browsing; the UI still works in memory.
    }
  }, [pages]);
  return [pages, setPages] as const;
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "brand brand-compact" : "brand"}>
      <span className="brand-mark"><Flame size={18} strokeWidth={2.6} /></span>
      {!compact && <span className="brand-word"><b>lnw</b>salepage<span>tiktok</span></span>}
    </div>
  );
}

function IconButton({ label, children, onClick, className = "" }: { label: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
  return <button aria-label={label} title={label} className={`icon-button ${className}`} onClick={onClick}>{children}</button>;
}

function SideNav({ active = "pages" }: { active?: string }) {
  const [, setLocation] = useLocation();
  const items = [
    { id: "pages", label: "เซลเพจของฉัน", icon: Link2 },
    { id: "analytics", label: "ภาพรวม Analytics", icon: BarChart3 },
    { id: "ai", label: "AI SalePage", icon: Sparkles, tag: "ใหม่" },
    { id: "domains", label: "โดเมนของฉัน", icon: Globe2 },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-top"><BrandMark /><IconButton label="ย่อเมนู"><Menu size={18} /></IconButton></div>
      <div className="workspace-pill"><span className="workspace-avatar">J</span><span><b>ร้านของเจ</b><small>Workspace ส่วนตัว</small></span><ChevronDown size={15} /></div>
      <div className="nav-label">จัดการ</div>
      <nav className="side-nav">
        {items.map((item) => {
          const I = item.icon;
          return <button key={item.id} className={active === item.id ? "nav-item active" : "nav-item"} onClick={() => item.id === "pages" && setLocation("/")}><I size={17} /><span>{item.label}</span>{item.tag && <em>{item.tag}</em>}</button>;
        })}
      </nav>
      <div className="nav-label nav-label-spaced">บัญชีของฉัน</div>
      <nav className="side-nav">
        <button className="nav-item"><Zap size={17} /><span>แพ็กเกจ & สิทธิ์</span></button>
        <button className="nav-item"><Settings2 size={17} /><span>ตั้งค่า</span></button>
      </nav>
      <div className="sidebar-spacer" />
      <div className="upgrade-card"><div className="upgrade-icon"><Sparkles size={16} /></div><b>ปลดล็อกยอดขายเพิ่ม</b><p>สร้างได้ไม่จำกัด พร้อมเครื่องมือ AI</p><button>อัปเกรดแพ็กเกจ <ChevronRight size={14} /></button></div>
      <div className="side-footer"><button className="nav-item"><CircleHelp size={17} /><span>ช่วยเหลือ</span></button><div className="user-row"><span className="user-avatar">J</span><span><b>คุณเจ</b><small>เจ้าของ workspace</small></span><MoreHorizontal size={17} /></div></div>
    </aside>
  );
}

function MobileTopbar({ title = "เซลเพจของฉัน" }: { title?: string }) {
  return <div className="mobile-topbar"><BrandMark compact /><b>{title}</b><IconButton label="เมนู"><Menu size={20} /></IconButton></div>;
}

function AppHeader({ onCreate }: { onCreate: () => void }) {
  return <header className="app-header"><div><p className="eyebrow">วันจันทร์ที่ 26 ตุลาคม 2026</p><h1>สวัสดี, คุณเจ <span className="wave">✦</span></h1><p className="header-sub">พร้อมเปลี่ยนทุกคลิกให้เป็นยอดขายหรือยัง?</p></div><div className="header-actions"><div className="header-search"><Search size={17} /><input placeholder="ค้นหาเซลเพจ..." /></div><IconButton label="การแจ้งเตือน" className="notification"><Bell size={18} /><i /></IconButton><button className="primary-button" onClick={onCreate}><Plus size={17} /> สร้างเซลเพจใหม่</button></div></header>;
}

function StatCard({ icon, label, value, detail, accent }: { icon: React.ReactNode; label: string; value: string; detail: string; accent: string }) {
  return <div className="stat-card"><div className="stat-top"><span className={`stat-icon ${accent}`}>{icon}</span><span className="stat-detail">{detail}</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div></div>;
}

function StatusBadge({ status }: { status: SalePage["status"] }) {
  return <span className={`status-badge ${status}`}><i />{status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}</span>;
}

function PagePreviewThumb({ page }: { page: SalePage }) {
  const palette = themeMeta[page.theme];
  return <div className="page-thumb" style={{ background: palette.bg }}><div className="thumb-top" style={{ backgroundImage: `url(${page.hero})` }}><span className="thumb-badge">lnw</span></div><div className="thumb-body" style={{ color: palette.text }}><span className="thumb-avatar" style={{ background: page.accent }}>J</span><b>{page.name}</b><small>{page.description}</small><span className="thumb-cta" style={{ background: page.accent }}>{page.cta}</span>{page.buttons.slice(0, 2).map((button) => <span className="thumb-link" key={button.id}>{button.title}</span>)}</div></div>;
}

function PageRow({ page, onEdit, onDelete, onPreview }: { page: SalePage; onEdit: () => void; onDelete: () => void; onPreview: () => void }) {
  const ctr = ((page.clicks / page.visits) * 100).toFixed(1);
  return <div className="page-row"><PagePreviewThumb page={page} /><div className="page-info"><div className="page-title-line"><h3>{page.name}</h3><StatusBadge status={page.status} /></div><p className="page-note">{page.note}</p><div className="page-meta"><span><Globe2 size={13} /> lnwsalepagetiktok.com/{page.slug}</span><span>แก้ไข {page.updated}</span></div></div><div className="page-metrics"><div><b>{page.visits.toLocaleString()}</b><span>เข้าชม</span></div><div><b>{ctr}%</b><span>CTR</span></div></div><div className="row-actions"><IconButton label="ดูหน้า public" onClick={onPreview}><Eye size={17} /></IconButton><IconButton label="แก้ไข" onClick={onEdit}><Pencil size={17} /></IconButton><IconButton label="ตัวเลือกเพิ่มเติม"><MoreHorizontal size={17} /></IconButton><button className="row-delete" aria-label="ลบหน้า" onClick={onDelete}><Trash2 size={15} /></button></div></div>;
}

function Dashboard({ pages, setPages }: { pages: SalePage[]; setPages: React.Dispatch<React.SetStateAction<SalePage[]>> }) {
  const [, setLocation] = useLocation();
  const [toast, setToast] = useState("");
  const totalVisits = pages.reduce((sum, page) => sum + page.visits, 0);
  const totalClicks = pages.reduce((sum, page) => sum + page.clicks, 0);
  const showToast = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const createPage = () => setLocation("/editor/new");
  const deletePage = (page: SalePage) => {
    if (window.confirm(`ลบเซลเพจ “${page.name}” ใช่ไหม?`)) {
      setPages((current) => current.filter((item) => item.id !== page.id));
      showToast("ลบเซลเพจแล้ว");
    }
  };
  return <div className="shell"><SideNav /><main className="main-canvas"><MobileTopbar /><AppHeader onCreate={createPage} /><section className="stats-grid"><StatCard icon={<Link2 size={18} />} label="เซลเพจทั้งหมด" value={String(pages.length).padStart(2, "0")} detail="+2 เดือนนี้" accent="coral" /><StatCard icon={<Eye size={18} />} label="เข้าชมทั้งหมด" value={`${(totalVisits / 1000).toFixed(1)}k`} detail="+18.4%" accent="blue" /><StatCard icon={<Users size={18} />} label="อัตราคลิกเฉลี่ย" value={`${((totalClicks / totalVisits) * 100).toFixed(1)}%`} detail="+2.1%" accent="green" /><StatCard icon={<BarChart3 size={18} />} label="ยอดขายจากหน้า" value="฿48.6k" detail="+24.8%" accent="purple" /></section><section className="content-section"><div className="section-heading"><div><h2>เซลเพจล่าสุด</h2><p>จัดการหน้าแคมเปญทั้งหมดของคุณในที่เดียว</p></div><div className="section-tools"><button className="filter-button"><span className="live-dot" /> ทั้งหมด <ChevronDown size={15} /></button><button className="text-button" onClick={() => showToast("ฟีเจอร์ดูทั้งหมดกำลังเตรียมพร้อม")}>ดูทั้งหมด <ArrowUp size={14} /></button></div></div><div className="page-list">{pages.map((page) => <PageRow key={page.id} page={page} onEdit={() => setLocation(`/editor/${page.id}`)} onPreview={() => setLocation(`/p/${page.slug}`)} onDelete={() => deletePage(page)} />)}<button className="empty-create" onClick={createPage}><span><Plus size={20} /></span><div><b>สร้างเซลเพจใหม่</b><small>เริ่มจากเทมเพลตที่พร้อมขาย</small></div><ChevronRight size={18} /></button></div></section><section className="bottom-grid"><div className="insight-card"><div className="card-heading"><div><span className="section-kicker">INSIGHT</span><h2>ทราฟฟิกของคุณกำลังไปได้ดี</h2></div><span className="trend-up">↑ 18.4%</span></div><p>เมื่อเทียบกับช่วงเดียวกันของสัปดาห์ก่อน เซลเพจ <b>เซรั่มหน้าใส</b> มีคนเข้าชมมากที่สุด</p><div className="mini-chart"><div className="chart-grid" /><svg viewBox="0 0 600 130" preserveAspectRatio="none"><path d="M0 110 C65 101 74 78 123 88 S185 103 222 68 S287 82 323 58 S370 74 405 47 S476 72 512 33 S560 38 600 10" fill="none" stroke="#ff6b4a" strokeWidth="4" strokeLinecap="round" /><path d="M0 110 C65 101 74 78 123 88 S185 103 222 68 S287 82 323 58 S370 74 405 47 S476 72 512 33 S560 38 600 10 V130 H0Z" fill="url(#fill)" opacity=".14" /><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#ff6b4a" /><stop offset="1" stopColor="#fff" /></linearGradient></defs></svg></div><div className="chart-labels"><span>จันทร์</span><span>อังคาร</span><span>พุธ</span><span>พฤหัส</span><span>ศุกร์</span><span>เสาร์</span><span>อาทิตย์</span></div></div><div className="quick-card"><div className="card-heading"><div><span className="section-kicker">QUICK START</span><h2>ไปต่อกับ lnw</h2></div><WandSparkles size={20} color="#ff6b4a" /></div><div className="quick-item"><span className="quick-number">01</span><span><b>เพิ่ม TikTok Pixel</b><small>วัดผลแคมเปญได้แม่นขึ้น</small></span><ChevronRight size={16} /></div><div className="quick-item"><span className="quick-number">02</span><span><b>เชื่อมต่อโดเมน</b><small>ใช้ลิงก์แบรนด์ของคุณเอง</small></span><ChevronRight size={16} /></div><div className="quick-item"><span className="quick-number">03</span><span><b>ลอง AI SalePage</b><small>ให้ AI ช่วยเขียนหน้าให้</small></span><ChevronRight size={16} /></div></div></section>{toast && <div className="toast"><Check size={16} />{toast}</div>}</main></div>;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <label className="form-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

function PreviewPanel({ draft }: { draft: SalePage }) {
  const palette = themeMeta[draft.theme];
  return <div className="preview-stage"><div className="preview-toolbar"><span><span className="preview-live-dot" /> Live preview</span><span className="preview-device"><span>Desktop</span><span className="selected">Mobile</span></span><IconButton label="ขยายพรีวิว"><ExternalLink size={15} /></IconButton></div><div className="phone-frame"><div className="phone-notch" /><div className="public-page" style={{ background: palette.bg, color: draft.theme === "midnight" ? "#f4f7fb" : palette.text }}><div className="public-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.28)), url(${draft.hero})` }}><span className="public-brand"><Flame size={13} /> lnw</span></div><div className="public-content"><div className="public-avatar" style={{ background: draft.accent }}>J</div><h3>{draft.name || "ชื่อเซลเพจของคุณ"}</h3><p>{draft.description || "คำอธิบายสั้น ๆ ของเซลเพจ"}</p><a className="public-main-cta" style={{ background: draft.accent }} href={draft.ctaUrl || "#"}>{draft.cta || "ปุ่มหลักของคุณ"}<ArrowUp size={14} /></a><div className="public-links">{draft.buttons.map((button) => <a key={button.id} href={button.url || "#"} className={`public-link ${button.tone === "line" ? "line" : ""}`}><span><b>{button.title || "ชื่อปุ่ม"}</b><small>{button.description}</small></span><ChevronRight size={15} /></a>)}</div><div className="public-footer"><span>สร้างด้วย <b>lnwsalepagetiktok</b></span><Share2 size={14} /></div></div></div></div><div className="preview-url"><Globe2 size={14} /> lnwsalepagetiktok.com/{draft.slug || "your-slug"}<Copy size={13} /></div></div>;
}

function Editor({ pages, setPages }: { pages: SalePage[]; setPages: React.Dispatch<React.SetStateAction<SalePage[]>> }) {
  const [, params] = useRoute("/editor/:id");
  const [, setLocation] = useLocation();
  const isNew = params?.id === "new";
  const existing = pages.find((page) => page.id === params?.id);
  const blank: SalePage = { id: `page-${Date.now()}`, name: "", slug: "", note: "", description: "", status: "draft", theme: "coral", accent: "#ff6b4a", hero: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85", cta: "", ctaUrl: "", visits: 0, clicks: 0, updated: "ยังไม่บันทึก", buttons: [{ id: `b-${Date.now()}`, title: "", description: "", url: "", event: "", tone: "dark" }] };
  const [draft, setDraft] = useState<SalePage>(existing || blank);
  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [saved, setSaved] = useState(false);
  useEffect(() => { if (existing) setDraft(existing); }, [params?.id]);
  useEffect(() => { document.title = `${draft.name || "แก้ไขเซลเพจ"} — lnwsalepagetiktok`; return () => { document.title = "lnwsalepagetiktok — Sale Page Builder"; }; }, [draft.name]);
  const update = <K extends keyof SalePage>(key: K, value: SalePage[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const updateButton = (id: string, key: keyof PageButton, value: string) => setDraft((current) => ({ ...current, buttons: current.buttons.map((button) => button.id === id ? { ...button, [key]: value } : button) }));
  const commit = (status = draft.status) => {
    const page = { ...draft, status, slug: (draft.slug || draft.name || "my-sale-page").toLowerCase().trim().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, ""), updated: "เมื่อสักครู่นี้", visits: existing?.visits || 0, clicks: existing?.clicks || 0 };
    setPages((current) => current.some((item) => item.id === page.id) ? current.map((item) => item.id === page.id ? page : item) : [page, ...current]);
    setDraft(page); setSaved(true); window.setTimeout(() => setSaved(false), 2200); return page;
  };
  const preview = () => { const page = commit(); setLocation(`/p/${page.slug}`); };
  const addButton = () => update("buttons", [...draft.buttons, { id: `b-${Date.now()}`, title: "", description: "", url: "", event: "", tone: "dark" }]);
  const removeButton = (id: string) => update("buttons", draft.buttons.filter((button) => button.id !== id));
  const moveButton = (id: string, direction: -1 | 1) => { const index = draft.buttons.findIndex((button) => button.id === id); const next = index + direction; if (index < 0 || next < 0 || next >= draft.buttons.length) return; const buttons = [...draft.buttons]; [buttons[index], buttons[next]] = [buttons[next], buttons[index]]; update("buttons", buttons); };
  return <div className="editor-shell"><SideNav active="pages" /><main className="main-canvas editor-canvas"><MobileTopbar title={isNew ? "สร้างเซลเพจใหม่" : "แก้ไขเซลเพจ"} /><div className="editor-topbar"><button className="back-button" onClick={() => setLocation("/")}><ArrowLeft size={16} /> กลับไปเซลเพจของฉัน</button><div className="editor-actions"><span className="save-state">{saved ? <><Check size={14} /> บันทึกแล้ว</> : "การเปลี่ยนแปลงยังไม่บันทึก"}</span><button className="secondary-button" onClick={preview}><Eye size={16} /> พรีวิว</button><button className="primary-button" onClick={() => commit("published")}><Check size={16} /> เผยแพร่หน้า</button></div></div><div className="editor-heading"><div><span className="section-kicker">SALE PAGE BUILDER</span><h1>{isNew ? "เปิดหน้าใหม่ให้พร้อมขาย" : "ปรับหน้าให้คม แล้วกดเผยแพร่"}</h1><p>ทุกการแก้ไขจะสะท้อนในพรีวิวด้านขวาทันที</p></div><span className="editor-step"><b>01</b> เนื้อหา <ChevronRight size={14} /><b>02</b> ดีไซน์ <ChevronRight size={14} /><b>03</b> เผยแพร่</span></div><div className="editor-layout"><section className="editor-form"><div className="editor-tabs"><button className={activeTab === "content" ? "active" : ""} onClick={() => setActiveTab("content")}><LayoutDashboard size={16} /> เนื้อหา</button><button className={activeTab === "style" ? "active" : ""} onClick={() => setActiveTab("style")}><WandSparkles size={16} /> รูปลักษณ์</button></div>{activeTab === "content" ? <><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">01 · ข้อมูลหลัก</span><h2>บอกให้คนรู้ว่าหน้านี้คืออะไร</h2></div><span className="required-label">* จำเป็น</span></div><Field label="ชื่อหน้า / ชื่อร้าน"><input value={draft.name} onChange={(event) => update("name", event.target.value)} placeholder="เช่น ร้านของฉัน" /></Field><Field label="คำอธิบายสั้น" hint="บอกจุดเด่นในหนึ่งประโยค ให้คนอยากอ่านต่อ"><textarea value={draft.description} onChange={(event) => update("description", event.target.value)} placeholder="เช่น ของดีที่คัดมาให้คุณ ส่งไว ราคาดี" rows={3} /></Field><div className="two-fields"><Field label="ลิงก์หน้า (slug)" hint="ใช้ตัวอักษรอังกฤษ ตัวเลข และขีดกลาง"><div className="input-prefix"><span>lnwsalepagetiktok.com/</span><input value={draft.slug} onChange={(event) => update("slug", event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="my-shop" /></div></Field><Field label="โน้ตส่วนตัว" hint="ลูกค้าจะไม่เห็นข้อมูลนี้"><input value={draft.note} onChange={(event) => update("note", event.target.value)} placeholder="เช่น แคมเปญ TikTok ชุด A" /></Field></div></div><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">02 · ปุ่มหลัก</span><h2>พาคนไปสู่การซื้อ</h2></div><Zap size={18} color="#ff6b4a" /></div><div className="two-fields"><Field label="ข้อความบนปุ่ม"><input value={draft.cta} onChange={(event) => update("cta", event.target.value)} placeholder="เช่น สั่งซื้อสินค้าตอนนี้" /></Field><Field label="ลิงก์ปลายทาง"><input value={draft.ctaUrl} onChange={(event) => update("ctaUrl", event.target.value)} placeholder="https://your-store.com" /></Field></div><Field label="Conversion event" hint="เลือก event ที่ต้องการส่งไปยัง Pixel เมื่อมีการคลิก"><select value={draft.buttons[0]?.event || ""} onChange={(event) => draft.buttons[0] && updateButton(draft.buttons[0].id, "event", event.target.value)}>{eventOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field></div><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">03 · ปุ่มลิงก์</span><h2>รวมทุกช่องทางไว้ในหน้าเดียว</h2></div><button className="small-outline-button" onClick={addButton}><Plus size={15} /> เพิ่มปุ่ม</button></div><div className="button-editor-list">{draft.buttons.map((button, index) => <div className="button-editor" key={button.id}><div className="drag-handle"><GripVertical size={17} /></div><div className="button-editor-fields"><input value={button.title} onChange={(event) => updateButton(button.id, "title", event.target.value)} placeholder="ชื่อปุ่ม เช่น สั่งซื้อสินค้า" /><div className="button-editor-row"><input value={button.url} onChange={(event) => updateButton(button.id, "url", event.target.value)} placeholder="https://..." /><select value={button.event} onChange={(event) => updateButton(button.id, "event", event.target.value)}>{eventOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></div><input value={button.description} onChange={(event) => updateButton(button.id, "description", event.target.value)} placeholder="รายละเอียดสั้น ๆ (ไม่บังคับ)" /></div><div className="button-editor-actions"><IconButton label="เลื่อนขึ้น" onClick={() => moveButton(button.id, -1)}><ArrowUp size={14} /></IconButton><IconButton label="เลื่อนลง" onClick={() => moveButton(button.id, 1)}><ArrowDown size={14} /></IconButton><IconButton label="ลบปุ่ม" onClick={() => removeButton(button.id)} className="danger"><Trash2 size={14} /></IconButton></div><span className="button-index">{String(index + 1).padStart(2, "0")}</span></div>)}</div></div></> : <><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">01 · ธีม</span><h2>เลือก mood ที่เป็นตัวคุณ</h2></div></div><div className="theme-picker">{(Object.keys(themeMeta) as ThemeName[]).map((theme) => <button key={theme} className={draft.theme === theme ? "theme-choice selected" : "theme-choice"} onClick={() => { update("theme", theme); update("accent", themeMeta[theme].accent); }}><span className="theme-swatch" style={{ background: themeMeta[theme].bg, borderColor: themeMeta[theme].accent }}><i style={{ background: themeMeta[theme].accent }} /></span><b>{themeMeta[theme].label}</b>{draft.theme === theme && <Check size={14} />}</button>)}</div></div><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">02 · ภาพปก</span><h2>หยุดสายตาด้วยภาพแรก</h2></div></div><Field label="URL รูปแบนเนอร์" hint="แนะนำสัดส่วน 16:7 และภาพที่มีพื้นที่ว่างสำหรับเนื้อหา"><div className="upload-row"><input value={draft.hero} onChange={(event) => update("hero", event.target.value)} /><button className="small-outline-button"><Upload size={15} /></button></div></Field><div className="hero-upload-preview" style={{ backgroundImage: `url(${draft.hero})` }}><span><Upload size={15} /> วางลิงก์รูปภาพของคุณ</span></div></div><div className="form-card"><div className="form-card-heading"><div><span className="section-kicker">03 · สีแบรนด์</span><h2>ให้ทุกคลิกจำคุณได้</h2></div></div><div className="color-row"><label><span>สีหลัก</span><input type="color" value={draft.accent} onChange={(event) => update("accent", event.target.value)} /></label><div className="accent-preview" style={{ background: draft.accent }}><Check size={16} /> ปุ่มตัวอย่างของคุณ</div></div></div></>}</section><aside className="preview-column"><PreviewPanel draft={draft} /><div className="preview-note"><Sparkles size={15} /><span><b>เคล็ดลับ:</b> ใช้คำบนปุ่มที่ชัดและเริ่มด้วย action เช่น “สั่งซื้อ”, “รับโค้ด”, “ดูรีวิว” เพื่อเพิ่ม CTR</span></div></aside></div></main></div>;
}

function PublicPage({ pages }: { pages: SalePage[] }) {
  const [, params] = useRoute("/p/:slug");
  const page = pages.find((item) => item.slug === params?.slug) || pages[0];
  const palette = themeMeta[page.theme];
  const [copied, setCopied] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", payment: "cod" });
  useEffect(() => { document.title = `${page.name} — lnwsalepagetiktok`; return () => { document.title = "lnwsalepagetiktok — Sale Page Builder"; }; }, [page.name]);
  const copyLink = async () => { try { await navigator.clipboard.writeText(window.location.href); } catch {} setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const openCheckout = () => { setOrderDone(false); setCheckoutOpen(true); };
  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;
    const orderId = `LNW-${Date.now().toString().slice(-6)}`;
    localStorage.setItem(`lnw.order.${orderId}`, JSON.stringify({ orderId, page: page.slug, quantity, customer, createdAt: new Date().toISOString() }));
    setOrderDone(true);
  };
  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, button: PageButton) => {
    if (button.event === "purchase" || button.event === "initiate_checkout") { event.preventDefault(); openCheckout(); }
  };
  return <div className="public-wrap" style={{ background: palette.bg, color: palette.text, "--public-accent": page.accent } as React.CSSProperties}><div className="public-nav"><a href="/" className="public-brand-link"><span className="brand-mark"><Flame size={17} /></span><span>lnwsalepagetiktok</span></a><div><button className="public-nav-button" onClick={copyLink}>{copied ? <Check size={15} /> : <Share2 size={15} />} {copied ? "คัดลอกแล้ว" : "แชร์หน้านี้"}</button><button className="public-nav-button outline" onClick={openCheckout}><ShoppingCart size={14} /> สั่งซื้อ</button></div></div><main className="public-main"><div className="public-cover" style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.04) 0%, rgba(0,0,0,.46) 100%), url(${page.hero})` }}><span className="public-cover-tag"><Flame size={14} /> lnwsalepagetiktok</span><span className="public-cover-status"><span /> {page.status === "published" ? "Live" : "Preview"}</span></div><section className="public-profile"><div className="public-big-avatar" style={{ background: page.accent }}>J</div><h1>{page.name}</h1><p>{page.description}</p><button className="public-big-cta" style={{ background: page.accent }} onClick={openCheckout}>{page.cta || "ไปดูรายละเอียด"}<ShoppingCart size={17} /></button><div className="public-all-links">{page.buttons.map((button) => <a className={`public-big-link ${button.tone}`} href={button.url || "#"} onClick={(event) => handleLink(event, button)} key={button.id}><span className="link-copy"><b>{button.title || "ปุ่มลิงก์ของคุณ"}</b><small>{button.description}</small></span><ChevronRight size={18} /></a>)}</div><div className="public-socials"><span>ติดตามเรา</span><span className="social-dot">t</span><span className="social-dot">f</span><span className="social-dot">◎</span></div></section></main><footer className="public-footer-wide"><span>© 2026 {page.name}</span><span>สร้างด้วย <b>lnwsalepagetiktok</b></span></footer>{checkoutOpen && <div className="checkout-backdrop" role="dialog" aria-modal="true"><div className="checkout-modal">{orderDone ? <div className="order-success"><span className="success-icon"><Check size={28} /></span><h2>รับออเดอร์เรียบร้อยแล้ว</h2><p>ขอบคุณคุณ {customer.name} เราจะติดต่อกลับที่ {customer.phone} เพื่อยืนยันคำสั่งซื้อ</p><b>เลขที่คำสั่งซื้อ LNW-{Date.now().toString().slice(-6)}</b><button className="primary-button" onClick={() => setCheckoutOpen(false)}>ปิดหน้าต่าง</button></div> : <form onSubmit={submitOrder}><div className="checkout-head"><div><span className="section-kicker">QUICK CHECKOUT</span><h2>สั่งซื้อ {page.name}</h2><p>กรอกข้อมูลให้ครบ แล้วทีมงานจะติดต่อกลับเพื่อยืนยันออเดอร์</p></div><button type="button" className="icon-button" onClick={() => setCheckoutOpen(false)}><X size={18} /></button></div><div className="order-summary"><img src={page.hero} alt="" /><div><b>{page.name}</b><small>พร้อมจัดส่งทั่วประเทศ</small></div><div className="quantity"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><b>{quantity}</b><button type="button" onClick={() => setQuantity(quantity + 1)}>＋</button></div></div><div className="checkout-fields"><label>ชื่อผู้รับ<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} placeholder="เช่น คุณสมชาย" /></label><label>เบอร์โทรศัพท์<input required inputMode="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} placeholder="08x-xxx-xxxx" /></label><label>ที่อยู่จัดส่ง<textarea required value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} placeholder="บ้านเลขที่ ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์" rows={3} /></label><label>วิธีชำระเงิน<select value={customer.payment} onChange={(event) => setCustomer({ ...customer, payment: event.target.value })}><option value="cod">เก็บเงินปลายทาง</option><option value="transfer">โอนเงินหลังยืนยันออเดอร์</option></select></label></div><button className="checkout-submit" style={{ background: page.accent }} type="submit">ยืนยันสั่งซื้อ <ShoppingCart size={17} /></button><small className="checkout-note">ข้อมูลของคุณจะใช้เพื่อจัดส่งสินค้าและยืนยันออเดอร์เท่านั้น</small></form>}</div></div>}</div>;
}

export default function Home() {
  const [pages, setPages] = usePages();
  const [isEditor] = useRoute("/editor/:id");
  const [isPublic] = useRoute("/p/:slug");
  if (isPublic) return <PublicPage pages={pages} />;
  if (isEditor) return <Editor pages={pages} setPages={setPages} />;
  return <Dashboard pages={pages} setPages={setPages} />;
}
