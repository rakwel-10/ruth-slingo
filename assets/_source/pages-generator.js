/* Generates educate.html / empower.html / create-legacy.html.
   Chrome (head, nav, footer) is lifted byte-for-byte from index.html so all four
   files stay identical there; only hrefs are resolved for cross-page use. */
const fs = require('fs');
const DIR = 'c:/Users/Rocky/Documents/WORK/Claude/Ruth Slingo/';
const src = fs.readFileSync(DIR + 'index.html', 'utf8');

/* Extract by markers, never by line number — index.html gets edited constantly
   and line offsets silently shift the slices. */
function between(startMarker, endMarker) {
  const a = src.indexOf(startMarker);
  if (a < 0) throw new Error('generator: start marker not found: ' + startMarker);
  const b = src.indexOf(endMarker, a);
  if (b < 0) throw new Error('generator: end marker not found: ' + endMarker);
  return src.slice(a, b + endMarker.length);
}

const head = between('<!DOCTYPE html>', '</head>');
const nav  = between('<header id="nav"', '</header>');
const foot = between('<footer class="bg-ink', '</footer>');

/* fail loudly rather than emit half a page */
[['head', head, '</style>'], ['nav', nav, 'SLINGO'], ['footer', foot, 'Quick links']]
  .forEach(([name, block, needle]) => {
    if (!block.includes(needle)) throw new Error(`generator: ${name} block looks truncated`);
  });

/* nav + footer live on a sub-page, so same-page anchors must resolve to home */
const resolve = html => html
  .replace(/href="#(home|about|services|assessment|testimonials|faq|consult)"/g, 'href="index.html#$1"')
  .replace('href="index.html#home" class="flex items-center gap-3 shrink-0"', 'href="index.html" class="flex items-center gap-3 shrink-0"');

const NAV = resolve(nav);
const FOOT = resolve(foot);

const headFor = (title, desc) => head
  .replace('<title>Slingo Financial Services — Protect What You\'ve Built</title>', `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${desc}">`);

/* ---------------------------------------------------------------- pieces */

const pageHead = (eyebrow, title, standfirst, cta, ctaHref, img, alt) => `
<section class="bg-ink text-white pt-[72px]">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
    <div class="grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-16 items-center py-16 sm:py-20 lg:py-24">

      <div>
        <div class="flex items-center gap-4 mb-7">
          <span class="label text-gold whitespace-nowrap">${eyebrow}</span>
          <span class="rule h-px flex-1 bg-white/25" style="animation-delay:.15s"></span>
        </div>

        <h1 class="display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.08]">${title}</h1>

        <p class="mt-7 text-[1.0625rem] sm:text-[1.125rem] leading-[1.8] text-white/80 max-w-[52ch]">
          ${standfirst}
        </p>

        <a href="${ctaHref}" class="btn-gold label px-9 py-4 inline-flex items-center gap-2 mt-9">
          ${cta} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
      </div>

      <div class="justify-self-center lg:justify-self-end w-full max-w-[520px]">
        <img src="assets/${img}" alt="${alt}" class="w-full aspect-[4/3] object-cover"> <!-- SWAP -->
      </div>

    </div>
  </div>
</section>`;

const sectionHead = (title, sub) => `
    <div class="text-center max-w-[720px] mx-auto mb-14 reveal">
      <h2 class="display text-ink text-[clamp(1.7rem,3.8vw,2.6rem)] leading-[1.15]">${title}</h2>
      ${sub ? `<p class="mt-4 text-[.975rem] leading-[1.7] text-body">${sub}</p>` : ''}
    </div>`;

const field = (id, label, type) => `
          <div>
            <label for="${id}" class="label text-violet block mb-2">${label}</label>
            <input id="${id}" type="${type}" class="field w-full px-4 py-3.5 text-[.95rem]">
          </div>`;

const checkbox = (name, v) => `
              <label class="flex items-start gap-3 py-1.5 cursor-pointer">
                <input type="checkbox" name="${name}" value="${v}" class="mt-1 w-4 h-4 border-[#DDD3F0] text-violet focus:ring-violet">
                <span class="text-[.95rem] leading-[1.5] text-body">${v}</span>
              </label>`;

const radio = (name, v) => `
              <label class="flex items-start gap-3 py-1.5 cursor-pointer">
                <input type="radio" name="${name}" value="${v}" class="mt-1 w-4 h-4 border-[#DDD3F0] text-violet focus:ring-violet">
                <span class="text-[.95rem] leading-[1.5] text-body">${v}</span>
              </label>`;

const textarea = (id, label) => `
          <label for="${id}" class="label text-violet block mb-2 mt-7">${label}</label>
          <textarea id="${id}" rows="4" placeholder="Tell me more…" class="field w-full px-4 py-3.5 text-[.95rem]"></textarea>`;

/* closing "not ready yet" band, with a typographic stand-in for the book cover */
const resourceBand = (heading, body, cta, coverTitle) => `
<section class="bg-ink text-white py-16 sm:py-20">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
    <div class="grid sm:grid-cols-[1.3fr_.7fr] gap-10 items-center">
      <div>
        <h2 class="display text-[clamp(1.6rem,3.2vw,2.2rem)] leading-[1.2]">${heading}</h2>
        <p class="mt-4 text-[.975rem] leading-[1.75] text-white/70 max-w-[44ch]">${body}</p>
        <form class="js-form mt-7 flex flex-wrap gap-2.5 max-w-[520px]">
          <input type="email" placeholder="you@email.com" class="field flex-1 min-w-[220px] px-4 py-3.5 text-[.95rem] text-body">
          <button type="submit" class="btn-gold label px-7 py-3.5">${cta}</button>
          <p class="js-ok hidden w-full text-[.95rem] text-white mt-2">Thank you — it's on its way.</p>
          <p class="js-err hidden w-full text-[.85rem] text-gold mt-2"></p>
        </form>
      </div>
      <!-- SWAP: stand-in for the printed cover; drop the real artwork in here -->
      <div class="justify-self-center sm:justify-self-end w-[190px] bg-white text-ink p-6 border-b-[6px] border-gold">
        <p class="display text-[1.15rem] leading-[1.25]">${coverTitle}</p>
        <p class="label text-violet text-[8px] mt-6">Ruth Slingo</p>
      </div>
    </div>
  </div>
</section>`;

const scripts = `
<script src="https://unpkg.com/lucide@0.454.0/dist/umd/lucide.js"></script>
<script>
(function () {
  'use strict';
  if (window.lucide) lucide.createIcons();
  var y = document.getElementById('year'); if (y) y.textContent = new Date().getFullYear();

  /* nav drawer — same behaviour as the home page */
  var navToggle = document.getElementById('navToggle');
  var navDrawer = document.getElementById('navDrawer');
  navToggle.addEventListener('click', function () {
    var open = navDrawer.classList.toggle('hidden') === false;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  navDrawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      navDrawer.classList.add('hidden');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* scroll reveals */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: .15 });
    reveals.forEach(function (el) { obs.observe(el); });
  }

  /* Forms are front-end only: validate, show a success state, transmit nothing.
     Wire to GoHighLevel or Formspree by POSTing in this handler. */
  function validEmail(v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v); }
  document.querySelectorAll('.js-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = form.querySelector('.js-ok');
      var err = form.querySelector('.js-err');
      var email = form.querySelector('input[type=email]');
      var first = form.querySelector('input[type=text]');
      if (first && !first.value.trim()) {
        err.textContent = 'Add your first name so Ruth knows who she is speaking to.';
        err.classList.remove('hidden'); ok.classList.add('hidden'); first.focus(); return;
      }
      if (email && !validEmail(email.value.trim())) {
        err.textContent = 'That email address doesn\\u2019t look right — check it and try again.';
        err.classList.remove('hidden'); ok.classList.add('hidden'); email.focus(); return;
      }
      err.classList.add('hidden');
      ok.classList.remove('hidden');
    });
  });
})();
</script>
</body>
</html>`;

/* ================================================================ EDUCATE */

const educateTiles = [
  ['piggy-bank',      'Old 401(k) or IRA',          'What are my options for money I’ve already accumulated?'],
  ['armchair',        'Retirement income',          'How can I create income when my paycheck stops?'],
  ['credit-card',     'Debt',                       'Could I potentially get out of debt sooner without increasing my current monthly budget?'],
  ['shield-check',    'Life insurance',             'Is my family financially protected if something happens to me?'],
  ['graduation-cap',  'College',                    'How can I prepare without sacrificing my other financial goals?'],
  ['trending-up',     'Tax-advantaged retirement',  'Are there strategies I should understand today that could impact my future income?']
].map(([icon, t, q]) => `
      <article class="tile p-7">
        <i data-lucide="${icon}" class="w-6 h-6 text-violet mb-5"></i>
        <h3 class="label text-ink mb-3">${t}</h3>
        <p class="text-[.95rem] leading-[1.7] text-body">${q}</p>
      </article>`).join('');

const educate = `${headFor(
  'Educate — Slingo Financial Services',
  'You don’t know what you don’t know. Ruth Slingo helps you understand what you have, explore your options, and see how the pieces of your financial picture work together.')}

<body class="antialiased">

${NAV}

<main>
${pageHead('Educate.',
  'You don’t know<br>what you don’t know.',
  'Financial decisions don’t have to feel overwhelming. I help you understand what you have, explore the options available to you, and see how the pieces of your financial picture can work together.',
  'Start my financial overview', '#overview', 'card-educate.jpg', 'Ruth Slingo in conversation with a couple')}

<!-- ===================== WHAT ARE YOU TRYING TO FIGURE OUT? ===================== -->
<section class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
${sectionHead('What are you trying to figure out?', 'Every one of these is a fair question, and a good place to start.')}
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${educateTiles}
    </div>
  </div>
</section>

<!-- ===================== I DON'T LOOK AT JUST ONE PIECE ===================== -->
<section class="bg-mist py-16 sm:py-20 border-y border-ink/10">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
    <div class="bg-lilac p-8 sm:p-12 grid sm:grid-cols-[auto_1fr] gap-8 items-start">
      <i data-lucide="layers" class="w-10 h-10 text-violet"></i>
      <div>
        <h2 class="display text-ink text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.15]">I don’t look at just one piece.</h2>
        <p class="mt-5 text-[1.0625rem] leading-[1.8] text-body max-w-[56ch]">
          Debt affects retirement. Retirement affects taxes. Protection affects your family. College
          affects cash flow. The goal is to understand how the pieces work together.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== MY FINANCIAL OVERVIEW ===================== -->
<section id="overview" class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[860px] px-5 sm:px-8">
${sectionHead('My financial overview', 'Let’s start with a conversation.')}

    <form class="js-form border border-ink/15 p-7 sm:p-10">
      <div class="grid sm:grid-cols-2 gap-5">
${field('fName', 'First name', 'text')}
${field('lName', 'Last name', 'text')}
${field('email', 'Email', 'email')}
${field('phone', 'Phone', 'tel')}
      </div>

      <fieldset class="mt-8">
        <legend class="label text-violet mb-1">What would you most like help understanding?</legend>
        <p class="text-[.85rem] text-body/70 mb-4">Select all that apply.</p>
        <div class="grid sm:grid-cols-2 gap-x-8">
${['Debt','College planning','Retirement income','Tax-advantaged strategies','Old 401(k) / IRA','Legacy / estate planning','Life insurance','Not sure yet'].map(v => checkbox('help', v)).join('')}
        </div>
      </fieldset>

${textarea('concern', 'If we could help you solve one financial concern right now, what would it be?')}

      <button type="submit" class="btn-gold label px-9 py-4 mt-8 w-full sm:w-auto">Show me my options</button>
      <p class="js-ok hidden text-[.95rem] text-ink mt-4">Thank you — Ruth will be in touch shortly.</p>
      <p class="js-err hidden text-[.85rem] text-[#B3261E] mt-4"></p>
    </form>
  </div>
</section>

${resourceBand('Not ready to talk yet?<br>Start here.',
  'Get helpful tips, insights, and resources straight to your inbox.',
  'Send me resources',
  '5 Questions That Could Change Your Financial Future')}
</main>

${FOOT}
${scripts}`;

/* ================================================================ EMPOWER */

const empowerCards = [
  ['users',     'I’m an insurance professional', 'I want to increase my knowledge, improve my conversations, grow production, and build a business that creates freedom.', 'Explore agent coaching','card-educate.jpg'],
  ['lightbulb', 'I’m an entrepreneur',           'I have a business, but I need clarity around my message, marketing, systems, growth, or next move.', 'Explore business coaching','card-empower.jpg'],
  ['star',      'I’m building my personal brand','I know I have something to offer. I need help turning my experience and ideas into a brand people understand and trust.', 'Explore brand coaching','card-legacy.jpg']
].map(([icon, t, body, link, photo], i) => `
      <article class="tile grid sm:grid-cols-[1fr_240px] items-stretch">
        <div class="p-7 sm:p-9">
          <div class="flex items-center gap-4 mb-5">
            <span class="w-11 h-11 shrink-0 flex items-center justify-center bg-violet/10 text-violet"><i data-lucide="${icon}" class="w-5 h-5"></i></span>
            <h3 class="display text-ink text-[1.3rem] leading-tight">${t}</h3>
          </div>
          <p class="text-[.975rem] leading-[1.75] text-body max-w-[54ch]">${body}</p>
          <a href="#building" class="label text-violet inline-flex items-center gap-2 mt-6">
            ${link} <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
        <!-- SWAP: a photograph for each path -->
        <img src="assets/${photo}" alt="" class="hidden sm:block w-full h-full object-cover">
      </article>`).join('');

const empower = `${headFor(
  'Empower — Slingo Financial Services',
  'You don’t need more information. You need a strategy for what to do with it. Coaching for insurance professionals, entrepreneurs, and people building a personal brand.')}

<body class="antialiased">

${NAV}

<main>
${pageHead('Empower.',
  'You don’t need more information.<br>You need a strategy for what to do with it.',
  'Whether you’re building an insurance career, growing a business, developing your brand, or figuring out your next move — I’ll help you turn what you already know into action.',
  'Find my next step', '#building', 'card-empower.jpg', 'Ruth Slingo presenting')}

<!-- ===================== WHERE ARE YOU RIGHT NOW? ===================== -->
<section class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
${sectionHead('Where are you right now?')}
    <div class="grid gap-5 max-w-[980px] mx-auto">${empowerCards}
    </div>
  </div>
</section>

<!-- ===================== MY JOURNEY. YOUR ADVANTAGE. ===================== -->
<section class="bg-mist py-16 sm:py-20 border-y border-ink/10">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
    <div class="bg-lilac p-8 sm:p-12 max-w-[900px] mx-auto">
      <h2 class="display text-ink text-[clamp(1.6rem,3.4vw,2.3rem)] leading-[1.15]">My journey. Your advantage.</h2>
      <p class="mt-6 text-[1.0625rem] leading-[1.8] text-body max-w-[58ch]">
        I spent 25+ years as an interior designer before building an entirely different career and
        business. I know what it’s like to start over, learn new skills, and build something from the
        ground up.
      </p>
      <p class="mt-4 text-[1.0625rem] leading-[1.8] text-body max-w-[58ch]">
        You don’t have to have everything figured out before you start. You just need the right plan
        and the right support.
      </p>
      <p class="display text-violet text-[1.5rem] italic mt-8">Ruth</p>
    </div>
  </div>
</section>

<!-- ===================== LET'S TALK ABOUT WHAT YOU'RE BUILDING ===================== -->
<section id="building" class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[860px] px-5 sm:px-8">
${sectionHead('Let’s talk about what you’re building.')}

    <form class="js-form border border-ink/15 p-7 sm:p-10">
      <div class="grid sm:grid-cols-2 gap-5">
${field('fName', 'First name', 'text')}
${field('lName', 'Last name', 'text')}
${field('email', 'Email', 'email')}
${field('phone', 'Phone', 'tel')}
      </div>

      <fieldset class="mt-8">
        <legend class="label text-violet mb-4">I am a</legend>
        <div class="grid sm:grid-cols-2 gap-x-8">
${['Insurance professional','Building a personal brand','Entrepreneur','Exploring what’s next','Mompreneur'].map(v => radio('iam', v)).join('')}
        </div>
      </fieldset>

${textarea('challenge', 'What’s your biggest challenge right now?')}
${textarea('twelve', 'Where would you most like to be 12 months from now?')}

      <button type="submit" class="btn-gold label px-9 py-4 mt-8 w-full sm:w-auto">Let’s build what’s next</button>
      <p class="js-ok hidden text-[.95rem] text-ink mt-4">Thank you — Ruth will be in touch shortly.</p>
      <p class="js-err hidden text-[.85rem] text-[#B3261E] mt-4"></p>
    </form>
  </div>
</section>

${resourceBand('Not ready yet?<br>Let’s stay connected.',
  'Get tips, training invitations, and resources to help you grow.',
  'Keep me informed',
  'Tools &amp; Training from Ruth Slingo')}
</main>

${FOOT}
${scripts}`;

/* =========================================================== CREATE LEGACY */

const legacyRows = [
  ['shield',      'Protect',   'Making sure the people you love can continue financially if life changes unexpectedly.'],
  ['lock',        'Preserve',  'Helping protect the assets and retirement savings you’ve worked years to accumulate.'],
  ['heart',       'Provide',   'Creating opportunities for children, grandchildren, education, retirement, and the people who matter to you.'],
  ['users-round', 'Pass it on','Thinking intentionally about what you want the next generation to receive, financially and otherwise.']
].map(([icon, t, body]) => `
      <article class="tile p-7 sm:p-8 flex gap-6">
        <span class="w-12 h-12 shrink-0 rounded-full border border-violet/30 flex items-center justify-center text-violet"><i data-lucide="${icon}" class="w-5 h-5"></i></span>
        <div>
          <h3 class="label text-ink mb-3">${t}</h3>
          <p class="text-[.975rem] leading-[1.75] text-body max-w-[54ch]">${body}</p>
        </div>
      </article>`).join('');

const legacy = `${headFor(
  'Create Legacy — Slingo Financial Services',
  'What you’re building today can impact generations. Protect, preserve, provide, and pass it on with Ruth Slingo.')}

<body class="antialiased">

${NAV}

<main>
${pageHead('Create Legacy.',
  'What you’re building today<br>can impact generations.',
  'Legacy isn’t only about what you leave behind. It’s about what you protect, what you teach, the opportunities you create, and the people whose lives are different because you planned ahead.',
  'Start my legacy conversation', '#building-for', 'card-legacy.jpg', 'Three generations of a family together')}

<!-- ===================== WHAT DOES LEGACY MEAN TO YOU? ===================== -->
<section class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
${sectionHead('What does legacy mean to you?')}
    <div class="grid md:grid-cols-2 gap-5 max-w-[1040px] mx-auto">${legacyRows}
    </div>
  </div>
</section>

<!-- ===================== PULL QUOTE ===================== -->
<section class="bg-mist py-16 sm:py-24 border-y border-ink/10">
  <div class="mx-auto max-w-[1300px] px-5 sm:px-8">
    <blockquote class="max-w-[760px] mx-auto text-center">
      <p class="display text-ink text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.35] italic">
        Legacy isn’t just about leaving money. It’s about leaving people better because you were here.
      </p>
      <span class="block w-16 h-px bg-gold mx-auto mt-8"></span>
    </blockquote>
  </div>
</section>

<!-- ===================== WHAT ARE YOU BUILDING FOR? ===================== -->
<section id="building-for" class="bg-white py-20 sm:py-28">
  <div class="mx-auto max-w-[860px] px-5 sm:px-8">
${sectionHead('What are you building for?')}

    <form class="js-form border border-ink/15 p-7 sm:p-10">
      <div class="grid sm:grid-cols-2 gap-5">
${field('fName', 'First name', 'text')}
${field('lName', 'Last name', 'text')}
${field('email', 'Email', 'email')}
${field('phone', 'Phone', 'tel')}
      </div>

      <fieldset class="mt-8">
        <legend class="label text-violet mb-4">I’m most focused on</legend>
        <div class="grid sm:grid-cols-2 gap-x-8">
${['My family','My business','My retirement','Generational wealth','My children / grandchildren','Leaving a financial legacy','College / education','I’m not sure yet'].map(v => checkbox('focus', v)).join('')}
        </div>
      </fieldset>

${textarea('matters', 'When you think about your legacy, what matters most to you?')}

      <button type="submit" class="btn-gold label px-9 py-4 mt-8 w-full sm:w-auto">Let’s start the conversation</button>
      <p class="js-ok hidden text-[.95rem] text-ink mt-4">Thank you — Ruth will be in touch shortly.</p>
      <p class="js-err hidden text-[.85rem] text-[#B3261E] mt-4"></p>
    </form>
  </div>
</section>

${resourceBand('Not ready yet?<br>Start with a free resource.',
  'Simple steps you can take now to protect what matters most.',
  'Send me the guide',
  'The Legacy Planning Guide')}
</main>

${FOOT}
${scripts}`;

fs.writeFileSync(DIR + 'educate.html', educate);
fs.writeFileSync(DIR + 'empower.html', empower);
fs.writeFileSync(DIR + 'create-legacy.html', legacy);
console.log('written: educate.html, empower.html, create-legacy.html');
