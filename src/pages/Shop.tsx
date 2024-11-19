import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Palette, Zap, Coins, ChevronDown, ChevronUp } from 'lucide-react';
import { useTelegram } from '../hooks/useTelegram';
import { ShopItem } from '../components/ShopItem';
import { PurchaseModal } from '../components/PurchaseModal';

export function Shop() {
  const { showAlert } = useTelegram();
  const [selectedItem, setSelectedItem] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Chess Pieces']);
  const userTokens = parseInt(localStorage.getItem('userTokens') || '0');

  const shopItems = [
    {
      category: 'Chess Pieces',
      icon: Sword,
      items: [
        {
          id: 'modern_set',
          name: 'Modern Set',
          description: 'Sleek, minimalist chess pieces',
          price: 500,
          image: '/pieces/modern-set.png',
          fallbackImage: '/pieces/wp.svg'
        },
        {
          id: 'royal_set',
          name: 'Royal Set',
          description: 'Elegant golden chess pieces',
          price: 1000,
          image: '/pieces/royal-set.png',
          fallbackImage: '/pieces/wk.svg'
        }
      ]
    },
    {
      category: 'Board Themes',
      icon: Palette,
      items: [
        {
          id: 'dark_mode',
          name: 'Dark Mode',
          description: 'Elegant dark theme for night play',
          price: 300,
          image: '/themes/dark-mode.png',
          fallbackImage: '/pieces/board-dark.svg'
        },
        {
          id: 'wooden_theme',
          name: 'Classic Wood',
          description: 'Traditional wooden board design',
          price: 400,
          image: '/themes/wooden.png',
          fallbackImage: '/pieces/board-wood.svg'
        }
      ]
    },
    {
      category: 'Power-ups',
      icon: Zap,
      items: [
        {
          id: 'hint',
          name: 'Move Hint',
          description: 'Get a suggestion for your next move',
          price: 50,
          consumable: true
        },
        {
          id: 'undo',
          name: 'Undo Move',
          description: 'Take back your last move',
          price: 100,
          consumable: true
        }
      ]
    }
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePurchase = (item: any) => {
    if (userTokens >= item.price) {
      setSelectedItem(item);
    } else {
      showAlert('Not enough tokens!');
    }
  };

  const confirmPurchase = () => {
    if (!selectedItem) return;

    const newTokens = userTokens - selectedItem.price;
    localStorage.setItem('userTokens', newTokens.toString());
    
    // Save purchased item
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems') || '[]');
    purchasedItems.push(selectedItem.id);
    localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
    
    showAlert(`Successfully purchased ${selectedItem.name}!`);
    setSelectedItem(null);
    window.location.reload();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#1a1b2e] to-[#2a2b4a] p-4 pb-24"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with Tokens */}
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between mb-8 bg-white/10 p-4 rounded-xl backdrop-blur-sm"
        >
          <h1 className="text-2xl font-bold text-white">Shop</h1>
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">{userTokens}</span>
          </div>
        </motion.div>

        {/* Shop Categories */}
        <div className="space-y-6">
          {shopItems.map((category) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleCategory(category.category)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <category.icon className="w-6 h-6 text-[#6c5dd3]" />
                  <h2 className="text-xl font-semibold text-white">{category.category}</h2>
                </div>
                {expandedCategories.includes(category.category) ? (
                  <ChevronUp className="w-5 h-5 text-white/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedCategories.includes(category.category) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {category.items.map((item) => (
                      <ShopItem
                        key={item.id}
                        item={item}
                        onPurchase={() => handlePurchase(item)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {selectedItem && (
        <PurchaseModal
          item={selectedItem}
          onConfirm={confirmPurchase}
          onCancel={() => setSelectedItem(null)}
        />
      )}
    </motion.div>
  );
}