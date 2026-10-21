// ═══════════════════════════════════════════════════════════════
// 隐私政策 /privacy（页脚和 Cookie 提示连到这里）
// ───────────────────────────────────────────────────────────────
// 色带顺序：① 标题（白）  ② 正文：这一页语言的版本（白，接在标题下面）
//          ③ 马来文版本（浅灰）：PDPA 规定隐私声明要有马来文和英文，所以中文页、英文页都附上马来文
// ⚠ 草稿：依《2010 年个人资料保护法》（PDPA，含 2024 年修订）第 7 条的通知事项整理，上线前必须请律师审阅。
//   「Cookie 与访客统计」那一段是照网站实际做法写的（GA4、同意后才载入、关闭广告个人化）。
//   电邮读 lib/site.ts 的 firm.email；最后更新日期是占位。
//   每个语言版本最后一行注明字体 MiSans（小米授权要求）。
// ═══════════════════════════════════════════════════════════════
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsentReset } from "@/lib/interactive";
import { common, firm, gaId, isLang, pageMeta } from "@/lib/site";

// 这一页有三种语言：zh / en 跟着网址，ms（马来文）两个语言的页面都显示
type Tri = { zh: string; en: string; ms: string };
type Part = { h2: Tri; p?: Tri[]; list?: Tri[]; after?: Tri[]; reset?: boolean };

// ─────────────────────────────────────────────
// 这一页的文字（中 / 英 / 马来文）
// ─────────────────────────────────────────────
const text = {
  title: { zh: "隐私政策", en: "Privacy Policy" },
  lead: { zh: "我们怎么收集、使用和保护你的个人资料。", en: "How we collect, use and protect your personal data." },
  updated: { zh: "最后更新：[日期]", en: "Last updated: [Date]" },
  ms: { zh: "马来文版本", en: "Bahasa Malaysia version", title: "Dasar Privasi (Bahasa Malaysia)" },
  reset: { zh: "更改 Cookie 设定", en: "Change cookie settings" },
  // 字体注明（MiSans 授权要求注明使用了 MiSans）：每个语言版本的最后一行
  fontCredit: { zh: "本网站字体使用 MiSans（小米）。", en: "This website uses the MiSans typeface by Xiaomi.", ms: "Laman web ini menggunakan fon MiSans oleh Xiaomi." } as Tri,
  // 每一段：h2 小标题 → 段落 p → 清单 list → 清单后的段落 after。{email} 会换成 firm.email
  parts: [
    {
      h2: { zh: "关于本政策", en: "About this policy", ms: "Mengenai dasar ini" },
      p: [{
        zh: "本隐私政策说明 Chai & Associates（以下称「本所」）如何依照《2010 年个人资料保护法》（PDPA）收集、使用、披露和保护你的个人资料。本所是你个人资料的资料控制者。",
        en: "This Privacy Policy explains how Chai & Associates (\"the Firm\") collects, uses, discloses and protects your personal data under the Personal Data Protection Act 2010 (PDPA). The Firm is the data controller of your personal data.",
        ms: "Dasar Privasi ini menerangkan bagaimana Chai & Associates (\"Firma\") mengumpul, menggunakan, mendedahkan dan melindungi data peribadi anda di bawah Akta Perlindungan Data Peribadi 2010 (PDPA). Firma ialah pengawal data bagi data peribadi anda.",
      }],
    },
    {
      h2: { zh: "我们收集哪些资料", en: "What we collect", ms: "Data yang kami kumpul" },
      p: [
        {
          zh: "你通过 WhatsApp、电话、电邮或到访办事处联系我们时提供的资料，例如姓名、电话号码、电邮地址，以及你告诉我们的案件和家庭情况（例如婚姻、孩子和财务状况）。",
          en: "Information you give us when you contact us by WhatsApp, phone, email or at our offices, such as your name, phone number, email address, and the details of your matter and family that you share (for example, your marriage, children and finances).",
          ms: "Maklumat yang anda berikan semasa menghubungi kami melalui WhatsApp, telefon, e-mel atau di pejabat kami, seperti nama, nombor telefon, alamat e-mel, serta butiran kes dan keluarga yang anda kongsikan (contohnya perkahwinan, anak-anak dan keadaan kewangan).",
        },
        {
          zh: "本网站不会用表格储存你的资料：询问表格只会帮你把讯息写好，再打开 WhatsApp，由你自己决定是否发送。",
          en: "This website does not store your data through forms: the enquiry form only prepares your message and opens WhatsApp, and you decide whether to send it.",
          ms: "Laman web ini tidak menyimpan data anda melalui borang: borang pertanyaan hanya menyediakan mesej anda lalu membuka WhatsApp, dan anda sendiri memutuskan sama ada untuk menghantarnya.",
        },
        {
          zh: "如果你同意 Cookie，本网站会通过 Google Analytics 收集访问资料（见下面「Cookie 与访客统计」）。",
          en: "If you accept cookies, this website collects visit data through Google Analytics (see \"Cookies and analytics\" below).",
          ms: "Jika anda menerima kuki, laman web ini mengumpul data lawatan melalui Google Analytics (lihat \"Kuki dan analitik\" di bawah).",
        },
      ],
    },
    {
      h2: { zh: "资料从哪里来", en: "Where it comes from", ms: "Sumber data" },
      p: [{
        zh: "资料主要由你本人提供。处理案件时，我们也可能从法庭文件、对方当事人或其律师、政府部门等取得与案件相关的资料。",
        en: "Most of your data comes from you. When handling your matter, we may also obtain relevant information from court documents, the other party or their lawyers, and government agencies.",
        ms: "Kebanyakan data diberikan oleh anda sendiri. Semasa mengendalikan kes anda, kami juga mungkin memperoleh maklumat berkaitan daripada dokumen mahkamah, pihak lawan atau peguam mereka, dan agensi kerajaan.",
      }],
    },
    {
      h2: { zh: "我们怎么使用这些资料", en: "How we use it", ms: "Tujuan penggunaan data" },
      p: [{ zh: "我们会用你的资料来：", en: "We use your data to:", ms: "Kami menggunakan data anda untuk:" }],
      list: [
        { zh: "回复你的咨询，并安排律师", en: "reply to your enquiry and arrange a lawyer", ms: "membalas pertanyaan anda dan mengatur peguam" },
        { zh: "评估和处理你的案件，包括进行利益冲突核查", en: "assess and handle your matter, including conflict-of-interest checks", ms: "menilai dan mengendalikan kes anda, termasuk semakan konflik kepentingan" },
        { zh: "与你沟通案件进展和账单", en: "keep you updated on your matter and send bills", ms: "memaklumkan perkembangan kes dan menghantar bil kepada anda" },
        { zh: "遵守法律、法庭和律师公会的规定", en: "comply with the law, the courts and the Bar Council's rules", ms: "mematuhi undang-undang, mahkamah dan peraturan Majlis Peguam" },
        { zh: "改善本网站（只限同意 Cookie 的访客统计）", en: "improve this website (analytics only, for visitors who accept cookies)", ms: "menambah baik laman web ini (analitik sahaja, bagi pelawat yang menerima kuki)" },
      ],
    },
    {
      h2: { zh: "一定要提供资料吗", en: "Do you have to provide it?", ms: "Adakah anda wajib memberikannya?" },
      p: [{
        zh: "提供资料是自愿的。不过，如果你不提供必要的资料，我们可能无法回复你的咨询或代表你处理案件。",
        en: "Providing your data is voluntary. However, if you do not provide the information we need, we may be unable to reply to your enquiry or act for you.",
        ms: "Pemberian data adalah secara sukarela. Namun, jika anda tidak memberikan maklumat yang diperlukan, kami mungkin tidak dapat membalas pertanyaan anda atau bertindak bagi pihak anda.",
      }],
    },
    {
      h2: { zh: "资料会披露给谁", en: "Who we share it with", ms: "Pendedahan kepada pihak ketiga" },
      p: [{
        zh: "我们不会出售你的个人资料。为了上述用途，资料可能披露给：",
        en: "We do not sell your personal data. For the purposes above, it may be disclosed to:",
        ms: "Kami tidak menjual data peribadi anda. Bagi tujuan di atas, data anda mungkin didedahkan kepada:",
      }],
      list: [
        { zh: "与你的案件有关的法庭、调解或辅导单位", en: "courts, mediation or counselling bodies involved in your matter", ms: "mahkamah, badan pengantaraan atau kaunseling yang berkaitan dengan kes anda" },
        { zh: "对方当事人或其律师（只限案件程序需要的范围）", en: "the other party or their lawyers (only as needed in the proceedings)", ms: "pihak lawan atau peguam mereka (setakat yang diperlukan dalam prosiding)" },
        { zh: "为本所提供服务的单位，例如通讯（WhatsApp）、电邮、资讯科技和网站统计（Google）", en: "the Firm's service providers, such as messaging (WhatsApp), email, IT and website analytics (Google)", ms: "pembekal perkhidmatan Firma, seperti perkhidmatan pesanan (WhatsApp), e-mel, teknologi maklumat dan analitik laman web (Google)" },
        { zh: "依法要求提供资料的政府或执法单位", en: "government or law enforcement agencies where required by law", ms: "agensi kerajaan atau penguat kuasa undang-undang apabila dikehendaki oleh undang-undang" },
      ],
    },
    {
      h2: { zh: "资料传送到马来西亚境外", en: "Transfers outside Malaysia", ms: "Pemindahan ke luar Malaysia" },
      p: [{
        zh: "部分服务供应商（例如 WhatsApp 和 Google）的伺服器可能位于马来西亚境外。我们只会在符合 PDPA 规定的情况下，把资料传送到境外。",
        en: "Some service providers (such as WhatsApp and Google) may store data on servers outside Malaysia. We only transfer data outside Malaysia in line with the PDPA.",
        ms: "Sesetengah pembekal perkhidmatan (contohnya WhatsApp dan Google) mungkin menyimpan data di pelayan di luar Malaysia. Kami hanya memindahkan data ke luar Malaysia mengikut kehendak PDPA.",
      }],
    },
    {
      h2: { zh: "资料保存多久", en: "How long we keep it", ms: "Tempoh penyimpanan" },
      p: [{
        zh: "我们只会在达成上述用途所需的期间，以及法律或专业规定要求的期间内保存你的资料，之后会安全地销毁或去识别化。",
        en: "We keep your data only for as long as needed for the purposes above and as required by law or professional rules. After that, it is securely destroyed or de-identified.",
        ms: "Kami menyimpan data anda hanya selama yang perlu untuk tujuan di atas dan seperti yang dikehendaki oleh undang-undang atau peraturan profesional. Selepas itu, data akan dimusnahkan dengan selamat atau dinyahkenal pasti.",
      }],
    },
    {
      h2: { zh: "资料安全", en: "Keeping it secure", ms: "Keselamatan data" },
      p: [{
        zh: "我们采取合理的保安措施，防止你的资料遗失、被误用、被未经授权查阅或披露。如果发生可能对你造成重大损害的资料外泄，我们会依法通知个人资料保护专员和你。",
        en: "We take reasonable security measures to protect your data from loss, misuse, and unauthorised access or disclosure. If a data breach is likely to cause you significant harm, we will notify the Personal Data Protection Commissioner and you as required by law.",
        ms: "Kami mengambil langkah keselamatan yang munasabah untuk melindungi data anda daripada kehilangan, penyalahgunaan, serta akses atau pendedahan tanpa kebenaran. Jika berlaku pelanggaran data yang mungkin menyebabkan kemudaratan ketara kepada anda, kami akan memaklumkan Pesuruhjaya Perlindungan Data Peribadi dan anda seperti yang dikehendaki oleh undang-undang.",
      }],
    },
    {
      h2: { zh: "你的权利", en: "Your rights", ms: "Hak anda" },
      p: [{ zh: "根据 PDPA，你可以：", en: "Under the PDPA, you may:", ms: "Di bawah PDPA, anda boleh:" }],
      list: [
        { zh: "要求查阅本所持有的你的个人资料", en: "ask for access to the personal data the Firm holds about you", ms: "meminta akses kepada data peribadi anda yang disimpan oleh Firma" },
        { zh: "要求更正不准确、不完整或过时的资料", en: "ask us to correct data that is inaccurate, incomplete or out of date", ms: "meminta pembetulan data yang tidak tepat, tidak lengkap atau lapuk" },
        { zh: "撤回同意，或要求限制我们处理你的资料（例如不再接收通讯）", en: "withdraw your consent, or ask us to limit how we process your data (for example, to stop receiving communications)", ms: "menarik balik persetujuan anda, atau meminta kami mengehadkan pemprosesan data anda (contohnya berhenti menerima komunikasi)" },
        { zh: "在法律允许的范围内，要求把你的资料传送给另一个资料控制者", en: "where the law allows, ask for your data to be transmitted to another data controller", ms: "setakat yang dibenarkan oleh undang-undang, meminta data anda dihantar kepada pengawal data lain" },
      ],
      after: [{
        zh: "如要提出以上要求，请用下面「联系我们」的方式联系本所。我们可能需要先确认你的身份；查阅资料的要求可能收取法律允许的费用。",
        en: "To make any of these requests, contact us using the details under \"Contact us\". We may need to verify your identity first, and a fee permitted by law may apply to data access requests.",
        ms: "Untuk membuat permintaan ini, hubungi kami melalui butiran di bawah \"Hubungi kami\". Kami mungkin perlu mengesahkan identiti anda terlebih dahulu, dan fi yang dibenarkan oleh undang-undang mungkin dikenakan bagi permintaan akses data.",
      }],
    },
    {
      h2: { zh: "Cookie 与访客统计", en: "Cookies and analytics", ms: "Kuki dan analitik" },
      p: [
        {
          zh: "本网站使用 Google Analytics 4 统计访问情况，例如看了哪些页面、从哪里来到本网站、使用什么装置。只有你按下「同意」后才会启用；按「不同意」就不会载入。",
          en: "This site uses Google Analytics 4 to understand how it is used, such as which pages are viewed, how visitors arrive and what devices they use. It is only turned on if you select Accept; if you select Decline, it is not loaded.",
          ms: "Laman web ini menggunakan Google Analytics 4 untuk memahami cara ia digunakan, seperti halaman yang dilihat, cara pelawat tiba dan peranti yang digunakan. Ia hanya diaktifkan jika anda memilih \"Accept\" (同意); jika anda memilih \"Decline\" (不同意), ia tidak dimuatkan.",
        },
        {
          zh: "我们已关闭 Google 的广告个人化与 Google 信号功能，统计资料不会用来向你投放广告。",
          en: "We have turned off Google's ad personalisation and Google signals, so this data is not used to show you ads.",
          ms: "Kami telah mematikan pemperibadian iklan dan Google signals, jadi data ini tidak digunakan untuk memaparkan iklan kepada anda.",
        },
      ],
      reset: true, // 这一段最后放「更改 Cookie 设定」按钮（只在这一页语言的版本）
    },
    {
      h2: { zh: "政策更新", en: "Changes to this policy", ms: "Kemas kini dasar ini" },
      p: [{
        zh: "我们可能不时更新本政策，更新后的版本会刊登在本页，并更新上面的日期。",
        en: "We may update this policy from time to time. The latest version will be posted on this page with the date updated above.",
        ms: "Kami mungkin mengemas kini dasar ini dari semasa ke semasa. Versi terkini akan disiarkan di halaman ini bersama tarikh kemas kini di atas.",
      }],
    },
    {
      h2: { zh: "联系我们", en: "Contact us", ms: "Hubungi kami" },
      p: [{
        zh: "如对本政策或你的个人资料有任何疑问或要求，请电邮 {email}，或联系任何一间办事处（见「办事处」页）。",
        en: "For any questions or requests about this policy or your personal data, email {email} or contact any of our offices (see the Locations page).",
        ms: "Untuk sebarang pertanyaan atau permintaan berkaitan dasar ini atau data peribadi anda, e-mel {email} atau hubungi mana-mana pejabat kami (lihat halaman Locations).",
      }],
    },
  ] as Part[],
};

// 把一段政策印成 h2 → 段落 → 清单 → 段落（放在 .prose 里）
function renderParts(lang: keyof Tri, withReset: boolean, resetLabel: string) {
  const t = (s: Tri) => s[lang].replace("{email}", firm.email);
  return [...text.parts.map((s) => [
    <h2 key={`${s.h2.en}-h`}>{t(s.h2)}</h2>,
    ...(s.p ?? []).map((p) => <p key={p.en}>{t(p)}</p>),
    s.list ? <ul key={`${s.h2.en}-l`}>{s.list.map((li) => <li key={li.en}>{t(li)}</li>)}</ul> : null,
    ...(s.after ?? []).map((p) => <p key={p.en}>{t(p)}</p>),
    s.reset && withReset ? <ConsentReset key={`${s.h2.en}-r`} label={resetLabel} /> : null,
  ]), <p key="font" className="muted">{text.fontCredit[lang]}</p>];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMeta(lang, "/privacy", text.title[lang], text.lead[lang]);
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      {/* ═══ ① 标题（白） ═══ */}
      <section className="page-head">
        <div className="container">
          <ol className="breadcrumb">
            <li><Link href={`/${lang}`}>{common.home[lang]}</Link></li>
            <li aria-current="page">{text.title[lang]}</li>
          </ol>
          <h1>{text.title[lang]}</h1>
          <p>{text.lead[lang]}</p>
          <p>{text.updated[lang]}</p>
        </div>
      </section>

      {/* ═══ ② 这一页语言的版本（白） ═══ */}
      <section className="section">
        <div className="container">
          <div className="prose">{renderParts(lang, Boolean(gaId), text.reset[lang])}</div>
        </div>
      </section>

      {/* ═══ ③ 马来文版本（浅灰；PDPA 规定） ═══ */}
      <section className="section section-muted" lang="ms">
        <div className="container">
          <div className="section-head">
            <h2>{text.ms.title}</h2>
            <p>{text.ms[lang]}</p>
          </div>
          <div className="prose">{renderParts("ms", false, "")}</div>
        </div>
      </section>
    </>
  );
}
