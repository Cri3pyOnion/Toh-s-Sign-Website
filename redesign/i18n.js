// English / 中文 switch.
// English is read from the page itself, so index.html stays the single source for it;
// this file only holds the Chinese. Chinese copy follows the company profile deck where it has one.
// Marked-up elements: data-i18n="key" (inner HTML), data-i18n-attr="attr:key;attr:key",
// data-wa="key" (WhatsApp link whose prefilled message is translated).

(function () {
  const WA = 'https://wa.me/60164397178?text=';
  const STORE = 'tohs-lang';

  const zh = {
    'meta.title.privacy': '隐私政策 · Toh’s Sign',
    'meta.description.privacy': 'Toh’s Sign 如何依据 2010 年个人资料保护法（PDPA）处理您的个人资料。',
    'meta.title.careers': '加入我们 · Toh’s Sign',
    'meta.description.careers': '加入 Toh’s Sign，一家自 1997 年起扎根吉隆坡的执照咨询公司。',
    'meta.title': 'Toh’s Sign：吉隆坡商业执照咨询，始于1997年',
    'meta.description': '营业执照、招牌广告及娱乐执照，以及 MIDA、DOSH、DOE 审批，为马来西亚企业一站式全程办理。免费咨询。',
    'skip': '跳至内容',
    'menu.open': '菜单',
    'menu.close': '关闭',
    'nav.services': '服务',
    'nav.why': '为什么选择我们',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.tools': '免费工具',
    'nav.allservices': '全部服务',
    'nav.team': '我们的团队',
    'nav.careers': '加入我们',
    'tool.finder': '执照查询',
    'tool.renewal': '续期提醒',
    'cta.whatsapp': 'WhatsApp 咨询',
    'page.back': '← 返回首页',
    'logo.label': 'Toh’s Sign 首页',

    'hero.alt': '吉隆坡街景插画：店铺招牌、广告牌与双子塔',
    'tick.label': '我们办理的执照与审批',
    'tick.business': '营业执照',
    'tick.factory': '工厂许可证',
    'tick.liquor': '酒牌执照',
    'tick.entertainment': '娱乐执照',
    'tick.signboard': '招牌执照',
    'tick.billboard': '广告牌及LED屏幕',
    'tick.plan': '建筑图审批',
    'tick.renovation': '装修准证',
    'tick.mida': 'MIDA',
    'tick.miti': 'MITI',
    'tick.kkm': 'KKM',
    'tick.doe': 'DOE',
    'tick.dosh': 'DOSH',
    'tick.ssm': 'SSM公司注册',
    'tick.halal': '清真认证',
    'tick.haccp': 'HACCP 及 GMP',
    'tick.trademark': '商标注册',
    'tick.import': '进出口许可证',
    'hero.eyebrow': '执照咨询 · 吉隆坡 · 始于1997年',
    'hero.main': '执照之道',
    'hero.sub': '尽在掌握 · 一站式咨询',
    'hero.lead': '您值得信赖的执照合作伙伴。自1997年起，我们为您准备、提交并跟进申请，直至获批。',
    'cta.consult': '获取免费咨询',
    'hero.more': '查看我们的服务',
    'path.title': '从这里开始：您正在筹备什么？',
    'path.shop': '开设商店或办公室',
    'path.restaurant': '开设餐厅或咖啡馆',
    'path.signboard': '安装招牌或广告牌',
    'path.renovation': '装修营业场所',
    'path.renew': '执照更新',
    'top.since': '1997年起专注执照咨询',
    'top.free': '首次咨询免费',
    'top.hours': '星期一至五，上午 8:30 至下午 6:00',

    'services.title': '我们的服务',
    'services.lead': '专属顾问从初步评估到最终获批，全程负责您的申请。',
    'finder.q': '您要开设或办理什么？',
    'finder.sub': '选择最接近的一项，随时可以更改。',
    'finder.resultTitle': '您的执照清单',
    'finder.prompt': '选择您要开设的项目，查看通常需要的执照。',
    'finder.emptyTitle': '尚未选择',
    'finder.emptyText': '选择其中一项，即可生成您的清单。',
    'finder.note': '每个业务情况不同。我们会在免费咨询中为您确认具体要求。',
    'finder.cta': '通过 WhatsApp 咨询',
    'finder.clear': '重新选择',
    'finder.details': '查看详情',
    'hint.shop': '零售、办公室或美容院',
    'hint.restaurant': '餐厅、咖啡馆或面包店',
    'hint.bar': '售酒或有现场音乐',
    'hint.factory': '制造或仓储',
    'hint.clinic': '医疗、牙科或保健',
    'hint.signboard': '新招牌、广告牌或 LED 屏',
    'hint.event': '演唱会、发布会或路演',
    'hint.renovation': '扩建、隔断或遮阳篷',
    'hint.import': '许可证、SSM 注册或认证',
    'need.business': '让您在营业场所合法经营，由地方政府发出。',
    'need.advertisement': '用于营业场所外的招牌或户外广告。',
    'need.entertainment': '用于售酒、现场音乐或公共活动。',
    'need.engineering': '装修工程及招牌结构所需的批准图纸。',
    'need.other': '您所属行业的机构审批、许可证和认证。',
    'chip.shop': '商店或办公室',
    'chip.restaurant': '餐厅或咖啡馆',
    'chip.bar': '酒吧或夜店',
    'chip.factory': '工厂',
    'chip.clinic': '诊所',
    'chip.signboard': '招牌',
    'chip.event': '活动',
    'chip.renovation': '装修',
    'chip.import': '进出口',

    'lic.business.name': '营业执照与工厂许可证',
    'lic.business.covers': '适用于商铺、办公场所、零售店及工业厂房运营。',
    'lic.business.ask': '咨询<span class="visually-hidden">营业执照</span>',
    'lic.entertainment.name': '娱乐及酒类经营许可证',
    'lic.entertainment.covers': '酒牌执照、现场音乐、公共娱乐及活动方案的法律审批。',
    'lic.entertainment.ask': '咨询<span class="visually-hidden">娱乐及酒类许可证</span>',
    'lic.advertisement.name': '广告与户外广告许可证',
    'lic.advertisement.covers': '招牌、广告牌、LED屏幕、立柱式广告牌及道路封闭许可。',
    'lic.advertisement.ask': '咨询<span class="visually-hidden">广告许可证</span>',
    'lic.engineering.name': '工程与建筑制图服务',
    'lic.engineering.covers': '翻新、扩建、夹层、隔断、遮阳篷、坡道及排风系统图纸；招牌、广告牌及LED屏幕结构图；以及土地权属转换。',
    'lic.engineering.ask': '咨询<span class="visually-hidden">工程与建筑制图</span>',
    'lic.other.name': '监管与行业合规',
    'lic.other.covers': 'SSM公司注册；MITI、MIDA、MOH（KKM）、DOE 及 DOSH 审批；进出口许可证；商标注册；以及清真（HALAL）、HACCP、GMP 和 MESTI 认证。',
    'lic.other.ask': '咨询<span class="visually-hidden">监管与行业合规</span>',

    'figures.title': '我们的成绩',
    'figures.lead': '二十八年执照咨询经验，用数据说话。',
    'fig.years': '多年执照咨询经验',
    'fig.cases': '成功获批案例',
    'fig.brands': '合作品牌',
    'fig.rate': '批准率',

    'why.title': '我们对每位客户的承诺',
    'why.lead': '从评估到续期，流程透明、风险可控。',
    'why.1.t': '首次咨询免费',
    'why.1.d': '免费评估您的情况，在您决定之前，坦白告诉您是否符合资格。',
    'why.2.t': '先评估，再提交',
    'why.2.d': '提交前先评估审批通过率，确保申请从第一天起就符合规定。',
    'why.3.t': '一位顾问，全程负责',
    'why.3.d': '同一位顾问从头到尾跟进您的案件，并通过 WhatsApp 随时汇报进度。',
    'why.4.t': '为您的执照量身准备文件',
    'why.4.d': '每份申请均根据您的执照类别和行业专门准备。',
    'why.5.t': '问题提早指出',
    'why.5.d': '提交前指出潜在障碍，避免被拒和重新提交。',
    'why.6.t': '续期我们帮您记着',
    'why.6.d': '执照获批后，我们为您跟进续期日期与合规事项。',
    'why.cta': '申请可行性评估',

    'clients.title': '部分客户',
    'clients.lead': '超过200个零售、餐饮、金融及制造业品牌，信赖我们办理执照。',
    'clients.luxury': '奢侈品与珠宝',
    'clients.retail': '零售与生活',
    'clients.food': '餐饮',
    'clients.finance': '银行与制造业',

    'team.title': '集团与领导团队',
    'team.lead': '两家公司，一个团队。认识带领我们的人。',
    'group.informatic': '由 CK Toh 于1997年创办，办理营业、广告及娱乐执照。',
    'group.consultancy': '子公司，专门处理复杂事务：工程及建筑图审批、卫生部（KKM）、MOTAC、MIDA 及各类行业认证。',
    'team.leaders': '领导团队',
    'team.ceo': '总裁兼人力资源',
    'team.gm': '总经理',
    'team.am': '客户经理',
    'team.ac': '行政顾问',
    'team.aom': '行政运营经理',
    'team.lm': '联络经理',
    'team.join': '加入我们的团队',

    'renew.badDate': '请输入 2000 年至 2099 年之间的日期。',
    'renew.title': '续期提醒',
    'renew.emptyTitle': '还没有提醒',
    'renew.emptyText': '选择执照类型和到期日，续期开始日期就会显示在这里。',
    'renew.lead': '输入执照到期日，我们会告诉您何时开始办理续期，并为您生成日历提醒。',
    'renew.license': '执照',
    'renew.expiry': '到期日',
    'renew.go': '规划续期',
    'renew.ics': '加入日历',
    'renew.gcal': 'Google 日历',
    'renew.wa': '请我们代办',
    'renew.start': '请在 ',
    'renew.startMid': ' 前开始办理续期，即到期日 ',
    'renew.startEnd': ' 前两个月。',
    'renew.soon': '执照将于 ',
    'renew.soonMid': ' 到期，请',
    'renew.now': '立即开始办理',
    'renew.soonEnd': '。',
    'renew.past': '此执照已于 ',
    'renew.pastEnd': ' 到期。请联系我们，协助您办理续期。',
    'renew.evStart': '开始办理执照续期：',
    'renew.evExpiry': '执照到期：',
    'renew.evNote': 'Toh’s Sign 可代您办理续期：016-439 7178（WhatsApp）',
    'renew.waMsg': '您好 Toh’s Sign，请协助我办理',
    'renew.waMid': '的续期，到期日为',

    'form.title': '提交询问',
    'form.lead': '告诉我们您的业务情况，顾问会尽快与您联系。',
    'form.name': '您的姓名',
    'form.company': '公司（选填）',
    'form.phone': '电话',
    'form.email': '电子邮件（选填）',
    'form.service': '您需要哪方面的协助？',
    'form.pick': '请选择',
    'form.unsure': '还不确定',
    'form.message': '介绍一下您的业务',
    'form.wa': '通过 WhatsApp 发送',
    'form.mail': '通过电子邮件发送',
    'form.note': '这些资料仅用于回复您的询问。',
    'form.hello': '您好 Toh’s Sign，我想咨询以下事项。',
    'form.subject': '网站询问',

    'foot.about': '吉隆坡商业执照咨询公司，始于1997年。',
    'foot.company': '公司',
    'foot.help': '工具与政策',
    'foot.privacy': '隐私政策',

    'about.title': '关于 Toh’s Sign',
    'about.lead': 'Toh’s Sign 由 CK Toh 于1997年创办，凭借数十年的经验，高效解决各类执照申请难题，确保企业运营顺畅。',
    'about.p': '其子公司 Toh’s Sign Consultancy Sdn Bhd 专注处理复杂的执照事务，包括工程/建筑图审批、卫生部（KKM）、旅游、艺术及文化部（MOTAC）、马来西亚投资发展局（MIDA）以及各类行业认证，为每位客户提供量身定制的解决方案。',
    'about.team': '我们坚信，卓越的团队能创造非凡的成就。我们以专业能力、团队协作和创新精神培养和留住人才，营造包容且互相支持的工作环境。',
    'about.vision.t': '愿景',
    'about.vision.d': '成为马来西亚领先的一站式执照咨询公司。',
    'about.mission.t': '使命',
    'about.mission.d': '提供从咨询到许可证交付的一站式解决方案，以客户为中心，反应迅速，服务优质。',
    'about.promise.t': '承诺',
    'about.promise.d': '我们只承诺力所能及之事，提供直接、快捷、可靠且省心的解决方案。',
    'about.csr.t': '企业社会责任',
    'about.csr.d': '助力企业合规运营，关怀社区，促进员工成长，并始终秉持诚信原则。',
    'about.companies.t': '公司',

    'contact.title': '联系我们',
    'contact.lead': '首次咨询免费。',
    'contact.call': '致电',
    'contact.email': '电子邮件',
    'contact.office': '欢迎莅临我们的办公室',
    'hours.caption': '营业时间',
    'hours.weekdays': '星期一至星期五',
    'hours.weekdays.time': '上午 8:30 至下午 6:00',
    'hours.weekend': '星期六及星期日',
    'hours.closed': '休息',

    'consent.title': '本网站的 Cookie',
    'consent.text': '我们使用分析 Cookie 了解哪些页面对访客最有帮助。只有在您同意后才会启用；不论是否同意，网站功能均不受影响。',
    'consent.necessary': '仅限必要',
    'consent.accept': '同意分析',
    'consent.settings': 'Cookie 设置',

    // WhatsApp prefilled messages
    'wa.consult': '您好 Toh’s Sign，我想预约免费的执照咨询。',
    'wa.business': '您好，我想咨询营业执照的申请。',
    'wa.entertainment': '您好，我想咨询娱乐及酒类经营许可证的申请。',
    'wa.advertisement': '您好，我想咨询广告与户外广告许可证的申请。',
    'wa.engineering': '您好，我想咨询工程与建筑制图的审批。',
    'wa.other': '您好，我想咨询监管与行业合规事宜（如 MIDA、DOE、DOSH、KKM）。',
    'wa.feasibility': '您好 Toh’s Sign，我想为我的执照申请做一次免费的可行性评估。',
    'wa.which': '您好 Toh’s Sign，我想了解我需要办理哪些执照。',
    'wa.renew': '您好 Toh’s Sign，我需要协助办理执照更新。',
  };

  // English strings that are not on the page as text.
  const en = {
    'menu.open': 'Menu',
    'menu.close': 'Close',
    'finder.prompt': 'Pick what you’re setting up to see the licenses it usually needs.',
    'finder.details': 'See details',
    'need.business': 'Lets you operate from your premises. Issued by the local council.',
    'need.advertisement': 'For the signboard or outdoor advertising at your premises.',
    'need.entertainment': 'For selling alcohol, live music or public events.',
    'need.engineering': 'Approved drawings for building works and sign structures.',
    'need.other': 'Agency approvals, permits and certifications for your industry.',
    'wa.which': 'Hi Toh’s Sign, I’d like to ask which licenses I need.',
  };

  const root = document.documentElement;
  const metaDesc = document.querySelector('meta[name="description"]');

  // Capture the English from the page once.
  // Each page has its own title: index uses meta.title, other pages meta.title.<page>.
  const page = document.documentElement.dataset.page;
  const titleKey = page ? `meta.title.${page}` : 'meta.title';
  const descKey = page ? `meta.description.${page}` : 'meta.description';
  en[titleKey] = document.title;
  en[descKey] = metaDesc?.content || '';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const k = el.dataset.i18n;
    if (!(k in en)) en[k] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.dataset.i18nAttr.split(';').forEach((pair) => {
      const [attr, k] = pair.split(':');
      if (!(k in en)) en[k] = el.getAttribute(attr) || '';
    });
  });
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const k = el.dataset.wa;
    if (!(k in en)) {
      const text = new URL(el.href).searchParams.get('text');
      en[k] = text || '';
    }
  });

  const dicts = { en, zh };
  let current = 'en';

  const known = (lang) => lang === 'en' || lang === 'zh';
  const t = (key, lang = current) => (Object.hasOwn(dicts[lang], key) ? dicts[lang][key] : undefined) ?? (Object.hasOwn(en, key) ? en[key] : '') ?? '';

  function apply(lang) {
    if (!known(lang)) lang = 'en';
    current = lang;
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    document.title = t(titleKey);
    if (metaDesc) metaDesc.content = t(descKey);

    document.querySelectorAll('[data-i18n]').forEach((el) => { el.innerHTML = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, k] = pair.split(':');
        el.setAttribute(attr, t(k));
      });
    });
    document.querySelectorAll('[data-wa]').forEach((el) => { el.href = WA + encodeURIComponent(t(el.dataset.wa)); });
    document.querySelectorAll('.lang [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

    root.removeAttribute('data-lang-pending');
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function set(lang) {
    apply(lang);
    try { localStorage.setItem(STORE, lang); } catch (e) { /* private mode: the switch still works for this visit */ }
    // Keep the address shareable: ?lang=zh opens the Chinese version directly.
    try {
      const url = new URL(location.href);
      if (lang === 'zh') url.searchParams.set('lang', 'zh'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    } catch (e) { /* file:// or sandboxed: skip */ }
  }

  window.i18n = { t, set, get lang() { return current; } };

  const sw = document.querySelector('.lang');
  if (sw) {
    sw.hidden = false;
    sw.addEventListener('click', (e) => {
      const b = e.target.closest('[data-lang]');
      if (b && known(b.dataset.lang) && b.dataset.lang !== current) set(b.dataset.lang);
    });
  }

  let start = new URLSearchParams(location.search).get('lang');
  if (!known(start)) { try { start = localStorage.getItem(STORE); } catch (e) { start = null; } }
  apply(known(start) ? start : 'en');
})();
