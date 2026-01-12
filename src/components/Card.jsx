import React from "react";

export const Card = ({ image, title, subtitle, children, actions }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full group transition-all hover:shadow-md">
      {image && (
        <div className="h-48 w-full p-2">
          <img src={image} alt={title} className="w-full h-full object-cover rounded-2xl" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {title && <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>}
        {subtitle && <p className="text-sm text-gray-400 font-medium mb-3">{subtitle}</p>}
        
        <div className="text-gray-500 text-sm leading-relaxed flex-grow">
          {children}
        </div>

        {actions && (
          <div className="mt-6 pt-4 border-t border-gray-50 flex gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};