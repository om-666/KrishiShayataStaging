import React, { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

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
    id: 'wEWraMWOaiU',
    title: 'Multi Purpose Chaff Cutter Machine',
    language: 'Odia',
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
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const languages = ['All', 'English', 'Hindi', "Odia"];

  // Filter videos based on language
  useEffect(() => {
    let results = videos;
    
    if (selectedLanguage !== 'All') {
      results = results.filter(video => video.language === selectedLanguage);
    }
    
    setFilteredVideos(results);
  }, [selectedLanguage]);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsFullScreen(true);
  };

  const closeModal = () => {
    setIsFullScreen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <div className="min-h-screen text-white">
       
      {/* Hero Section - Simplified */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Agricultural Video Resources</h2>
          <p className="text-green-200 text-lg opacity-90">Explore the latest agricultural techniques, equipment, and regional innovations</p>
        </div>
      </div>
      
      {/* Language Filter - Pills instead of dropdown */}
      <div className="max-w-6xl mx-auto pt-6 pb-2 px-6">
        <div className="flex flex-wrap justify-center gap-3">
          {languages.map(lang => (
            <button
              key={lang}
              className={`px-5 py-2 rounded-full font-medium transition-all ${
                selectedLanguage === lang 
                  ? 'bg-green-600 text-white shadow-lg ring-2 ring-green-400'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedLanguage(lang)}
            >
              {lang === 'All' ? 'All Videos' : `${lang} Videos`}
            </button>
          ))}
        </div>
      </div>
      
      {/* Video Grid - Using YouTube Default Thumbnails */}
      <div className="max-w-6xl mx-auto py-8 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div 
              key={video.id} 
              className="group rounded-xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl cursor-pointer transform transition hover:-translate-y-1"
              onClick={() => handleVideoClick(video)}
            >
              <div className="aspect-video relative">
                {/* Using YouTube's default thumbnail */}
                <img 
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-10 transition-all duration-300">
                  <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-full opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                
                {/* Language Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    video.language === 'English' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-orange-600 text-white'
                  }`}>
                    {video.language}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-lg line-clamp-2 text-white">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Video Modal - Improved */}
      {selectedVideo && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90 transition-opacity duration-300 ${isFullScreen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative bg-gray-800 rounded-lg w-full max-w-4xl overflow-hidden border border-gray-700">
            <button 
              className="absolute right-4 top-4 bg-gray-900 bg-opacity-70 rounded-full p-2 text-gray-400 hover:text-white z-10 transition-colors"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&modestbranding=1&rel=0&playsinline=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium text-white">{selectedVideo.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedVideo.language === 'English' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-orange-600 text-white'
                }`}>
                  {selectedVideo.language}
                </span>
              </div>
              
              <a 
                href={`https://www.youtube.com/watch?v=${selectedVideo.id}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mt-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
};

export default VideoGallery;