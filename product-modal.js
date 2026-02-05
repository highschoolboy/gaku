// Product data with detailed descriptions
const productData = {
  ergodox: {
    title: 'ErgoDox EZ',
    image: 'assets/images/ergodox.png',
    description: '左右分離型のメカニカルキーボード。肩の負担が減り、長時間のコーディングでも疲れにくくなりました。カスタマイズ性が高く、自分だけのキー配列を作れるのが魅力です。キーの配置を自由に変更できるため、効率的なタイピングが可能になり、作業効率が大幅に向上しました。'
  },
  switchbot: {
    title: 'SwitchBot シリーズ',
    image: 'assets/images/switchbot.png',
    description: '家中の家電をスマート化できるデバイス。ベッドに入ったまま照明を消したり、外出先からエアコンを操作できるので、生活の質が格段に上がりました。スマホアプリから簡単に操作でき、タイマー設定やシーン設定も可能。朝起きる時間に合わせて自動でカーテンを開けたり、帰宅前にエアコンをつけたりと、快適な生活を実現しています。'
  },
  anker: {
    title: 'Anker 737 Power Bank',
    image: 'assets/images/anker.png',
    description: '超大容量かつ高出力のモバイルバッテリー。MacBook Proも急速充電できるので、カフェでの作業時に重宝しています。残量表示ディスプレイも便利で、あとどれくらい使えるかが一目でわかります。24000mAhの大容量で、スマホなら約5回、ノートPCなら1回以上のフル充電が可能。USB-CとUSB-Aポートを搭載しており、複数デバイスの同時充電にも対応しています。'
  }
};

// Modal elements
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');

// Open modal when product card is clicked
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const productId = card.dataset.product;
    const product = productData[productId];
    
    if (product) {
      modalImage.src = product.image;
      modalImage.alt = product.title;
      modalTitle.textContent = product.title;
      modalDescription.textContent = product.description;
      modal.classList.add('modal--active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  });
});

// Close modal functions
function closeModal() {
  modal.classList.remove('modal--active');
  document.body.style.overflow = ''; // Restore scrolling
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
    closeModal();
  }
});
