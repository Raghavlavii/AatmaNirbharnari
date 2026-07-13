import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Tag, MapPin, Calculator, Video } from "lucide-react";

// Mock content data for MVP (would normally be fetched from DB)
const guidanceContent: Record<string, any> = {
  "pricing": {
    title: "Pricing Strategy",
    type: "Article",
    readTime: "5 min",
    icon: Tag,
    color: "bg-blue-100 text-blue-600",
    content: `
      ## Introduction to Pricing
      Pricing is one of the most critical decisions you will make for your home business. Price too high, and you might lose customers. Price too low, and you might not cover your costs or devalue your work.
      
      ### 1. Calculate Your Costs
      Before you can set a price, you need to know exactly how much it costs to produce your product or service. This includes:
      - **Direct Costs:** Raw materials, packaging, direct labor.
      - **Indirect Costs (Overheads):** Electricity, internet, rent (even if at home, allocate a percentage), marketing, and tool depreciation.
      
      ### 2. Research the Market
      Look at competitors who offer similar products or services. What are they charging? What is the perceived value of their brand? Use this as a benchmark.
      
      ### 3. Choose a Pricing Strategy
      - **Cost-Plus Pricing:** Add a standard markup to the cost of the product.
      - **Value-Based Pricing:** Price based on how much the customer believes the product is worth.
      - **Competitive Pricing:** Price in line with or slightly below competitors.
      
      ### Conclusion
      Don't be afraid to adjust your prices as your brand grows and your skills improve. Your time and expertise are valuable!
    `
  },
  "licensing": {
    title: "Licensing Basics",
    type: "Video",
    readTime: "12 min",
    icon: MapPin,
    color: "bg-green-100 text-green-600",
    content: `
      ## Understanding Local Regulations
      When starting a home business, it's crucial to operate within the legal frameworks of your city and state.
      
      ### Do I need a license?
      Most cities require a basic business license, even if you are operating out of your home. If you are selling food products (like a tiffin service or bakery), you will almost certainly need a food handler's permit and a health department inspection.
      
      ### Common Requirements:
      1. **Business Registration (DBA or LLC):** Register your business name to protect it.
      2. **Home Occupation Permit:** Many zoning laws require this to ensure your business doesn't disrupt the residential neighborhood.
      3. **Sales Tax Permit:** If you are selling physical goods, you may need to collect and remit sales tax.
      
      *Please consult with a local legal advisor to ensure you have all the necessary permits for your specific region.*
    `
  },
  "cost-estimation": {
    title: "Cost Estimation Tool",
    type: "Tool",
    readTime: "Interactive",
    icon: Calculator,
    color: "bg-rose-100 text-rose-600",
    content: `
      ## Cost Estimation Framework
      Proper cost estimation ensures you never sell at a loss. Use the formula below to calculate your minimum viable price.
      
      ### The Formula
      **(Total Material Cost + Total Labor Cost + Overhead Allocation) = Total Cost**
      
      **Total Cost + Desired Profit Margin = Final Price**
      
      ### Example Breakdown:
      - Raw Materials for 1 batch of candles: $20
      - Labor (2 hours at $15/hr): $30
      - Overhead (electricity, packaging): $5
      - **Total Cost:** $55
      
      If you want a 40% profit margin:
      $55 / (1 - 0.40) = $91.66 (Target Price for the batch)
    `
  }
};

export default async function GuidanceContentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const content = guidanceContent[resolvedParams.id];

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Not Found</h1>
        <p className="text-gray-500 mb-6">The guidance module you are looking for does not exist.</p>
        <Link href="/entrepreneur/guidance" className="bg-rose-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-rose-700 transition">
          Back to Guidance Hub
        </Link>
      </div>
    );
  }

  const Icon = content.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      <div className="bg-gray-50/50 border-b border-gray-100 pt-12 pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/entrepreneur/guidance" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-rose-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hub
          </Link>
          
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
              {content.type === "Article" && <BookOpen className="w-3 h-3 mr-1" />}
              {content.type === "Video" && <Video className="w-3 h-3 mr-1" />}
              {content.type === "Tool" && <Calculator className="w-3 h-3 mr-1" />}
              {content.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-xs text-gray-500 font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {content.readTime}
            </span>
          </div>

          <div className="flex items-start justify-between">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">{content.title}</h1>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${content.color} hidden sm:flex`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-rose prose-lg max-w-none text-gray-600">
          {content.content.split('\n').map((paragraph: string, index: number) => {
            if (paragraph.trim() === '') return null;
            if (paragraph.trim().startsWith('## ')) {
              return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.trim().startsWith('### ')) {
              return <h3 key={index} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.trim().startsWith('- ')) {
              return (
                <ul key={index} className="list-disc pl-5 my-2">
                  <li className="mb-1" dangerouslySetInnerHTML={{ __html: paragraph.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </ul>
              );
            }
            return (
              <p key={index} className="mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}
