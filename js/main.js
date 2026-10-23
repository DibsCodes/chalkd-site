// Small touches only: the page works without this script.

// Give the sticky nav a border once the page scrolls.
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Point the download buttons at the newest release. The links in the HTML
// are a working fallback if GitHub can't be reached.
const ASSETS = {
  setup: /-Setup\.exe$/,
  zip: /^Chalkd-win32-x64-.*\.zip$/,
  arch: /-x86_64\.pkg\.tar\.zst$/,
};

fetch('https://api.github.com/repos/DibsCodes/chalkd/releases/latest')
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then((release) => {
    const version = release.tag_name.replace(/^v/, '');
    for (const el of document.querySelectorAll('[data-version]')) el.textContent = version;
    for (const el of document.querySelectorAll('[data-asset]')) {
      const asset = release.assets.find((a) => ASSETS[el.dataset.asset]?.test(a.name));
      if (asset) el.href = asset.browser_download_url;
    }
    const pkg = release.assets.find((a) => ASSETS.arch.test(a.name));
    const cmd = document.querySelector('[data-cmd]');
    if (pkg && cmd) cmd.textContent = `sudo pacman -U ${pkg.name}`;
  })
  .catch(() => {});
