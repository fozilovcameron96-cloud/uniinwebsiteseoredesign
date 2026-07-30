import { useLang } from '../contexts/LangContext';

export default function UrgencyBar() {
  const { t } = useLang();
  return <div className="urgency">{t.urg}</div>;
}
