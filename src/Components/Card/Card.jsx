import React from 'react';

const Card = ({ title, value, icon: Icon, gradient, trend, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            <span className="text-emerald-600 text-sm font-medium">{trend}</span>
            <span className="text-slate-500 text-xs">{description}</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} text-white`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default Card;