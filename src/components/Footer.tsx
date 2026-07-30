import { Phone, Mail, MapPin, Building2, Globe } from 'lucide-react';
import { useLang } from '../contexts/LangContext';

const LOGO = 'https://images2.imgbox.com/26/e7/4aGfmDdL_o.jpg';

const SOCIALS = [
  {
    href: 'https://wa.me/447459639803',
    label: 'WhatsApp',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg',
  },
  {
    href: 'https://t.me/UNIVERSITY_IN',
    label: 'Telegram',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg',
  },
  {
    href: 'https://www.instagram.com/uni.in.uk/',
    label: 'Instagram',
    icon: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
  },
];

const ICEF_LOGO = 'https://images2.imgbox.com/9e/6f/s52XIYDk_o.png';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer-root">
      <div className="footer-wrap">

        <div className="footer-brand">
          <a href="https://uni-in.co.uk/" target="_blank" rel="noreferrer" className="footer-logo-link">
            <img src={LOGO} alt="Universe In" className="footer-logo-img" />
            <span className="footer-logo-name">Universe<em>In</em></span>
          </a>
          <p className="footer-tagline">
            {t.footerTagline}
          </p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="footer-social-btn">
                <img src={s.icon} alt={s.label} loading="lazy" className="footer-social-icon" />
              </a>
            ))}
          </div>
          <div className="footer-accreditations">
            <div className="footer-accred-label">{t.footerAccredited}</div>
            <div className="footer-accred-logos">
              <a href="https://www.britishcouncil.org/" target="_blank" rel="noreferrer" className="footer-accred-item" aria-label="British Council">
                <img src="https://edmat.org/awards/bc.png" alt="British Council" className="footer-accred-img footer-accred-img--bc" />
              </a>
              <a href="https://www.icef.com/agency/001bG00000KfzLoQAJ" target="_blank" rel="noreferrer" className="footer-accred-item" aria-label="ICEF Accredited">
                <img src={ICEF_LOGO} alt="ICEF Accredited" className="footer-accred-img footer-accred-img--icef" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-nav">
          <div className="footer-col-title">{t.footerNav}</div>
          <ul className="footer-nav-list">
            <li><a href="#" className="footer-nav-link">{t.footerHome}</a></li>
            <li><a href="#" className="footer-nav-link">{t.footerHowItWorks}</a></li>
            <li><a href="#" className="footer-nav-link">{t.footerDestinations}</a></li>
            <li><a href="#" className="footer-nav-link">{t.footerTestimonials}</a></li>
            <li><a href="#" className="footer-nav-link">{t.footerFAQ}</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <div className="footer-col-title">{t.footerContact}</div>
          <ul className="footer-contact-list">
            <li>
              <Building2 size={13} color="var(--o)" strokeWidth={2} />
              <span>{t.footerCompany}</span>
            </li>
            <li>
              <MapPin size={13} color="var(--o)" strokeWidth={2} />
              <span>{t.footerAddress}</span>
            </li>
            <li>
              <Globe size={13} color="var(--o)" strokeWidth={2} />
              <a href="https://uni-in.co.uk/" target="_blank" rel="noreferrer" className="footer-contact-link">{t.footerWebsite}</a>
            </li>
            <li>
              <Mail size={13} color="var(--o)" strokeWidth={2} />
              <a href="mailto:info@universein.uk" className="footer-contact-link">{t.footerEmail}</a>
            </li>
            <li>
              <Phone size={13} color="var(--o)" strokeWidth={2} />
              <a href="tel:+447808165945" className="footer-contact-link">{t.footerPhone}</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Universe In Limited. {t.footerCopyright}</span>
        <span className="footer-bottom-sep">·</span>
        <span>{t.footerRegistered}</span>
        <span className="footer-bottom-sep">·</span>
        <span>{t.footerFreeStudents}</span>
      </div>
    </footer>
  );
}
