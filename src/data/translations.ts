export type Lang = 'en' | 'ru' | 'uz';

export interface Translation {
  urg: string; badge: string; title: string; sub: string;
  cta: string; note: string;
  hb1: string; hb2: string; hb3: string;
  s1: string; s2: string; s3: string; s4: string;
  car1t: string; car1d: string;
  car2t: string; car2d: string;
  car3t: string; car3d: string;
  car4t: string; car4d: string;
  car5t: string; car5d: string;
  car6t: string; car6d: string;
  destLbl: string;
  objLbl: string; objTitle: string;
  obj1f: string; obj1a: string; obj1d: string;
  obj2f: string; obj2a: string; obj2d: string;
  obj3f: string; obj3a: string; obj3d: string;
  obj4f: string; obj4a: string; obj4d: string;
  obj5f: string; obj5a: string; obj5d: string;
  obj6f: string; obj6a: string; obj6d: string;
  howLbl: string; howTitle: string;
  how1t: string; how1d: string;
  how2t: string; how2d: string;
  how3t: string; how3d: string;
  tmLbl: string; tmTitle: string;
  tm1q: string; tm2q: string; tm3q: string;
  proofLbl: string; proofTitle: string; proofSub: string;
  proofPending: string;
  pf1t: string; pf1d: string;
  pf2t: string; pf2d: string;
  pf3t: string; pf3d: string;
  pf4t: string; pf4d: string;
  accLbl: string; accTitle: string; accSub: string;
  acc1pill: string; acc1name: string; acc1role: string; acc1desc: string;
  acc1tag1: string; acc1tag2: string; acc1tag3: string;
  acc2pill: string; acc2name: string; acc2role: string; acc2desc: string;
  acc2tag1: string; acc2tag2: string; acc2tag3: string;
  accBar1: string; accBar2: string; accBar3: string;
  cmpLbl: string; cmpTitle: string; cmpSub: string;
  cmpUs: string; cmpAgency: string; cmpAlone: string;
  cmpR1: string; cmpR1a: string; cmpR1b: string; cmpR1c: string;
  cmpR2: string; cmpR2a: string; cmpR2b: string; cmpR2c: string;
  cmpR3: string; cmpR3a: string; cmpR3b: string; cmpR3c: string;
  cmpR4: string; cmpR4a: string; cmpR4b: string; cmpR4c: string;
  cmpR5: string; cmpR5a: string; cmpR5b: string; cmpR5c: string;
  rrLbl: string; rrTitle: string; rrSub: string;
  rr1t: string; rr1d: string;
  rr2t: string; rr2d: string;
  rr3t: string; rr3d: string;
  rr4t: string; rr4d: string;
  faqLbl: string; faqTitle: string;
  faqLbl2: string; faqTitle2: string;
  faqCtaTitle: string; faqCta: string;
  faq1q: string; faq1a: string;
  faq2q: string; faq2a: string;
  faq3q: string; faq3a: string;
  faq4q: string; faq4a: string;
  faq5q: string; faq5a: string;
  faq6q: string; faq6a: string;
  partLbl: string;
  finalLbl: string; finalTitle: string; finalSub: string; finalCta: string;
  t1: string; t2: string; t3: string;
  floatTxt: string;
  footerTagline: string;
  footerNav: string;
  footerContact: string;
  footerHome: string;
  footerHowItWorks: string;
  footerDestinations: string;
  footerTestimonials: string;
  footerFAQ: string;
  footerCompany: string;
  footerAddress: string;
  footerWebsite: string;
  footerEmail: string;
  footerPhone: string;
  footerAccredited: string;
  footerCopyright: string;
  footerRegistered: string;
  footerFreeStudents: string;
}

export const L: Record<Lang, Translation> = {
  en: {
    urg: "🎓 September 2026 intake — Applications now open · Free consultation available now",
    badge: "Free for students from Uzbekistan and Tajikistan",
    title: "Study at a university <em>abroad</em>. Free for you.",
    sub: "We help students from Uzbekistan and Tajikistan get into universities in the UK, USA, Canada and seven other countries. Our help is free — the universities pay us, not you.",
    cta: "See where I can get in", note: "Free · 2 minutes",
    hb1: "IELTS 5.0 is already enough",
    hb2: "We help with documents, visa and accommodation",
    hb3: "100 universities in 10 countries",
    // TODO: confirm the real figures with the agency before launch. "Helped" is
    // deliberately weaker than "placed" - it is defensible without enrolment records.
    s1: "Students helped", s2: "Partner universities", s3: "Countries", s4: "For students",
    car1t: "Universe In", car1d: "UK-registered study abroad consultancy. Free for students, always.",
    car2t: "Tashkent → Manchester", car2d: "Real offer letter, September 2026 intake.",
    car3t: "Visa approved", car3d: "Student visa granted on the first application.",
    car4t: "Free for students", car4d: "The university pays us. You never pay us anything.",
    car5t: "Accredited & recognised", car5d: "ICEF accredited · British Council · UK Company No. 16049326",
    car6t: "Real offer letters", car6d: "Students placed from Tashkent, Samarkand and Dushanbe.",
    destLbl: "Study in 10 countries",
    objLbl: "We hear you", objTitle: "We answer your doubts",
    obj1f: '"My English isn\'t good enough"', obj1a: "IELTS 5.0 is already enough", obj1d: "If your score is lower, or you have no certificate yet, you start with a language or foundation course. Tell us your level and we'll find the right programme.",
    obj2f: '"It\'s too expensive for me"', obj2a: "Our help is free", obj2d: "The university pays us after you enrol, not you. There are also scholarships — we'll tell you which ones you can apply for.",
    obj3f: '"I\'m scared I won\'t get a visa"', obj3a: "We help you with the visa", obj3d: "We prepare all your documents and check them before you submit. If something looks weak, we tell you first so you can fix it.",
    obj4f: '"I don\'t know if I qualify"', obj4a: "We'll find a university for your level", obj4d: "100 universities — from the top ones to those that are easier to get into. Answer a few questions and we'll tell you which ones fit you.",
    obj5f: '"It will take too long"', obj5a: "4–8 weeks to an offer", obj5d: "We know the deadlines and apply directly to our partner universities, so it's faster than doing it yourself.",
    obj6f: '"I can\'t figure it out alone"', obj6a: "We speak Russian and Uzbek", obj6d: "We help at every step — application, visa, accommodation, and settling in once you arrive.",
    howLbl: "How it works", howTitle: "Three steps to your offer letter",
    how1t: "Answer a few questions", how1d: "About your English level, budget and where you want to study. Takes 2 minutes.",
    how2t: "We find your universities", how2d: "A consultant looks at your profile and tells you which universities you can get into.",
    how3t: "We handle the rest", how3d: "Application, offer letter, visa documents and accommodation. We do the paperwork with you.",
    tmLbl: "Student stories", tmTitle: "Real students. Real results.",
    tm1q: '"I had no idea where to start. Universe In handled everything — my application, my visa, everything. I\'m now studying Business at Manchester."',
    tm2q: '"My IELTS was 6.0 and I thought I had no chance. They found me a pathway that fit perfectly. One year later I\'m at Heriot-Watt studying Engineering."',
    tm3q: '"Canada felt impossible from Samarkand. Universe In showed me it wasn\'t. I got into Seneca, got my study permit. Best decision of my life."',
    proofLbl: "Our students", proofTitle: "Students we have helped get in.",
    proofSub: "Real offer letters and visa approvals from students we worked with. Personal details are removed.",
    proofPending: "Awaiting verified document",
    pf1t: "Tashkent → Manchester", pf1d: "Undergraduate offer · September 2026 intake",
    pf2t: "Samarkand → Heriot-Watt", pf2d: "Engineering offer via pathway · IELTS 6.0",
    pf3t: "Dushanbe → Seneca", pf3d: "Study permit approved · first application",
    pf4t: "Tashkent → Hult", pf4d: "Business offer with partial scholarship",
    accLbl: "Recognised & accredited by", accTitle: "Officially recognised.<br/>Globally trusted.",
    accSub: "Universe In holds accreditations from two of the most respected international education bodies in the world.",
    acc1pill: "Verified Partner", acc1name: "British Council", acc1role: "UK Government Cultural Relations Body",
    acc1desc: "The British Council is the UK's international organisation for cultural relations and educational opportunities, operating in 190+ countries. Their recognition signals genuine quality to universities worldwide.",
    acc1tag1: "Est. 1934", acc1tag2: "190+ Countries", acc1tag3: "UK Government Body",
    acc2pill: "Accredited Agency", acc2name: "ICEF Accredited", acc2role: "International Education Standard",
    acc2desc: "ICEF accreditation is the gold standard for international student recruitment agencies. Only agencies meeting strict ethical and professional benchmarks receive this recognition.",
    acc2tag1: "Gold Standard", acc2tag2: "Ethical Agency", acc2tag3: "Verified Quality",
    accBar1: "Free for students — always", accBar2: "UK-registered company", accBar3: "Direct university partners",
    cmpLbl: "Compare", cmpTitle: "What you get with us.",
    cmpSub: "How working with us compares to applying on your own.",
    cmpUs: "Universe In", cmpAgency: "Other agencies", cmpAlone: "On your own",
    cmpR1: "What it costs you", cmpR1a: "Free — always", cmpR1b: "Often charges upfront", cmpR1c: "Free, but no guidance",
    cmpR2: "Accreditation", cmpR2a: "ICEF + British Council", cmpR2b: "Usually none", cmpR2c: "—",
    cmpR3: "Direct university partners", cmpR3a: "Yes — we apply directly", cmpR3b: "Rarely", cmpR3c: "No",
    cmpR4: "Visa document prep", cmpR4a: "Included in full", cmpR4b: "Often charged extra", cmpR4c: "You do it alone",
    cmpR5: "If you're refused", cmpR5a: "We help you reapply", cmpR5b: "Often no support", cmpR5c: "You start again",
    rrLbl: "Why it's free", rrTitle: "Why does this cost you nothing?",
    rrSub: "It's the question everyone asks, so here is the honest answer.",
    rr1t: "The university pays us", rr1d: "Universities pay us a fee when a student enrols through us. That's how we earn — so you don't have to pay anything.",
    rr2t: "Nothing to pay, ever", rr2d: "No fee at the start, no fee at the end. Not for the application, not for the visa, not for the advice.",
    rr3t: "We're an official company", rr3d: "Registered in the UK, accredited by ICEF and recognised by the British Council.",
    rr4t: "We'll be honest with you", rr4d: "If you can't get in right now, we'll say so and tell you what to improve — instead of wasting your year.",
    faqLbl: "FAQ", faqTitle: "Everything you wanted to ask",
    faqLbl2: "More questions", faqTitle2: "Still deciding?",
    faqCtaTitle: "Not sure if you can get in? Find out in 2 minutes.", faqCta: "See where I can get in — free",
    faq1q: "How much do your services cost?", faq1a: "Our services are completely free for students. We receive a fee from partner universities after your enrolment. No hidden charges.",
    faq2q: "Do I need a high IELTS score?", faq2a: "No. Many of our partners offer pathways from IELTS 5.0 and below. We find the programme for your current level.",
    faq3q: "How long does the whole process take?", faq3a: "On average 4–8 weeks from first conversation to offer letter. Visa processing takes another 4–12 weeks depending on country.",
    faq4q: "Do you help with Bolashak scholarships?", faq4a: "Yes, we specialise in Bolashak and El-Yurt Umidi. We know requirements, deadlines and help prepare your documents.",
    faq5q: "Which countries do you cover?", faq5a: "UK, USA, UAE, Canada, Australia, New Zealand, Germany, Ireland, Netherlands, France — 100+ universities in 10 countries.",
    faq6q: "What if my visa gets refused?", faq6a: "We identify the reason for the refusal and support you through a reapplication at no extra cost. Most refusals come down to document or financial-evidence problems, which is exactly what we check before you submit.",
    partLbl: "Our official partners",
    finalLbl: "Start here", finalTitle: "Find out where you can <em>study</em>.", finalSub: "Answer a few questions and a consultant will tell you which universities fit you. Free, and it takes 2 minutes.", finalCta: "See where I can get in",
    t1: "Free consultation", t2: "No commitment", t3: "Response within 24h",
    floatTxt: "See where I can get in",
    footerTagline: "Your trusted UK education partner — free for students, always.",
    footerNav: "Navigation",
    footerContact: "Contact",
    footerHome: "Home",
    footerHowItWorks: "How It Works",
    footerDestinations: "Destinations",
    footerTestimonials: "Testimonials",
    footerFAQ: "FAQ",
    footerCompany: "UNIVERSE.IN LIMITED — Company No. 16049326",
    footerAddress: "27 Inglis Way, Wrest House, NW7 1TP, London, UK",
    footerWebsite: "uni-in.co.uk",
    footerEmail: "info@universein.uk",
    footerPhone: "+44 7808 165945",
    footerAccredited: "Accredited by",
    footerCopyright: "All rights reserved.",
    footerRegistered: "UK Registered Company",
    footerFreeStudents: "Free for students",
  },
  ru: {
    urg: "🎓 Набор на сентябрь 2026 — приём заявок открыт · Бесплатная консультация доступна сейчас",
    badge: "Бесплатно для студентов из Узбекистана и Таджикистана",
    title: "Поступите в университет <em>за границей</em>. Для вас — бесплатно.",
    sub: "Помогаем студентам из Узбекистана и Таджикистана поступить в университеты Великобритании, США, Канады и ещё семи стран. Наша помощь бесплатна — нам платят университеты, а не вы.",
    cta: "Узнать, куда я могу поступить", note: "Бесплатно · 2 минуты",
    hb1: "IELTS 5.0 — уже достаточно",
    hb2: "Помогаем с документами, визой и жильём",
    hb3: "100 университетов в 10 странах",
    s1: "Студентов обратилось", s2: "Университетов-партнёров", s3: "Стран", s4: "Для студентов",
    car1t: "Universe In", car1d: "Британская образовательная консультация. Бесплатно для студентов.",
    car2t: "Ташкент → Манчестер", car2d: "Реальный оффер, набор на сентябрь 2026.",
    car3t: "Виза одобрена", car3d: "Студенческая виза с первой подачи.",
    car4t: "Бесплатно для студентов", car4d: "Нам платит университет. Вы не платите ничего.",
    car5t: "Аккредитация и признание", car5d: "ICEF · British Council · Компания № 16049326",
    car6t: "Реальные офферы", car6d: "Студенты из Ташкента, Самарканда и Душанбе.",
    destLbl: "Учитесь в 10 странах",
    objLbl: "Мы слышим вас", objTitle: "Мы отвечаем на ваши сомнения",
    obj1f: '"Мой английский недостаточно хорош"', obj1a: "IELTS 5.0 — уже достаточно", obj1d: "Если балл ниже или сертификата пока нет — начнёте с языкового курса или foundation. Скажите свой уровень, и мы подберём программу.",
    obj2f: '"Это слишком дорого для меня"', obj2a: "Наша помощь бесплатна", obj2d: "Нам платит университет после вашего зачисления, а не вы. Ещё есть стипендии — расскажем, на какие вы можете подать.",
    obj3f: '"Я боюсь, что визу не дадут"', obj3a: "Поможем с визой", obj3d: "Подготовим все документы и проверим их до подачи. Если что-то слабое — скажем заранее, чтобы вы успели исправить.",
    obj4f: '"Я не знаю, подхожу ли я"', obj4a: "Найдём университет под ваш уровень", obj4d: "100 университетов — от сильных до тех, куда поступить проще. Ответьте на несколько вопросов, и мы скажем, что вам подходит.",
    obj5f: '"Это займёт слишком много времени"', obj5a: "4–8 недель до оффера", obj5d: "Мы знаем дедлайны и подаём напрямую в партнёрские университеты — поэтому быстрее, чем если делать всё самому.",
    obj6f: '"Мне сложно разобраться одному"', obj6a: "Мы говорим по-русски и по-узбекски", obj6d: "Поможем на каждом шаге — заявка, виза, жильё и первые недели после приезда.",
    howLbl: "Как это работает", howTitle: "Три шага до оффера",
    how1t: "Отвечаете на несколько вопросов", how1d: "Об уровне английского, бюджете и стране, где хотите учиться. Это занимает 2 минуты.",
    how2t: "Мы подбираем университеты", how2d: "Консультант смотрит ваш профиль и говорит, в какие университеты вы можете поступить.",
    how3t: "Берём на себя остальное", how3d: "Заявка, оффер, документы на визу и жильё. Оформляем всё вместе с вами.",
    tmLbl: "Истории студентов", tmTitle: "Настоящие студенты. Реальные результаты.",
    tm1q: "«Я понятия не имела, с чего начать. Universe In взяли на себя всё — заявку, визу, всё. Сейчас я учусь на Бизнесе в Манчестере и до сих пор не могу поверить.»",
    tm2q: "«Мой IELTS был 6.0, и я думал, что у меня нет шансов. Они нашли мне pathway, который идеально подошёл. Год спустя я в Heriot-Watt на Инжиниринге.»",
    tm3q: "«Канада казалась невозможной из Самарканда. Universe In показали, что это не так. Я поступила в Seneca, получила разрешение на учёбу. Лучшее решение в жизни.»",
    proofLbl: "Наши студенты", proofTitle: "Студенты, которым мы помогли поступить.",
    proofSub: "Реальные офферы и одобренные визы студентов, с которыми мы работали. Личные данные закрыты.",
    proofPending: "Ожидает подтверждённый документ",
    pf1t: "Ташкент → Манчестер", pf1d: "Оффер на бакалавриат · набор сентябрь 2026",
    pf2t: "Самарканд → Heriot-Watt", pf2d: "Инжиниринг через pathway · IELTS 6.0",
    pf3t: "Душанбе → Seneca", pf3d: "Разрешение на учёбу · с первой подачи",
    pf4t: "Ташкент → Hult", pf4d: "Оффер на бизнес с частичной стипендией",
    accLbl: "Аккредитация и признание", accTitle: "Официальное признание.<br/>Доверие по всему миру.",
    accSub: "Universe In имеет аккредитации двух самых уважаемых международных образовательных организаций.",
    acc1pill: "Проверенный партнёр", acc1name: "British Council", acc1role: "Британская государственная организация",
    acc1desc: "British Council — британская государственная организация по международным культурным связям и образованию, работающая в 190+ странах. Их признание — сигнал реального качества для университетов во всём мире.",
    acc1tag1: "С 1934 года", acc1tag2: "190+ стран", acc1tag3: "Гос. организация Великобритании",
    acc2pill: "Аккредитованное агентство", acc2name: "Аккредитация ICEF", acc2role: "Международный образовательный стандарт",
    acc2desc: "Аккредитация ICEF — золотой стандарт для агентств по набору иностранных студентов. Её получают только агентства, соответствующие строгим этическим и профессиональным требованиям.",
    acc2tag1: "Золотой стандарт", acc2tag2: "Этичное агентство", acc2tag3: "Подтверждённое качество",
    accBar1: "Бесплатно для студентов — всегда", accBar2: "Компания зарегистрирована в Великобритании", accBar3: "Прямые партнёрства с университетами",
    cmpLbl: "Сравнение", cmpTitle: "Что вы получаете с нами.",
    cmpSub: "Чем работа с нами отличается от самостоятельной подачи.",
    cmpUs: "Universe In", cmpAgency: "Другое агентство", cmpAlone: "Самостоятельно",
    cmpR1: "Сколько стоит для вас", cmpR1a: "Бесплатно — всегда", cmpR1b: "Часто берут предоплату", cmpR1c: "Бесплатно, но без помощи",
    cmpR2: "Аккредитация", cmpR2a: "ICEF + British Council", cmpR2b: "Обычно нет", cmpR2c: "—",
    cmpR3: "Прямые партнёрства", cmpR3a: "Да — подаём напрямую", cmpR3b: "Редко", cmpR3c: "Нет",
    cmpR4: "Подготовка документов на визу", cmpR4a: "Полностью включена", cmpR4b: "Часто за доплату", cmpR4c: "Делаете сами",
    cmpR5: "Если отказали в визе", cmpR5a: "Помогаем подать повторно", cmpR5b: "Часто без поддержки", cmpR5c: "Начинаете заново",
    rrLbl: "Почему бесплатно", rrTitle: "Почему это ничего вам не стоит?",
    rrSub: "Этот вопрос задают все, поэтому отвечаем честно.",
    rr1t: "Нам платит университет", rr1d: "Университеты платят нам, когда студент поступает через нас. Так мы зарабатываем — поэтому вам платить не нужно.",
    rr2t: "Платить не нужно вообще", rr2d: "Ни в начале, ни в конце. Ни за заявку, ни за визу, ни за консультацию.",
    rr3t: "Мы официальная компания", rr3d: "Зарегистрированы в Великобритании, аккредитованы ICEF и признаны British Council.",
    rr4t: "Скажем честно", rr4d: "Если сейчас поступить не получится — скажем прямо и объясним, что подтянуть, вместо того чтобы тянуть ваш год.",
    faqLbl: "Частые вопросы", faqTitle: "Всё, что вы хотели спросить",
    faqLbl2: "Ещё вопросы", faqTitle2: "Всё ещё думаете?",
    faqCtaTitle: "Не уверены, что поступите? Узнайте за 2 минуты.", faqCta: "Узнать, куда я могу поступить",
    faq1q: "Сколько стоят ваши услуги?", faq1a: "Наши услуги абсолютно бесплатны для студентов. Мы получаем вознаграждение от университетов-партнёров после вашего зачисления. Никаких скрытых платежей.",
    faq2q: "Нужен ли мне высокий IELTS?", faq2a: "Нет. Многие наши партнёры предлагают pathway-программы для студентов с IELTS от 5.0 и даже ниже. Мы подберём программу под ваш текущий уровень.",
    faq3q: "Сколько времени займёт весь процесс?", faq3a: "В среднем 4–8 недель от первого разговора до оффера. Оформление визы займёт ещё 4–12 недель в зависимости от страны.",
    faq4q: "Помогаете ли вы с Болашак и Эл-Юрт Умиди?", faq4a: "Да, мы специализируемся на государственных стипендиях Казахстана и Узбекистана. Знаем требования, дедлайны и помогаем подготовить документы.",
    faq5q: "В каких странах у вас есть партнёры?", faq5a: "Великобритания, США, ОАЭ, Канада, Австралия, Новая Зеландия, Германия, Ирландия, Нидерланды, Франция — более 100 университетов в 10 странах.",
    faq6q: "Что если мне откажут в визе?", faq6a: "Мы определяем причину отказа и сопровождаем повторную подачу без дополнительной оплаты. Большинство отказов связано с документами или подтверждением финансов — именно это мы проверяем до подачи.",
    partLbl: "Официальные партнёры",
    finalLbl: "Начните здесь", finalTitle: "Узнайте, где вы можете <em>учиться</em>.", finalSub: "Ответьте на несколько вопросов — консультант скажет, какие университеты вам подходят. Бесплатно, 2 минуты.", finalCta: "Узнать, куда я могу поступить",
    t1: "Бесплатная консультация", t2: "Без обязательств", t3: "Ответ в течение 24ч",
    floatTxt: "Узнать, куда я могу поступить",
    footerTagline: "Ваш надёжный британский партнер в образовании — бесплатно для студентов, всегда.",
    footerNav: "Навигация",
    footerContact: "Контакты",
    footerHome: "Главная",
    footerHowItWorks: "Как это работает",
    footerDestinations: "Направления",
    footerTestimonials: "Истории студентов",
    footerFAQ: "Частые вопросы",
    footerCompany: "UNIVERSE.IN LIMITED — Компания № 16049326",
    footerAddress: "27 Inglis Way, Wrest House, NW7 1TP, Лондон, Великобритания",
    footerWebsite: "uni-in.co.uk",
    footerEmail: "info@universein.uk",
    footerPhone: "+44 7808 165945",
    footerAccredited: "Аккредитовано",
    footerCopyright: "Все права защищены.",
    footerRegistered: "Зарегистрированная в Великобритании компания",
    footerFreeStudents: "Бесплатно для студентов",
  },
  uz: {
    urg: "🎓 2026-yil sentabr qabuli — arizalar qabul qilinmoqda · Bepul maslahat mavjud",
    badge: "O'zbekiston va Tojikiston talabalari uchun bepul",
    title: "<em>Chet eldagi</em> universitetga kiring. Siz uchun bepul.",
    sub: "O'zbekiston va Tojikiston talabalariga Buyuk Britaniya, AQSh, Kanada va yana yetti mamlakat universitetlariga kirishda yordam beramiz. Yordamimiz bepul — bizga universitetlar to'laydi, siz emas.",
    cta: "Qayerga kira olishimni bilish", note: "Bepul · 2 daqiqa",
    hb1: "IELTS 5.0 — allaqachon yetarli",
    hb2: "Hujjatlar, viza va turar joyda yordam beramiz",
    hb3: "10 mamlakatda 100 universitet",
    s1: "Talaba murojaat qildi", s2: "Universitet hamkorlar", s3: "Davlatlar", s4: "Talabalar uchun",
    car1t: "Universe In", car1d: "Britaniyada ro'yxatdan o'tgan ta'lim konsaltingi. Talabalar uchun bepul.",
    car2t: "Toshkent → Manchester", car2d: "Haqiqiy taklifnoma, 2026-yil sentabr qabuli.",
    car3t: "Viza tasdiqlandi", car3d: "Talaba vizasi birinchi topshirishda olindi.",
    car4t: "Talabalar uchun bepul", car4d: "Bizga universitet to'laydi. Siz hech narsa to'lamaysiz.",
    car5t: "Akkreditatsiya va tan olish", car5d: "ICEF · British Council · Kompaniya № 16049326",
    car6t: "Haqiqiy taklifnomalar", car6d: "Toshkent, Samarqand va Dushanbedan talabalar.",
    destLbl: "10 mamlakatda o'qing",
    objLbl: "Biz sizni eshitamiz", objTitle: "Shubhalaringizga javob beramiz",
    obj1f: '"Mening inglizim yetarli emas"', obj1a: "IELTS 5.0 — allaqachon yetarli", obj1d: "Ball pastroq bo'lsa yoki sertifikat bo'lmasa — til kursi yoki foundation dan boshlaysiz. Darajangizni ayting, biz dastur topamiz.",
    obj2f: '"Bu men uchun juda qimmat"', obj2a: "Yordamimiz bepul", obj2d: "Bizga universitet siz qabul qilingandan keyin to'laydi, siz emas. Stipendiyalar ham bor — qaysi biriga topshira olishingizni aytamiz.",
    obj3f: '"Viza bermasligidan qo\'rqaman"', obj3a: "Vizada yordam beramiz", obj3d: "Barcha hujjatlarni tayyorlaymiz va topshirishdan oldin tekshiramiz. Biror narsa zaif bo'lsa — tuzatishga ulgurishingiz uchun oldindan aytamiz.",
    obj4f: '"Mos kelamanmi bilmayman"', obj4a: "Darajangizga mos universitet topamiz", obj4d: "100 universitet — eng kuchlilaridan kirish osonroq bo'lganlarigacha. Bir nechta savolga javob bering, sizga nima mos kelishini aytamiz.",
    obj5f: '"Bu juda ko\'p vaqt oladi"', obj5a: "Qabul xatigacha 4–8 hafta", obj5d: "Muddatlarni bilamiz va hamkor universitetlarga to'g'ridan-to'g'ri topshiramiz — shuning uchun o'zingiz qilganingizdan tezroq.",
    obj6f: '"Yolg\'iz tushunishim qiyin"', obj6a: "Biz rus va o'zbek tillarida gaplashamiz", obj6d: "Har qadamda yordam beramiz — ariza, viza, turar joy va kelganingizdan keyingi birinchi haftalar.",
    howLbl: "Bu qanday ishlaydi", howTitle: "Qabul xatingizgacha uch qadam",
    how1t: "Bir nechta savolga javob berasiz", how1d: "Ingliz tili darajangiz, byudjetingiz va qayerda o'qimoqchi ekanligingiz haqida. 2 daqiqa vaqt oladi.",
    how2t: "Biz universitet tanlaymiz", how2d: "Konsultant profilingizni ko'rib chiqadi va qaysi universitetlarga kira olishingizni aytadi.",
    how3t: "Qolganini biz qilamiz", how3d: "Ariza, taklifnoma, viza hujjatlari va turar joy. Hammasini siz bilan birga rasmiylashtiramiz.",
    tmLbl: "Talaba hikoyalari", tmTitle: "Haqiqiy talabalar. Haqiqiy natijalar.",
    tm1q: '"Qayerdan boshlashni bilmasdim. Universe In hamma narsani — arizam, vizamni o\'z zimmasiga oldi. Hozir Manchesterda Biznes o\'qiyapman."',
    tm2q: '"IELTS ballim 6.0 edi, imkonim yo\'q deb o\'ylardim. Ular menga mos pathway topishdi. Bir yildan keyin Heriot-Wattda Muhandislik o\'qiyapman."',
    tm3q: '"Samarqanddan Kanada imkonsiz tuyulardi. Universe In yo\'q ekanini ko\'rsatdi. Senecaga kirdim, ruxsatnoma oldim. Hayotimdagi eng yaxshi qaror."',
    proofLbl: "Bizning talabalar", proofTitle: "Kirishiga yordam bergan talabalarimiz.",
    proofSub: "Biz ishlagan talabalarning haqiqiy taklifnomalari va tasdiqlangan vizalari. Shaxsiy ma'lumotlar yopilgan.",
    proofPending: "Tasdiqlangan hujjat kutilmoqda",
    pf1t: "Toshkent → Manchester", pf1d: "Bakalavriat taklifnomasi · 2026 sentabr qabuli",
    pf2t: "Samarqand → Heriot-Watt", pf2d: "Muhandislik, pathway orqali · IELTS 6.0",
    pf3t: "Dushanbe → Seneca", pf3d: "O'qish ruxsatnomasi · birinchi topshirishda",
    pf4t: "Toshkent → Hult", pf4d: "Biznes taklifnomasi, qismiy stipendiya bilan",
    accLbl: "Akkreditatsiya va tan olish", accTitle: "Rasmiy tan olingan.<br/>Dunyo bo'ylab ishonchli.",
    accSub: "Universe In dunyodagi eng nufuzli ikki xalqaro ta'lim tashkilotining akkreditatsiyasiga ega.",
    acc1pill: "Tasdiqlangan hamkor", acc1name: "British Council", acc1role: "Britaniya davlat tashkiloti",
    acc1desc: "British Council — madaniy aloqalar va ta'lim imkoniyatlari bo'yicha Britaniyaning xalqaro tashkiloti, 190+ mamlakatda faoliyat yuritadi. Ularning tan olishi butun dunyo universitetlari uchun haqiqiy sifat belgisidir.",
    acc1tag1: "1934-yildan", acc1tag2: "190+ mamlakat", acc1tag3: "Britaniya davlat tashkiloti",
    acc2pill: "Akkreditatsiyalangan agentlik", acc2name: "ICEF akkreditatsiyasi", acc2role: "Xalqaro ta'lim standarti",
    acc2desc: "ICEF akkreditatsiyasi xalqaro talabalarni jalb qilish agentliklari uchun oltin standart. Uni faqat qat'iy etik va professional talablarga javob beradigan agentliklar oladi.",
    acc2tag1: "Oltin standart", acc2tag2: "Etik agentlik", acc2tag3: "Tasdiqlangan sifat",
    accBar1: "Talabalar uchun bepul — doimo", accBar2: "Britaniyada ro'yxatdan o'tgan kompaniya", accBar3: "Universitetlar bilan to'g'ridan-to'g'ri hamkorlik",
    cmpLbl: "Taqqoslash", cmpTitle: "Biz bilan nima olasiz.",
    cmpSub: "Biz bilan ishlash mustaqil topshirishdan nimasi bilan farq qiladi.",
    cmpUs: "Universe In", cmpAgency: "Boshqa agentlik", cmpAlone: "Mustaqil",
    cmpR1: "Sizga qancha turadi", cmpR1a: "Bepul — doimo", cmpR1b: "Ko'pincha oldindan to'lov", cmpR1c: "Bepul, lekin yordamsiz",
    cmpR2: "Akkreditatsiya", cmpR2a: "ICEF + British Council", cmpR2b: "Odatda yo'q", cmpR2c: "—",
    cmpR3: "To'g'ridan-to'g'ri hamkorlik", cmpR3a: "Ha — to'g'ridan-to'g'ri topshiramiz", cmpR3b: "Kamdan-kam", cmpR3c: "Yo'q",
    cmpR4: "Viza hujjatlarini tayyorlash", cmpR4a: "To'liq kiritilgan", cmpR4b: "Ko'pincha qo'shimcha to'lov", cmpR4c: "O'zingiz qilasiz",
    cmpR5: "Viza rad etilsa", cmpR5a: "Qayta topshirishda yordam", cmpR5b: "Ko'pincha yordam yo'q", cmpR5c: "Boshidan boshlaysiz",
    rrLbl: "Nega bepul", rrTitle: "Nega bu sizga hech narsaga tushmaydi?",
    rrSub: "Bu savolni hamma beradi, shuning uchun halol javob beramiz.",
    rr1t: "Bizga universitet to'laydi", rr1d: "Talaba biz orqali qabul qilinganda universitetlar bizga to'laydi. Biz shunday ishlaymiz — shuning uchun siz to'lashingiz shart emas.",
    rr2t: "Umuman to'lash shart emas", rr2d: "Na boshida, na oxirida. Na ariza, na viza, na maslahat uchun.",
    rr3t: "Biz rasmiy kompaniyamiz", rr3d: "Buyuk Britaniyada ro'yxatdan o'tganmiz, ICEF akkreditatsiyasiga egamiz va British Council tan olgan.",
    rr4t: "Sizga halol aytamiz", rr4d: "Agar hozir kira olmasangiz — to'g'risini aytamiz va nimani yaxshilash kerakligini tushuntiramiz, yilingizni behuda sarflamaymiz.",
    faqLbl: "Ko'p so'raladigan savollar", faqTitle: "So'ramoqchi bo'lgan hamma narsangiz",
    faqLbl2: "Qo'shimcha savollar", faqTitle2: "Hali o'ylayapsizmi?",
    faqCtaTitle: "Kira olasizmi, bilmayapsizmi? 2 daqiqada bilib oling.", faqCta: "Qayerga kira olishimni bilish",
    faq1q: "Xizmatlaringiz qancha turadi?", faq1a: "Xizmatlarimiz talabalar uchun mutlaqo bepul. Biz qabul qilinganingizdan so'ng hamkor universitetlardan to'lov olamiz. Yashirin to'lovlar yo'q.",
    faq2q: "Yuqori IELTS ballim bo'lishi kerakmi?", faq2a: "Yo'q. Ko'pgina hamkorlarimiz IELTS 5.0 va undan past talabalar uchun pathway taklif qiladi. Biz sizning darajangizga mos dasturni topamiz.",
    faq3q: "Butun jarayon qancha vaqt oladi?", faq3a: "O'rtacha 4–8 hafta birinchi suhbatdan qabul xatigacha. Viza rasmiylashtirish mamlakatga qarab yana 4–12 hafta davom etadi.",
    faq4q: "Bolashak stipendiyasida yordam berasizmi?", faq4a: "Ha, biz Qozog'iston va O'zbekistonning davlat stipendiyalarida ixtisoslashamiz. Talablar, muddatlar va hujjatlarni bilimiz.",
    faq5q: "Qaysi mamlakatlarda hamkorlaringiz bor?", faq5a: "Buyuk Britaniya, AQSh, BAA, Kanada, Avstraliya, Yangi Zelandiya, Germaniya, Irlandiya, Niderlandiya, Frantsiya — 10 mamlakatda 100+ universitet.",
    faq6q: "Viza rad etilsa nima bo'ladi?", faq6a: "Rad etish sababini aniqlaymiz va qo'shimcha to'lovsiz qayta topshirishda yordam beramiz. Ko'p rad etishlar hujjatlar yoki moliyaviy dalillar bilan bog'liq — biz aynan shuni topshirishdan oldin tekshiramiz.",
    partLbl: "Rasmiy hamkorlar",
    finalLbl: "Shu yerdan boshlang", finalTitle: "Qayerda <em>o'qiy olishingizni</em> bilib oling.", finalSub: "Bir nechta savolga javob bering — konsultant sizga qaysi universitetlar mos kelishini aytadi. Bepul, 2 daqiqa.", finalCta: "Qayerga kira olishimni bilish",
    t1: "Bepul maslahat", t2: "Majburiyatsiz", t3: "24 soat ichida javob",
    floatTxt: "Qayerga kira olishimni bilish",
    footerTagline: "Sizning ishonchli Britaniya ta'lim hamkori — talabalar uchun bepul, doimo.",
    footerNav: "Navigatsiya",
    footerContact: "Kontaktlar",
    footerHome: "Bosh sahifa",
    footerHowItWorks: "Bu qanday ishlaydi",
    footerDestinations: "Yo'nalishlar",
    footerTestimonials: "Talaba hikoyalari",
    footerFAQ: "Ko'p so'raladigan savollar",
    footerCompany: "UNIVERSE.IN LIMITED — Kompaniya № 16049326",
    footerAddress: "27 Inglis Way, Wrest House, NW7 1TP, London, Britaniya",
    footerWebsite: "uni-in.co.uk",
    footerEmail: "info@universein.uk",
    footerPhone: "+44 7808 165945",
    footerAccredited: "Ro'yxatga olingan",
    footerCopyright: "Barcha huquqlar himoyalangan.",
    footerRegistered: "Britaniyada ro'yxatga olingan kompaniya",
    footerFreeStudents: "Talabalar uchun bepul",
  },
};
