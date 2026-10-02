// ═══════════════════════════════════════════════════════════════
// 离婚百科 · 文章资料（只放资料，没有画面）
// 列表页 /divorcepedia、文章页 /divorcepedia/[slug]、服务页的「相关文章」都读这里。
// ───────────────────────────────────────────────────────────────
// 每篇文章：
//   slug      网址
//   category  属于哪个服务分类（跟 lib/site.ts 的 serviceCategories 同一套）
//   services  相关服务的 slug（服务页的「相关文章」、文章页的「相关服务」用）
//   title     标题（顾客会问的问题）· summary 一句话重点（列表卡片和文章开头）
//   body      内文：{ h2 } 小标题 · { p } 段落 · { list } 清单
//   image     封面照片（可不填，没填就是深灰底）：放进 public/images/divorcepedia/，填 "/images/divorcepedia/文章代号.jpg"
//             尺寸统一 2400 × 1350 px（16:9）；主体放在中间那条 2400 × 600 里（电脑版只显示这一条）
// 新增文章：照格式加一个物件就好。不要的文章：删掉那一个物件。
// ⚠ 内容整理自律所的「离婚 Divorce」文件，只改写成顾客看得懂的说法，没有新增法律内容。
//   上线前需由律师审稿（文件里有几处中英文不一致，已在对话中列出）。
// ═══════════════════════════════════════════════════════════════
import type { Bi, ServiceCategory } from "@/lib/site";

export type Block = { h2: Bi } | { p: Bi } | { list: Bi[] };
export type Article = { slug: string; category: ServiceCategory; services: string[]; title: Bi; summary: Bi; body: Block[]; image?: string };

export const articles: Article[] = [
  // ── 办理离婚 ─────────────────────────────────
  {
    slug: "joint-or-single-petition",
    category: "divorce",
    services: ["joint-petition", "single-petition"],
    title: { zh: "协议离婚还是单方面离婚？", en: "Joint or single petition: which applies to me?" },
    summary: { zh: "双方都同意，可以协议离婚；对方不同意，就要单方面申请。", en: "If you both agree, you can file jointly. If your spouse won't agree, you file on your own." },
    body: [
      { h2: { zh: "协议离婚：双方同意所有条件", en: "Joint petition: you agree on everything" } },
      { p: { zh: "夫妻双方都同意离婚，也同意所有离婚条件，例如赡养费、财产分配、孩子的抚养权与监护权，就可以向法庭申请协议离婚（LRA 第 52 条）。", en: "If you both agree to divorce and on all the terms, such as maintenance, division of assets, and custody and guardianship of the children, you can file a joint petition (s.52 LRA)." } },
      { p: { zh: "结婚满 2 年后才能申请。", en: "A joint petition can only be filed two years after the date of the marriage." } },
      { h2: { zh: "单方面离婚：不需要对方同意", en: "Single petition: your spouse's consent is not needed" } },
      { p: { zh: "如果对方不同意离婚，你可以自己向法庭申请，不需要对方同意（LRA 第 53 条）。你要证明婚姻已经破裂、无法挽回，法律接受以下四种情况（第 54 条）：", en: "If your spouse won't agree, you can petition the court on your own (s.53 LRA). You must show the marriage has broken down irretrievably, on one of four grounds (s.54):" } },
      { list: [
        { zh: "对方有外遇，你无法再忍受和对方一起生活", en: "Your spouse has committed adultery and you find it intolerable to live with them" },
        { zh: "对方的行为，让你无法再合理地和对方一起生活", en: "Your spouse has behaved in a way that you cannot reasonably be expected to live with them" },
        { zh: "对方遗弃你，持续至少 2 年", en: "Your spouse has deserted you for at least two years" },
        { zh: "你们已经分居，持续至少 2 年", en: "You have lived apart for at least two years" },
      ] },
      { p: { zh: "律师会准备好离婚申请书，交到对方手上，离婚程序就正式开始。", en: "Your lawyer prepares the petition and serves it on your spouse, which formally starts the proceedings." } },
    ],
  },
  {
    slug: "marriage-counselling",
    category: "divorce",
    services: ["single-petition"],
    title: { zh: "离婚前一定要做婚姻辅导吗？", en: "Do I need marriage counselling before divorcing?" },
    summary: { zh: "单方面离婚一般要先到国民登记局（JPN）接受辅导；协议离婚不需要。", en: "A single petition usually requires counselling at the National Registration Department (JPN) first. A joint petition does not." },
    body: [
      { h2: { zh: "什么时候需要辅导", en: "When counselling is required" } },
      { p: { zh: "根据 LRA 第 106 条，申请单方面离婚之前，一般要先到国民登记局（JPN）接受婚姻辅导。协议离婚不需要辅导。", en: "Under s.106 LRA, before filing a single petition you will usually be referred to the National Registration Department (JPN) for counselling. This does not apply to a joint petition." } },
      { h2: { zh: "辅导的程序", en: "How it works" } },
      { list: [
        { zh: "向 JPN 填写 KC 14 表格申请辅导（费用 RM2）", en: "Apply to JPN using form KC 14 (fee: RM2)" },
        { zh: "辅导后仍无法解决，JPN 会发出 KC 29 证书（费用 RM20），证明双方无法和解", en: "If counselling does not resolve matters, JPN issues a KC 29 certificate of non-conciliation (fee: RM20)" },
        { zh: "拿到证书后，才可以通过律师向法庭提出单方面离婚申请", en: "With the certificate, your lawyer can file the petition in court" },
      ] },
      { h2: { zh: "可以不做辅导吗？", en: "Can counselling be waived?" } },
      { p: { zh: "以下情况，可以向法庭申请豁免辅导：", en: "You can ask the court to waive counselling in any of these situations:" } },
      { list: [
        { zh: "你被对方遗弃，而且不知道对方在哪里", en: "Your spouse has deserted you and you don't know where they are" },
        { zh: "对方住在国外，申请后 6 个月内不太可能回来", en: "Your spouse lives abroad and is unlikely to return within six months of the petition" },
        { zh: "对方故意不出席辅导", en: "Your spouse has wilfully failed to attend counselling" },
        { zh: "对方被判 5 年或以上的监禁", en: "Your spouse has been imprisoned for five years or more" },
        { zh: "对方患有无法治愈的精神疾病", en: "Your spouse is suffering from an incurable mental illness" },
        { zh: "法庭认为有特殊情况，让辅导变得不实际", en: "The court is satisfied there are exceptional circumstances that make counselling impracticable" },
      ] },
      { p: { zh: "如果对方连续 3 次缺席辅导，你要先向 JPN 取得 KC 28 证书，证明辅导因此被取消，才能向法庭申请豁免。", en: "If your spouse has missed counselling three times, you first need a KC 28 certificate from JPN confirming it was cancelled before applying for a waiver." } },
      { p: { zh: "「特殊情况」由法庭按每个案件决定。过去的例子包括：双方分居多年、期间完全没有联系；对方长期住在国外；继续辅导会危及你和孩子的安全。", en: "What counts as exceptional depends on each case. Past examples include parties who had lived apart for many years with no contact, a spouse living abroad long-term, and situations where counselling would put you or your children at risk." } },
    ],
  },
  {
    slug: "documents-and-terms",
    category: "divorce",
    services: ["joint-petition", "single-petition"],
    title: { zh: "申请离婚要准备什么？", en: "What do I need to prepare for a divorce?" },
    summary: { zh: "准备好几份文件，想清楚 5 个离婚条件，律师就能开始帮你。", en: "A few documents and a clear view of five key terms are all your lawyer needs to get started." },
    body: [
      { h2: { zh: "你需要准备的文件", en: "Documents to bring" } },
      { list: [
        { zh: "结婚证书", en: "Marriage certificate" },
        { zh: "双方的身份证（MyKad）", en: "Both parties' identity cards (MyKad)" },
        { zh: "孩子的报生纸（如果有孩子）", en: "Children's birth certificates, if any" },
        { zh: "资产相关文件，例如房子的买卖合约", en: "Documents for your assets, such as a property sale and purchase agreement" },
      ] },
      { p: { zh: "离婚申请书、宣誓书等法庭文件，会由律师为你准备。", en: "Court documents such as the petition and supporting affidavit are prepared by your lawyer." } },
      { h2: { zh: "离婚申请要写清楚的 5 个条件", en: "Five terms your petition must cover" } },
      { list: [
        { zh: "配偶赡养费", en: "Spousal maintenance" },
        { zh: "孩子的抚养权与监护权（由谁照顾和管教）", en: "Custody, care and control of the children" },
        { zh: "没有抚养权的一方探视孩子的安排", en: "Access for the parent without custody" },
        { zh: "子女抚养费", en: "Child maintenance" },
        { zh: "婚姻财产的分配", en: "Division of matrimonial assets" },
      ] },
      { p: { zh: "如果有孩子，申请时也要说明孩子的居住环境与照顾者、教育、经济来源和探视安排。", en: "If you have children, the petition also sets out where they live and who cares for them, their schooling, who supports them financially, and access arrangements." } },
    ],
  },
  {
    slug: "responding-to-a-petition",
    category: "divorce",
    services: ["responding"],
    title: { zh: "收到离婚申请怎么办？", en: "I've been served a divorce petition. What now?" },
    summary: { zh: "收到对方的离婚申请后，你只有 21 天可以回应。", en: "Once you're served, you have 21 days to respond." },
    body: [
      { h2: { zh: "你要做什么", en: "What you need to do" } },
      { p: { zh: "你要在 21 天内提交答辩书（Answer to Petition），写明你不同意的事项和事实。", en: "Within 21 days, file an Answer to Petition setting out every issue and fact you dispute." } },
      { p: { zh: "如果你也想以自己的理由提出离婚，可以同时提出反申请（Cross Petition）。", en: "If you also want a divorce on your own grounds, you can file a Cross Petition." } },
      { h2: { zh: "之后会怎样", en: "What happens next" } },
      { p: { zh: "对方可以回复你的答辩书；如果你提出了反申请，对方也要回应。之后由法庭安排下一步。", en: "Your spouse may file a Reply to your Answer, and must answer any Cross Petition. The court then directs the next steps." } },
      { p: { zh: "不要错过 21 天的期限。越早找律师，你的选择越多。", en: "Don't miss the 21-day deadline. The earlier you get advice, the more options you have." } },
    ],
  },
  {
    slug: "adultery",
    category: "divorce",
    services: ["adultery"],
    title: { zh: "对方出轨：怎么证明？可以索赔吗？", en: "Adultery: how is it proved, and can I claim damages?" },
    summary: { zh: "对方出轨导致婚姻破裂，你可以申请离婚，并向对方和第三者索赔。", en: "If adultery led to the breakdown, you can petition for divorce and claim damages from your spouse and the third party." } ,
    body: [
      { h2: { zh: "可以索赔吗？", en: "Can I claim damages?" } },
      { p: { zh: "可以。婚姻因一方出轨而破裂，你可以向法庭申请离婚，并在离婚申请中要求赔偿。你不只可以向出轨的一方索赔，也可以向第三者索赔。", en: "Yes. Where adultery led to the breakdown of the marriage, you can petition for divorce and claim damages in the same petition, from your spouse as well as the third party." } },
      { p: { zh: "要向第三者索赔，第三者必须被列为共同答辩人（Co-respondent）（LRA 第 58 条）。在某些情况下，法庭也可以要求第三者支付诉讼费用（第 59 条）。", en: "The third party must be named as co-respondent (s.58 LRA). In some circumstances the court may also order the co-respondent to pay the costs of the proceedings (s.59)." } },
      { h2: { zh: "怎样才算出轨？", en: "What counts as adultery?" } },
      { p: { zh: "法律没有直接定义。根据过去的判例，出轨是指已婚人士与配偶以外的异性，自愿发生性关系。", en: "The LRA does not define it. Case law describes it as voluntary sexual intercourse between a married person and someone of the opposite sex who is not their spouse." } },
      { h2: { zh: "怎么证明？", en: "How is it proved?" } },
      { p: { zh: "出轨通常很难有直接证据，所以法庭也接受间接证据，例如：", en: "Direct evidence is rare, so the court also accepts circumstantial evidence, such as:" } },
      { list: [
        { zh: "对方与第三者之间有孩子", en: "A child of your spouse and the third party" },
        { zh: "对方与第三者经常单独共处一室", en: "Your spouse and the third party regularly found alone together in a closed room" },
        { zh: "对方为第三者购买资产", en: "Property bought by your spouse for the third party" },
        { zh: "双方的聊天记录", en: "Chat history between them" },
      ] },
      { p: { zh: "这些可以通过照片、影片或证人来证明。", en: "These can be shown through photographs, videos or witnesses." } },
    ],
  },
  {
    slug: "annulment-vs-divorce",
    category: "divorce",
    services: ["annulment"],
    title: { zh: "婚姻无效和离婚有什么不同？", en: "Annulment or divorce: what's the difference?" },
    summary: { zh: "离婚是结束一段有效的婚姻；婚姻无效则是把婚姻视为从来不存在。", en: "Divorce ends a valid marriage. Annulment treats the marriage as never having existed." },
    body: [
      { h2: { zh: "两者的分别", en: "The difference" } },
      { p: { zh: "离婚和婚姻无效都能让婚姻结束，但离婚是结束一段有效的婚姻，婚姻无效则是把婚姻视为从来没有存在过。婚姻无效分为两种：无效婚姻、可撤销的婚姻。", en: "Both bring a marriage to an end, but divorce ends a valid marriage, while annulment treats it as never having existed. There are two kinds: void and voidable marriages." } },
      { h2: { zh: "无效婚姻：从一开始就不成立", en: "Void marriage: never valid from the start" } },
      { p: { zh: "根据 LRA 第 69 条，以下婚姻无效：", en: "Under s.69 LRA, a marriage is void if:" } },
      { list: [
        { zh: "结婚时，其中一方已有仍然有效的合法婚姻", en: "Either party was already lawfully married, and that marriage was still in force" },
        { zh: "未达法定结婚年龄，又没有取得首席部长或州务大臣的特别准许", en: "A party was under the legal age to marry without a special licence from the Chief Minister" },
        { zh: "双方属于法律禁止通婚的亲属关系（除非取得特别准许）", en: "The parties are within the prohibited degrees of relationship, unless a special licence was granted" },
        { zh: "双方并非一男一女", en: "The parties are not respectively male and female" },
      ] },
      { p: { zh: "这一条只适用于 1982 年 3 月 1 日之后的婚姻。", en: "This applies only to marriages after 1 March 1982." } },
      { h2: { zh: "可撤销的婚姻：法庭判决前仍然有效", en: "Voidable marriage: valid until the court annuls it" } },
      { p: { zh: "可撤销的婚姻在法庭判决撤销之前都是有效的，双方仍享有婚姻中的所有权利和义务。根据 LRA 第 70 条，有以下 6 种情况：", en: "A voidable marriage is valid until the court annuls it, and both parties keep all the rights and obligations of marriage until then. Under s.70 LRA, the grounds are:" } },
      { list: [
        { zh: "因一方无法圆房，婚姻未完成", en: "The marriage has not been consummated because either party is incapable of it" },
        { zh: "因对方故意拒绝圆房，婚姻未完成", en: "The marriage has not been consummated because the other party wilfully refuses" },
        { zh: "一方因被胁迫、误解、心智不健全等原因，并非真正同意结婚", en: "Either party did not validly consent, because of duress, mistake, unsoundness of mind or otherwise" },
        { zh: "结婚时，一方因精神障碍而不适合结婚", en: "At the time of the marriage, either party was unfit for marriage because of a mental disorder" },
        { zh: "结婚时，对方患有会传染的性病", en: "At the time of the marriage, the other party had a communicable venereal disease" },
        { zh: "结婚时，对方已怀有他人的孩子", en: "At the time of the marriage, the other party was pregnant by someone else" },
      ] },
    ],
  },

  // ── 孩子 ───────────────────────────────────
  {
    slug: "custody-and-guardianship",
    category: "children",
    services: ["custody"],
    title: { zh: "抚养权和监护权有什么不同？法庭怎么决定？", en: "Custody and guardianship: what's the difference, and how does the court decide?" },
    summary: { zh: "法庭决定孩子跟谁时，最看重的永远是孩子的福祉。", en: "When deciding who the children live with, the court's first concern is always their welfare." },
    body: [
      { h2: { zh: "抚养权和监护权", en: "Custody and guardianship" } },
      { p: { zh: "两者在法律上很接近，通常一起处理。", en: "The two are closely linked in law and usually decided together." } },
      { list: [
        { zh: "抚养权：照顾和管教孩子、与孩子一起生活的权利，也是照顾孩子的责任", en: "Custody: the right to care for and control the child and to have the child live with you, together with the duty to look after them" },
        { zh: "监护权：根据《1961 年未成年人监护法令》和 LRA，监护人要为孩子的健康、教育和财产负责，并以孩子的利益为重。有监护权的人，也会有抚养权", en: "Guardianship: under the Guardianship of Infants Act 1961 and the LRA, a guardian is responsible for the child's health, education and property, and must act in the child's best interests. A guardian also has custody" },
      ] },
      { h2: { zh: "法庭会考虑什么？", en: "What the court considers" } },
      { list: [
        { zh: "孩子的福祉，这是最重要的因素", en: "The welfare of the child, which comes first" },
        { zh: "孩子的年龄和性别：一般上，7 岁或以下的孩子较常交由母亲照顾", en: "The child's age and sex: very young children (generally up to 7) are more often placed with their mother" },
        { zh: "孩子的意愿：要看孩子是否已经能清楚表达，每个案件不同", en: "The child's wishes, depending on whether the child is old enough to express them, which varies case by case" },
        { zh: "父母的意愿", en: "The parents' wishes" },
        { zh: "宗教、种族与文化背景", en: "Religion, race and cultural background" },
        { zh: "父母双方的行为", en: "The conduct of each parent" },
        { zh: "双方和解的可能性", en: "The possibility of reconciliation" },
        { zh: "教育与经济条件", en: "Education and material circumstances" },
        { zh: "健康因素", en: "Medical and health factors" },
        { zh: "生活环境：法庭倾向让孩子留在已经熟悉的环境", en: "Stability: the court is reluctant to move a child from familiar surroundings" },
      ] },
    ],
  },
  {
    slug: "access-to-children",
    category: "children",
    services: ["access"],
    title: { zh: "没有抚养权，还能见孩子吗？", en: "Can I still see my children without custody?" },
    summary: { zh: "没有抚养权的一方，法庭一般上仍会给予探视权。", en: "The court will usually grant access to the parent without custody." },
    body: [
      { p: { zh: "离婚后，没有获得抚养权和监护权的一方，法庭一般会给予探视权，但这一方不能为孩子的生活做决定。", en: "After divorce, the court usually grants access to the parent who does not have custody and guardianship, though that parent cannot make decisions about the child's life." } },
      { h2: { zh: "法庭会考虑什么？", en: "What the court considers" } },
      { list: [
        { zh: "孩子的福祉：年龄、健康、教育和整体福利", en: "The child's interests: age, health, education and overall well-being" },
        { zh: "孩子的安全，例如探视时间不能太晚", en: "The child's safety, for example visits not running late at night" },
        { zh: "孩子和这一方的关系", en: "The relationship between the child and that parent" },
      ] },
      { p: { zh: "法庭会根据这些因素，决定是否给予探视权，以及探视的时间和次数。", en: "Based on these, the court decides whether to grant access, and how often and when visits take place." } },
    ],
  },

  // ── 财产与赡养费 ───────────────────────────────
  {
    slug: "maintenance",
    category: "finances",
    services: ["spousal-maintenance", "child-maintenance"],
    title: { zh: "赡养费和子女抚养费怎么决定？", en: "How are spousal and child maintenance decided?" },
    summary: { zh: "法庭会看双方的经济能力和需要，以及原本的生活水平。", en: "The court looks at each party's means and needs, and the standard of living during the marriage." },
    body: [
      { h2: { zh: "子女抚养费", en: "Child maintenance" } },
      { list: [
        { zh: "要足够让孩子好好成长，并维持孩子原本的生活水平", en: "Enough to bring the children up properly and keep the standard of living they had" },
        { zh: "要在父母的经济能力范围之内", en: "Within the parent's means and station in life" },
      ] },
      { h2: { zh: "配偶赡养费", en: "Spousal maintenance" } },
      { p: { zh: "根据 LRA 第 78 条和过去的判例，法庭会考虑：", en: "Under s.78 LRA and case law, the court considers:" } },
      { list: [
        { zh: "双方的收入和生活需要", en: "Each party's means and needs" },
        { zh: "双方对婚姻破裂的责任", en: "Each party's responsibility for the breakdown of the marriage" },
        { zh: "支付方的能力：金额不会超过对方能负担的范围", en: "The paying party's means: the amount should not exceed what they can afford" },
        { zh: "婚姻长短：婚姻越长，金额可能越高", en: "Length of the marriage: a longer marriage may mean a higher amount" },
        { zh: "在婚姻中的角色：例如长期当家庭主妇、离婚后不容易找到工作，金额可能较高", en: "Role in the marriage: for example, a homemaker unlikely to find work after divorce may receive more" },
        { zh: "健康状况", en: "Health" },
        { zh: "婚姻期间的生活水平", en: "The standard of living during the marriage" },
      ] },
      { p: { zh: "如果妻子有足够的经济能力维持自己的生活，法庭也可能不判赡养费。", en: "If the wife has enough means to support herself, the court may make no order for maintenance." } },
    ],
  },
  {
    slug: "matrimonial-assets",
    category: "finances",
    services: ["matrimonial-assets", "debt-recovery"],
    title: { zh: "哪些算婚姻财产？离婚时怎么分？", en: "What counts as matrimonial assets, and how are they divided?" },
    summary: { zh: "婚姻期间共同努力得到的财产，离婚时由法庭分配。", en: "Assets built up through joint effort during the marriage are divided by the court on divorce." },
    body: [
      { h2: { zh: "哪些算婚姻财产？", en: "What counts" } },
      { p: { zh: "LRA 第 76 条把婚姻中的财产分成三类：", en: "Section 76 LRA divides assets into three types:" } },
      { list: [
        { zh: "夫妻共同努力得到的财产", en: "Assets acquired by the joint efforts of both parties" },
        { zh: "一方独自努力得到的财产", en: "Assets acquired by one party's sole effort" },
        { zh: "一方婚前已有、但在婚姻期间因另一方或双方努力而大幅增值的财产", en: "Assets owned before the marriage but substantially improved by the other party or by joint effort" },
      ] },
      { p: { zh: "第一类和第三类属于婚姻财产，离婚时法庭必须分配。", en: "The first and third types are matrimonial assets, which the court must divide on divorce." } },
      { h2: { zh: "常见的例子", en: "Common examples" } },
      { list: [
        { zh: "婚房，以及为整个家庭使用的物品", en: "The matrimonial home and everything in it used by the family" },
        { zh: "婚姻期间买的其他房地产", en: "Other property bought during the marriage" },
        { zh: "汽车、银行存款、珠宝、公司股份（包括家族生意）、俱乐部会员资格", en: "Cars, bank savings, jewellery, company shares (including family businesses) and club memberships" },
        { zh: "婚姻期间缴纳的公积金（EPF）", en: "EPF contributions made during the marriage" },
        { zh: "婚姻期间累积的保单、酬金、就业与退休福利", en: "Insurance policies, gratuities, and employment and retirement benefits built up during the marriage" },
        { zh: "一方送给另一方、价值较高的礼物", en: "Gifts of substantial value from one spouse to the other" },
      ] },
      { h2: { zh: "法庭怎么分？", en: "How the court divides them" } },
      { list: [
        { zh: "双方以金钱、财产或工作作出的贡献", en: "Each party's contributions in money, property or work" },
        { zh: "照顾家庭的一方的贡献，即使没有出钱", en: "Contributions by the party who looked after the home and family, even without paying" },
        { zh: "为家庭共同利益而欠下的债务", en: "Debts taken on for the family's joint benefit" },
        { zh: "未成年孩子的需要", en: "The needs of any minor children" },
        { zh: "婚姻的长短", en: "The length of the marriage" },
      ] },
      { p: { zh: "在马来西亚，双方在婚姻中的行为（无论好坏）不会影响财产分配。", en: "In Malaysia, either party's conduct during the marriage, good or bad, does not affect the division of assets." } },
      { h2: { zh: "欠债可以一起追讨吗？", en: "Can debts be claimed too?" } },
      { p: { zh: "可以，欠款可以在离婚申请中一并追讨。", en: "Yes. Debts can be claimed within the divorce petition." } },
    ],
  },

  // ── 离婚之后 ─────────────────────────────────
  {
    slug: "enforcing-court-orders",
    category: "after-divorce",
    services: ["enforcement"],
    title: { zh: "对方不付赡养费、不遵守法庭令怎么办？", en: "My ex isn't paying or following the court order. What can I do?" },
    summary: { zh: "你可以申请法庭强制执行，前提是法庭令里有「惩罚条款」。", en: "You can ask the court to enforce it, provided the order contains a penal clause." },
    body: [
      { p: { zh: "离婚判决中，法庭可能要求一方做某些事，例如按时支付赡养费。如果对方不遵守，你可以向法庭申请藐视法庭程序（committal proceedings），要求对方遵守。", en: "A divorce order may require your ex to do something, such as pay maintenance on time. If they don't, you can start committal proceedings to compel them to comply." } },
      { h2: { zh: "先确认法庭令里有没有「惩罚条款」", en: "First, check the order has a penal clause" } },
      { p: { zh: "申请之前，法庭令里必须有惩罚条款（penal clause），大意是：如果对方没有在期限内遵守，就会被强制执行。", en: "Before applying, the order must carry a penal clause, stating in effect that if the person does not comply in time, they will be liable to enforcement." } },
      { p: { zh: "没有这项条款，法庭会驳回申请。不过，这个问题可以通过在法庭令中补上惩罚条款来解决。", en: "Without it, the court will dismiss the application. This can be fixed by having a penal clause added to the order." } },
    ],
  },
  {
    slug: "foreign-divorce",
    category: "after-divorce",
    services: ["foreign-divorce"],
    title: { zh: "在国外离婚，回马来西亚要怎么更新婚姻状况？", en: "Divorced overseas: how do I update my status in Malaysia?" },
    summary: { zh: "需要先向马来西亚高等法庭申请承认外国离婚令，才能在 JPN 登记。", en: "You first need a Malaysian High Court order recognising the foreign divorce before JPN can register it." },
    body: [
      { p: { zh: "如果你们在国外结婚或登记，又在国外离婚并取得离婚令，你在马来西亚的婚姻状况不会自动更新。", en: "If your marriage was registered abroad and you obtained a divorce order overseas, your marital status in Malaysia is not updated automatically." } },
      { p: { zh: "JPN 无权直接登记外国的离婚令，所以你要先向马来西亚高等法庭申请「离婚令声明」（declaration of divorce order）（LRA 第 107(3) 条），再交给 JPN 登记。", en: "JPN cannot register a foreign divorce order directly, so you first apply to the High Court for a declaration of divorce order (s.107(3) LRA), which is then registered with JPN." } },
    ],
  },
];
