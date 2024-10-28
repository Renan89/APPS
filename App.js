import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProdutosScreen from './src/screens/ProdutosScreen';
import DetalhesScreen from './src/screens/DetalhesScreen';
import CarrinhoScreen from './src/screens/CarrinhoScreen';

const Stack = createStackNavigator();

export default function App() {
  const [carrinho, setCarrinho] = useState([]);

  const adicionarAoCarrinho = (produto) => {
    const itemIndex = carrinho.findIndex(item => item.id === produto.id && item.tamanho === produto.tamanho);
    if (itemIndex !== -1) {
      const novoCarrinho = [...carrinho];
      novoCarrinho[itemIndex].quantidade += 1;
      setCarrinho(novoCarrinho);
    } else {
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const atualizarQuantidade = (produtoId, quantidade) => {
    setCarrinho(carrinho.map(item => 
      item.id === produtoId ? { ...item, quantidade } : item
    ));
  };

  const removerItem = (produto) => {
    setCarrinho(carrinho.filter(item => item.id !== produto.id || item.tamanho !== produto.tamanho));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Produtos">
          {(props) => <ProdutosScreen {...props} adicionarAoCarrinho={adicionarAoCarrinho} />}
        </Stack.Screen>
        <Stack.Screen name="Detalhes">
          {(props) => <DetalhesScreen {...props} adicionarAoCarrinho={adicionarAoCarrinho} />}
        </Stack.Screen>
        <Stack.Screen name="Carrinho">
          {(props) => (
            <CarrinhoScreen 
              {...props} 
              carrinho={carrinho} 
              atualizarQuantidade={atualizarQuantidade} 
              removerItem={removerItem} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
