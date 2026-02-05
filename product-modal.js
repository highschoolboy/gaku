// Product data with detailed descriptions
const productData = {
  sengaku: {
    title: '美空食場 鮮岳',
    image: 'assets/images/restaurant/sengaku.jpg',
    description: '父が経営している、地元で愛される和食居酒屋です。四季折々の新鮮な食材を使った料理と、落ち着いた空間が自慢です。美味しいお酒と共に、特別なひとときをお過ごしください。',
    website: 'https://sengaku-bikuu.com/'
  },
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
  },
  'hotel-urayasu': {
    title: '浦安ブライトンホテル東京ベイ',
    image: 'assets/images/hotel/hotel_urayasu_2.jpg',
    description: '新浦安駅直結の便利なロケーションにあるホテル。開放感のある客室と充実した設備が魅力です。ディズニーリゾートへのアクセスも良く、観光やビジネスに最適です。充実したレストランや、最上階のラウンジからの景色も楽しめます。',
    website: 'https://urayasu.brightonhotels.co.jp/'
  },
  'hotel-ginza': {
    title: 'アゴーラ東京銀座',
    image: 'assets/images/hotel/hotel_ginza_2.jpg',
    description: '銀座の中心にありながら、日本の伝統的な美しさを感じられる「粋」なホテル。洗練された客室と細やかなおもてなしが特徴です。観光やショッピングに非常に便利な立地で、都会の喧騒を忘れさせる落ち着いた時間を過ごせます。',
    website: 'https://www.agora-ginza.com/'
  },
  'hotel-atami': {
    title: 'LIVEMAX熱海',
    image: 'assets/images/hotel/hotel_atami_2.jpg',
    description: '熱海のオーシャンビューを楽しめるリゾートホテル。全室露天風呂付きの客室もあり、ゆったりとした時間を過ごせます。相模湾の景色を眺めながら入る温泉は格別で、地元の食材を活かした料理も楽しむことができます。',
    website: 'https://www.livemax-resort.com/shizuoka/atami-ocean/'
  },
  'furniture-placeholder': {
    title: '準備中',
    image: 'assets/images/ergodox.png',
    description: 'おすすめの家具情報を追加予定です。お楽しみに！'
  },
  'app-placeholder': {
    title: '準備中',
    image: 'assets/images/anker.png',
    description: 'おすすめのアプリ・ゲーム情報を追加予定です。お楽しみに！'
  }
};

// Modal elements
const modal = document.getElementById('product-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalButtons = document.getElementById('modal-buttons');
const modalClose = document.querySelector('.modal__close');
const modalOverlay = document.querySelector('.modal__overlay');

// Store scroll position
let scrollPosition = 0;

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
      
      // Clear previous buttons
      modalButtons.innerHTML = '';
      
      // Add website button if URL exists
      if (product.website) {
        const websiteBtn = document.createElement('a');
        websiteBtn.href = product.website;
        websiteBtn.target = '_blank';
        websiteBtn.rel = 'noopener noreferrer';
        websiteBtn.className = 'button';
        websiteBtn.textContent = '公式サイトに行く';
        modalButtons.appendChild(websiteBtn);
      }
      
      // Prevent background scrolling without layout shift
      scrollPosition = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.width = '100%';
      
      modal.classList.add('modal--active');
    }
  });
});

// Close modal functions
function closeModal() {
  modal.classList.remove('modal--active');
  
  // Restore scrolling and position
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollPosition);
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
    closeModal();
  }
});
