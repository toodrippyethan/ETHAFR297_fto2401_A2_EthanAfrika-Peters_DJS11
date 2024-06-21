// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '../components/common/Header';
// import { fetchShowById } from '../api'; // Replace with actual API function for fetching show details

// function PodcastDetails() {
//   const { id } = useParams(); // Get ID from route params
//   const [podcast, setPodcast] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedSeason, setSelectedSeason] = useState(null);

//   useEffect(() => {
//     const fetchPodcastDetails = async () => {
//       try {
//         const podcastData = await fetchShowById(id); // Fetch podcast details using API function
//         setPodcast(podcastData);
//         setLoading(false);
//       } catch (error) {
//         console.error(`Error fetching podcast ${id}:`, error);
//         setPodcast(null); // Handle error state or show error message
//         setLoading(false);
//       }
//     };

//     fetchPodcastDetails();

//     // Cleanup function
//     return () => {
//       // Perform cleanup if necessary
//     };
//   }, [id]);

//   const handleSeasonChange = (event) => {
//     const selectedSeasonId = parseInt(event.target.value);
//     setSelectedSeason(selectedSeasonId);
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state while fetching data
//   }

//   if (!podcast) {
//     return <p>No such Podcast!</p>; // Handle case where podcast data is not available
//   }

//   return (
//     <div>
//       <Header />
//       <div className="podcast-details">
//         <h1>{podcast.title}</h1>
//         <img src={podcast.displayImage} alt={podcast.title} />
//         <div className="details">
//           {podcast.seasons && podcast.seasons.length > 0 && (
//             <div className="seasons">
//               <p>{podcast.seasons.length} {podcast.seasons.length === 1 ? 'Season' : 'Seasons'}</p>
//               <select onChange={handleSeasonChange}>
//                 <option value="">Select Season</option>
//                 {podcast.seasons.map((season, index) => (
//                   <option key={index} value={season.id}>{season.title}</option>
//                 ))}
//               </select>
//             </div>
//           )}
//           {podcast.genres && podcast.genres.length > 0 && (
//             <div className="genres">
//               <p>Genres: {podcast.genres.map(genre => genre.name).join(', ')}</p>
//             </div>
//           )}
//           <p>Last Updated: {podcast.updatedAt}</p>
//           <p>Description: {podcast.description}</p>
//           {selectedSeason && (
//             <div>
//               <h2>{podcast.seasons.find(season => season.id === selectedSeason).title}</h2>
//               {/* Render episodes or additional details for the selected season */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PodcastDetails;
