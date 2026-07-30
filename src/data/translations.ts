export type Lang = 'en' | 'ru' | 'uz';

export interface Translation {
  urg: string; badge: string; title: string; sub: string;
  cta: string; note: string;
  s1: string; s2: string; s3: string; s4: string;
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
  faqLbl: string; faqTitle: string;
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
    badge: "Trusted by 1,000+ students from Central Asia",
    title: "Your place at a <em>world-class university</em> is waiting for you.",
    sub: "Every year, students from Uzbekistan and Tajikistan miss their chance — not because they weren't good enough, but because no one showed them the way. <strong>We do.</strong>",
    cta: "Check My Eligibility", note: "Free · 2 minutes · No commitment",
    s1: "Students placed", s2: "Partner universities", s3: "Countries", s4: "For students",
    destLbl: "Study in 10 countries",
    objLbl: "We hear you", objTitle: "We answer your doubts",
    obj1f: '"My English isn\'t good enough"', obj1a: "Pathway programmes exist for this", obj1d: "Start with language or foundation programmes. We map the route from your current level to your offer letter.",
    obj2f: '"It\'s too expensive for me"', obj2a: "Scholarships exist for every budget", obj2d: "Bolashak, El-Yurt Umidi and dozens more. We know how to get them. Our consultation is completely free.",
    obj3f: '"I\'m scared I won\'t get a visa"', obj3a: "94% of our students get their visa", obj3d: "We prepare all documents, guide the application, and know exactly what embassies check. Your chances are far higher with us.",
    obj4f: '"I don\'t know if I qualify"', obj4a: "We find a university for you", obj4d: "100+ partner universities — from top Russell Group to accessible pathways. There's an option for everyone.",
    obj5f: '"It will take too long"', obj5a: "6 weeks to an offer letter — it's real", obj5d: "Our students get offers in 4–8 weeks. We know deadlines, handle all paperwork and fast-track the process.",
    obj6f: '"I can\'t figure it out alone"', obj6a: "We're with you from first step to landing", obj6d: "Application, visa, accommodation, settling in. Our team speaks your language and understands your situation.",
    howLbl: "How it works", howTitle: "Three steps to your offer letter",
    how1t: "Take a quick quiz", how1d: "A 2-minute quiz about your budget, English level and goals — so we know exactly which universities actually fit you.",
    how2t: "We match you perfectly", how2d: "Our team reviews your profile and shortlists universities most likely to accept you.",
    how3t: "We handle everything", how3d: "Application, visa, accommodation, scholarships. From Tashkent or Dushanbe to your campus — we are with you at every step.",
    tmLbl: "Student stories", tmTitle: "Real students. Real results.",
    tm1q: '"I had no idea where to start. Universe In handled everything — my application, my visa, everything. I\'m now studying Business at Manchester."',
    tm2q: '"My IELTS was 6.0 and I thought I had no chance. They found me a pathway that fit perfectly. One year later I\'m at Heriot-Watt studying Engineering."',
    tm3q: '"Canada felt impossible from Samarkand. Universe In showed me it wasn\'t. I got into Seneca, got my study permit. Best decision of my life."',
    faqLbl: "FAQ", faqTitle: "Everything you wanted to ask",
    faq1q: "How much do your services cost?", faq1a: "Our services are completely free for students. We receive a fee from partner universities after your enrolment. No hidden charges.",
    faq2q: "Do I need a high IELTS score?", faq2a: "No. Many of our partners offer pathways from IELTS 5.0 and below. We find the programme for your current level.",
    faq3q: "How long does the whole process take?", faq3a: "On average 4–8 weeks from first conversation to offer letter. Visa processing takes another 4–12 weeks depending on country.",
    faq4q: "Do you help with Bolashak scholarships?", faq4a: "Yes, we specialise in Bolashak and El-Yurt Umidi. We know requirements, deadlines and help prepare your documents.",
    faq5q: "Which countries do you cover?", faq5a: "UK, USA, UAE, Canada, Australia, New Zealand, Germany, Ireland, Netherlands, France — 100+ universities in 10 countries.",
    faq6q: "What if my visa gets refused?", faq6a: "We support reapplication and identify reasons for refusal. 94% of our students get their visa first time due to thorough document preparation.",
    partLbl: "Our official partners",
    finalLbl: "Your future starts now", finalTitle: "One conversation<br/>changes everything.", finalSub: "Thousands of students from Uzbekistan and Tajikistan are already studying abroad. Your place is waiting.", finalCta: "Start For Free",
    t1: "Free consultation", t2: "No commitment", t3: "Response within 24h",
    floatTxt: "Check My Eligibility — Free",
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
    badge: "Доверяют 1,000+ студентов из Центральной Азии",
    title: "Ваше место в <em>университете мирового класса</em> уже ждёт вас.",
    sub: "Каждый год студенты из Узбекистана и Таджикистана упускают свой шанс — не потому что они недостаточно хороши, а потому что никто не показал им путь. <strong>Мы показываем.</strong>",
    cta: "Проверить мои шансы", note: "Бесплатно · 2 минуты · Без обязательств",
    s1: "Студентов устроено", s2: "Университетов-партнёров", s3: "Стран", s4: "Для студентов",
    destLbl: "Учитесь в 10 странах",
    objLbl: "Мы слышим вас", objTitle: "Мы отвечаем на ваши сомнения",
    obj1f: '"Мой английский недостаточно хорош"', obj1a: "Для этого существуют pathway-программы", obj1d: "Начните с языковых курсов или foundation-программ. Мы подберём маршрут под ваш текущий уровень и приведём вас к поступлению.",
    obj2f: '"Это слишком дорого для меня"', obj2a: "Есть стипендии под любой бюджет", obj2d: "Болашак, Эл-Юрт Умиди и десятки других программ. Мы знаем, как их получить. Наша консультация — бесплатная.",
    obj3f: '"Я боюсь, что визу не дадут"', obj3a: "94% наших студентов получают визу", obj3d: "Мы готовим все документы, сопровождаем подачу и знаем, что проверяют консульства. Ваши шансы с нами значительно выше.",
    obj4f: '"Я не знаю, подхожу ли я"', obj4a: "Мы найдём университет под вас", obj4d: "100+ партнёрских университетов — от топовых Russell Group до доступных pathway-программ. Есть вариант для каждого.",
    obj5f: '"Это займёт слишком много времени"', obj5a: "6 недель до оффера — это реально", obj5d: "Наши студенты получают офферы за 4–8 недель. Мы знаем дедлайны, берём на себя всю бюрократию и ускоряем процесс.",
    obj6f: '"Мне сложно разобраться одному"', obj6a: "Мы рядом от первого шага до посадки", obj6d: "Поступление, виза, жильё, адаптация. Наша команда говорит на вашем языке и понимает вашу ситуацию.",
    howLbl: "Как это работает", howTitle: "Три шага до оффера",
    how1t: "Пройдите короткий тест", how1d: "2-минутный тест о вашем бюджете, уровне английского и целях — чтобы мы точно знали, какие университеты вам подходят.",
    how2t: "Мы подбираем варианты", how2d: "Наша команда изучает ваш профиль и составляет шортлист университетов — тех, которые с наибольшей вероятностью вас примут.",
    how3t: "Мы берём всё на себя", how3d: "Поступление, виза, жильё, стипендии. От Ташкента или Душанбе до вашего кампуса — мы с вами на каждом шагу.",
    tmLbl: "Истории студентов", tmTitle: "Настоящие студенты. Реальные результаты.",
    tm1q: "«Я понятия не имела, с чего начать. Universe In взяли на себя всё — заявку, визу, всё. Сейчас я учусь на Бизнесе в Манчестере и до сих пор не могу поверить.»",
    tm2q: "«Мой IELTS был 6.0, и я думал, что у меня нет шансов. Они нашли мне pathway, который идеально подошёл. Год спустя я в Heriot-Watt на Инжиниринге.»",
    tm3q: "«Канада казалась невозможной из Самарканда. Universe In показали, что это не так. Я поступила в Seneca, получила разрешение на учёбу. Лучшее решение в жизни.»",
    faqLbl: "Частые вопросы", faqTitle: "Всё, что вы хотели спросить",
    faq1q: "Сколько стоят ваши услуги?", faq1a: "Наши услуги абсолютно бесплатны для студентов. Мы получаем вознаграждение от университетов-партнёров после вашего зачисления. Никаких скрытых платежей.",
    faq2q: "Нужен ли мне высокий IELTS?", faq2a: "Нет. Многие наши партнёры предлагают pathway-программы для студентов с IELTS от 5.0 и даже ниже. Мы подберём программу под ваш текущий уровень.",
    faq3q: "Сколько времени займёт весь процесс?", faq3a: "В среднем 4–8 недель от первого разговора до оффера. Оформление визы займёт ещё 4–12 недель в зависимости от страны.",
    faq4q: "Помогаете ли вы с Болашак и Эл-Юрт Умиди?", faq4a: "Да, мы специализируемся на государственных стипендиях Казахстана и Узбекистана. Знаем требования, дедлайны и помогаем подготовить документы.",
    faq5q: "В каких странах у вас есть партнёры?", faq5a: "Великобритания, США, ОАЭ, Канада, Австралия, Новая Зеландия, Германия, Ирландия, Нидерланды, Франция — более 100 университетов в 10 странах.",
    faq6q: "Что если мне откажут в визе?", faq6a: "Мы сопровождаем повторную подачу и помогаем разобраться в причинах отказа. 94% наших студентов получают визу с первого раза.",
    partLbl: "Официальные партнёры",
    finalLbl: "Ваше будущее начинается сейчас", finalTitle: "Один разговор<br/>меняет всё.", finalSub: "Тысячи студентов из Узбекистана и Таджикистана уже учатся за рубежом. Ваше место ждёт.", finalCta: "Начать бесплатно",
    t1: "Бесплатная консультация", t2: "Без обязательств", t3: "Ответ в течение 24ч",
    floatTxt: "Проверить мои шансы — Бесплатно",
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
    badge: "Markaziy Osiyodan 1,000+ talaba ishonadi",
    title: "<em>Jahon darajasidagi universitetdagi</em> o'rningiz sizni kutmoqda.",
    sub: "Har yili O'zbekiston va Tojikistondan talabalar imkoniyatini boy beradi — bilimi past bo'lgani uchun emas, hech kim yo'l ko'rsatmagani uchun. <strong>Biz ko'rsatamiz.</strong>",
    cta: "Imkoniyatlarimni tekshirish", note: "Bepul · 2 daqiqa · Majburiyatsiz",
    s1: "Talabalar joylashtirildi", s2: "Universitet hamkorlar", s3: "Davlatlar", s4: "Talabalar uchun",
    destLbl: "10 mamlakatda o'qing",
    objLbl: "Biz sizni eshitamiz", objTitle: "Shubhalaringizga javob beramiz",
    obj1f: '"Mening inglizim yetarli emas"', obj1a: "Buning uchun pathway dasturlari mavjud", obj1d: "Til kurslari yoki foundation dasturlaridan boshlang. Sizning darajangizdan qabul xatingizgacha yo'lni belgilaymiz.",
    obj2f: '"Bu men uchun juda qimmat"', obj2a: "Har qanday byudjet uchun stipendiyalar bor", obj2d: "Bolashak, El-Yurt Umidi va o'nlab boshqa dasturlar. Biz ularni qanday olishni bilamiz. Maslahatimiz bepul.",
    obj3f: '"Viza bermasligidan qo\'rqaman"', obj3a: "Talabalarimizning 94% vizasini oldi", obj3d: "Barcha hujjatlarni tayyorlaymiz, ariza topshirishda hamroh bo'lamiz va konsulliklarning nimani tekshirishini bilamiz.",
    obj4f: '"Mos kelamanmi bilmayman"', obj4a: "Siz uchun universitet topamiz", obj4d: "100+ hamkor universitetlar — eng yaxshi Russell Group dan qulay pathway dasturlarigacha. Har kim uchun variant bor.",
    obj5f: '"Bu juda ko\'p vaqt oladi"', obj5a: "6 haftada qabul xati — bu haqiqat", obj5d: "Talabalarimiz 4–8 haftada taklif oladi. Muddatlarni bilamiz, barcha qog'ozbozlikni o'z zimmamizga olamiz.",
    obj6f: '"Yolg\'iz tushunishim qiyin"', obj6a: "Birinchi qadamdan qo'nishgacha yoningizdamiz", obj6d: "Qabul, viza, turar joy, moslashish. Jamoamiz tilingizda gapiradi va vaziyatingizni tushunadi.",
    howLbl: "Bu qanday ishlaydi", howTitle: "Qabul xatingizgacha uch qadam",
    how1t: "Qisqa testdan o'ting", how1d: "Byudjetingiz, ingliz tili darajangiz va maqsadlaringiz haqida 2 daqiqalik test — sizga aynan mos universitetlarni aniq bilishimiz uchun.",
    how2t: "Biz sizga mos variantlarni topamiz", how2d: "Jamoamiz profilingizni ko'rib chiqadi va qabul qilish ehtimoli eng yuqori universitetlarni tanlaydi.",
    how3t: "Biz hamma narsani hal qilamiz", how3d: "Qabul, viza, turar joy, stipendiya. Toshkent yoki Dushanbadan kampusingizgacha — biz har qadamda yoningizda.",
    tmLbl: "Talaba hikoyalari", tmTitle: "Haqiqiy talabalar. Haqiqiy natijalar.",
    tm1q: '"Qayerdan boshlashni bilmasdim. Universe In hamma narsani — arizam, vizamni o\'z zimmasiga oldi. Hozir Manchesterda Biznes o\'qiyapman."',
    tm2q: '"IELTS ballim 6.0 edi, imkonim yo\'q deb o\'ylardim. Ular menga mos pathway topishdi. Bir yildan keyin Heriot-Wattda Muhandislik o\'qiyapman."',
    tm3q: '"Samarqanddan Kanada imkonsiz tuyulardi. Universe In yo\'q ekanini ko\'rsatdi. Senecaga kirdim, ruxsatnoma oldim. Hayotimdagi eng yaxshi qaror."',
    faqLbl: "Ko'p so'raladigan savollar", faqTitle: "So'ramoqchi bo'lgan hamma narsangiz",
    faq1q: "Xizmatlaringiz qancha turadi?", faq1a: "Xizmatlarimiz talabalar uchun mutlaqo bepul. Biz qabul qilinganingizdan so'ng hamkor universitetlardan to'lov olamiz. Yashirin to'lovlar yo'q.",
    faq2q: "Yuqori IELTS ballim bo'lishi kerakmi?", faq2a: "Yo'q. Ko'pgina hamkorlarimiz IELTS 5.0 va undan past talabalar uchun pathway taklif qiladi. Biz sizning darajangizga mos dasturni topamiz.",
    faq3q: "Butun jarayon qancha vaqt oladi?", faq3a: "O'rtacha 4–8 hafta birinchi suhbatdan qabul xatigacha. Viza rasmiylashtirish mamlakatga qarab yana 4–12 hafta davom etadi.",
    faq4q: "Bolashak stipendiyasida yordam berasizmi?", faq4a: "Ha, biz Qozog'iston va O'zbekistonning davlat stipendiyalarida ixtisoslashamiz. Talablar, muddatlar va hujjatlarni bilimiz.",
    faq5q: "Qaysi mamlakatlarda hamkorlaringiz bor?", faq5a: "Buyuk Britaniya, AQSh, BAA, Kanada, Avstraliya, Yangi Zelandiya, Germaniya, Irlandiya, Niderlandiya, Frantsiya — 10 mamlakatda 100+ universitet.",
    faq6q: "Viza rad etilsa nima bo'ladi?", faq6a: "Qayta topshirishni qo'llab-quvvatlaymiz va rad etish sabablarini aniqlaymiz. Talabalarimizning 94% vizani birinchi marta oladi.",
    partLbl: "Rasmiy hamkorlar",
    finalLbl: "Kelajagingiz hozir boshlanadi", finalTitle: "Bitta suhbat<br/>hamma narsani o'zgartiradi.", finalSub: "O'zbekiston va Tojikistondan minglab talabalar allaqachon chet elda o'qimoqda. Sizning o'rningiz kutmoqda.", finalCta: "Bepul boshlash",
    t1: "Bepul maslahat", t2: "Majburiyatsiz", t3: "24 soat ichida javob",
    floatTxt: "Imkoniyatlarimni tekshirish — Bepul",
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
