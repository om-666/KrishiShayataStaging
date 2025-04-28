import React from 'react';

const videos = [
  {
    id: 'W3P9deLFkk8',
    title: 'AGRICULTURE IN INDIA - Documentary',
    language: 'English',
  },
  {
    id: 'gSatxK56H4E',
    title: 'Drones in Agriculture | Narendra Singh Tomar',
    language: 'Hindi',
  },
  {
    id: 'wEWraMWOaiU',
    title: 'Multi Purpose Chaff Cutter Machine',
    language: 'Hindi',
  },
  {
    id: 'sScXL-ItAiw',
    title: 'Mother India Farms Tackles Water Scarcity',
    language: 'English',
  },
  {
    id: 'e-XvBVZjqNQ',
    title: 'AI in Agriculture - Future of Farming',
    language: 'Hindi',
  },
  {
    id: 'Q43iauE6ixY',
    title: 'Agriculture in Uttar Pradesh, India',
    language: 'Hindi',
  },
];

const VideoGallery = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {videos.map((video) => (
        <div key={video.id} className="w-full">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?modestbranding=1&rel=0&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="mt-2 text-center text-sm font-medium">
            {video.title} ({video.language})
          </p>
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
