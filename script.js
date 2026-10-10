// Menú accesible para celular.
document.documentElement.classList.add('js');
const menu = document.querySelector('#menu-principal');
const toggle = document.querySelector('.menu-toggle');
const mobile = window.matchMedia('(max-width:720px)');

function resetMenu() {
    toggle.hidden = !mobile.matches;
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
}
resetMenu();
mobile.addEventListener('change', resetMenu);
toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        resetMenu();
        toggle.focus();
    }
});
// Mantiene un espacio limpio mientras colocas tus fotografías.
document.querySelectorAll('img').forEach(img => {
    const fallback = () => {
        img.classList.add('image-missing');
        img.src = 'imagenes/pendiente.svg';
    };
    img.addEventListener('error', fallback, {
        once: true
    });
    if (img.complete && img.naturalWidth === 0) fallback();
});
// Formulario de práctica: no envía ni guarda datos personales.
const form = document.querySelector('form');
if (form) {
    const select = form.querySelector('#servicio');
    const value = new URLSearchParams(location.search).get('servicio');
    if ([...select.options].some(o => o.value === value)) select.value = value;
    form.addEventListener('submit', e => {
        e.preventDefault();
        if (form.reportValidity()) form.querySelector('.status').textContent = 'Datos válidos. Este formulario es de demostración: no se ha enviado ningún mensaje.';
    });
    form.addEventListener('input', () => form.querySelector('.status').textContent = '');
}
// Categorías del blog.
const articles = document.querySelectorAll('.blog-layout .card');
document.querySelectorAll('[data-filter]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.classList.contains('selected')));
    button.addEventListener('click', () => {
        document.querySelectorAll('[data-filter]').forEach(b => {
            b.classList.toggle('selected', b === button);
            b.setAttribute('aria-pressed', String(b === button));
        });
        articles.forEach((article, i) => article.hidden = button.dataset.filter !== 'all' && String(i) !== button.dataset.filter);
    });
});
