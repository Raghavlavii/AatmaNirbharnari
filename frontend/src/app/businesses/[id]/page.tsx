import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Mail, Globe, Star, Clock, CheckCircle, MessageSquare } from "lucide-react";

export default async function BusinessProfilePage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, `params` is a Promise that must be awaited
  const { id } = await params;
  
  // Simulated data fetch based on ID
  const business = {
    _id: id,
    businessName: "Radhika's Handlooms",
    category: "Handicrafts",
    description: "Authentic handwoven sarees, dupattas, and ethnic wear directly from artisans. We believe in sustainable fashion and empowering local weavers across rural India.",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    email: "contact@radhikahandlooms.in",
    website: "www.radhikahandlooms.in",
    owner: {
      fullName: "Radhika Sharma",
      experience: "5+ Years",
    },
    services: [
      "Custom Saree Weaving",
      "Bulk Orders for Boutiques",
      "Bridal Collections"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6">
        
        <Link href="/businesses" className="inline-flex items-center text-gray-500 hover:text-purple-700 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 inline-block">
                    {business.category}
                  </span>
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{business.businessName}</h1>
                  <p className="text-gray-500 mt-2 font-medium">Owned by {business.owner.fullName}</p>
                </div>
                <div className="bg-yellow-50 px-3 py-2 rounded-xl flex items-center border border-yellow-100">
                  <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                  <span className="font-bold text-yellow-700">4.9</span>
                </div>
              </div>

              <div className="prose prose-purple max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About the Business</h3>
                <p className="text-gray-600 leading-relaxed">
                  {business.description}
                </p>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Services Offered</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {business.services.map((service, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Gallery Placeholder */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Portfolio / Gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                    <span className="text-3xl">🖼️</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar / Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Location</p>
                    <p className="text-sm text-gray-600">{business.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">{business.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{business.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Website</p>
                    <p className="text-sm text-purple-600 hover:underline cursor-pointer">{business.website}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-pink-500 mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Availability</p>
                    <p className="text-sm text-gray-600">Mon - Sat, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Send Inquiry
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}