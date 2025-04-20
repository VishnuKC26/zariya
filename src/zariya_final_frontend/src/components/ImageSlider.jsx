import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images = [], interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    if (length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrent(prev => (prev + 1) % length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [length, interval]);

  const nextSlide = () => setCurrent((current + 1) % length);
  const prevSlide = () => setCurrent((current - 1 + length) % length);

  if (length === 0) return <p className="text-center py-4">No images to display</p>;

  return (
    <div className="relative w-full max-w-8xl mx-auto overflow-hidden rounded-lg shadow-lg ">
      <div className="absolute inset-0 z-0 flex flex-col items-start  px-10 md:px-10 text-white justify-end">
        <h1 className="z-20 text-5xl md:text-8xl font-extrabold drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] leading-tight">
          The Medium for Change
        </h1>
        <p className="mt-4 text-lg md:text-3xl max-w-5xl drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)]">
          Make every contribution meaningful with Zariya. Connect with verified NGOs and support causes that matter. Together, we can make a difference. Track your donations, see real-time impact, and be part of inspiring change. With Zariya, every act of kindness finds its purpose.
        </p>
      </div>

      <div className="relative">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`flex w-full h-[80vh] object-cover transition-opacity duration-200 ${index === current ? 'opacity-100' : 'opacity-0 absolute'
              }`}
          />
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow"
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === current ? 'bg-blue-700' : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;