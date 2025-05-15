import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Star, Clock, ArrowRight } from 'lucide-react';
import { useDestinations } from '../contexts/DestinationsContext';
import PackageCard from '../components/packages/PackageCard';
import TestimonialCard from '../components/testimonials/TestimonialCard';

const HomePage: React.FC = () => {
  const { featuredPackages } = useDestinations();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);
  
  // Update document title
  useEffect(() => {
    document.title = 'TravelVista | Discover Your Next Adventure';
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.current) {
      navigate(`/packages?search=${searchRef.current.value}`);
    }
  };

  // Parallax effect for the hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (document.querySelector('.hero-content')) {
        const heroContent = document.querySelector('.hero-content') as HTMLElement;
        heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        heroContent.style.opacity = `${1 - scrollPosition * 0.002}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", 
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="hero-content text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover the World's Most Amazing Places
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Unforgettable travel experiences curated just for you
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
              <input
                ref={searchRef}
                type="text"
                placeholder="Where do you want to go?"
                className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-center animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white mx-auto mb-2 flex items-start justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
          <span className="text-sm">Scroll Down</span>
        </div>
      </section>

      {/* Featured Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our hand-picked selection of the most incredible travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} travelPackage={pkg} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              View All Packages
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to providing you with the ultimate travel experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Handpicked Destinations</h3>
              <p className="text-gray-600">
                We carefully select the most breathtaking and unique destinations around the world to ensure an unforgettable experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We're committed to offering the best value for your money with our price match guarantee and regular promotional offers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Customer Support</h3>
              <p className="text-gray-600">
                Our dedicated customer service team is available around the clock to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              avatar="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              rating={5}
              text="My trip to Bali was absolutely magical! The TravelVista team took care of every detail, and I didn't have to worry about a thing. The accommodations were luxurious, and the guided tours were informative and fun."
              destination="Bali, Indonesia"
            />
            <TestimonialCard 
              name="Michael Rodriguez"
              avatar="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              rating={4}
              text="The European Cultural Tour exceeded my expectations. Our guide was incredibly knowledgeable, and the itinerary was perfectly balanced between structured activities and free time to explore on our own."
              destination="Paris, Rome, Barcelona"
            />
            <TestimonialCard 
              name="Emily Chen"
              avatar="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              rating={5}
              text="The African Safari was the trip of a lifetime! We saw all the Big Five and so much more. The luxury tented camps were amazing - it felt like glamping in the heart of the wilderness. Highly recommend!"
              destination="Serengeti, Tanzania"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up today and get exclusive access to our special offers and promotions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-6 py-3 rounded-full flex-grow text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="px-6 py-3 bg-orange-500 rounded-full hover:bg-orange-600 transition-colors font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;