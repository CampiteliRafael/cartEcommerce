import mongoose from 'mongoose';
import ProductModel from '../models/Product.model';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente
dotenv.config();

// Lista de produtos para inserir no banco de dados
const products = [
  {
    name: "Smartphone Galaxy S23",
    description: "Smartphone Samsung Galaxy S23 com 256GB de armazenamento, 8GB de RAM, câmera tripla de 50MP e tela AMOLED de 6.1 polegadas.",
    price: 4999.99,
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=2042&auto=format&fit=crop"
  },
  {
    name: "Notebook Dell Inspiron 15",
    description: "Notebook Dell Inspiron 15 com processador Intel Core i7, 16GB de RAM, SSD de 512GB e tela Full HD de 15.6 polegadas.",
    price: 5499.99,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Smart TV LG 55 polegadas",
    description: "Smart TV LG 55 polegadas 4K com HDR, sistema webOS, Wi-Fi integrado e controle por voz.",
    price: 3299.99,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Fone de Ouvido Sony WH-1000XM4",
    description: "Fone de ouvido sem fio Sony WH-1000XM4 com cancelamento de ruído, bateria de longa duração e qualidade de áudio premium.",
    price: 1899.99,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Câmera Canon EOS Rebel T7",
    description: "Câmera DSLR Canon EOS Rebel T7 com 24.1MP, gravação de vídeo Full HD e conectividade Wi-Fi.",
    price: 2799.99,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Console PlayStation 5",
    description: "Console PlayStation 5 com SSD de 825GB, controle DualSense, suporte a jogos em 4K e ray tracing.",
    price: 4499.99,
    stock: 10,
    imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2127&auto=format&fit=crop"
  },
  {
    name: "Tablet iPad Air",
    description: "Tablet iPad Air com chip M1, tela Liquid Retina de 10.9 polegadas, 256GB de armazenamento e suporte a Apple Pencil.",
    price: 5299.99,
    stock: 20,
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "Smartwatch Apple Watch Series 8",
    description: "Smartwatch Apple Watch Series 8 com monitoramento de saúde avançado, GPS, resistência à água e tela Retina sempre ativa.",
    price: 3499.99,
    stock: 35,
    imageUrl: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2072&auto=format&fit=crop"
  },
  {
    name: "Caixa de Som JBL Charge 5",
    description: "Caixa de som portátil JBL Charge 5 com Bluetooth, à prova d'água, bateria de 20 horas e powerbank integrado.",
    price: 999.99,
    stock: 45,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "Monitor Gamer LG UltraGear 27",
    description: "Monitor Gamer LG UltraGear 27 polegadas com resolução QHD, taxa de atualização de 144Hz, tempo de resposta de 1ms e tecnologia HDR.",
    price: 2199.99,
    stock: 18,
    imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Teclado Mecânico Logitech G Pro",
    description: "Teclado mecânico Logitech G Pro com switches GX Blue, iluminação RGB, design compacto e cabo removível.",
    price: 799.99,
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=2080&auto=format&fit=crop"
  },
  {
    name: "Mouse Gamer Razer DeathAdder V2",
    description: "Mouse gamer Razer DeathAdder V2 com sensor óptico de 20.000 DPI, 8 botões programáveis e iluminação Chroma RGB.",
    price: 399.99,
    stock: 40,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=2065&auto=format&fit=crop"
  },
  {
    name: "Impressora Multifuncional HP LaserJet",
    description: "Impressora multifuncional HP LaserJet com impressão frente e verso automática, scanner, copiadora e conectividade Wi-Fi.",
    price: 1499.99,
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1612815292890-fd55c355d8ce?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Roteador Wi-Fi TP-Link Archer AX50",
    description: "Roteador Wi-Fi TP-Link Archer AX50 com tecnologia Wi-Fi 6, velocidade de até 3 Gbps, 4 antenas e controle parental.",
    price: 699.99,
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1648231836813-6a127f2d930b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Carregador Portátil Anker PowerCore",
    description: "Carregador portátil Anker PowerCore com capacidade de 20.000mAh, carregamento rápido e múltiplas portas USB.",
    price: 299.99,
    stock: 50,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=2069&auto=format&fit=crop"
  }
];

// Função para conectar ao banco de dados e inserir os produtos
async function seedProducts() {
  try {
    // Conecta ao MongoDB usando a URI do arquivo .env
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce-cart';
    await mongoose.connect(mongoUri);
    console.log('Conectado ao MongoDB');

    // Limpa a coleção de produtos existente
    await ProductModel.deleteMany({});
    console.log('Coleção de produtos limpa');

    // Insere os novos produtos
    const insertedProducts = await ProductModel.insertMany(products);
    console.log(`${insertedProducts.length} produtos inseridos com sucesso!`);

    // Exibe os IDs dos produtos inseridos
    console.log('IDs dos produtos inseridos:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}: ${product._id}`);
    });

    // Desconecta do banco de dados
    await mongoose.disconnect();
    console.log('Desconectado do MongoDB');

  } catch (error) {
    console.error('Erro ao inserir produtos:', error);
  }
}

// Executa a função de seed
seedProducts();