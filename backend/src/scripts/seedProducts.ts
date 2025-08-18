import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ProductModel from '../models/Product.model';

// Carregar variáveis de ambiente
dotenv.config();

const sampleProducts = [
  {
    name: 'Smartphone Samsung Galaxy S23',
    description: 'Smartphone premium com câmera de alta qualidade, tela AMOLED de 6.1 polegadas e processador Snapdragon 8 Gen 2.',
    price: 2499.99,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'
  },
  {
    name: 'Notebook Dell Inspiron 15',
    description: 'Notebook ideal para trabalho e estudos com processador Intel Core i5, 8GB RAM e SSD 256GB.',
    price: 3299.99,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  },
  {
    name: 'Fone de Ouvido Sony WH-1000XM4',
    description: 'Fone de ouvido wireless com cancelamento de ruído ativo, bateria de 30 horas e qualidade de som superior.',
    price: 899.99,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    name: 'Smart TV LG 55" 4K OLED',
    description: 'Smart TV 4K com tecnologia OLED, HDR10 Pro, sistema operacional webOS e controle por voz.',
    price: 2199.99,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop'
  },
  {
    name: 'Câmera Canon EOS R6 Mark II',
    description: 'Câmera mirrorless profissional com sensor full-frame de 24.2MP, gravação 4K e estabilização de imagem.',
    price: 8999.99,
    stock: 5,
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop'
  },
  {
    name: 'Tablet iPad Air 5ª Geração',
    description: 'Tablet Apple com chip M1, tela Liquid Retina de 10.9 polegadas, compatível com Apple Pencil.',
    price: 3499.99,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'
  },
  {
    name: 'Console PlayStation 5',
    description: 'Console de videogame de nova geração com SSD ultra-rápido, ray tracing e controle DualSense.',
    price: 4199.99,
    stock: 3,
    imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop'
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Smartwatch com chip S9, tela Always-On Retina, monitoramento avançado de saúde e GPS.',
    price: 1899.99,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop'
  },
  {
    name: 'Teclado Mecânico Logitech MX Keys',
    description: 'Teclado mecânico sem fio com switches tácteis, retroiluminação inteligente e bateria recarregável.',
    price: 599.99,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'
  },
  {
    name: 'Mouse Gamer Razer DeathAdder V3',
    description: 'Mouse gamer ergonômico com sensor Focus Pro 30K, switches ópticos e design para destros.',
    price: 299.99,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'
  },
  {
    name: 'Monitor LG UltraWide 34" Curvo',
    description: 'Monitor ultrawide curvo com resolução QHD, taxa de atualização de 144Hz e tecnologia FreeSync.',
    price: 1799.99,
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop'
  },
  {
    name: 'Caixa de Som JBL Charge 5',
    description: 'Caixa de som portátil à prova d\'água com JBL Pro Sound, bateria de 20 horas e powerbank.',
    price: 699.99,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
  }
];

async function seedProducts() {
  try {
    // Conectar ao MongoDB
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      console.error('ERRO: MONGO_URI não definida no arquivo .env');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar produtos existentes (opcional)
    const existingProducts = await ProductModel.countDocuments();
    if (existingProducts > 0) {
      console.log(`⚠️  Encontrados ${existingProducts} produtos existentes.`);
      console.log('🗑️  Removendo produtos existentes...');
      await ProductModel.deleteMany({});
    }

    // Inserir produtos de exemplo
    console.log('📦 Inserindo produtos de exemplo...');
    const insertedProducts = await ProductModel.insertMany(sampleProducts);
    
    console.log(`✅ ${insertedProducts.length} produtos inseridos com sucesso!`);
    
    // Mostrar resumo
    console.log('\n📊 Resumo dos produtos inseridos:');
    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - R$ ${product.price.toFixed(2)} (${product.stock} em estoque)`);
    });

    console.log('\n🎉 Seed concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  } finally {
    // Fechar conexão
    await mongoose.connection.close();
    console.log('🔌 Conexão com MongoDB fechada');
    process.exit(0);
  }
}

// Executar seed se chamado diretamente
if (require.main === module) {
  seedProducts();
}

export default seedProducts;