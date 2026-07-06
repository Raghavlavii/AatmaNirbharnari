"use client";

import React from "react";
import { PlusCircle, FileText, Video, MoreVertical, Edit2, Trash2 } from "lucide-react";

export default function AdminLearningContentPage() {
  const contentList = [
    { id: 1, title: "Pricing Strategy", type: "Article", date: "2024-03-15", status: "Published" },
    { id: 2, title: "Licensing Basics", type: "Video", date: "2024-03-14", status: "Published" },
    { id: 3, title: "Social Media Marketing", type: "Article", date: "2024-03-10", status: "Draft" },
  ];

  return (
    <div className="pb-12 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Learning Content</h1>
            <p className="mt-2 text-sm text-gray-500 font-medium">Add or edit articles, videos, and tools for the Guidance Hub.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-700 to-pink-500 hover:from-purple-800 hover:to-pink-600 transition-all hover:shadow-md">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Content
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {contentList.map((content) => (
                  <tr key={content.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          {content.type === "Article" ? <FileText className="h-5 w-5 text-purple-600" /> : <Video className="h-5 w-5 text-pink-600" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{content.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {content.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        content.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {content.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-400 hover:text-purple-600 p-2 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 p-2 transition-colors ml-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-2 transition-colors ml-1">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
