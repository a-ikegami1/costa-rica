const envelopeButton = document.getElementById('envelopeButton');
const intro = document.getElementById('intro');
const postcards = document.getElementById('postcards');
const cardGrid = document.getElementById('cardGrid');

// The uploaded Canva export contains 5 postcard pairs:
// 2/3, 4/5, 6/7, 8/9, 10/11.
const pairs = [
  [2, 3, 'Day 1'],
  [4, 5, 'Day 2'],
  [6, 7, 'Day 3'],
  [8, 9, 'Day 4'],
  [10, 11, 'Day 5']
];

function buildCards(){
  pairs.forEach(([front, back, label], i) => {
    const shell = document.createElement('article');
    shell.className = 'card-shell';
    shell.style.setProperty('--delay', `${i * 180}ms`);

    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role','button');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label', `${label}. Click to flip the postcard.`);

    card.innerHTML = `
      <div class="face front">
        <span class="tape"></span>
        <img src="assets/${front}.png" alt="${label} postcard cover" loading="eager">
      </div>
      <div class="face back">
        <img src="assets/${back}.png" alt="${label} postcard back" loading="eager">
      </div>
      <span class="card-number">${label}</span>
      <span class="flip-label">click to flip ↻</span>
    `;

    const flip = () => {
      card.classList.toggle('flipped');
      card.setAttribute('aria-label', card.classList.contains('flipped')
        ? `${label}. Click to flip back to the front.`
        : `${label}. Click to flip the postcard.`);
    };
    card.addEventListener('click', flip);
    card.addEventListener('keydown', e => {
      if(e.key === 'Enter' || e.key === ' '){e.preventDefault();flip();}
    });
    shell.appendChild(card);
    cardGrid.appendChild(shell);
  });
}

envelopeButton.addEventListener('click', () => {
  envelopeButton.disabled = true;
  envelopeButton.animate([
    {transform:'scale(1) rotate(0deg)'},
    {transform:'scale(1.04) rotate(-2deg)'},
    {transform:'scale(.94) rotate(2deg)'},
    {transform:'scale(1) rotate(0deg)'}
  ], {duration:650, easing:'cubic-bezier(.2,.8,.2,1)'});

  setTimeout(() => {
    intro.style.display = 'none';
    postcards.classList.add('open');
    postcards.setAttribute('aria-hidden','false');
    buildCards();
    window.scrollTo({top:0,behavior:'smooth'});
  }, 560);
});
