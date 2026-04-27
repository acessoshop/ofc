// ============ Shopee Clone — script.js ============

const PRODUCTS = {
  capacete: {
    title: "CAPACETE LS2 CLASSIC - Aprovado INMETRO - Diversas Cores e Tamanhos",
    price: "48", priceCents: "97",
    old: "R$799,00", discount: "-94%", sold: "+2,3 mil vendidos",
    img: "images/capacete-1.jpg", total: 9,
    size: "54 / XS, 56 / S, 58 / M, 60 / L, 62 / XL",
    model: "Branco, Vermelho, Preto, Verde, Roxo",
    desc: "Capacete LS2 Classic com design retrô e acabamento premium. Estrutura em ABS de alta resistência, viseira anti-risco e forração removível. Aprovado pelo INMETRO. Disponível em diversos tamanhos e cores.",
  },
  fone: {
    title: "Fone de Ouvido Bluetooth Sem Fio Pro com Case Carregadora",
    price: "34", priceCents: "90",
    old: "R$189,00", discount: "-81%", sold: "+5,1 mil vendidos",
    img: "images/fone-bluetooth.jpg", total: 7,
    size: "Único", model: "Branco, Preto",
    desc: "Fone Bluetooth 5.3 com cancelamento de ruído ativo, autonomia de até 24h com case e resistência a suor IPX5.",
  },
  smartwatch: {
    title: "Smartwatch Hw68 Ultra Mini Tela Amoled GPS",
    price: "59", priceCents: "90",
    old: "R$299,00", discount: "-80%", sold: "+8,7 mil vendidos",
    img: "images/smartwatch.jpg", total: 8,
    size: "44mm", model: "Preto, Prata, Dourado",
    desc: "Smartwatch com tela AMOLED, monitoramento cardíaco, oxímetro, +100 modos esportivos e bateria de longa duração.",
  },
  caixa: {
    title: "Caixa de Som Bluetooth Portátil JBL Style 40W à Prova D'água",
    price: "45", priceCents: "90",
    old: "R$249,00", discount: "-82%", sold: "+3,2 mil vendidos",
    img: "images/caixa-som.jpg", total: 6,
    size: "Médio", model: "Preto, Azul, Vermelho",
    desc: "Caixa de som com 40W de potência, conexão Bluetooth 5.0, bateria de 12h e proteção IPX7 contra água.",
  },
  lavadora: {
    title: "Lavadora Portátil de Alta Pressão Sem Fio 48V",
    price: "129", priceCents: "90",
    old: "R$599,00", discount: "-78%", sold: "+1,8 mil vendidos",
    img: "images/lavadora.jpg", total: 5,
    size: "Único", model: "Verde, Azul",
    desc: "Lavadora portátil sem fio com bateria de lítio, ideal para carros, motos, jardim e limpeza doméstica.",
  },
  kit: {
    title: "Kit Refrigeração Gamer RGB para PC com 4 Coolers",
    price: "89", priceCents: "90",
    old: "R$349,00", discount: "-74%", sold: "+960 vendidos",
    img: "images/kit-refrigeracao.jpg", total: 4,
    size: "120mm", model: "RGB Multicolor",
    desc: "Kit com 4 coolers RGB sincronizados, baixo ruído, alta performance e iluminação personalizável.",
  },
};

// ============ Render grid ============
const grid = document.getElementById('grid');
const cards = ['capacete','fone','smartwatch','caixa','lavadora','kit','capacete','fone'];
grid.innerHTML = cards.map((key, i) => {
  const p = PRODUCTS[key];
  return `
    <div class="card" data-product="${key}">
      <div class="card-img"><img src="${p.img}" alt="${p.title}" loading="lazy"/></div>
      <div class="card-discount">${p.discount}</div>
      <div class="card-body">
        <div>
          <span class="card-tag">Frete Grátis</span>
          ${i % 2 === 0 ? '<span class="card-tag">Mall</span>' : ''}
        </div>
        <div class="card-title">${p.title}</div>
        <div class="card-price-row">
          <span class="card-price">R$${p.price},${p.priceCents}</span>
          <span class="card-old">${p.old}</span>
        </div>
        <div class="card-meta">
          <span>★ 4.9</span>
          <span>${p.sold}</span>
        </div>
      </div>
    </div>
  `;
}).join('');

// ============ Open product page ============
const productPage = document.getElementById('productPage');
const galleryImg = document.getElementById('galleryImg');
const photoTotal = document.getElementById('photoTotal');
const prodPrice = document.getElementById('prodPrice');
const prodOld = document.getElementById('prodOld');
const prodDiscount = document.getElementById('prodDiscount');
const prodSold = document.getElementById('prodSold');
const prodTitle = document.getElementById('prodTitle');
const specSize = document.getElementById('specSize');
const specModel = document.getElementById('specModel');
const prodDesc = document.getElementById('prodDesc');

function openProduct(key) {
  const p = PRODUCTS[key];
  if (!p) return;
  galleryImg.src = p.img;
  galleryImg.alt = p.title;
  photoTotal.textContent = p.total;
  prodPrice.textContent = p.price;
  document.querySelector('.big-price').innerHTML = `<sup>R$</sup>${p.price}<sup>,${p.priceCents}</sup>`;
  prodOld.textContent = p.old;
  prodDiscount.textContent = p.discount;
  prodSold.textContent = p.sold;
  prodTitle.textContent = p.title;
  specSize.textContent = p.size;
  specModel.textContent = p.model;
  prodDesc.textContent = p.desc;
  productPage.hidden = false;
  window.scrollTo(0, 0);
  document.body.style.overflow = 'hidden';
}

document.body.addEventListener('click', (e) => {
  const card = e.target.closest('[data-product]');
  if (card) openProduct(card.dataset.product);
});

document.getElementById('backBtn').addEventListener('click', () => {
  productPage.hidden = true;
  document.body.style.overflow = '';
});

// ============ Buy & Cart actions ============
document.getElementById('buyNowBtn').addEventListener('click', () => {
  alert('Redirecionando para checkout...\n(Conecte um gateway de pagamento como Mercado Pago / Pix para finalizar)');
});
document.getElementById('addCartBtn').addEventListener('click', () => {
  const badges = document.querySelectorAll('.badge, .bb-badge');
  badges.forEach(b => b.textContent = String(parseInt(b.textContent || '0') + 1));
  flash('Produto adicionado ao carrinho!');
});

function flash(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  Object.assign(t.style, {
    position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,.8)', color: 'white', padding: '10px 16px',
    borderRadius: '4px', fontSize: '13px', zIndex: 9999,
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

// ============ Countdown timer ============
let totalSec = 42 * 60 + 17;
setInterval(() => {
  totalSec = totalSec > 0 ? totalSec - 1 : 3600;
  const h = String(Math.floor(totalSec / 3600)).padStart(2, '0');
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
  const s = String(totalSec % 60).padStart(2, '0');
  document.querySelectorAll('.flash-right').forEach(el => {
    const timers = el.querySelectorAll('.timer');
    if (timers.length === 3) {
      timers[0].textContent = h;
      timers[1].textContent = m;
      timers[2].textContent = s;
    }
  });
}, 1000);
