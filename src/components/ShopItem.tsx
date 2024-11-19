import React from 'react';
import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface ShopItemProps {
  item: {
    name: string;
    description: string;
    price: number;
    image?: string;
    fallbackImage?: string;
    consumable?: boolean;
  };
  onPurchase: () => void;
}

export function ShopItem({ item, onPurchase }: ShopItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-glow transition-all duration-300"
    >
      {(item.image || item.fallbackImage) && (
        <div className="aspect-square bg-black/20">
          <img
            src={item.image || item.fallbackImage}
            alt={item.name}
            className="w-full h-full object-contain p-4"
            onError={(e) => {
              if (item.fallbackImage) {
                (e.target as HTMLImageElement).src = item.fallbackImage;
              }
            }}
          />
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-full">
            <Coins className="icon-sm text-yellow-400" />
            <span className="text-white font-semibold">{item.price}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPurchase}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
          >
            Purchase
          </motion.button>
        </div>

        {item.consumable && (
          <span className="mt-2 text-xs text-white/60 block">
            One-time use item
          </span>
        )}
      </div>
    </motion.div>
  );
}