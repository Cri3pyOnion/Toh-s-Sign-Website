// English / 中文 switch.
// English is read from the page itself, so index.html stays the single source for it;
// this file only holds the Chinese. Chinese copy follows the company profile deck where it has one.
// Marked-up elements: data-i18n="key" (inner HTML), data-i18n-attr="attr:key;attr:key",
// data-wa="key" (WhatsApp link whose prefilled message is translated).

(function () {
  const WA = 'https://wa.me/60164397178?text=';
  const STORE = 'tohs-lang';

  const zh = {
    'meta.title': 'Toh’s Sign：吉隆坡商业执照咨询，始于1997年',
    'meta.description': '营业执照、招牌广告及娱乐执照，以及 MIDA、DOSH、DOE 审批，为马来西亚企业一站式全程办理。免费咨询。',
    'skip': '跳至内容',
    'menu.open': '菜单',
    'menu.close': '关闭',
    'nav.services': '服务',
    'nav.why': '为什么选择我们',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
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
    'hero.main': '执照之道',
    'hero.sub': '尽在掌握 · 一站式咨询',
    'hero.lead': '您值得信赖的执照合作伙伴。自1997年起，我们为您准备、提交并跟进申请，直至获批。',
    'cta.consult': '获取免费咨询',
    'hero.more': '查看我们的服务',

    'services.title': '我们的服务',
    'services.lead': '专属顾问从初步评估到最终获批，全程负责您的申请。',
    'finder.q': '选择您的业务类型',
    'chip.shop': '商店或办公室',
    'chip.restaurant': '餐厅或咖啡馆',
    'chip.bar': '酒吧或夜店',
    'chip.factory': '工厂',
    'chip.clinic': '诊所',
    'chip.signboard': '招牌',
    'chip.event': '活动',
    'chip.renovation': '装修',
    'chip.import': '进出口',
    'finder.prompt': '选择业务类型，查看通常需要办理的执照。',
    'finder.cta': '通过 WhatsApp 咨询',

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
    'fig.years': '多年执照咨询经验',
    'fig.cases': '成功获批案例',
    'fig.brands': '合作品牌',
    'fig.rate': '批准率',

    'why.title': '为什么选择 Toh’s Sign',
    'why.lead': '从评估到续期，流程透明、风险可控。',
    'why.1.t': '提交前评估',
    'why.1.d': '提交申请前，先评估审批通过率，确保申请符合规定。',
    'why.2.t': '定制化许可方案',
    'why.2.d': '根据具体许可类别和行业，量身准备申请文件。',
    'why.3.t': '专属一对一跟进',
    'why.3.d': '个性化的全流程跟进，项目进度清晰可控。',
    'why.4.t': '诚信可行性咨询',
    'why.4.d': '直接透明地说明资格要求，为您节省时间和资源。',
    'why.5.t': '主动识别风险',
    'why.5.d': '尽早识别潜在障碍，最大限度降低被拒及重新提交的风险。',
    'why.6.t': '获批后支持',
    'why.6.d': '执照发出后，继续提供合规指导并跟进续期。',
    'why.cta': '申请可行性评估',

    'clients.title': '部分客户',

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

    // WhatsApp prefilled messages
    'wa.consult': '您好 Toh’s Sign，我想预约免费的执照咨询。',
    'wa.business': '您好，我想咨询营业执照的申请。',
    'wa.entertainment': '您好，我想咨询娱乐及酒类经营许可证的申请。',
    'wa.advertisement': '您好，我想咨询广告与户外广告许可证的申请。',
    'wa.engineering': '您好，我想咨询工程与建筑制图的审批。',
    'wa.other': '您好，我想咨询监管与行业合规事宜（如 MIDA、DOE、DOSH、KKM）。',
    'wa.feasibility': '您好 Toh’s Sign，我想为我的执照申请做一次免费的可行性评估。',
    'wa.which': '您好 Toh’s Sign，我想了解我需要办理哪些执照。',
  };

  // English strings that are not on the page as text.
  const en = {
    'menu.open': 'Menu',
    'menu.close': 'Close',
    'finder.prompt': 'Select a business type to see the licenses typically required.',
    'wa.which': 'Hi Toh’s Sign, I’d like to ask which licenses I need.',
  };

  const root = document.documentElement;
  const metaDesc = document.querySelector('meta[name="description"]');

  // Capture the English from the page once.
  en['meta.title'] = document.title;
  en['meta.description'] = metaDesc?.content || '';
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

  const t = (key, lang = current) => dicts[lang][key] ?? en[key] ?? '';

  function apply(lang) {
    if (!dicts[lang]) lang = 'en';
    current = lang;
    root.lang = lang === 'zh' ? 'zh-Hans' : 'en';
    document.title = t('meta.title');
    if (metaDesc) metaDesc.content = t('meta.description');

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
      if (b && b.dataset.lang !== current) set(b.dataset.lang);
    });
  }

  let start = new URLSearchParams(location.search).get('lang');
  if (!dicts[start]) { try { start = localStorage.getItem(STORE); } catch (e) { start = null; } }
  apply(dicts[start] ? start : 'en');
})();
