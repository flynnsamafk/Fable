/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import heroImage from './assets/Final Hero V4.png';
import logoImage from './assets/Logo Brown.png';
import faceImage from './assets/face.png';
import beforeImage from './assets/before.png';
import afterImage from './assets/after.png';
import waxingImage from './assets/waxing.png';
import storyImage from './assets/story.png';

// --- Types ---

interface Service {
  id: string;
  title: string;
  price: string;
  duration: string;
  description: string;
  idealFor: string;
  involved: string[];
  image: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  services: Service[];
}

// --- Mock Data ---

const CATEGORIES: Category[] = [
  {
    id: 'skin-care',
    name: 'face',
    count: 24,
    image: faceImage,
    services: [
      {
        id: 'facial-1',
        title: 'THE REALLY GOOD FACIAL',
        price: '$140',
        duration: '60min',
        description: 'The 60-minute personalized facial that transforms your skin and renews your confidence.',
        idealFor: 'Monthly maintenance and promoting overall skin health.',
        involved: [
          'Double Cleanse: Removes makeup, sweat, and dirt, leaving your skin fresh and ready for treatment.',
          'Skin Analysis',
          'Customized Treatments: The most effective products and techniques are used to address your unique skin concerns.'
        ],
        image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'dermaplaning',
        title: 'DERMAPLANING',
        price: '$120',
        duration: '45min',
        description: 'Removes dead skin and peach fuzz for a soft, smooth, radiant finish.',
        idealFor: 'Instant glow and smoother makeup application.',
        involved: ['Deep Cleanse', 'Manual Exfoliation', 'Hydrating Mask'],
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'enzyme',
        title: 'ENZYME EXFOLIATION',
        price: '$110',
        duration: '45min',
        description: 'Manual pore cleansing to remove blackheads, congestion, and impurities.',
        idealFor: 'Congested skin and deep cleaning.',
        involved: ['Steam Treatment', 'Extraction', 'Soothing Serum'],
        image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'high-freq',
        title: 'HIGH FREQUENCY',
        price: '$90',
        duration: '30min',
        description: 'Calms acne, boosts healing, and improves circulation using gentle electrical currents.',
        idealFor: 'Acne-prone skin and inflammation.',
        involved: ['Cleansing', 'High Frequency Wand', 'Protective Balm'],
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  {
    id: 'body-hair-removal',
    name: 'waxing',
    count: 8,
    image: waxingImage,
    services: [
      {
        id: 'skin-management',
        title: 'SKIN MANAGEMENT ｜ 皮肤管理',
        price: '$160',
        duration: '90min',
        description: 'Comprehensive skin analysis and advanced treatment protocols for optimal skin health.',
        idealFor: 'Targeted skin concerns and professional maintenance.',
        involved: ['Deep Analysis', 'Specialized Peels', 'Cellular Renewal'],
        image: 'https://images.unsplash.com/photo-1596755389378-7d0d244979d7?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'back-treatment',
        title: 'BACK TREATMENT ｜ 背部护理',
        price: '$120',
        duration: '60min',
        description: 'A luxurious treatment for the back, focusing on deep cleansing and intense hydration.',
        idealFor: 'Clearing congestion and smoothing the skin on your back.',
        involved: ['Deep Cleansing', 'Back Exfoliation', 'Hydrating Mask'],
        image: 'https://images.unsplash.com/photo-1519415510236-83526c208b2b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'hair-removal',
        title: 'HAIR REMOVAL ｜ 专业除毛',
        price: '$60+',
        duration: '30min+',
        description: 'Professional hair removal services for perfectly smooth results across body areas.',
        idealFor: 'Safe and effective long-term hair reduction.',
        involved: ['Area Preparation', 'Professional Removal', 'Aftercare Soothing'],
        image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&q=80&w=800'
      }
    ]
  }
];

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-32 h-32 md:w-48 md:h-48"
      >
        <img
          src={logoImage}
          alt="Fable Beauté"
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo Shape */}
        <motion.div
          animate={{
            padding: isScrolled ? '12px 24px' : '0px',
            borderRadius: isScrolled ? '40px' : '0px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0)',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pointer-events-auto flex items-center"
        >
          <img src={logoImage} alt="Fable Beauté" className="h-8 md:h-12 w-auto object-contain" />
        </motion.div>

        {/* Nav Links & Appointment Shape */}
        <motion.div
          animate={{
            padding: isScrolled ? '12px 32px' : '0px',
            borderRadius: isScrolled ? '40px' : '0px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0)',
            backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0)',
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="pointer-events-auto flex items-center gap-12"
        >
          <div className="hidden md:flex gap-8 text-xs font-semibold tracking-widest uppercase opacity-70">
            <a href="#about" className="hover:opacity-100 transition-opacity">About Us</a>
            <a href="#services" className="hover:opacity-100 transition-opacity">Services</a>
          </div>
          <a
            href="https://api.whatsapp.com/send?phone=601154035562"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold tracking-widest uppercase border-b border-black/20 pb-1 hover:border-black transition-all"
          >
            Book an Appointment
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </section>
  );
};

const Pitch = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-32 bg-white flex flex-col items-center text-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl"
      >
        <div className="overflow-hidden mb-12">
          <motion.h2 variants={item} className="font-display font-extrabold text-5xl md:text-8xl leading-[1] tracking-tighter uppercase">
            WE HELP CREATE <br />
            MOMENTS OF BEAUTY <br />
            FOR YOU
          </motion.h2>
        </div>

      </motion.div>
    </section>
  );
};

const ServicesSection = ({ onSelectCategory }: { onSelectCategory: (cat: Category) => void }) => {
  return (
    <section id="services" className="bg-white overflow-hidden">
      <div className="flex flex-col md:flex-row w-full min-h-[65vh] md:h-[65vh]">
        {CATEGORIES.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 1.2 }}
            onClick={() => onSelectCategory(cat)}
            className="group relative flex-1 cursor-pointer overflow-hidden h-full border-r border-black/5 last:border-r-0 min-h-[300px]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
            </div>
            
            {/* Vertical Text */}
            <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 overflow-visible z-10">
              <h3 
                className="font-display font-extrabold text-7xl md:text-9xl tracking-[0.05em] text-white/90 origin-center -rotate-90 whitespace-nowrap drop-shadow-2xl"
              >
                {cat.name}
              </h3>
            </div>

            {/* Bottom Button */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 md:bottom-16 flex justify-center w-full px-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-300 w-full md:w-auto text-center"
              >
                shop {cat.name}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const StorySection = () => {
  return (
    <section id="about" className="bg-white py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          <img 
            src={storyImage} 
            alt="Our Story" 
            className="w-full h-auto object-cover"
          />
          
          {/* Scribble Animation Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Abstract Scribble 1 */}
              <motion.path
                d="M100,50 Q150,20 200,50 T300,50"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {/* Abstract Scribble 2 */}
              <motion.path
                d="M800,500 Q850,550 900,500 T950,520"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.4 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              {/* Hand-drawn Circle highlight effect */}
              <motion.path
                d="M500,300 C500,350 450,400 400,380 C350,360 300,300 350,250 C400,200 500,250 500,300"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExpansionSection = ({ category, onBack, onSelectService, onSelectCategory }: {
  category: Category;
  onBack: () => void;
  onSelectService: (service: Service) => void;
  onSelectCategory: (cat: Category) => void;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white pt-32 pb-24 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-24">
          <h2 className="font-display font-extrabold text-7xl tracking-tighter uppercase mb-12">
            OUR
            <span className="inline-flex flex-col items-center justify-center border border-black/10 rounded-full px-4 py-1 mx-3 align-middle">
              <span className="text-[8px] font-bold opacity-40 leading-none uppercase">SERVICES</span>
            </span>
            SERVICES
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4 w-full justify-center no-scrollbar">
            <button
              onClick={onBack}
              className="px-8 py-4 border border-neutral-100 rounded-xl text-xs font-bold tracking-widest uppercase hover:bg-neutral-50 transition-colors flex flex-col items-start min-w-[160px]"
            >
              <span className="opacity-40 mb-1">ALL</span>
              <span>54 SERVICES</span>
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className={`px-8 py-4 border rounded-xl text-xs font-bold tracking-widest uppercase transition-all flex flex-col items-start min-w-[160px] ${category.id === cat.id ? 'border-black bg-black text-white' : 'border-neutral-100 hover:bg-neutral-50'
                  }`}
              >
                <span className={`opacity-40 mb-1 ${category.id === cat.id ? 'text-white/60' : ''}`}>{cat.name}</span>
                <span>{cat.count} SERVICES</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col h-full"
          >
            <div className="mb-12">
              <h2 className="font-display font-extrabold text-7xl tracking-tighter mb-4 uppercase">{category.name}</h2>
              <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                Inspired by nature, light, and the soft rhythm of self-care, our {category.name.toLowerCase()}
                treatments are designed to restore balance, nourish deeply, and reveal your natural radiance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => onSelectService(service)}
                  className="p-8 border border-neutral-100 rounded-2xl hover:border-neutral-300 cursor-pointer transition-colors group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display font-bold text-lg tracking-tight group-hover:text-neutral-600 transition-colors">
                      {service.title}
                    </h4>
                    <span className="font-display font-bold text-lg">{service.price}</span>
                  </div>
                  <p className="text-sm text-neutral-400 mb-6 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest uppercase opacity-60">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
                    <button className="ml-auto border-b border-black/20 pb-0.5 group-hover:border-black transition-all">Learn More</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="sticky top-32 aspect-[4/5] rounded-3xl overflow-hidden"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ServiceDetail = ({ service, onClose }: { service: Service; onClose: () => void }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between"
        >
          <div className="flex justify-between items-start mb-8">
            <motion.div variants={item}>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-black" />
                ))}
                <span className="text-[10px] font-bold ml-1">4.9</span>
              </div>
              <h3 className="font-display font-extrabold text-5xl tracking-tighter leading-none mb-4 uppercase">
                {service.title}
              </h3>
              <div className="flex items-center gap-4 text-[11px] font-bold tracking-widest uppercase opacity-50 mb-6">
                <span>{service.price}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}</span>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                {service.description}
              </p>
            </motion.div>
            <motion.button
              variants={item}
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="space-y-8 mb-8">
            <motion.div variants={item}>
              <h5 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-3">Ideal For:</h5>
              <p className="text-sm text-neutral-800 leading-relaxed font-medium">{service.idealFor}</p>
            </motion.div>

            <motion.div variants={item}>
              <h5 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-4">What's Involved:</h5>
              <ul className="space-y-4">
                {service.involved.map((item, idx) => (
                  <li key={idx} className="flex gap-4 text-sm text-neutral-800 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.a
            href="https://api.whatsapp.com/send?phone=601154035562"
            target="_blank"
            rel="noopener noreferrer"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 w-full bg-black text-white text-xs font-bold tracking-widest uppercase py-5 rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center"
          >
            Book Now
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Li Wei',
      treatment: 'Enzyme Exfoliation',
      date: 'Jun 28th, 2025',
      rating: 4.9,
      text: 'My favorite stress reliever. There\'s nothing like ending the month with a visit to Fable Beauté. The atmosphere is so calming, the staff are always attentive, and I leave feeling like a new person. If I could come every week, I would!',
      beforeImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=400',
      afterImage: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      name: 'Yuki T.',
      treatment: 'Glow Revival Facial',
      date: 'Jul 6th, 2025',
      rating: 4.9,
      text: 'My skin has never looked this radiant. One facial at Fable Beauté erased the dullness and gave me the confidence to go makeup-free. The care felt truly personal — I\'m already booking my next visit.',
      beforeImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=400',
      afterImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-display font-extrabold text-5xl md:text-7xl tracking-tighter leading-[0.9] uppercase inline-block">
            REAL
            <span className="inline-flex flex-col items-center justify-center border border-black/10 rounded-full px-4 py-1 mx-4 align-middle">
              <span className="text-[10px] font-bold leading-none">4.9</span>
              <span className="text-[8px] font-bold opacity-40 leading-none">AVERAGE RATING</span>
            </span>
            RESULTS <br />
            NO FILTERS NO RETOUCHING <br />
            JUST
            <span className="inline-flex flex-col items-center justify-center border border-black/10 rounded-full px-4 py-1 mx-4 align-middle">
              <span className="text-[10px] font-bold leading-none">1456K</span>
              <span className="text-[8px] font-bold opacity-40 leading-none">REVIEWS</span>
            </span>
            REAL PEOPLE
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review) => (
            <div key={review.id} className="p-10 border border-neutral-100 rounded-2xl flex flex-col h-full">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-black" />
                ))}
                <span className="text-sm font-bold ml-2">{review.rating}</span>
              </div>

              <p className="text-neutral-600 leading-relaxed mb-10 flex-grow">
                {review.text}
              </p>

              <div className="flex gap-4 mb-8">
                <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  <img src={review.beforeImage} alt="Before" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-neutral-100">
                  <img src={review.afterImage} alt="After" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div>
                <h4 className="font-display font-bold text-lg tracking-tight">{review.name}</h4>
                <p className="text-xs font-medium tracking-widest uppercase opacity-40">
                  {review.treatment}, {review.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-black" />
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
            <div className="w-2 h-2 rounded-full bg-neutral-200" />
          </div>
          <button className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isResizing) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - container.left) / container.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <section className="bg-[#FAF9F6] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl tracking-tighter uppercase opacity-80">
            ACNE TREATMENT
          </h2>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mt-4">
            Visible transformation after a single session
          </p>
        </div>
        <div 
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-ew-resize select-none border border-black/5 shadow-2xl"
          onMouseMove={handleMove}
          onMouseDown={() => setIsResizing(true)}
          onMouseUp={() => setIsResizing(false)}
          onMouseLeave={() => setIsResizing(false)}
          onTouchMove={handleMove}
          onTouchStart={() => setIsResizing(true)}
          onTouchEnd={() => setIsResizing(false)}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            <img 
              src={afterImage} 
              alt="After" 
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-8 right-8 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">after</span>
            </div>
          </div>

          {/* Before Image (Foreground with Clip) */}
          <div 
            className="absolute inset-0 z-10"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={beforeImage} 
              alt="Before" 
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div className="absolute top-8 left-8 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">before</span>
            </div>
          </div>

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-px bg-white/50"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center pointer-events-none group">
              <div className="flex gap-1">
                <div className="w-0.5 h-4 bg-black/20 rounded-full" />
                <div className="w-0.5 h-4 bg-black/20 rounded-full" />
                <div className="w-0.5 h-4 bg-black/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (selectedCategory) {
      window.scrollTo(0, 0);
    }
  }, [selectedCategory]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans selection:bg-black selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" />
        ) : (
          <>
            <Navbar />
            <main>
              <AnimatePresence mode="wait">
                {!selectedCategory ? (
                  <motion.div
                    key="main-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Hero />
                    <Pitch />
                    <ServicesSection onSelectCategory={setSelectedCategory} />
                    <BeforeAfterSlider />
                    <StorySection />
                    <ReviewsSection />
                  </motion.div>
                ) : (
                  <motion.div
                    key="expansion-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ExpansionSection
                      category={selectedCategory}
                      onBack={() => setSelectedCategory(null)}
                      onSelectService={setSelectedService}
                      onSelectCategory={setSelectedCategory}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            <AnimatePresence>
              {selectedService && (
                <ServiceDetail
                  service={selectedService}
                  onClose={() => setSelectedService(null)}
                />
              )}
            </AnimatePresence>

            <footer className="py-24 bg-neutral-900 text-white px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
                <div className="max-w-sm">
                  <h3 className="font-display font-extrabold text-3xl tracking-tighter mb-6 uppercase">Fable Beauté</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    A premium beauty studio dedicated to your well-being. We believe in the power of self-care
                    and the beauty of natural radiance.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Explore</h4>
                    <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                      <li><a href="#" className="hover:opacity-60 transition-opacity">About</a></li>
                      <li><a href="#" className="hover:opacity-60 transition-opacity">Services</a></li>
                      <li><a href="#" className="hover:opacity-60 transition-opacity">Blog</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Legal</h4>
                    <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                      <li><a href="#" className="hover:opacity-60 transition-opacity">Privacy</a></li>
                      <li><a href="#" className="hover:opacity-60 transition-opacity">Terms</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-6">Social</h4>
                    <ul className="space-y-4 text-xs font-semibold tracking-widest uppercase">
                      <li><a href="https://www.instagram.com/fable.beaute" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Instagram</a></li>
                      <li><a href="https://www.facebook.com/profile.php?id=61551542713556" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Facebook</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase opacity-30">
                <p>© 2026 FABLE BEAUTÉ</p>
                <p>DESIGNED BY TIMEFALL STUDIOS</p>
              </div>
            </footer>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
