const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const fields = {
  name: $('#name'), contact: $('#contact'), phone: $('#phone'), other: $('#other')
};

function selected(container) {
  return $$(`${container} input:checked`).map(input => input.value);
}

function updatePreview() {
  $('#preview-name').textContent = fields.name.value.trim() || 'Tu nombre';
  $('#preview-contact').textContent = fields.contact.value.trim() || 'Nombre del contacto';
  $('#preview-phone').textContent = fields.phone.value.trim() || '+56 9 XXXX XXXX';

  const supports = selected('#support-options').slice(0, 4);
  const other = fields.other.value.trim();
  if (other && supports.length < 4) supports.push(other);
  $('#preview-supports').innerHTML = (supports.length ? supports : ['Dame tiempo para responder.'])
    .map(text => `<li>${escapeHtml(text)}</li>`).join('');

  const communication = selected('#communication-options').slice(0, 2);
  $('#preview-communication').textContent = communication.join(' ');
}

function escapeHtml(text) {
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
}

$('#card-form').addEventListener('input', updatePreview);
$('#print-button').addEventListener('click', () => window.print());
$('#example-button').addEventListener('click', () => {
  fields.name.value = 'Ana Pérez';
  fields.contact.value = 'Juan Pérez';
  fields.phone.value = '+56 9 1234 5678';
  fields.other.value = '';
  const communication = $$('#communication-options input');
  communication.forEach((item, i) => item.checked = i < 2);
  const supports = $$('#support-options input');
  supports.forEach((item, i) => item.checked = [0, 1, 3, 5].includes(i));
  updatePreview();
});

updatePreview();
