const $ = (selector) => document.querySelector(selector);

const fields = {
  name: $('#name'), contact: $('#contact'), phone: $('#phone'),
  brand: $('#brand'), number: $('#tube-number'), model: $('#model'), valve: $('#valve'),
  type: $('#tqt-type'), date: $('#tqt-date'), center: $('#center'),
  doctor: $('#doctor'), slp: $('#slp')
};

const textOrDash = (field) => field.value.trim() || '—';

function formatDate(value) {
  if (!value) return '—';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}

function updatePreview() {
  $('#preview-name').textContent = fields.name.value.trim() || 'Tu nombre';
  $('#preview-contact').textContent = fields.contact.value.trim() || 'Contacto no informado';
  $('#preview-phone').textContent = fields.phone.value.trim() || 'Teléfono no informado';
  $('#preview-brand').textContent = textOrDash(fields.brand);
  $('#preview-number').textContent = textOrDash(fields.number);
  $('#preview-model').textContent = textOrDash(fields.model);
  $('#preview-valve').textContent = fields.valve.value;
  $('#preview-type').textContent = fields.type.value;
  $('#preview-date').textContent = formatDate(fields.date.value);
  $('#preview-center').textContent = textOrDash(fields.center);
  $('#preview-doctor').textContent = textOrDash(fields.doctor);
  $('#preview-slp').textContent = textOrDash(fields.slp);
}

$('#card-form').addEventListener('input', updatePreview);
$('#card-form').addEventListener('change', updatePreview);
$('#print-button').addEventListener('click', () => window.print());
$('#example-button').addEventListener('click', () => {
  fields.name.value = 'Ana Pérez';
  fields.contact.value = 'Juan Pérez';
  fields.phone.value = '+56 9 1234 5678';
  fields.brand.value = 'Shiley';
  fields.number.value = '7.5';
  fields.model.value = 'Flexible';
  fields.valve.value = 'Sí utiliza';
  fields.type.value = 'Quirúrgica';
  fields.date.value = '2026-06-15';
  fields.center.value = 'Hospital de referencia';
  fields.doctor.value = 'Dra. Andrea González';
  fields.slp.value = 'Flgo. Felipe Soto';
  updatePreview();
});

updatePreview();
