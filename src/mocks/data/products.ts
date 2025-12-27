import type { Product } from '../../types';

const colors = [
  { name: '經典黑', code: '#1a1a1a' },
  { name: '米白', code: '#F5F5DC' },
  { name: '藏青', code: '#2F4F4F' },
  { name: '酒紅', code: '#722F37' },
  { name: '焦糖棕', code: '#8B4513' },
  { name: '霧灰', code: '#708090' },
  { name: '奶茶色', code: '#D2B48C' },
  { name: '莫蘭迪粉', code: '#DCAE96' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const generateVariants = (productId: string, colorCount: number = 3) => {
  const selectedColors = colors.slice(0, colorCount);
  const variants = [];
  
  for (const color of selectedColors) {
    for (const size of sizes) {
      variants.push({
        id: `${productId}-${color.code.replace('#', '')}-${size}`,
        sku: `SKU-${productId.toUpperCase()}-${color.name.substring(0, 2)}-${size}`,
        color: color.name,
        colorCode: color.code,
        size,
        stock: Math.floor(Math.random() * 50) + 5,
        price: 0, // 會被覆蓋
      });
    }
  }
  
  return variants;
};

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: '輕量羊毛混紡大衣',
    category: 'outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
    basePrice: 4980,
    isPublished: true,
    variants: generateVariants('prod-001', 4).map(v => ({ ...v, price: 4980 })),
    description: {
      summary: '經典雙排扣設計，採用頂級澳洲美麗諾羊毛混紡，輕盈保暖不厚重。修身剪裁展現優雅身形，是都會女性秋冬必備的百搭外套。',
      material: '70% 澳洲美麗諾羊毛、25% 聚酯纖維、5% 彈性纖維',
      manufacturer: '台灣紡織股份有限公司',
      origin: '台灣台中市',
      careInstructions: '建議乾洗。如需水洗，請使用冷水手洗並平放晾乾，避免陽光直射。收納時請掛置於通風處，可使用防蟲劑保護。',
      notes: '首次洗滌可能會有輕微掉毛現象，屬正常情況。羊毛製品請避免接觸尖銳物品以防勾絲。',
    },
    createdAt: '2024-08-15T10:00:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
  },
  {
    id: 'prod-002',
    name: '法式圓領針織衫',
    category: 'tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
    basePrice: 1680,
    isPublished: true,
    variants: generateVariants('prod-002', 5).map(v => ({ ...v, price: 1680 })),
    description: {
      summary: '法式優雅風格圓領針織衫，採用細緻羊毛棉混紡，觸感柔軟親膚。簡約設計搭配精緻收邊，無論單穿或內搭都展現知性氣質。',
      material: '55% 棉、30% 羊毛、15% 尼龍',
      manufacturer: '義大利時尚紡織 S.p.A.',
      origin: '義大利米蘭',
      careInstructions: '可機洗，請使用洗衣袋並選擇輕柔模式。建議使用中性洗劑，勿使用漂白劑。低溫烘乾或平放晾乾。',
      notes: '針織品請勿大力拉扯，穿著後建議掛置讓纖維恢復彈性。',
    },
    createdAt: '2024-09-01T09:00:00Z',
    updatedAt: '2024-12-18T11:20:00Z',
  },
  {
    id: 'prod-003',
    name: '高腰西裝寬褲',
    category: 'bottoms',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    basePrice: 2280,
    isPublished: true,
    variants: generateVariants('prod-003', 3).map(v => ({ ...v, price: 2280 })),
    description: {
      summary: '俐落高腰剪裁搭配寬鬆褲管，拉長身形比例顯瘦顯高。採用挺括不易皺的高級混紡面料，是辦公室與日常穿搭的完美選擇。',
      material: '65% 聚酯纖維、32% 嫘縈、3% 彈性纖維',
      manufacturer: '韓國首爾時裝有限公司',
      origin: '韓國首爾',
      careInstructions: '可機洗冷水洗滌。取出後立即掛起晾乾可減少皺褶。如需燙整，請使用中溫並墊布熨燙。',
      notes: '深色款首次洗滌可能有輕微褪色，建議分開洗滌。',
    },
    createdAt: '2024-09-10T08:30:00Z',
    updatedAt: '2024-12-19T16:45:00Z',
  },
  {
    id: 'prod-004',
    name: '飄逸雪紡連身裙',
    category: 'dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
    basePrice: 3280,
    isPublished: true,
    variants: generateVariants('prod-004', 4).map(v => ({ ...v, price: 3280 })),
    description: {
      summary: '輕盈飄逸的雪紡材質，優雅的V領設計展現女性柔美線條。多層次裙擺隨風飄動，適合約會、派對或度假穿著。',
      material: '100% 聚酯纖維雪紡（附絲質裡襯）',
      manufacturer: '法國巴黎時裝工坊',
      origin: '法國巴黎',
      careInstructions: '建議手洗或乾洗。如需機洗請使用洗衣袋並選擇最輕柔模式。不可烘乾，請懸掛陰乾。熨燙時請使用最低溫度。',
      notes: '雪紡材質較為輕薄，請注意避免勾絲。穿著時建議搭配內襯或襯裙。',
    },
    createdAt: '2024-10-05T12:00:00Z',
    updatedAt: '2024-12-15T09:30:00Z',
  },
  {
    id: 'prod-005',
    name: '韓系落肩T恤',
    category: 'tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    basePrice: 890,
    isPublished: true,
    variants: generateVariants('prod-005', 6).map(v => ({ ...v, price: 890 })),
    description: {
      summary: '休閒百搭的落肩設計，寬鬆版型修飾手臂線條。採用親膚純棉面料，透氣舒適，是日常穿搭的必備單品。',
      material: '100% 純棉（180g 精梳棉）',
      manufacturer: '台灣優質棉品有限公司',
      origin: '台灣彰化縣',
      careInstructions: '可機洗，建議翻面洗滌以保護印花。冷水洗滌，避免漂白劑。可低溫烘乾或自然晾乾。',
      notes: '純棉製品首次洗滌可能有1-2%縮水，屬正常現象。',
    },
    createdAt: '2024-10-15T14:00:00Z',
    updatedAt: '2024-12-22T10:15:00Z',
  },
  {
    id: 'prod-006',
    name: '復古格紋長裙',
    category: 'bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
    basePrice: 1980,
    isPublished: false,
    variants: generateVariants('prod-006', 3).map(v => ({ ...v, price: 1980 })),
    description: {
      summary: '經典英倫格紋設計，A字版型修飾臀部線條。高腰設計拉長下半身比例，是秋冬季節穿搭的亮點單品。',
      material: '80% 聚酯纖維、18% 嫘縈、2% 彈性纖維',
      manufacturer: '英國倫敦經典織品廠',
      origin: '英國曼徹斯特',
      careInstructions: '建議乾洗以維持版型。如需水洗請使用冷水手洗，平放晾乾。熨燙請使用中溫並墊布處理。',
      notes: '格紋花色需注意裁片對花，每件商品花色位置可能略有差異。',
    },
    createdAt: '2024-11-01T09:00:00Z',
    updatedAt: '2024-12-10T13:00:00Z',
  },
  {
    id: 'prod-007',
    name: '羊絨圍巾',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400',
    basePrice: 1280,
    isPublished: true,
    variants: generateVariants('prod-007', 5).map(v => ({ ...v, price: 1280 })),
    description: {
      summary: '頂級蒙古羊絨製成，細膩柔軟如雲朵般輕盈保暖。經典素色設計百搭任何穿著風格，是秋冬必備的保暖配件。',
      material: '100% 純羊絨（Grade A 等級）',
      manufacturer: '蒙古草原紡織集團',
      origin: '蒙古國烏蘭巴托',
      careInstructions: '僅限乾洗。收納時請摺疊平整置於防塵袋中，可放置天然防蟲劑。避免長時間曝曬。',
      notes: '羊絨製品非常細緻，請避免佩戴尖銳飾品以防勾絲。如有輕微起球屬正常現象，可使用專用去毛球機處理。',
    },
    createdAt: '2024-11-10T11:00:00Z',
    updatedAt: '2024-12-21T15:30:00Z',
  },
  {
    id: 'prod-008',
    name: '皮質托特包',
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
    basePrice: 2680,
    isPublished: true,
    variants: [
      { id: 'prod-008-black', sku: 'SKU-PROD008-BK', color: '經典黑', colorCode: '#1a1a1a', size: 'ONE SIZE', stock: 25, price: 2680 },
      { id: 'prod-008-brown', sku: 'SKU-PROD008-BR', color: '焦糖棕', colorCode: '#8B4513', size: 'ONE SIZE', stock: 18, price: 2680 },
      { id: 'prod-008-beige', sku: 'SKU-PROD008-BE', color: '米白', colorCode: '#F5F5DC', size: 'ONE SIZE', stock: 12, price: 2680 },
    ],
    description: {
      summary: '簡約俐落的托特包設計，採用頭層牛皮精製而成。寬敞的內部空間可輕鬆收納平板電腦與日常用品，是都會通勤的時尚首選。',
      material: '外層：100% 頭層牛皮；內裡：滌綸織布；五金：鍍金合金',
      manufacturer: '義大利皮革工藝坊',
      origin: '義大利佛羅倫斯',
      careInstructions: '請使用專用皮革保養油定期護理。避免接觸水分，如不慎沾濕請立即用乾布擦拭。不使用時請填充防潮紙並存放於防塵袋中。',
      notes: '真皮製品會隨使用時間產生自然光澤，每件商品紋路略有不同為正常現象。',
    },
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-12-20T08:45:00Z',
  },
  {
    id: 'prod-009',
    name: '輕薄羽絨外套',
    category: 'outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    basePrice: 3680,
    isPublished: true,
    variants: generateVariants('prod-009', 4).map(v => ({ ...v, price: 3680 })),
    description: {
      summary: '輕盈保暖的羽絨外套，採用90%高品質白鴨絨填充，蓬鬆度達650+。可收納設計方便攜帶，是旅行和日常保暖的理想選擇。',
      material: '外層：100% 尼龍（防潑水處理）；填充物：90% 白鴨絨、10% 白鴨毛',
      manufacturer: '日本東京羽絨製造株式會社',
      origin: '日本群馬縣',
      careInstructions: '可機洗，請使用羽絨專用洗劑。洗後需徹底烘乾並定時翻動使羽絨恢復蓬鬆。不可乾洗、不可熨燙。',
      notes: '羽絨外套請勿長時間壓縮存放。換季收納前請清洗並完全乾燥後存放於通風處。',
    },
    createdAt: '2024-12-01T09:30:00Z',
    updatedAt: '2024-12-23T11:00:00Z',
  },
  {
    id: 'prod-010',
    name: '修身牛仔褲',
    category: 'bottoms',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
    basePrice: 1580,
    isPublished: true,
    variants: generateVariants('prod-010', 2).map(v => ({ ...v, price: 1580 })),
    description: {
      summary: '經典修身版型牛仔褲，採用日本進口彈力丹寧面料，舒適貼合不緊繃。特殊洗水處理呈現自然復古風格。',
      material: '98% 棉、2% 彈性纖維（日本 KAIHARA 丹寧）',
      manufacturer: '日本岡山丹寧工坊',
      origin: '日本岡山縣',
      careInstructions: '建議翻面冷水洗滌以維持色澤。首次洗滌請單獨洗以防染色。避免使用漂白劑，可低溫烘乾或自然晾乾。',
      notes: '丹寧面料會隨著穿著時間產生專屬的褪色痕跡，每條牛仔褲都將成為獨一無二的單品。',
    },
    createdAt: '2024-12-05T14:00:00Z',
    updatedAt: '2024-12-22T16:30:00Z',
  },
  {
    id: 'prod-011',
    name: '絲質襯衫',
    category: 'tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    basePrice: 2480,
    isPublished: true,
    variants: generateVariants('prod-011', 4).map(v => ({ ...v, price: 2480 })),
    description: {
      summary: '奢華真絲襯衫，採用19姆米桑蠶絲製成，質地滑順光澤動人。優雅的隱藏式扣設計，適合正式場合與日常穿搭。',
      material: '100% 桑蠶絲（19mm 重磅真絲）',
      manufacturer: '中國蘇州絲綢織造廠',
      origin: '中國江蘇省蘇州市',
      careInstructions: '建議手洗或乾洗。如需手洗請使用冷水和絲綢專用洗劑，輕柔按壓不可擰擠。陰乾後低溫反面熨燙。',
      notes: '真絲製品請避免接觸香水、化妝品等化學物質。穿著時請留意尖銳物品以防勾絲。',
    },
    createdAt: '2024-12-08T10:00:00Z',
    updatedAt: '2024-12-24T09:00:00Z',
  },
  {
    id: 'prod-012',
    name: '小香風外套',
    category: 'outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
    basePrice: 4280,
    isPublished: false,
    variants: generateVariants('prod-012', 3).map(v => ({ ...v, price: 4280 })),
    description: {
      summary: '經典小香風設計，採用法國進口粗花呢面料手工縫製。金色珍珠扣與精緻流蘇邊飾，展現低調奢華的優雅品味。',
      material: '外層：56% 羊毛、28% 壓克力纖維、16% 聚酯纖維；裡襯：100% 絲綢',
      manufacturer: '法國巴黎高級訂製工坊',
      origin: '法國巴黎',
      careInstructions: '僅限專業乾洗。收納時請使用寬版衣架懸掛，保持通風避免擠壓。流蘇邊飾請小心保護。',
      notes: '手工縫製商品可能有細微差異，恰為工藝獨特性之體現。扣子若有鬆動請盡速送修。',
    },
    createdAt: '2024-12-10T11:30:00Z',
    updatedAt: '2024-12-23T14:20:00Z',
  },
];

// 計算商品總庫存
export const getProductTotalStock = (product: Product): number => {
  return product.variants.reduce((sum, v) => sum + v.stock, 0);
};

// 取得商品庫存狀態
export const getProductStockStatus = (product: Product): 'inStock' | 'lowStock' | 'outOfStock' => {
  const totalStock = getProductTotalStock(product);
  if (totalStock === 0) return 'outOfStock';
  if (totalStock < 20) return 'lowStock';
  return 'inStock';
};
