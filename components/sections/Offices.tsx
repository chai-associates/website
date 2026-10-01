import { copy } from "@/content/copy";
import { cities, offices, site } from "@/content/site";
import { t, type Locale } from "@/lib/i18n";
import { mapsLink } from "@/lib/whatsapp";

// 联系我们：先选城市，只显示该城市的办事处（手机、平板、电脑都一样）。
// 用浏览器原生的单选按钮（radio）＋ CSS 切换，不需要 JavaScript，
// 所以任何浏览器（包括旧版 Safari）都能点。
// ⚠️ 新增城市时：content/site.ts 加城市，并在 globals.css 的「Offices」加对应的一行规则。
export default function Offices({ lang }: { lang: Locale }) {
  const c = copy.contact;

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="sec-head">
          <p className="tag">{t(c.tag, lang)}</p>
          <h2>{t(c.title, lang)}</h2>
          <p className="sec-sub">{t(site.hours, lang)}</p>
        </div>

        {cities.map((ct, i) => (
          <input key={ct.id} type="radio" name="office-city" id={`city-${ct.id}`} className="city-radio" defaultChecked={i === 0} />
        ))}

        <div className="city-chips" role="radiogroup" aria-label={lang === "zh" ? "选择城市" : "Choose a city"}>
          {cities.map((ct) => (
            <label key={ct.id} htmlFor={`city-${ct.id}`} className={`city-chip chip-${ct.id}`}>
              {t(ct.label, lang)} <em>{offices.filter((o) => o.city === ct.id).length}</em>
            </label>
          ))}
        </div>

        <div className="offices">
          {offices.map((o) => (
            <div key={o.address} className={`office office-${o.city}`}>
              <p className="office-city">{t(cities.find((ct) => ct.id === o.city)!.label, lang)}</p>
              <h3>{t(o.name, lang)}</h3>
              <p className="office-addr">{o.address}</p>
              <div className="office-actions">
                <a className="btn btn-ghost" href={`tel:${o.phone}`}>{t(c.call, lang)} {o.phoneDisplay}</a>
                <a className="btn btn-ghost" href={mapsLink(o.address)} target="_blank" rel="noopener">{t(c.directions, lang)}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
