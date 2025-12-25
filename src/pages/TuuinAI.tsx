import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of E-Commerce at Nordstrom",
    quote: "We started looking at Tuuin AI a few months ago and in my mind...this totally makes sense, this is the future. The proof is in the pudding – it doesn't take very long. Within the first few weeks, you're going to know.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop",
    company: "Nordstrom"
  },
  {
    name: "Marcus Thompson",
    role: "Chief Digital Officer at Revolve",
    quote: "What drew me to Tuuin AI was the vision that AI could handle the sizing complexity so my team could focus on creative merchandising. Since implementing Tuuin, we've changed how our fashion team operates.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    company: "Revolve"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Digital at Farfetch",
    quote: "Right off the bat we've seen an 80% reduction in return rates. As those orders came through, we've seen easily a 95% improvement in customer satisfaction. Incredible outcome.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    company: "Farfetch"
  },
  {
    name: "David Park",
    role: "CTO at SSENSE",
    quote: "I've envisioned this for five years – AI handling the fit complexity so my team could focus on creative, strategic fashion work. Tuuin AI made it real, scaling our capacity 10x.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    company: "SSENSE"
  },
  {
    name: "Alexandra Kim",
    role: "Director of Innovation at Net-a-Porter",
    quote: "We believe the future of fashion retail lies in leveraging AI to not only augment human capabilities but also to fundamentally reshape how shopping is conducted.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop",
    company: "Net-a-Porter"
  }
];

const stats = [
  { label: "Virtual Try-Ons", value: "2.5M", description: "by the Tuuin AI Platform" },
  { label: "Returns Prevented", value: "317K", description: "Equivalent to $47M in savings" },
  { label: "Revenue Recovered", value: "$18.2M", description: "Since February 2025" }
];

const capabilities = [
  { 
    id: "avatar",
    name: "AVATAR", 
    tagline: "Personalized digital twins",
    description: "AI-powered 3D avatars that match your customers' exact body measurements, creating personalized shopping experiences.",
    features: ["Body scan technology", "Real-time measurements", "Photo-to-avatar generation", "Cross-brand consistency"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
  },
  { 
    id: "tryon",
    name: "TRY-ON", 
    tagline: "AI-powered visualization",
    description: "When a customer browses, AI agents spring into action — rendering clothing on their avatar, adjusting for size, and showing true fit. What used to be guesswork now happens instantly.",
    features: ["Real-time rendering", "Multi-angle views", "Fabric simulation", "True-to-life colors"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop"
  },
  { 
    id: "sizing",
    name: "SIZING", 
    tagline: "Intelligent recommendations",
    description: "Tuuin AI analyzes fit data from your products, applies AI-powered sizing algorithms, and delivers only perfect recommendations. Instead of size charts, your customers see their exact fit.",
    features: ["Cross-brand sizing", "AI-powered fit prediction", "Up to 95% accuracy", "Size-inclusive recommendations"],
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop"
  },
  { 
    id: "insights",
    name: "INSIGHTS", 
    tagline: "Data-driven decisions",
    description: "When AI determines a fit pattern, insights happen automatically. Track returns, identify sizing issues, optimize inventory. Actions are tied to data, not guesswork.",
    features: ["Return rate analytics", "Size curve optimization", "Customer behavior tracking", "Full audit trail"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  },
  { 
    id: "integration",
    name: "INTEGRATION", 
    tagline: "Seamless connectivity",
    description: "Build custom workflows that match your organization's tech stack. API-first architecture, native integrations, and plug-and-play widgets—no coding required.",
    features: ["Shopify & WooCommerce", "Headless commerce ready", "Custom API access", "White-label options"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  { 
    id: "analytics",
    name: "ANALYTICS", 
    tagline: "Enterprise intelligence",
    description: "Real-time dashboards and scheduled reports that show exactly what your fashion operations team is achieving. Track conversion, return rates, and ROI—with data that speaks to the board.",
    features: ["Real-time KPI dashboards", "Board-ready reporting", "Trend analysis & forecasting", "Custom metric tracking"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
  }
];

const navItems = [
  { label: "Platform", hasDropdown: true },
  { label: "Solutions", hasDropdown: true },
  { label: "Company", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Podcast", hasDropdown: false }
];

const TuuinAI = () => {
  const [activeCapability, setActiveCapability] = useState("avatar");
  const activeItem = capabilities.find(c => c.id === activeCapability);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-3xl font-bold tracking-tight">TUUIN</div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button key={item.label} className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors">
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </button>
            ))}
          </div>
          <Button variant="outline" className="bg-white text-black hover:bg-white/90 border-0 font-semibold">
            Request a Demo <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20">
        {/* Background Image with Silhouette Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop&q=80"
            alt="Fashion silhouette"
            className="w-full h-full object-cover object-center opacity-60"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[-0.04em] uppercase">
            For those who<br />
            dare to reimagine<br />
            <span className="bg-white text-black px-4 py-1 inline-block mt-2">the fit.</span>
          </h1>
        </div>
      </section>

      {/* Proven in Production - Testimonials */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">Proven in production</h2>
          <div className="w-16 h-px bg-white/30 mb-12" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 5).map((testimonial, index) => (
              <div 
                key={index} 
                className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">"{testimonial.quote}"</p>
                <div className="text-xs text-white/40 uppercase tracking-wider">{testimonial.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-widest mb-12">Tuuin AI by the numbers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="border-l-2 border-white/20 pl-6">
                <div className="text-5xl md:text-6xl font-black mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-white/80 mb-1">{stat.label}</div>
                <div className="text-sm text-white/50">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivering Outcomes */}
      <section className="py-24 bg-gradient-to-b from-black to-zinc-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-medium text-white/60 uppercase tracking-widest mb-4">Delivering Fashion Outcomes</h2>
              <p className="text-3xl md:text-4xl font-light leading-relaxed mb-8">
                Tuuin AI's intelligent agents act on product data, enrich sizing, access tools, perform fit analysis, form conclusions, and offload repetitive tasks.
              </p>
              <Button className="bg-white text-black hover:bg-white/90 font-semibold">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
                alt="Platform dashboard"
                className="rounded-lg border border-white/10"
              />
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <a href="#" className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
              <h4 className="text-lg font-semibold mb-2 group-hover:text-white/90">Expert Fit, AI Speed and Precision</h4>
              <p className="text-sm text-white/60">Learn how Tuuin's agentic approach leverages AI to shift your team up.</p>
            </a>
            <a href="#" className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
              <h4 className="text-lg font-semibold mb-2 group-hover:text-white/90">Offload Non-Human Work</h4>
              <p className="text-sm text-white/60">See examples of manual, repetitive work Tuuin's Agents can take on.</p>
            </a>
            <a href="#" className="group bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
              <h4 className="text-lg font-semibold mb-2 group-hover:text-white/90">Service as Software</h4>
              <p className="text-sm text-white/60">AI Agents are enabling a new approach to solving fit challenges.</p>
            </a>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-24 bg-zinc-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm font-medium text-white/60 uppercase tracking-widest mb-2">Platform capabilities</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Complete Fashion Tech Stack</h2>
          <p className="text-lg text-white/60 mb-12 max-w-2xl">
            From avatar creation to conversion, Tuuin AI handles the full lifecycle of virtual try-on—with AI agents at every layer.
          </p>

          {/* Capability Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {capabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => setActiveCapability(cap.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCapability === cap.id 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cap.name}
                <span className="text-xs ml-2 opacity-60">{cap.tagline}</span>
              </button>
            ))}
          </div>

          {/* Active Capability Content */}
          {activeItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-3xl font-bold mb-4">{activeItem.name}</h3>
                <p className="text-lg text-white/70 mb-6">{activeItem.tagline}</p>
                <p className="text-white/60 mb-8">{activeItem.description}</p>
                
                <h4 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">What it Does</h4>
                <ul className="space-y-3">
                  {activeItem.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img 
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="rounded-lg border border-white/10 w-full"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Podcast Section */}
      <section className="py-24 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Latest Podcast Episodes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="#" className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
              <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                <Play className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Fashion Leadership Without the Ego</h3>
                <p className="text-white/60 text-sm">Watch Now →</p>
              </div>
            </a>
            <a href="#" className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
              <div className="aspect-video bg-zinc-800 flex items-center justify-center">
                <Play className="w-16 h-16 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">People-Led, AI-Driven: When Humans Lead, Tech Follows</h3>
                <p className="text-white/60 text-sm">Watch Now →</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white text-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Ready to reimagine the fit?</h2>
          <p className="text-xl text-black/60 mb-8">
            Join the brands that are transforming how their customers shop.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black text-white hover:bg-black/90 font-semibold px-8">
              Request a Demo <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10 font-semibold px-8">
              Watch Platform Overview
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="text-2xl font-bold mb-4">TUUIN</div>
              <p className="text-sm text-white/50">AI-powered virtual try-on for fashion brands.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Avatar</a></li>
                <li><a href="#" className="hover:text-white">Try-On</a></li>
                <li><a href="#" className="hover:text-white">Sizing</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
                <li><a href="#" className="hover:text-white">E-Commerce</a></li>
                <li><a href="#" className="hover:text-white">Brands</a></li>
                <li><a href="#" className="hover:text-white">Retailers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Podcast</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">© 2025 Tuuin AI. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TuuinAI;
