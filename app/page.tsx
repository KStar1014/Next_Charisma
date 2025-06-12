'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isSpecial?: boolean;
  isVegetarian?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

const categories: Category[] = [
  { id: 'klassiker', name: 'Klassiker', icon: './images/icons/icon_doener.webp', image: './images/carousel_back.webp' },
  { id: 'turkische-pizza', name: 'Türkische Pizza', icon: './images/icons/icon_lahmacun.webp', image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'pizza-co', name: 'Pizza & Co', icon: './images/icons/icon_pizza.webp', image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'falafel', name: 'Falafel', icon: './images/icons/icon_falafel.webp', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'salate', name: 'Salate', icon: './images/icons/icon_salate_2.webp', image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 'beilagen', name: 'Beilagen', icon: './images/icons/icon_beilagen.webp', image: 'https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Charisma Sandwich',
    description: 'mit Kalb/Hähnchen vom Drehspieß, mit Salat und Saucen nach Wahl',
    price: 4.99,
    isSpecial: true
  },
  {
    id: 3,
    name: 'Salat-Sandwich',
    description: 'mit gemischtem Salat und Saucen nach Wahl',
    price: 4.99,
    isVegetarian: true,
    isSpecial: true
  },
  {
    id: 4,
    name: 'Charisma Teller',
    description: 'mit Kalb/Hähnchen vom Drehspieß mit Salat, Reis oder Pommes frites und Saucen nach Wahl',
    price: 7.99,
    isSpecial: true
  },
  {
    id: 5,
    name: 'Charisma Teller XXL',
    description: 'mit Kalb/Hähnchen vom Drehspieß mit Salat, Reis oder Pommes frites und Saucen nach Wahl',
    price: 24.99
  },
  {
    id: 8,
    name: 'Dürum',
    description: 'mit Kalb/Hähnchen vom Drehspieß in dünnem Brot mit Salat und einer Sauce nach Wahl',
    price: 9.99
  },
  {
    id: 203,
    name: 'Pommbox',
    description: 'mit Kalb/Hähnchen vom Drehspieß und Pommes in einer Box.',
    price: 4.99,
    isSpecial: true
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('klassiker');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 0.00;
  const total = getSubtotal();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              
              {/* Logo */}
              <div className="flex-shrink-0 ml-2 md:ml-0">
                <img 
                  src="./images/logo_light.svg" 
                  alt="Charisma Logo" 
                  className="h-8 w-auto"
                />
              </div>
            </div>

            {/* Search bar */}
            

            {/* Cart */}
            <div className="flex items-center">
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Suche nach Produkten"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                { getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                ) }
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Category Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex flex-col items-center p-0 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                      activeCategory === category.id
                        ? 'bg-orange-50 border-2 border-orange-200'
                        : 'border border-transparent'
                    }`}
                  >
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="h-16 w-16 mb-2 object-contain"
                    />
                    <span className="text-sm font-medium text-gray-700 text-center">
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Section */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                {/* Description above carousel */}
                <div className="p-6 bg-white">
                  <h2 className="text-2xl font-bold mb-2 text-gray-700">Unsere Speisekarte</h2>
                  <p className="text-md text-gray-500">
                    Frisch, mit besten Zutaten – saftig, lecker, unwiderstehlich.
                  </p>
                </div>

                <div 
                  className="relative h-64"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {categories.map((category, index) => (
                    <div
                      key={category.id}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {/* <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                        <div className="p-6 text-white">
                          <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                        </div>
                      </div> */}
                    </div>
                  ))}
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Slide Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {categories.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide ? 'bg-white w-4' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {item.id}.
                          </span>
                          <div>
                            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                              {item.name}
                              {item.isVegetarian && (
                                <span className="text-green-600 text-sm">🌿</span>
                              )}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {item.isSpecial && (
                          <div className="flex items-center gap-1 text-orange-600">
                            <span className="text-sm">🔥</span>
                            <span className="text-sm font-medium">
                              {item.price.toFixed(2)} €
                            </span>
                          </div>
                        )}
                        {!item.isSpecial && (
                          <span className="text-lg font-semibold text-gray-900">
                            {item.price.toFixed(2)} €
                          </span>
                        )}
                        
                        <Button
                          onClick={() => addToCart(item)}
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Zwischensumme</span>
                  <span className="font-medium">{getSubtotal().toFixed(2)} €</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    Liefergebühr
                  </span>
                  <button className="text-orange-600 hover:text-orange-700 underline text-sm">
                    Adresse eingeben
                  </button>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between font-semibold">
                    <span>Gesamt</span>
                    <span>{total.toFixed(2)} €</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
                  disabled={cart.length === 0}
                >
                  ({total.toFixed(2)} €)
                </Button>

                {total < 10 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-orange-700">
                      <span className="text-sm">⚠️</span>
                      <span className="text-sm font-medium">
                        Noch {(10 - total).toFixed(2)} € bis zum Mindestbestellwert.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z"/>
                </svg>
              </a>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4 text-gray-400">
              <span className="text-sm font-medium">PayPal</span>
              <span className="text-sm font-medium">SEPA</span>
              <span className="text-sm font-medium">EC</span>
              <span className="text-sm font-medium">Bar</span>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700 transition-colors">terms privacy</a>
              <a href="#" className="hover:text-gray-700 transition-colors">PolicyLinkLabel</a>
              <a href="#" className="hover:text-gray-700 transition-colors">terms terms</a>
              <a href="#" className="hover:text-gray-700 transition-colors">terms imprint</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}