// Product data with detailed descriptions
const productData = {
  sengaku: {
    title: '美空食場 鮮岳',
    image: 'assets/images/restaurant/mackerel.jpg',
    description: '父が経営している、地元で愛される和食居酒屋です。四季折々の新鮮な食材を使った料理と、落ち着いた空間が自慢です。美味しいお酒と共に、特別なひとときをお過ごしください。',
    website: 'https://sengaku-bikuu.com/'
  },
  'kintan-steak': {
    title: 'THE KINTAN STEAK',
    image: 'assets/images/restaurant/kintan_2.jpg',
    description: '恵比寿ガーデンプレイス38階に位置する、絶景と極上のステーキを楽しめるレストラン。開放感あふれる空間で、熟成牛や希少部位のステーキを堪能できます。特別な日のディナーや、ビジネスでの会食にも最適です。',
    website: 'https://www.kintan.restaurant/shop/ebisu-steak/'
  },
  'mistel-md770': {
    title: 'MiSTEL Barocco MD770',
    image: 'assets/images/products/md770_2.jpg',
    description: '左右分離型のメカニカルキーボード。自分の肩幅に合わせて配置できるため、長時間の作業でも疲れにくいのが最大の特徴です。静音赤軸モデルは打鍵感も良く、静かなオフィスでも使いやすい一台です。',
    website: 'https://amzn.asia/d/0iLwB3IG'
  },
  'rk61': {
    title: 'RK ROYAL KLUDGE RK61',
    image: 'assets/images/products/RK61_2.jpg',
    description: '60%サイズの超コンパクトなワイヤレスキーボード。デスクスペースを広く使えるだけでなく、青軸の爽快な打鍵音が心地よいです。持ち運びにも便利で、iPadなどでのモバイル作業にも重宝しています。',
    website: 'https://amzn.asia/d/064hhicB'
  },
  'g502x': {
    title: 'Logitech G502 X LIGHTSPEED',
    image: 'assets/images/products/g502x_2.jpg',
    description: '伝説的なゲーミングマウスG502の進化版。非常に軽量で、13個のカスタマイズ可能なボタンが生産性を爆上げしてくれます。ワイヤレスの遅延も一切なく、FPSからビジネス作業までこれ一つで完璧にこなせます。',
    website: 'https://amzn.asia/d/0b1PuFaM'
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
  'switchbot': {
    title: 'SwitchBot シリーズ',
    image: 'assets/images/products/switchbot.png',
    description: '家中の家電をスマート化できるデバイス。ベッドに入ったまま照明を消したり、外出先からエアコンを操作できるので、生活の質が格段に上がりました。',
    website: 'https://amzn.asia/d/064hhicB' /* Placeholder amazon link */
  },
  'app-placeholder': {
    title: '準備中',
    image: 'assets/images/products/md770_1.jpg',
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
        // Use "Amazonで見る" if it's an amazon link, otherwise keep "公式サイトに行く"
        websiteBtn.textContent = product.website.includes('amazon') || product.website.includes('amzn.asia') 
          ? 'Amazonで見る' 
          : '公式サイトに行く';
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
