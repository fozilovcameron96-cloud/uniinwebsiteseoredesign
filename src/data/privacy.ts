import type { Lang } from './translations';

// ─── PRIVACY POLICY ───────────────────────────────────────────────────────────
// Required before a Meta Instant Form can be published: every lead form has a
// mandatory Privacy Policy URL field, and Meta will not save the form without
// one. It also has to be a real page about how THIS business handles the data,
// not a link to somebody else's policy.
//
// Written to match what the system actually does, which is why the processor
// table below names Supabase, Resend, OpenRouter and Google rather than being
// the usual boilerplate — those are the services a student's answers really
// pass through.
//
// TWO THINGS NEED THE OWNER'S DECISION BEFORE THIS IS RELIED ON:
//   1. Retention. 24 months is a reasonable default, not a legal requirement.
//   2. Marketing. This says contact is about the enquiry only. Sending general
//      marketing to old leads later needs a consent tick on the form and a
//      line here first.
// A solicitor should see it. It names a real company as data controller.

export interface PrivacySection {
  heading: string;
  body?: string[];
  list?: string[];
  /** Rendered as a two-column table: who, and what they do. */
  processors?: [string, string][];
  /** Paragraphs that belong after the table rather than before it. */
  body2?: string[];
}

export interface PrivacyDoc {
  title: string;
  updated: string;
  backToSite: string;
  sections: PrivacySection[];
}

const UPDATED_EN = 'Last updated: 16 October 2026';
const UPDATED_RU = 'Последнее обновление: 16 октября 2026';
const UPDATED_UZ = 'Oxirgi yangilanish: 2026-yil 16-oktabr';

const COMPANY_LINE =
  'UNIVERSE.IN LIMITED, 27 Inglis Way, Wrest House, London NW7 1TP, United Kingdom.';

export const PRIVACY: Record<Lang, PrivacyDoc> = {
  en: {
    title: 'Privacy Policy',
    updated: UPDATED_EN,
    backToSite: '← Back to site',
    sections: [
      {
        heading: 'Who we are',
        body: [
          `Universe In is a company registered in England and Wales, company number 16049326, at ${COMPANY_LINE}`,
          'We are the data controller for the information described here. You can reach us at info@universein.uk or +44 7808 165945.',
        ],
      },
      {
        heading: 'What we collect',
        body: ['When you send us an enquiry — on this website, or through a form on Facebook or Instagram — we collect:'],
        list: [
          'Your name',
          'Your WhatsApp number and email address',
          'What you want to study, your English language level, and the budget you have available',
          'Your country, which we work out from your phone number’s country code',
          'Anything else you choose to tell us',
        ],
      },
      {
        heading: 'Why we use it',
        body: [
          'To answer your enquiry and advise you on studying abroad. This is processing necessary to take steps at your request before entering into an agreement with you.',
          'To work out which universities and programmes may suit you. We review your answers, including with automated assistance, so our consultants can prepare before speaking to you. No decision about your application to any university is made automatically — a person always decides, and you can ask us to review anything by hand.',
          'To contact you by WhatsApp, email or phone about your enquiry.',
          'We do not sell your information to anyone.',
        ],
      },
      {
        heading: 'Who we share it with',
        body: ['These service providers process your data on our instructions:'],
        processors: [
          ['Supabase', 'Secure database where your enquiry is stored'],
          ['Google', 'Internal record our consultants work from'],
          ['Resend', 'Sends you confirmation and follow-up email'],
          ['OpenRouter', 'Automated summary of your enquiry for our consultants'],
          ['Vercel', 'Hosts this website and our systems'],
          ['Meta', 'Hosts the form, if you applied through Facebook or Instagram'],
        ],
        body2: [
          'We also share your details with universities and education providers you ask us to apply to, which may be outside the UK.',
          'Where your data leaves the UK, we rely on the UK’s approved transfer safeguards, such as the International Data Transfer Agreement or UK Addendum.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We keep your enquiry for 24 months after we last hear from you, and then delete it.',
          'If you become a student we work with, we keep your records for as long as we need them to support your application, and afterwards for as long as the law requires.',
        ],
      },
      {
        heading: 'Your rights',
        body: ['You can ask us to:'],
        list: [
          'Give you a copy of what we hold about you',
          'Correct anything that is wrong',
          'Delete your information',
          'Stop using it, or limit how we use it',
          'Send your information to someone else',
        ],
      },
      {
        heading: 'Complaints',
        body: [
          'Email info@universein.uk and we will reply within one month, free of charge.',
          'If you are unhappy with how we have handled your information, you can complain to the UK Information Commissioner’s Office at ico.org.uk, or to the data protection authority in your own country.',
        ],
      },
      {
        heading: 'Changes',
        body: ['If we change this policy, we will update the date at the top of this page.'],
      },
    ],
  },

  ru: {
    title: 'Политика конфиденциальности',
    updated: UPDATED_RU,
    backToSite: '← Вернуться на сайт',
    sections: [
      {
        heading: 'Кто мы',
        body: [
          `Universe In — компания, зарегистрированная в Англии и Уэльсе, регистрационный номер 16049326, адрес: ${COMPANY_LINE}`,
          'Мы являемся контролёром данных, описанных на этой странице. Связаться с нами: info@universein.uk или +44 7808 165945.',
        ],
      },
      {
        heading: 'Какие данные мы собираем',
        body: ['Когда вы отправляете нам заявку — на этом сайте или через форму в Facebook или Instagram — мы собираем:'],
        list: [
          'Ваше имя',
          'Ваш номер WhatsApp и адрес электронной почты',
          'Что вы хотите изучать, ваш уровень английского языка и доступный вам бюджет',
          'Вашу страну, которую мы определяем по коду страны в вашем номере телефона',
          'Всё остальное, что вы решите нам сообщить',
        ],
      },
      {
        heading: 'Зачем мы это используем',
        body: [
          'Чтобы ответить на вашу заявку и проконсультировать вас по обучению за рубежом. Это обработка, необходимая для действий по вашему запросу до заключения соглашения с вами.',
          'Чтобы определить, какие университеты и программы вам подходят. Мы изучаем ваши ответы, в том числе с помощью автоматизированных средств, чтобы консультант подготовился до разговора с вами. Ни одно решение о вашей заявке в университет не принимается автоматически — решение всегда принимает человек, и вы можете попросить нас пересмотреть любой вопрос вручную.',
          'Чтобы связаться с вами в WhatsApp, по электронной почте или по телефону по поводу вашей заявки.',
          'Мы никому не продаём ваши данные.',
        ],
      },
      {
        heading: 'Кому мы передаём данные',
        body: ['Эти поставщики услуг обрабатывают ваши данные по нашим указаниям:'],
        processors: [
          ['Supabase', 'Защищённая база данных, где хранится ваша заявка'],
          ['Google', 'Внутренняя таблица, с которой работают наши консультанты'],
          ['Resend', 'Отправка вам писем с подтверждением'],
          ['OpenRouter', 'Автоматическое резюме вашей заявки для консультанта'],
          ['Vercel', 'Хостинг этого сайта и наших систем'],
          ['Meta', 'Размещение формы, если вы подали заявку через Facebook или Instagram'],
        ],
        body2: [
          'Мы также передаём ваши данные университетам и учебным заведениям, в которые вы просите нас подать заявку; они могут находиться за пределами Великобритании.',
          'Когда ваши данные покидают Великобританию, мы используем утверждённые британские механизмы передачи данных, такие как International Data Transfer Agreement или UK Addendum.',
        ],
      },
      {
        heading: 'Сколько мы храним данные',
        body: [
          'Мы храним вашу заявку в течение 24 месяцев с момента последнего контакта с вами, после чего удаляем её.',
          'Если вы становитесь нашим студентом, мы храним ваши документы столько, сколько необходимо для сопровождения вашей заявки, и далее — столько, сколько требует закон.',
        ],
      },
      {
        heading: 'Ваши права',
        body: ['Вы можете попросить нас:'],
        list: [
          'Предоставить копию данных, которые мы о вас храним',
          'Исправить неверные данные',
          'Удалить ваши данные',
          'Прекратить их использование или ограничить его',
          'Передать ваши данные другой организации',
        ],
      },
      {
        heading: 'Жалобы',
        body: [
          'Напишите на info@universein.uk — мы ответим в течение одного месяца, бесплатно.',
          'Если вас не устраивает, как мы обошлись с вашими данными, вы можете подать жалобу в Управление комиссара по информации Великобритании (ico.org.uk) или в орган по защите данных в вашей стране.',
        ],
      },
      {
        heading: 'Изменения',
        body: ['Если мы изменим эту политику, мы обновим дату в начале страницы.'],
      },
    ],
  },

  uz: {
    title: 'Maxfiylik siyosati',
    updated: UPDATED_UZ,
    backToSite: '← Saytga qaytish',
    sections: [
      {
        heading: 'Biz kimmiz',
        body: [
          `Universe In — Angliya va Uelsda roʻyxatdan oʻtgan kompaniya, roʻyxat raqami 16049326, manzil: ${COMPANY_LINE}`,
          'Bu sahifada tasvirlangan maʼlumotlar uchun biz nazoratchi hisoblanamiz. Biz bilan bogʻlanish: info@universein.uk yoki +44 7808 165945.',
        ],
      },
      {
        heading: 'Qanday maʼlumot toʻplaymiz',
        body: ['Bizga ariza yuborganingizda — ushbu saytda yoki Facebook yoki Instagramdagi forma orqali — biz quyidagilarni toʻplaymiz:'],
        list: [
          'Ismingiz',
          'WhatsApp raqamingiz va elektron pochta manzilingiz',
          'Nimani oʻqimoqchi ekanligingiz, ingliz tili darajangiz va mavjud byudjetingiz',
          'Telefon raqamingizdagi davlat kodi boʻyicha aniqlanadigan mamlakatingiz',
          'Oʻzingiz aytishni istagan boshqa har qanday maʼlumot',
        ],
      },
      {
        heading: 'Nima uchun foydalanamiz',
        body: [
          'Arizangizga javob berish va chet elda taʼlim olish boʻyicha maslahat berish uchun. Bu siz bilan shartnoma tuzishdan oldin sizning soʻrovingiz boʻyicha qadamlar qoʻyish uchun zarur boʻlgan ishlov berishdir.',
          'Qaysi universitet va dasturlar sizga mos kelishini aniqlash uchun. Konsultant siz bilan gaplashishdan oldin tayyorlanishi uchun javoblaringizni, shu jumladan avtomatlashtirilgan vositalar yordamida, koʻrib chiqamiz. Universitetga arizangiz boʻyicha hech qanday qaror avtomatik qabul qilinmaydi — qarorni doimo inson qabul qiladi va siz bizdan qoʻlda qayta koʻrib chiqishni soʻrashingiz mumkin.',
          'Arizangiz boʻyicha siz bilan WhatsApp, elektron pochta yoki telefon orqali bogʻlanish uchun.',
          'Biz maʼlumotlaringizni hech kimga sotmaymiz.',
        ],
      },
      {
        heading: 'Kimga uzatamiz',
        body: ['Quyidagi xizmat koʻrsatuvchilar maʼlumotlaringizni bizning koʻrsatmalarimiz boʻyicha qayta ishlaydi:'],
        processors: [
          ['Supabase', 'Arizangiz saqlanadigan himoyalangan maʼlumotlar bazasi'],
          ['Google', 'Konsultantlarimiz ishlaydigan ichki jadval'],
          ['Resend', 'Sizga tasdiqlash xatlarini yuboradi'],
          ['OpenRouter', 'Konsultant uchun arizangizning avtomatik xulosasi'],
          ['Vercel', 'Ushbu sayt va tizimlarimiz hostingi'],
          ['Meta', 'Agar Facebook yoki Instagram orqali ariza bergan boʻlsangiz, formani joylashtiradi'],
        ],
        body2: [
          'Shuningdek, biz maʼlumotlaringizni siz ariza topshirishni soʻragan universitet va taʼlim muassasalariga uzatamiz; ular Buyuk Britaniyadan tashqarida boʻlishi mumkin.',
          'Maʼlumotlaringiz Buyuk Britaniyadan chiqqanda, biz International Data Transfer Agreement yoki UK Addendum kabi tasdiqlangan uzatish kafolatlariga tayanamiz.',
        ],
      },
      {
        heading: 'Qancha vaqt saqlaymiz',
        body: [
          'Arizangizni siz bilan oxirgi aloqadan keyin 24 oy davomida saqlaymiz, soʻngra oʻchiramiz.',
          'Agar siz bizning talabamiz boʻlsangiz, hujjatlaringizni arizangizni qoʻllab-quvvatlash uchun zarur boʻlgan muddat davomida va undan keyin qonun talab qilgancha saqlaymiz.',
        ],
      },
      {
        heading: 'Sizning huquqlaringiz',
        body: ['Siz bizdan quyidagilarni soʻrashingiz mumkin:'],
        list: [
          'Siz haqingizda saqlanayotgan maʼlumotlar nusxasini berish',
          'Notoʻgʻri maʼlumotlarni tuzatish',
          'Maʼlumotlaringizni oʻchirish',
          'Ulardan foydalanishni toʻxtatish yoki cheklash',
          'Maʼlumotlaringizni boshqa tashkilotga uzatish',
        ],
      },
      {
        heading: 'Shikoyatlar',
        body: [
          'info@universein.uk manziliga yozing — bir oy ichida bepul javob beramiz.',
          'Agar maʼlumotlaringiz bilan qanday ish tutganimizdan norozi boʻlsangiz, Buyuk Britaniya Axborot komissari idorasiga (ico.org.uk) yoki oʻz mamlakatingizdagi maʼlumotlarni himoya qilish organiga shikoyat qilishingiz mumkin.',
        ],
      },
      {
        heading: 'Oʻzgarishlar',
        body: ['Agar ushbu siyosatni oʻzgartirsak, sahifa boshidagi sanani yangilaymiz.'],
      },
    ],
  },
};
