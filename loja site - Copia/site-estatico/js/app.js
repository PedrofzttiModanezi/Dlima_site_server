(function () {
  "use strict";

  var STORAGE_KEY = "street-tees-cart-html";
  var WHATSAPP_NUMBER = "5515997861572";

  var PRODUCTS = [
    {
      id: "p1",
      name: "SUNNY DAY",
      model: "Oversized · 100% algodão",
      description:
        "Corte largo, gola canelada grossa. Ideal para dias ensolarados.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_1.png",
      collection: "nature-over",
    },
    {
      id: "p2",
      name: "NATURE VIBES",
      model: "Oversized · 100% algodão",
      description:
        "Estampa frontal minimalista, vibe floresta. Perfeita para dias frescos.",
      priceCents: 9990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_2.png",
      collection: "nature-over",
    },
    {
      id: "p3",
      name: "OCEAN DEPTHS",
      model: "Oversized · 100% algodão",
      description:
        "Detalhes em azul claro + base escura. Combina com cargo e tênis chunky.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_3.png",
      collection: "nature-over",
    },
    {
      id: "p4",
      name: "ROCK SOLID",
      model: "Oversized · 100% algodão",
      description:
        "Logo pequeno no peito, estética clean. Marrom terra, relembrando sua força.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_4.jpg  ",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_4.png",
      collection: "nature-over",
    },
    {
      id: "p5",
      name: "FLOWER FEELINGS",
      model: "Oversized · 100% algodão",
      description:
        "Base clara pra contrastar com calça escura. Estampa nas costas pensada na sua fé.",
      priceCents: 10490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_5.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_5.png",
      collection: "nature-over",
    },
    {
      id: "p6",
      name: "FIREBALL SPIRIT",
      model: "Oversized · 100% algodão",
      description:
        "Palheta vermelha com detalhes em preto. Cada peça varia levemente — autenticidade street.",
      priceCents: 13990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_6.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_6.png",
      collection: "nature-over",
    },
    {
      id: "p10",
      name: "FOREST GLOW",
      model: "Oversized · 100% algodão",
      description:
        "Peça com estampa de floresta e acabamento suave. Visual natural e street.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_10.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_10.jpg",
      collection: "nature-over",
    },
    {
      id: "p11",
      name: "SAGE PATH",
      model: "Oversized · 100% algodão",
      description:
        "Tom sutil e estampa orgânica. Ideal para composições clean em tons terrosos.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_11.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_11.jpg",
      collection: "nature-over",
    },
    {
      id: "p12",
      name: "CANOPY DREAM",
      model: "Oversized · 100% algodão",
      description:
        "Corte leve com arte inspirada na copa das árvores. Perfeita para o dia a dia.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_12.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_12.jpg",
      collection: "nature-over",
    },
    {
      id: "p13",
      name: "EARTH TONE",
      model: "Oversized · 100% algodão",
      description:
        "Paleta terra com design atemporal. Uma peça curinga para looks urbanos.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_13.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_13.jpg",
      collection: "nature-over",
    },
    {
      id: "p14",
      name: "RIVER RUN",
      model: "Oversized · 100% algodão",
      description:
        "Detalhes de água corrente e corte oversized. Versátil para uso diário.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_14.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_14.jpg",
      collection: "nature-over",
    },
    {
      id: "p15",
      name: "MOSS LINED",
      model: "Oversized · 100% algodão",
      description:
        "Textura suave e estampa inspirada em musgo. Toque natural para jeans e cargos.",
      priceCents: 13490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_15.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_15.jpg",
      collection: "nature-over",
    },
    {
      id: "p16",
      name: "PRAIRIE SKY",
      model: "Oversized · 100% algodão",
      description:
        "Estampa leve e tonalidades claras. Combinação perfeita com acessórios neutros.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_16.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_16.jpg",
      collection: "nature-over",
    },
    {
      id: "p17",
      name: "OAK ROOTS",
      model: "Oversized · 100% algodão",
      description:
        "Design inspirado em raízes e grafismos naturais. Ideal para sobreposições.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_17.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_17.jpg",
      collection: "nature-over",
    },
    {
      id: "p18",
      name: "HORIZON MIST",
      model: "Oversized · 100% algodão",
      description:
        "Tonalidades suaves que lembram neblina do amanhecer. Muito conforto e estilo.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_18.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_18.jpg",
      collection: "nature-over",
    },
    {
      id: "p19",
      name: "WILD BREEZE",
      model: "Oversized · 100% algodão",
      description:
        "Padrão leve e fresco. Uma peça para looks descontraídos com alma natural.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_19.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_19.jpg",
      collection: "nature-over",
    },
    {
      id: "p20",
      name: "THICKET LANE",
      model: "Oversized · 100% algodão",
      description:
        "Estampa urbana com inspiração em trilhas selvagens. Perfeita para o streetwear.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_20.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_20.jpg",
      collection: "nature-over",
    },
    {
      id: "p21",
      name: "MIDNIGHT LEAF",
      model: "Oversized · 100% algodão",
      description:
        "Folhagem escura e contraste marcante. Uma peça ousada e moderna.",
      priceCents: 13990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_21.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_21.jpg",
      collection: "nature-over",
    },
    {
      id: "p22",
      name: "MISTY MEADOW",
      model: "Oversized · 100% algodão",
      description:
        "Detalhes florais suaves. Estilo leve para quem curte estética natural.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_22.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_22.jpg",
      collection: "nature-over",
    },
    {
      id: "p23",
      name: "BIRCH LINE",
      model: "Oversized · 100% algodão",
      description:
        "Linhas finas e conceito inspirado em madeiras claras. Ótima escolha casual.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_23.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_23.jpg",
      collection: "nature-over",
    },
    {
      id: "p24",
      name: "CEDAR COVE",
      model: "Oversized · 100% algodão",
      description:
        "Visual rústico e moderno ao mesmo tempo. Combina com tênis e jaqueta jeans.",
      priceCents: 13490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_24.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_24.jpg",
      collection: "nature-over",
    },
    {
      id: "p25",
      name: "SPRING SING",
      model: "Oversized · 100% algodão",
      description:
        "Estampa floral vibrante com acabamento macio. Peça leve para qualquer estação.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_25.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_25.jpg",
      collection: "nature-over",
    },
    {
      id: "p26",
      name: "EVERGREEN",
      model: "Oversized · 100% algodão",
      description:
        "Estilo evergreen com tonalidades sóbrias e estética urbana minimalista.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_26.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_26.jpg",
      collection: "nature-over",
    },
    {
      id: "p27",
      name: "STONE TRAIL",
      model: "Oversized · 100% algodão",
      description:
        "Design inspirado em pedras e caminhos naturais. Ideal para street style.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_27.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_27.jpg",
      collection: "nature-over",
    },
    {
      id: "p28",
      name: "DUSK GROVE",
      model: "Oversized · 100% algodão",
      description:
        "Estampa noturna com detalhes botânicos. Conforto e atitude para o dia a dia.",
      priceCents: 13990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_28.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_28.jpg",
      collection: "nature-over",
    },
    {
      id: "p29",
      name: "PETAL SWAY",
      model: "Oversized · 100% algodão",
      description:
        "Floral discreto e corte solto. Uma escolha suave para looks despojados.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_29.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_29.jpg",
      collection: "nature-over",
    },
    {
      id: "p30",
      name: "WILDBLOOM",
      model: "Oversized · 100% algodão",
      description:
        "Estampa marcante com flor selvagem. Ideal para composições urbanas com cor.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_30.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_30.jpg",
      collection: "nature-over",
    },
    {
      id: "p31",
      name: "LOAM SHIFT",
      model: "Oversized · 100% algodão",
      description:
        "Visual terroso e moderno. Funciona bem com jeans e shorts cargo.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_31.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_31.jpg",
      collection: "nature-over",
    },
    {
      id: "p32",
      name: "FERN SHADE",
      model: "Oversized · 100% algodão",
      description:
        "Estampa de samambaia e acabamento confortável. Peça fresca para o verão.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_32.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_32.jpg",
      collection: "nature-over",
    },
    {
      id: "p33",
      name: "HONEYWOOD",
      model: "Oversized · 100% algodão",
      description:
        "Tons mel e madeira em estampa minimalista. Visual aconchegante e urbano.",
      priceCents: 13490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_33.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_33.jpg",
      collection: "nature-over",
    },
    {
      id: "p34",
      name: "RIVERSTONE",
      model: "Oversized · 100% algodão",
      description:
        "Detalhe em pedras e curvas orgânicas. Um clássico renovado para a rua.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_34.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_34.jpg",
      collection: "nature-over",
    },
    {
      id: "p35",
      name: "LEAFY HUSH",
      model: "Oversized · 100% algodão",
      description:
        "Folhagem discreta em visual monocromático. Versátil para qualquer produção.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_35.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_35.jpg",
      collection: "nature-over",
    },
    {
      id: "p36",
      name: "MISTED HILL",
      model: "Oversized · 100% algodão",
      description:
        "Clima de montanha e textura suave. Peça para looks com sobreposição.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_36.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_36.jpg",
      collection: "nature-over",
    },
    {
      id: "p37",
      name: "TERRA CORE",
      model: "Oversized · 100% algodão",
      description:
        "Tons terrosos e gráficos discretos. Uma peça para quem curte essência natural.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_37.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_37.jpg",
      collection: "nature-over",
    },
    {
      id: "p38",
      name: "THAW SEASON",
      model: "Oversized · 100% algodão",
      description:
        "Visuais frios com toque urbano. Ideal para transições entre estações.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_38.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_38.jpg",
      collection: "nature-over",
    },
    {
      id: "p39",
      name: "LUNA FOREST",
      model: "Oversized · 100% algodão",
      description:
        "Estilo noturno com referências à floresta. Peça fresca para looks urbanos.",
      priceCents: 13490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_39.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_39.jpg",
      collection: "nature-over",
    },
    {
      id: "p40",
      name: "SUNRISE STREAM",
      model: "Oversized · 100% algodão",
      description:
        "Cores claras e referência à água nasce no horizonte. Combina com cargos.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_40.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_40.jpg",
      collection: "nature-over",
    },
    {
      id: "p41",
      name: "WILDROOT",
      model: "Oversized · 100% algodão",
      description:
        "Gráfico inspirado em raízes e força natural. Perfeito para composições urbanas.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_41.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_41.jpg",
      collection: "nature-over",
    },
    {
      id: "p42",
      name: "MOUNTAIN BIRD",
      model: "Oversized · 100% algodão",
      description:
        "Toque aventureiro com estampa de ave. Versátil para passeios e looks casuais.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_42.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_42.jpg",
      collection: "nature-over",
    },
    {
      id: "p43",
      name: "FERNRIDGE",
      model: "Oversized · 100% algodão",
      description:
        "Visual sereno inspirado em trilhas sombreadas. Uma peça com clima fresh.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_43.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_43.jpg",
      collection: "nature-over",
    },
    {
      id: "p44",
      name: "BIRCHWOOD",
      model: "Oversized · 100% algodão",
      description:
        "Estilo clássico com estampa de madeira clara. Ideal para um visual leve.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_44.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_44.jpg",
      collection: "nature-over",
    },
    {
      id: "p45",
      name: "CANOPY RISE",
      model: "Oversized · 100% algodão",
      description:
        "Gráfico elevado e cores naturais. Uma peça para destacar qualquer look.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_45.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_45.jpg",
      collection: "nature-over",
    },
    {
      id: "p46",
      name: "SAGE WIND",
      model: "Oversized · 100% algodão",
      description:
        "Tonalidade suave com grafismo leve. Uma peça que combina com qualquer look.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_46.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_46.jpg",
      collection: "nature-over",
    },
    {
      id: "p47",
      name: "WILD THORN",
      model: "Oversized · 100% algodão",
      description:
        "Design com linhas orgânicas e atitude urbana. Use com calça cargo ou jeans.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_47.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_47.jpg",
      collection: "nature-over",
    },
    {
      id: "p48",
      name: "OCEAN MOSS",
      model: "Oversized · 100% algodão",
      description:
        "Combina elementos aquáticos e botânicos para um look fresh e estiloso.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_48.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_48.jpg",
      collection: "nature-over",
    },
    {
      id: "p49",
      name: "FALL TIDE",
      model: "Oversized · 100% algodão",
      description:
        "Tom terroso com detalhes aquáticos. Perfeita para composições urbanas.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_49.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_49.jpg",
      collection: "nature-over",
    },
    {
      id: "p50",
      name: "SPRUCE WAY",
      model: "Oversized · 100% algodão",
      description:
        "Estampa inspirada em pinheiros e vida ao ar livre. Combina com tênis branco.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_50.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_50.jpg",
      collection: "nature-over",
    },
    {
      id: "p51",
      name: "PETAL CLOUD",
      model: "Oversized · 100% algodão",
      description:
        "Visual suave com toque floral e mood street. Ideal para composições leves.",
      priceCents: 12490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_51.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_51.jpg",
      collection: "nature-over",
    },
    {
      id: "p52",
      name: "DREAM GROVE",
      model: "Oversized · 100% algodão",
      description:
        "Estampa serena com inspiração em bosques oníricos. Visual elegante e discreto.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_52.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_52.jpg",
      collection: "nature-over",
    },
    {
      id: "p53",
      name: "RIVER SPARK",
      model: "Oversized · 100% algodão",
      description:
        "Detalhe inspirado em correnteza e luz. Perfeita para looks urbanos com cor.",
      priceCents: 11990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_1.jpg",
      collection: "nature-over",
    },
    {
      id: "p54",
      name: "NIGHT FERN",
      model: "Oversized · 100% algodão",
      description:
        "Visual escuro e orgânico, inspirado em folhagens noturnas. Versátil e comfy.",
      priceCents: 12990,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_2.jpg",
      collection: "nature-over",
    },
    {
      id: "p55",
      name: "EARTH PULSE",
      model: "Oversized · 100% algodão",
      description:
        "Cores quentes e grafismo fluido. Ideal para combinar com peças neutras.",
      priceCents: 13490,
      imageUrl: "loja site - Copia/site-estatico/images/camiseta_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/camiseta_3.jpg",
      collection: "nature-over",
    },
    {
      id: "p7",
      name: "FROSTED CREW",
      model: "Moletom unissex · interior felpa",
      description:
        "Aquece com estilo urbano e estampa discreta. Perfeito para noites de inverno.",
      priceCents: 17990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_7.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_7.jpg",
      collection: "winter-tide",
    },
    {
      id: "p8",
      name: "ARCTIC HYPE",
      model: "Moletom com capuz · algodão premium",
      description:
        "Corte oversized e capuz ajustável para looks quentes e contemporâneos.",
      priceCents: 18990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_8.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_8.jpg",
      collection: "winter-tide",
    },
    {
      id: "p9",
      name: "SALT LAKE",
      model: "Moletom com bolso canguru · felpa pesada",
      description:
        "Design minimalista com toque confortável, ideal para o clima frio da cidade.",
      priceCents: 16490,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_9.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_9.jpg",
      collection: "winter-tide",
    },
    {
      id: "p56",
      name: "FROSTLINE",
      model: "Moletom com capuz · felpa premium",
      description:
        "Corte oversized com estampa fria, inspirado em ruas geladas e noites urbanas.",
      priceCents: 17490,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_1.jpg",
      collection: "winter-tide",
    },
    {
      id: "p57",
      name: "SNOWBLAZE",
      model: "Moletom unissex · interior felpa",
      description:
        "Tonalidades frias com capuz amplo. Quente e perfeito para clima de inverno.",
      priceCents: 17990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_2.jpg",
      collection: "winter-tide",
    },
    {
      id: "p58",
      name: "URBAN AURORA",
      model: "Moletom com zíper · algodão premium",
      description:
        "Detalhes inspirados em luzes noturnas. Peça urbana para quem gosta de destacar o visual.",
      priceCents: 18490,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_3.jpg",
      collection: "winter-tide",
    },
    {
      id: "p59",
      name: "GLACIER PULSE",
      model: "Moletom com capuz · felpa densa",
      description:
        "Visual clean com toque aconchegante. Ideal para dias frios na cidade.",
      priceCents: 16990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_4.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_4.jpg",
      collection: "winter-tide",
    },
    {
      id: "p60",
      name: "NIGHT FROST",
      model: "Moletom com gola alta · felpa premium",
      description:
        "Design sofisticado com acabamento suave, perfeito para looks noturnos.",
      priceCents: 18990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_5.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_5.jpg",
      collection: "winter-tide",
    },
    {
      id: "p61",
      name: "WINTER LOOP",
      model: "Moletom oversized · algodão felpado",
      description:
        "Estampa discreta e acabamento quentinho. Uso confortável em qualquer frio.",
      priceCents: 17990,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_6.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_6.jpg",
      collection: "winter-tide",
    },
    {
      id: "p62",
      name: "COLD SHADOW",
      model: "Moletom com capuz · felpa espessa",
      description:
        "Cores escuras e corte largo, criado para o inverno urbano com atitude.",
      priceCents: 18490,
      imageUrl: "loja site - Copia/site-estatico/images/moletom_7.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/moletom_7.jpg",
      collection: "winter-tide",
    },
    {
      id: "p63",
      name: "TRACK PAVEMENT",
      model: "Calça cargo · algodão confortável",
      description:
        "Bolso cargo e acabamento resistente. Perfeita para streetwear funcional.",
      priceCents: 14990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_1.jpg",
      collection: "calcas",
    },
    {
      id: "p64",
      name: "UTILITY PATH",
      model: "Calça cargo · tecido flexível",
      description:
        "Corte reto com bolsos extra. Prática e descolada para o dia a dia.",
      priceCents: 15990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_2.jpg",
      collection: "calcas",
    },
    {
      id: "p65",
      name: "SHORELINE",
      model: "Calça jogger · malha leve",
      description:
        "Conforto com estilo urbano. Perfeita para passeios e looks relax.",
      priceCents: 13990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_3.jpg",
      collection: "calcas",
    },
    {
      id: "p66",
      name: "MIDNIGHT WALK",
      model: "Calça reta · tecido leve",
      description:
        "Visual elegante que combina com camisetas soltinhas e tênis urbanos.",
      priceCents: 14990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_4.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_4.jpg",
      collection: "calcas",
    },
    {
      id: "p67",
      name: "STREET ARCHIVE",
      model: "Calça cargo · bolsos utilitários",
      description:
        "Detalhes de costura marcantes e corte contemporâneo para o estilo urbano.",
      priceCents: 15990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_5.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_5.jpg",
      collection: "calcas",
    },
    {
      id: "p68",
      name: "CONCRETE LOOP",
      model: "Calça jogger · punho canelado",
      description:
        "Ajuste moderno e tecido confortável para dias de tempo variável.",
      priceCents: 14490,
      imageUrl: "loja site - Copia/site-estatico/images/calca_6.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_6.jpg",
      collection: "calcas",
    },
    {
      id: "p69",
      name: "RIVERSTONE",
      model: "Calça cargo · algodão premium",
      description:
        "Acabamento premium e bolsos amplos. Ideal para o streetwear com atitude.",
      priceCents: 15990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_7.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_7.jpg",
      collection: "calcas",
    },
    {
      id: "p70",
      name: "FOREST WALK",
      model: "Calça reta · corte relax",
      description:
        "Leve e versátil, pensada para quem busca conforto sem perder estilo.",
      priceCents: 14990,
      imageUrl: "loja site - Copia/site-estatico/images/calca_8.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/calca_8.jpg",
      collection: "calcas",
    },
    {
      id: "p71",
      name: "BASEBALL CORE",
      model: "Boné unissex · aba curva",
      description:
        "Boné clássico com visual street e acabamento em tecido resistente.",
      priceCents: 4990,
      imageUrl: "loja site - Copia/site-estatico/images/bone_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_1.jpg",
      collection: "bones",
    },
    {
      id: "p72",
      name: "SKYLINE",
      model: "Boné com patch bordado",
      description:
        "Estilo urbano com detalhe bordado discreto e moderno.",
      priceCents: 5290,
      imageUrl: "loja site - Copia/site-estatico/images/bone_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_2.jpg",
      collection: "bones",
    },
    {
      id: "p73",
      name: "DUSK HAT",
      model: "Boné ajustável · aba curva",
      description:
        "Perfeito para completar looks casuais com pegada street.",
      priceCents: 4990,
      imageUrl: "loja site - Copia/site-estatico/images/bone_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_3.jpg",
      collection: "bones",
    },
    {
      id: "p74",
      name: "NEON SHADOW",
      model: "Boné unissex · tecido leve",
      description:
        "Design leve e confortável com um toque sofisticado de cor.",
      priceCents: 5290,
      imageUrl: "loja site - Copia/site-estatico/images/bone_4.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_4.jpg",
      collection: "bones",
    },
    {
      id: "p75",
      name: "RAW EDGE",
      model: "Boné com patch frontal",
      description:
        "Visual ousado com acabamento robusto para quem curte atitude.",
      priceCents: 5490,
      imageUrl: "loja site - Copia/site-estatico/images/bone_5.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_5.jpg",
      collection: "bones",
    },
    {
      id: "p76",
      name: "SUNSET LINE",
      model: "Boné com ajuste traseiro",
      description:
        "Estilo urbano e ajuste confortável para usar todos os dias.",
      priceCents: 4990,
      imageUrl: "loja site - Copia/site-estatico/images/bone_6.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bone_6.jpg",
      collection: "bones",
    },
    {
      id: "p77",
      name: "SANDSTORM",
      model: "Bermuda cargo · tecido leve",
      description:
        "Bermuda versátil para os dias quentes com bolsos utilitários.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_1.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_1.jpg",
      collection: "bermudas",
    },
    {
      id: "p78",
      name: "COASTLINE",
      model: "Bermuda leve · corte relax",
      description:
        "Conforto e estilo em uma bermuda fácil de combinar com camisetas.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_2.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_2.jpg",
      collection: "bermudas",
    },
    {
      id: "p79",
      name: "URBAN WAVE",
      model: "Bermuda cargo · tecido resistente",
      description:
        "Perfil moderno para quem curte um visual com mood de rua.",
      priceCents: 11490,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_3.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_3.jpg",
      collection: "bermudas",
    },
    {
      id: "p80",
      name: "STRAP LINE",
      model: "Bermuda com ajuste lateral",
      description:
        "Detalhe utilitário e caimento leve para dias de calor.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_4.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_4.jpg",
      collection: "bermudas",
    },
    {
      id: "p81",
      name: "PALM SHADOW",
      model: "Bermuda casual · corte reto",
      description:
        "Bermuda clean com cara de verão e estilo urbano.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_5.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_5.jpg",
      collection: "bermudas",
    },
    {
      id: "p82",
      name: "HORIZON SHORT",
      model: "Bermuda unissex · tecido leve",
      description:
        "Visual fresh com ajuste confortável para os dias de calor.",
      priceCents: 10990,
      imageUrl: "loja site - Copia/site-estatico/images/bermuda_6.jpg",
      backImageUrl: "loja site - Copia/site-estatico/images/bermuda_6.jpg",
      collection: "bermudas",
    },
  ];

  function formatBRL(cents) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(cents / 100);
  }

  function createWhatsappMessage(items) {
    var lines = ["Olá, gostaria de fazer um pedido:", ""];
    var subtotal = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var total = item.priceCents * item.quantity;
      subtotal += total;
      lines.push(
        i + 1 + ". " +
          item.quantity +
          "x " +
          item.name +
          " (" +
          item.model +
          (item.size ? " / " + item.size : "") +
          ") — " +
          formatBRL(total),
      );
    }

    lines.push("", "Subtotal: " + formatBRL(subtotal));
    lines.push("", "Por favor, me envie as instruções de pagamento.");
    return encodeURIComponent(lines.join("\n"));
  }

  function loadCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(lines) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }

  function findProduct(id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  }

  var cart = loadCart();

  var elGridNature = document.getElementById("product-grid");
  var elGridWinter = document.getElementById("product-grid-winter-tide");
  var elGridCalcas = document.getElementById("product-grid-calcas");
  var elGridBones = document.getElementById("product-grid-bones");
  var elGridBermudas = document.getElementById("product-grid-bermudas");
  var elCollections = document.getElementById("colecoes");
  var elNavProducts = document.getElementById("nav-products");
  var elProductsMenu = document.getElementById("products-menu");
  var elBadge = document.getElementById("cart-badge");
  var elBackdrop = document.getElementById("cart-backdrop");
  var elDrawer = document.getElementById("cart-drawer");
  var elLines = document.getElementById("cart-lines");
  var elSubtotal = document.getElementById("cart-subtotal");
  var elToast = document.getElementById("toast");
  var elCheckoutMsg = document.getElementById("checkout-msg");

  var elProductModal = null;
  var elProductModalName = null;
  var elProductModalModel = null;
  var elProductModalDesc = null;
  var elProductModalPrice = null;
  var elProductModalImage = null;
  var elProductModalSizes = null;
  var elProductModalQty = null;
  var elProductModalOpen = null;
  var currentModalProduct = null;
  var currentModalSize = null;
  var currentModalQty = 1;

  var toastTimer = null;

  function itemCount() {
    var n = 0;
    for (var i = 0; i < cart.length; i++) n += cart[i].quantity;
    return n;
  }

  function subtotalCents() {
    var s = 0;
    for (var i = 0; i < cart.length; i++) {
      s += cart[i].priceCents * cart[i].quantity;
    }
    return s;
  }

  function persist() {
    saveCart(cart);
    updateBadge();
    renderCartLines();
    elSubtotal.textContent = formatBRL(subtotalCents());
  }

  function updateBadge() {
    var n = itemCount();
    elBadge.hidden = n === 0;
    elBadge.textContent = n > 99 ? "99+" : String(n);
  }

  function createProductModal() {
    var html =
      '<div class="product-modal" hidden>' +
      '  <div class="product-modal__backdrop" data-action="close"></div>' +
      '  <div class="product-modal__panel" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">' +
      '    <button type="button" class="product-modal__close" data-action="close" aria-label="Fechar">✕</button>' +
      '    <div class="product-modal__body">' +
      '      <div class="product-modal__media">' +
      '        <img class="product-modal__image" alt="" src="" width="600" height="750" />' +
      '      </div>' +
      '      <div class="product-modal__content">' +
      '        <div class="product-modal__badge">NOVO</div>' +
      '        <h2 id="product-modal-title" class="product-modal__title"></h2>' +
      '        <p class="product-modal__model"></p>' +
      '        <p class="product-modal__desc"></p>' +
      '        <p class="product-modal__price"></p>' +
      '        <p class="product-modal__stock">Restam apenas 2 unidades!</p>' +
      '        <div class="product-modal__sizes">' +
'          <p class="product-modal__label">Tamanho</p>' +
'          <div class="product-modal__size-options">' +
'            <button class="size-btn active">P</button>' +
'            <button class="size-btn">M</button>' +
'            <button class="size-btn">G</button>' +
'            <button class="size-btn">GG</button>' +
'          </div>' +
'        </div>' +
      '        <div class="product-modal__actions">' +
      '          <div class="product-modal__qty">' +
      '            <button type="button" class="product-modal__qty-btn" data-action="dec">−</button>' +
      '            <input type="text" readonly class="product-modal__qty-input" value="1" aria-label="Quantidade" />' +
      '            <button type="button" class="product-modal__qty-btn" data-action="inc">+</button>' +
      '          </div>' +
      '          <button type="button" class="btn btn--primary product-modal__add" data-action="add">Adicionar ao carrinho</button>' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>';
    var container = document.createElement("div");
    container.innerHTML = html;
    elProductModal = container.firstChild;
    document.body.appendChild(elProductModal);
    elProductModalImage = elProductModal.querySelector(".product-modal__image");
    elProductModalName = elProductModal.querySelector(".product-modal__title");
    elProductModalModel = elProductModal.querySelector(".product-modal__model");
    elProductModalDesc = elProductModal.querySelector(".product-modal__desc");
    elProductModalPrice = elProductModal.querySelector(".product-modal__price");
    elProductModalSizes = elProductModal.querySelector(".product-modal__sizes");
    elProductModalQty = elProductModal.querySelector(".product-modal__qty-input");

    elProductModal.addEventListener("click", function (e) {
      var action = e.target.closest("[data-action]");
      if (!action) return;
      var name = action.getAttribute("data-action");
      if (name === "close") {
        closeProductModal();
        return;
      }
      if (name === "add") {
        if (!currentModalProduct) return;
        addToCart(currentModalProduct.id, currentModalSize, currentModalQty);
        closeProductModal();
        return;
      }
      if (name === "dec") {
        if (currentModalQty > 1) {
          currentModalQty -= 1;
          elProductModalQty.value = String(currentModalQty);
        }
        return;
      }
      if (name === "inc") {
        currentModalQty += 1;
        elProductModalQty.value = String(currentModalQty);
        return;
      }
    });

    elProductModalSizes.addEventListener("click", function (e) {
      var sizeBtn = e.target.closest(".product-modal__size");
      if (!sizeBtn) return;
      var size = sizeBtn.getAttribute("data-size");
      makeModalSizeActive(size);
    });
  }

  function makeModalSizeActive(size) {
    currentModalSize = size;
    var buttons = elProductModalSizes.querySelectorAll(".product-modal__size");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.toggle("product-modal__size--active", buttons[i].getAttribute("data-size") === size);
    }
  }

  function openProductModal(productId) {
    var product = findProduct(productId);
    if (!product) return;
    currentModalProduct = product;
    currentModalQty = 1;
    currentModalSize = "P";
    elProductModalName.textContent = product.name;
    elProductModalModel.textContent = product.model;
    elProductModalDesc.textContent = product.description;
    elProductModalPrice.textContent = formatBRL(product.priceCents);
    elProductModalImage.src = product.imageUrl;
    elProductModalImage.alt = product.name;
    elProductModalQty.value = String(currentModalQty);
    elProductModalSizes.innerHTML = "";
    var sizes = ["P", "M", "G", "GG"];
    for (var i = 0; i < sizes.length; i++) {
      var size = sizes[i];
      var button = document.createElement("button");
      button.type = "button";
      button.className = "product-modal__size" + (size === currentModalSize ? " product-modal__size--active" : "");
      button.setAttribute("data-size", size);
      button.textContent = size;
      elProductModalSizes.appendChild(button);
    }
    elProductModal.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeProductModal() {
    if (!elProductModal) return;
    elProductModal.hidden = true;
    document.body.style.overflow = "";
  }

  function showToast(message) {
    elToast.textContent = message;
    elToast.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      elToast.hidden = true;
      toastTimer = null;
    }, 3200);
  }

  function openCart() {
    elBackdrop.hidden = false;
    elDrawer.hidden = false;
    elBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderCartLines();
    elCheckoutMsg.hidden = true;
  }

  function closeCart() {
    elBackdrop.hidden = true;
    elDrawer.hidden = true;
    elBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function addToCart(productId, size, qty) {
    if (qty == null) qty = 1;
    var p = findProduct(productId);
    if (!p) return;
    var found = -1;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId && cart[i].size === (size || null)) {
        found = i;
        break;
      }
    }
    if (found >= 0) {
      cart[found].quantity += qty;
    } else {
      cart.push({
        productId: p.id,
        name: p.name,
        model: p.model,
        priceCents: p.priceCents,
        imageUrl: p.imageUrl,
        size: size || null,
        quantity: qty,
      });
    }
    persist();
    showToast(p.name + " · adicionado ao carrinho");
  }

  function setQuantity(productId, qty, size) {
    var q = Math.min(99, Math.max(1, parseInt(qty, 10) || 1));
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].productId === productId && cart[i].size === (size || null)) {
        cart[i].quantity = q;
        persist();
        return;
      }
    }
  }

  function removeLine(productId, size) {
    var next = [];
    for (var i = 0; i < cart.length; i++) {
      if (!(cart[i].productId === productId && cart[i].size === (size || null))) next.push(cart[i]);
    }
    cart = next;
    persist();
  }

  function clearCart() {
    cart = [];
    persist();
  }
  var visibleNatureProducts = 8;
  function renderProducts() {
  elGridNature.innerHTML = "";
  elGridWinter.innerHTML = "";
  elGridCalcas.innerHTML = "";
  elGridBones.innerHTML = "";
  elGridBermudas.innerHTML = "";

  var natureCount = 0;

  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];

    // LIMITA APENAS A PRIMEIRA COLEÇÃO
    if (p.collection === "nature-over") {
      if (natureCount >= visibleNatureProducts) {
        continue;
      }

      natureCount++;
    }

    var li = document.createElement("li");

    li.innerHTML =
      '<article class="card" data-product-id="' + escapeAttr(p.id) + '">' +
      '<div class="card__media">' +
      '<div class="card__image-swap">' +
      '<img class="card__image card__image--front" src="' +
      escapeAttr(p.imageUrl) +
      '" alt="' +
      escapeAttr(p.name) +
      ' frente" loading="lazy" width="600" height="750" />' +
      '<img class="card__image card__image--back" src="' +
      escapeAttr(p.backImageUrl || p.imageUrl) +
      '" alt="' +
      escapeAttr(p.name) +
      ' costa" loading="lazy" width="600" height="750" />' +
      '</div>' +
      "</div>" +
      '<div class="card__body">' +
      '<h2 class="card__title">' +
      escapeHtml(p.name) +
      "</h2>" +
      '<p class="card__model">' +
      escapeHtml(p.model) +
      "</p>" +
      '<p class="card__desc">' +
      escapeHtml(p.description) +
      "</p>" +
      '<div class="card__footer">' +
      '<span class="card__price">' +
      formatBRL(p.priceCents) +
      "</span>" +
      '<button type="button" class="btn btn--primary btn-add" data-id="' +
      escapeAttr(p.id) +
      '">Adicionar ao carrinho</button>' +
      "</div>" +
      "</div>" +
      "</article>";

    var targetGrid = elGridNature;

    if (p.collection === "winter-tide") {
      targetGrid = elGridWinter;
    }
    else if (p.collection === "calcas") {
      targetGrid = elGridCalcas;
    }
    else if (p.collection === "bones") {
      targetGrid = elGridBones;
    }
    else if (p.collection === "bermudas") {
      targetGrid = elGridBermudas;
    }

    targetGrid.appendChild(li);
  }

  // CONTROLA O BOTÃO
  var btn = document.getElementById("load-more-btn");

  if (btn) {
    var totalNature = PRODUCTS.filter(function(p) {
      return p.collection === "nature-over";
    }).length;

    if (visibleNatureProducts >= totalNature) {
      btn.style.display = "none";
    } else {
      btn.style.display = "flex";
    }
  }
}

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function renderCartLines() {
    if (cart.length === 0) {
      elLines.innerHTML =
        '<p class="cart-drawer__empty">Seu carrinho tá vazio. Bora escolher uma camiseta?</p>';
      return;
    }

    var html = '<ul class="cart-lines">';
    for (var i = 0; i < cart.length; i++) {
      var line = cart[i];
      var thumb = line.imageUrl
        ? '<img src="' +
          escapeAttr(line.imageUrl) +
          '" alt="" width="64" height="80" />'
        : '<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.5rem;opacity:.5;">ðŸ‘•</span>';

      html +=
        '<li class="cart-line">' +
        '<div class="cart-line__thumb">' +
        thumb +
        "</div>" +
        '<div class="cart-line__info">' +
        '<p class="cart-line__name">' +
        escapeHtml(line.name) +
        "</p>" +
        '<p class="cart-line__model">' +
        escapeHtml(line.model) +
        "</p>" +
        (line.size
          ? '<p class="cart-line__size">Tamanho: ' + escapeHtml(line.size) + "</p>"
          : "") +
        '<p class="cart-line__unit">' +
        formatBRL(line.priceCents) +
        " · unidade</p>" +
        '<div class="cart-line__controls">' +
        '<div class="qty">' +
        '<button type="button" aria-label="Diminuir" data-action="dec" data-id="' +
        escapeAttr(line.productId) +
        '" data-size="' +
        escapeAttr(line.size || "") +
        '">-</button>' +
        '<input type="number" min="1" max="99" aria-label="Quantidade" data-qty="' +
        escapeAttr(line.productId) +
        '" data-size="' +
        escapeAttr(line.size || "") +
        '" value="' +
        line.quantity +
        '" />' +
        '<button type="button" aria-label="Aumentar" data-action="inc" data-id="' +
        escapeAttr(line.productId) +
        '" data-size="' +
        escapeAttr(line.size || "") +
        '">+</button>' +
        "</div>" +
        '<button type="button" class="cart-line__remove" data-remove="' +
        escapeAttr(line.productId) +
        '" data-size="' +
        escapeAttr(line.size || "") +
        '">Remover</button>' +
        "</div>" +
        "</div>" +
        "</li>";
    }
    html += "</ul>";
    elLines.innerHTML = html;
  }

  elLines.addEventListener("click", function (e) {
    var dec = e.target.closest("[data-action=dec]");
    var inc = e.target.closest("[data-action=inc]");
    var rem = e.target.closest("[data-remove]");
    if (dec) {
      var id = dec.getAttribute("data-id");
      var size = dec.getAttribute("data-size") || null;
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].productId === id && cart[i].size === size) {
          if (cart[i].quantity <= 1) removeLine(id, size);
          else setQuantity(id, cart[i].quantity - 1, size);
          break;
        }
      }
      return;
    }
    if (inc) {
      var id2 = inc.getAttribute("data-id");
      var size2 = inc.getAttribute("data-size") || null;
      for (var j = 0; j < cart.length; j++) {
        if (cart[j].productId === id2 && cart[j].size === size2) {
          setQuantity(id2, cart[j].quantity + 1, size2);
          break;
        }
      }
      return;
    }
    if (rem) {
      removeLine(rem.getAttribute("data-remove"), rem.getAttribute("data-size") || null);
    }
  });

  elLines.addEventListener("change", function (e) {
    var inp = e.target;
    if (inp.tagName !== "INPUT" || !inp.getAttribute("data-qty")) return;
    var pid = inp.getAttribute("data-qty");
    var size = inp.getAttribute("data-size") || null;
    var val = parseInt(inp.value, 10);
    if (isNaN(val) || val < 1) {
      inp.value = "1";
      setQuantity(pid, 1, size);
      return;
    }
    setQuantity(pid, val, size);
    renderCartLines();
    elSubtotal.textContent = formatBRL(subtotalCents());
  });

  elCollections.addEventListener("click", function (e) {
    var btn = e.target.closest(".btn-add");
    if (btn) {
      var id = btn.getAttribute("data-id");
      if (id) addToCart(id);
      return;
    }
    var card = e.target.closest(".card[data-product-id]");
    if (card) {
      var id2 = card.getAttribute("data-product-id");
      if (id2) openProductModal(id2);
    }
  });

  // Products nav toggle: show category choices and scroll to collections (click toggle)
  if (elNavProducts && elProductsMenu) {
    // ensure ARIA initial state
    if (!elProductsMenu.hasAttribute("hidden")) {
      elProductsMenu.setAttribute("hidden", "");
    }
    elProductsMenu.setAttribute("aria-hidden", "true");
    elNavProducts.setAttribute("aria-expanded", "false");

    elNavProducts.addEventListener("click", function (ev) {
      ev.preventDefault();
      var isOpen = !elProductsMenu.hasAttribute("hidden");
      if (isOpen) {
        // close
        elProductsMenu.setAttribute("hidden", "");
        elProductsMenu.setAttribute("aria-hidden", "true");
        elNavProducts.setAttribute("aria-expanded", "false");
      } else {
        // open
        elProductsMenu.removeAttribute("hidden");
        elProductsMenu.setAttribute("aria-hidden", "false");
        elNavProducts.setAttribute("aria-expanded", "true");
        // scroll to collections only when opening
        var col = document.getElementById("colecoes");
        if (col) col.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // handle clicks on the small products menu buttons
    elProductsMenu.addEventListener("click", function (ev) {
      var btn = ev.target.closest && ev.target.closest(".products-menu__btn");
      if (!btn) return;
      var target = btn.getAttribute("data-target");
      if (!target) return;
      var el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      // hide menu after selection
      elProductsMenu.setAttribute("hidden", "");
      elProductsMenu.setAttribute("aria-hidden", "true");
      elNavProducts.setAttribute("aria-expanded", "false");
    });

    // close products menu when clicking outside
    document.addEventListener("click", function (ev) {
      if (!elProductsMenu || elProductsMenu.hasAttribute("hidden")) return;
      var inside = ev.target.closest && (ev.target.closest(".products-menu") || ev.target.closest("#nav-products"));
      if (!inside) {
        elProductsMenu.setAttribute("hidden", "");
        elProductsMenu.setAttribute("aria-hidden", "true");
        elNavProducts.setAttribute("aria-expanded", "false");
      }
    });

    // close with Escape key for accessibility
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" || ev.key === "Esc") {
        if (!elProductsMenu.hasAttribute("hidden")) {
          elProductsMenu.setAttribute("hidden", "");
          elProductsMenu.setAttribute("aria-hidden", "true");
          elNavProducts.setAttribute("aria-expanded", "false");
          elNavProducts.focus();
        }
      }
    });
  }

  document.getElementById("btn-open-cart").addEventListener("click", openCart);

  /** Fechar: captura no documento evita clique "perdido" por sobreposição / bolha */
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (!t.closest("#btn-close-cart")) return;
      e.preventDefault();
      e.stopPropagation();
      closeCart();
    },
    true
  );

  elBackdrop.addEventListener("click", function (e) {
    if (e.target === elBackdrop) closeCart();
  });

  document.getElementById("btn-clear-cart").addEventListener("click", function () {
    clearCart();
    elCheckoutMsg.hidden = true;
  });

  document.getElementById("btn-checkout").addEventListener("click", function () {
    elCheckoutMsg.hidden = false;
    if (cart.length === 0) {
      elCheckoutMsg.textContent = "Adicione pelo menos um item.";
      return;
    }

    var message = createWhatsappMessage(cart);
    var whatsappUrl =
      "https://wa.me/" +
      WHATSAPP_NUMBER.replace(/\D/g, "") +
      "?text=" +
      message;

    elCheckoutMsg.style.background = "rgba(21, 94, 117, 0.35)";
    elCheckoutMsg.style.color = "#a5f3fc";
    elCheckoutMsg.textContent = "Redirecionando para o WhatsApp...";

    window.location.href = whatsappUrl;
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!elDrawer.hidden) closeCart();
      if (elProductModal && !elProductModal.hidden) closeProductModal();
    }
  });
  document.addEventListener("click", function(e) {
  if (e.target && e.target.id === "load-more-btn") {
    visibleNatureProducts += 8;
    renderProducts();
  }
});   
  createProductModal();
  renderProducts();
  persist();
})();

// Selecionando os elementos
const btnProdutos = document.getElementById('nav-products');
const menuProdutos = document.getElementById('products-menu');
const botoesCategoria = document.querySelectorAll('.products-menu__btn');

// 1. FUNÇÃO: Abrir e fechar ao clicar
btnProdutos.addEventListener('click', (e) => {
    e.preventDefault(); // Impede o link de recarregar a página
    menuProdutos.classList.toggle('active');
});

// 2. FUNÇÃO: Fechar se o usuário clicar em qualquer lugar fora do menu
document.addEventListener('click', (e) => {
    if (!btnProdutos.contains(e.target) && !menuProdutos.contains(e.target)) {
        menuProdutos.classList.remove('active');
    }
});

// 3. FUNÇÃO: Scroll Suave ao clicar nas categorias
botoesCategoria.forEach(botao => {
    botao.addEventListener('click', () => {
        const targetId = botao.getAttribute('data-target');
        const elementoAlvo = document.getElementById(targetId);

        if (elementoAlvo) {
            // Fecha o menu antes de descer
            menuProdutos.classList.remove('active');

            // Faz o scroll bonitão
            window.scrollTo({
                top: elementoAlvo.offsetTop - 80, // Desconto da altura do seu header
                behavior: 'smooth'
            });
        }
    });
});

/* =========================
   ZOOM DA IMAGEM DO MODAL
========================= */

const zoomContainer = document.getElementById("image-zoom");
const zoomImage = document.getElementById("image-zoom-img");
const zoomClose = document.getElementById("image-zoom-close");

function openImageZoom(src) {
  zoomImage.src = src;
  zoomContainer.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeImageZoom() {
  zoomContainer.hidden = true;
  document.body.style.overflow = "";
}

zoomClose.addEventListener("click", closeImageZoom);

zoomContainer.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("image-zoom__backdrop") ||
    event.target === zoomContainer
  ) {
    closeImageZoom();
  }
});

/* adiciona clique nas imagens do modal */
setTimeout(() => {
  document.addEventListener("click", function (event) {
    const image = event.target.closest(".product-modal__image");

    if (!image) return;

    openImageZoom(image.src);
  });
}, 500);

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
  ".reveal, .reveal-stagger"
);

function revealOnScroll() {
  const triggerBottom =
    window.innerHeight * 0.88;

  revealElements.forEach((element, index) => {
    const rect =
      element.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      setTimeout(() => {
        element.classList.add("active");
      }, index * 120);
    }
  });
}

window.addEventListener(
  "scroll",
  revealOnScroll
);

window.addEventListener(
  "load",
  revealOnScroll
);

/* =========================
   LOADING SCREEN
========================= */

window.addEventListener("load", function () {
  const loader =
    document.getElementById("loader");

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1800);
});