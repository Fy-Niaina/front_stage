// StatCard/StatCard.jsx
import React from 'react';
import { FiTrendingUp } from "react-icons/fi";

export default function StatCard({ title, value, icon: Icon, trend, description }) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 border-2 border-[#76bc21] shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#76bc21]/5"></div>
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#76bc21]/10 rounded-full blur-xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-[#76bc21]/10 rounded-xl border border-[#76bc21]/20">
            <Icon className="w-6 h-6 text-[#76bc21]" />
          </div>
          <div className="flex items-center gap-1 bg-[#76bc21]/10 backdrop-blur-sm px-2 py-1 rounded-full border border-[#76bc21]/20">
            <FiTrendingUp className="w-3 h-3 text-[#76bc21]" />
            <span className="text-xs font-medium text-[#76bc21]">{trend}</span>
          </div>
        </div>
        
        <div className="mb-2">
          <h3 className="text-lg font-semibold mb-1 text-gray-600">{title}</h3>
          <p className="text-3xl font-bold tracking-tight text-gray-800">{value}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">{description}</span>
          <div className="w-8 h-1 bg-[#76bc21]/30 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-[#76bc21] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-[#76bc21]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}