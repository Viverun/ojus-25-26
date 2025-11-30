// "use client";

// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import React,{ useState, useEffect } from 'react';
// import api from "@/api/api";
// import { useAuth } from "@/context/AuthContext";
// // Complete event data matching IDs from both indoor and outdoor

// const allEvents = {
//     // Indoor Events (IDs 1-5)
//     1: {
//       slug: "badminton-singles-m-f",
//       id: 1,
//       name: "Badminton (Singles) (Male & Female)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
//       time: "3:00 PM - 6:00 PM",
//       participants: 32,
//       prize: "₹5,000",
//     },
//     2: {
//       slug: "chess-boys-girls",
//       id: 2,
//       name: "Chess (Boys & Girls)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
//       time: "2:00 PM - 5:00 PM",
//       participants: 40,
//       prize: "₹2,000",
//     },
//     3: {
//       slug: "badminton-doubles",
//       id: 3,
//       name: "Badminton (Doubles)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
//       time: "4:00 PM - 7:00 PM",
//       participants: 16,
//       prize: "₹6,000",
//     },
//     4: {
//       slug: "carrom",
//       id: 4,
//       name: "Carrom",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Singles and Doubles Carrom Tournament. A game of skill, strategy, and precision.",
//       time: "1:00 PM - 5:00 PM",
//       participants: 40,
//       prize: "₹1,000",
//     },
//     5: {
//       slug: "table-tennis",
//       id: 5,
//       name: "Table Tennis",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
//       time: "11:00 AM - 4:00 PM",
//       participants: 24,
//       prize: "₹3,000",
//     },

//     // Outdoor Events (IDs 9-17)
//     9: {
//       slug: "dodgeball-girls",
//       id: 9,
//       name: "Dodgeball (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "High-energy team competition. Last player standing wins!",
//       time: "10:00 AM - 1:00 PM",
//       participants: 30,
//       prize: "₹4,000",
//     },
//     10: {
//       slug: "overarm-cricket-boys",
//       id: 10,
//       name: "Overarm Cricket (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "T20 Overarm Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
//       time: "8:00 AM - 1:00 PM",
//       participants: 80,
//       prize: "₹15,000",
//     },
//     11: {
//       slug: "tug-of-war-boys",
//       id: 11,
//       name: "Tug of War (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Test of strength and teamwork. Pull your way to victory.",
//       time: "12:00 PM - 3:00 PM",
//       participants: 20,
//       prize: "₹3,000",
//     },
//     12: {
//       slug: "kabaddi-boys-girls",
//       id: 12,
//       name: "Kabaddi (Boys & Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Traditional Indian contact sport emphasizing agility, breath control, and strength.",
//       time: "1:00 PM - 5:00 PM",
//       participants: 40,
//       prize: "₹8,000",
//     },
//     13: {
//       slug: "box-cricket-both",
//       id: 13,
//       name: "Box Cricket (Both)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Fast-paced, high-scoring cricket played in an enclosed area.",
//       time: "9:00 AM - 2:00 PM",
//       participants: 60,
//       prize: "₹7,000",
//     },
//     14: {
//       slug: "football-boys",
//       id: 14,
//       name: "Football (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
//       time: "2:00 PM - 6:00 PM",
//       participants: 64,
//       prize: "₹12,000",
//     },
//     15: {
//       slug: "volleyball-boys",
//       id: 15,
//       name: "Volleyball (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Volleyball Championship. Team coordination and quick reflexes are essential for victory.",
//       time: "3:00 PM - 7:00 PM",
//       participants: 40,
//       prize: "₹6,000",
//     },
//     16: {
//       slug: "throwball-girls",
//       id: 16,
//       name: "Throwball (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "A popular team sport, focusing on throwing and catching the ball over a net.",
//       time: "3:00 PM - 6:00 PM",
//       participants: 24,
//       prize: "₹5,000",
//     },
//     17: {
//       slug: "kho-kho-girls",
//       id: 17,
//       name: "Kho-kho (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "One of the oldest tag games, demanding speed, stamina, and strategic chasing.",
//       time: "11:00 AM - 2:00 PM",
//       participants: 30,
//       prize: "₹6,000",
//     },
// };

// const EventDetailsPage = () => {
//   const params = useParams();
//   const eventId = parseInt(params.id);
//   const event = allEvents[eventId];

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [liveParticipantCount, setLiveParticipantCount] = useState(event ? event.participants : 0);
//   const { user, isAuthenticated, loading: authLoading } = useAuth();
//   const [isRegistered, setIsRegistered] = useState(false)
//   const [showCreateTeam, setShowCreateTeam] = useState(false)
//   const [showJoinTeam, setShowJoinTeam] = useState(false)
//   const [userTeam, setUserTeam] = useState(null)

//  useEffect(() => {
//     const fetchLiveStats = async () => {
//       if (!event) return;
//       try {
//         const response = await api.get("api/sports/");
//         const matchingSport = response.data.find(
//           (sport) => sport.name.trim() === event.name.trim()
//         );
//         if (matchingSport) {
//           console.log("Found matching sport:", matchingSport.name, "Count:", matchingSport.participants_count);
//           setLiveParticipantCount(matchingSport.participants_count);
//         } else {
//           console.warn("Could not find a sport in DB with name:", event.name);
//         }
//       } catch (error) {
//         console.error("Could not fetch live stats:", error);
//       }
//     };
//     fetchLiveStats();
//   }, [eventId, event]);

//   useEffect(()=>{
//     let mounted = true
//     async function checkRegistration(){
//       if(!event || !event.slug) return
//       try{
//         const res = await api.get('api/user-registration-info/')
//         const regs = res.data.registrations || []
//         const found = regs.find(r => r.sport && r.sport.slug === event.slug)
//         if(mounted) setIsRegistered(Boolean(found))
//       }catch(err){
//         console.warn('Could not check registration', err)
//       }
//     }
//     checkRegistration()
//     return ()=> mounted=false
//   }, [event])

//   useEffect(()=>{
//     // if registered, check whether user already belongs to a team in this sport
//     let mounted = true
//     async function checkUserTeam(){
//       if(!event || !event.slug) return
//       try{
//         const res = await api.get(`api/sports/${event.slug}/user-team/`)
//         if(mounted) setUserTeam(res.data)
//           console.log(res.data)
//       }catch(err){
//         console.warn('Could not fetch user team status', err)
//       }
//     }
//     if(isRegistered) checkUserTeam()
//     return ()=> mounted=false
//   }, [isRegistered, event])

//   function CreateTeamModal({ open, onClose }){
//     const [name, setName] = useState("")
//     const [branch, setBranch] = useState('COMPS')
//     const [submitting, setSubmitting] = useState(false)
//     if(!open) return null

//     async function submit(e){
//       e.preventDefault()
//       setSubmitting(true)
//       try{
//         if(!event?.slug){ throw new Error('Sport slug missing') }
//         const res = await api.post(`api/sports/${event.slug}/teams/create/`, { name, branch })
//         alert('Team created: ' + res.data.name)
//         onClose()
//       }catch(err){
//         console.error(err)
//         alert(err.response?.data?.error || err.message || 'Failed to create team')
//       }finally{ setSubmitting(false) }
//     }

//     return (
//       <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
//         <form onSubmit={submit} style={{background:'#0f1724',padding:20,borderRadius:8,minWidth:360,color:'#fff'}}>
//           <h3 style={{marginBottom:12}}>Create Team for {event?.name}</h3>
//           <div style={{marginBottom:8}}>
//             <label style={{display:'block',fontSize:12,opacity:0.8}}>Sport (pre-selected)</label>
//             <input value={event?.name || ''} disabled style={{width:'100%',padding:8,background:'#111827',color:'#fff',border:'1px solid #374151',borderRadius:6}} />
//           </div>
//           <div style={{marginBottom:8}}>
//             <label style={{display:'block',fontSize:12,opacity:0.8}}>Team Name</label>
//             <input value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%',padding:8,borderRadius:6}} />
//           </div>
//           <div style={{marginBottom:8}}>
//             <label style={{display:'block',fontSize:12,opacity:0.8}}>Branch</label>
//             <select value={branch} onChange={e=>setBranch(e.target.value)} style={{width:'100%',padding:8,borderRadius:6}}>
//               <option value="COMPS">COMPS</option>
//               <option value="IT">IT</option>
//               <option value="AIML">AIML</option>
//               <option value="DS">DS</option>
//               <option value="MECH">MECH</option>
//               <option value="CIVIL">CIVIL</option>
//             </select>
//           </div>
//           <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
//             <button type="button" onClick={onClose} style={{padding:'8px 12px',borderRadius:6}}>Cancel</button>
//             <button type="submit" disabled={submitting} style={{padding:'8px 12px',borderRadius:6,background:'#7c3aed',color:'#fff'}}>{submitting? 'Creating...':'Create Team'}</button>
//           </div>
//         </form>
//       </div>
//     )
//   }

//   function JoinTeamModal({ open, onClose }){
//     const [teamId, setTeamId] = useState("")
//     const [submitting, setSubmitting] = useState(false)
//     if(!open) return null
//     async function submit(e){
//       e.preventDefault()
//       setSubmitting(true)
//       try{
//         const res = await api.post(`api/teams/${teamId}/join/`)
//         alert('Request sent')
//         onClose()
//       }catch(err){
//         console.error(err)
//         alert(err.response?.data?.error || 'Failed to send join request')
//       }finally{ setSubmitting(false) }
//     }
//     return (
//       <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
//         <form onSubmit={submit} style={{background:'#0f1724',padding:20,borderRadius:8,minWidth:320,color:'#fff'}}>
//           <h3 style={{marginBottom:12}}>Join Team</h3>
//           <div style={{marginBottom:8}}>
//             <label style={{display:'block',fontSize:12,opacity:0.8}}>Team ID</label>
//             <input value={teamId} onChange={e=>setTeamId(e.target.value)} required style={{width:'100%',padding:8,borderRadius:6}} />
//           </div>
//           <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
//             <button type="button" onClick={onClose} style={{padding:'8px 12px',borderRadius:6}}>Cancel</button>
//             <button type="submit" disabled={submitting} style={{padding:'8px 12px',borderRadius:6,background:'#059669',color:'#fff'}}>{submitting? 'Sending...':'Send Request'}</button>
//           </div>
//         </form>
//       </div>
//     )
//   }

//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center pt-20">
//         <div className="text-purple-400 text-lg">Loading...</div>
//       </div>
//     );
//   }

//   if (!event) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center pt-20">
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
//           <p className="text-gray-400 mb-8">
//             The event you're looking for doesn't exist.
//           </p>
//           <Link
//             href="/sports"
//             className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             Back to Sports
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const isIndoor = event.type === "indoor";
//   const gradientColors = isIndoor
//     ? "from-red-500 to-orange-500"
//     : "from-green-500 to-blue-500";
//   const backLink = isIndoor ? "/sports/indoor" : "/sports/outdoor";

//   const handleRegister = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       if (!isAuthenticated) {
//         setMessage("⚠️ Please log in to register for this event.");
//         setLoading(false);
//         return;
//       }

//       const response = await api.post(
//         "api/registrations/",
//         { sport_slug: event.slug }
//       );

//       if (response.status === 201) {
//         setMessage("✅ Successfully registered for the event!");
//         setLiveParticipantCount(prev => prev + 1);
//       }
//     } catch (error) {
//       if (error.response?.status === 400) {
//         setMessage("⚠️ You may already be registered or input is invalid.");
//       } else {
//         setMessage("❌ Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-20">
//       <div className="container mx-auto px-4 py-12">
//         {/* Back Button */}
//         <Link
//           href={backLink}
//           className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             />
//           </svg>
//           Back to {isIndoor ? "Indoor" : "Outdoor"} Events
//         </Link>

//         <div className="flex items-center pt-15 justify-center">
//           <div className="bg-gray-800 rounded-2xl border border-gray-700 h-full w-full overflow-hidden">
//             {/* Banner */}
//             <div className={`h-64 bg-gradient-to-r ${gradientColors} relative`}>
//               <div className="absolute inset-0 flex items-center justify-center text-white/20 text-2xl font-bold">
//                 {event.name}
//               </div>
//               <div className="absolute top-4 right-4">
//                 <span
//                   className={`${
//                     isIndoor ? "bg-red-500" : "bg-green-500"
//                   } text-white px-4 py-2 rounded-full text-sm font-semibold`}
//                 >
//                   {isIndoor ? "Indoor" : "Outdoor"}
//                 </span>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-8">
//               <h1 className="text-4xl font-bold text-white mb-6">{event.name}</h1>

//               <div className="grid grid-cols-3 gap-4 mb-8">
//                 <div className="bg-gray-700/50 rounded-xl p-4 text-center">
//                   <div className="text-gray-400 text-sm mb-1">Time</div>
//                   <div className="text-white font-semibold">{event.time}</div>
//                 </div>
//                 <div className="bg-gray-700/50 rounded-xl p-4 text-center">
//                   <div className="text-gray-400 text-sm mb-1">Participants</div>
//                   <div className="text-white font-semibold">  {liveParticipantCount}</div>
//                 </div>
//                 <div className="bg-gray-700/50 rounded-xl p-4 text-center">
//                   <div className="text-gray-400 text-sm mb-1">Prize</div>
//                   <div className="text-yellow-400 font-semibold">{event.prize}</div>
//                 </div>
//               </div>

//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-white mb-3">About This Event</h2>
//                 <p className="text-gray-300 text-lg leading-relaxed">
//                   {event.description}
//                 </p>
//               </div>

//               {/* Register Button */}
//               {!isRegistered ? (
//                 <button
//                   onClick={handleRegister}
//                   disabled={loading || !isAuthenticated}
//                   className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
//                     !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {loading
//                     ? "Registering..."
//                     : isAuthenticated
//                     ? "Register for Event"
//                     : "Log in to Register"}
//                 </button>
//               ) : (
//                 // If user is already member of a team in this sport, show button linking to that team
//                 userTeam && userTeam.in_team ? (
//                   <Link href={`/sports/teams/${userTeam.team.id}`} className="w-full inline-block text-center bg-indigo-600 py-3 rounded-md">{userTeam.team.name}</Link>
//                 ) : (
//                   <div style={{display:'flex',gap:8}}>
//                     <button onClick={()=>setShowCreateTeam(true)} className="w-1/2 bg-blue-600 py-3 rounded-md">Create Team</button>
//                     <button onClick={()=>setShowJoinTeam(true)} className="w-1/2 bg-emerald-600 py-3 rounded-md">Join Team</button>
//                   </div>
//                 )
//               )}

//               {/* Status message */}
//               {message && (
//                 <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
//               )}
//               <CreateTeamModal open={showCreateTeam} onClose={()=>setShowCreateTeam(false)} />
//               <JoinTeamModal open={showJoinTeam} onClose={()=>setShowJoinTeam(false)} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default EventDetailsPage;

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";

// Complete event data matching IDs from both indoor and outdoor
// const allEvents = {
//     // Indoor Events (IDs 1-5)
//     1: {
//       slug: "badminton-singles-m-f",
//       id: 1,
//       name: "Badminton (Singles) (Male & Female)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
//       time: "3:00 PM - 6:00 PM",
//       participants: 32,
//       venue: "Indoor Sports Complex",
//       coordinator: {
//         name: "Rahul Sharma",
//         contact: "+91 98765 43210"
//       }
//     },
//     2: {
//       slug: "chess-boys-girls",
//       id: 2,
//       name: "Chess (Boys & Girls)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
//       time: "2:00 PM - 5:00 PM",
//       participants: 40,
//       venue: "Conference Hall A",
//       coordinator: {
//         name: "Priya Patel",
//         contact: "+91 98765 43211"
//       }
//     },
//     3: {
//       slug: "badminton-doubles",
//       id: 3,
//       name: "Badminton (Doubles)",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
//       time: "4:00 PM - 7:00 PM",
//       participants: 16,
//       venue: "Indoor Sports Complex",
//       coordinator: {
//         name: "Rahul Sharma",
//         contact: "+91 98765 43210"
//       }
//     },
//     4: {
//       slug: "carrom",
//       id: 4,
//       name: "Carrom",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Singles and Doubles Carrom Tournament. A game of skill, strategy, and precision.",
//       time: "1:00 PM - 5:00 PM",
//       participants: 40,
//       venue: "Student Lounge",
//       coordinator: {
//         name: "Ankit Verma",
//         contact: "+91 98765 43212"
//       }
//     },
//     5: {
//       slug: "table-tennis",
//       id: 5,
//       name: "Table Tennis",
//       type: "indoor",
//       banner: "/api/placeholder/600/300",
//       description: "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
//       time: "11:00 AM - 4:00 PM",
//       participants: 24,
//       venue: "Indoor Sports Complex",
//       coordinator: {
//         name: "Neha Singh",
//         contact: "+91 98765 43213"
//       }
//     },

//     // Outdoor Events (IDs 9-17)
//     9: {
//       slug: "dodgeball-girls",
//       id: 9,
//       name: "Dodgeball (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "High-energy team competition. Last player standing wins!",
//       time: "10:00 AM - 1:00 PM",
//       participants: 30,
//       venue: "Basketball Court",
//       coordinator: {
//         name: "Sneha Reddy",
//         contact: "+91 98765 43214"
//       }
//     },
//     10: {
//       slug: "overarm-cricket-boys",
//       id: 10,
//       name: "Overarm Cricket (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "T20 Overarm Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
//       time: "8:00 AM - 1:00 PM",
//       participants: 80,
//       venue: "Main Cricket Ground",
//       coordinator: {
//         name: "Vikram Malhotra",
//         contact: "+91 98765 43215"
//       }
//     },
//     11: {
//       slug: "tug-of-war-boys",
//       id: 11,
//       name: "Tug of War (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Test of strength and teamwork. Pull your way to victory.",
//       time: "12:00 PM - 3:00 PM",
//       participants: 20,
//       venue: "Central Arena",
//       coordinator: {
//         name: "Arjun Kumar",
//         contact: "+91 98765 43216"
//       }
//     },
//     12: {
//       slug: "kabaddi-boys-girls",
//       id: 12,
//       name: "Kabaddi (Boys & Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Traditional Indian contact sport emphasizing agility, breath control, and strength.",
//       time: "1:00 PM - 5:00 PM",
//       participants: 40,
//       venue: "Kabaddi Court",
//       coordinator: {
//         name: "Rajeshwari Iyer",
//         contact: "+91 98765 43217"
//       }
//     },
//     13: {
//       slug: "box-cricket-both",
//       id: 13,
//       name: "Box Cricket (Both)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Fast-paced, high-scoring cricket played in an enclosed area.",
//       time: "9:00 AM - 2:00 PM",
//       participants: 60,
//       venue: "Box Cricket Arena",
//       coordinator: {
//         name: "Sanjay Mehta",
//         contact: "+91 98765 43218"
//       }
//     },
//     14: {
//       slug: "football-boys",
//       id: 14,
//       name: "Football (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
//       time: "2:00 PM - 6:00 PM",
//       participants: 64,
//       venue: "Football Ground",
//       coordinator: {
//         name: "Karan Joshi",
//         contact: "+91 98765 43219"
//       }
//     },
//     15: {
//       slug: "volleyball-boys",
//       id: 15,
//       name: "Volleyball (Boys)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "Volleyball Championship. Team coordination and quick reflexes are essential for victory.",
//       time: "3:00 PM - 7:00 PM",
//       participants: 40,
//       venue: "Volleyball Court",
//       coordinator: {
//         name: "Amit Chauhan",
//         contact: "+91 98765 43220"
//       }
//     },
//     16: {
//       slug: "throwball-girls",
//       id: 16,
//       name: "Throwball (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "A popular team sport, focusing on throwing and catching the ball over a net.",
//       time: "3:00 PM - 6:00 PM",
//       participants: 24,
//       venue: "Throwball Court",
//       coordinator: {
//         name: "Pooja Nair",
//         contact: "+91 98765 43221"
//       }
//     },
//     17: {
//       slug: "kho-kho-girls",
//       id: 17,
//       name: "Kho-kho (Girls)",
//       type: "outdoor",
//       banner: "/api/placeholder/600/300",
//       description: "One of the oldest tag games, demanding speed, stamina, and strategic chasing.",
//       time: "11:00 AM - 2:00 PM",
//       participants: 30,
//       venue: "Kho-kho Ground",
//       coordinator: {
//         name: "Divya Sharma",
//         contact: "+91 98765 43222"
//       }
//     },
// };

const allEvents = {
  // Indoor Events (IDs 1-5)
  1: {
    slug: "badminton-singles-m-f",
    id: 1,
    name: "Badminton (Singles) (Male & Female)",
    type: "indoor",
    banner: "https://4kwallpapers.com/images/walls/thumbs/17420.jpg",
    description:
      "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
    time: "3:00 PM - 6:00 PM",
    participants: 32,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Rahul Sharma",
      contact: "+91 98765 43210",
    },
  },
  2: {
    slug: "chess-boys-girls",
    id: 2,
    name: "Chess (Boys & Girls)",
    type: "indoor",
    banner: "https://4kwallpapers.com/images/walls/thumbs/16674.jpg",
    description:
      "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
    time: "2:00 PM - 5:00 PM",
    participants: 40,
    venue: "Conference Hall A",
    coordinator: {
      name: "Priya Patel",
      contact: "+91 98765 43211",
    },
  },
  3: {
    slug: "badminton-doubles",
    id: 3,
    name: "Badminton (Doubles)",
    type: "indoor",
    banner: "https://4kwallpapers.com/images/walls/thumbs/17420.jpg",
    description:
      "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
    time: "4:00 PM - 7:00 PM",
    participants: 16,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Rahul Sharma",
      contact: "+91 98765 43210",
    },
  },
  4: {
    slug: "carrom",
    id: 4,
    name: "Carrom",
    type: "indoor",
    banner: "https://www.parascarrom.com/images/banner3.png",
    description:
      "Singles and Doubles Carrom Tournament. A game of skill, strategy, and precision.",
    time: "1:00 PM - 5:00 PM",
    participants: 40,
    venue: "Student Lounge",
    coordinator: {
      name: "Ankit Verma",
      contact: "+91 98765 43212",
    },
  },
  5: {
    slug: "table-tennis",
    id: 5,
    name: "Table Tennis",
    type: "indoor",
    banner:
      "https://www.shutterstock.com/image-photo/hand-ping-pong-racket-hitting-260nw-1963053211.jpg",
    description:
      "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
    time: "11:00 AM - 4:00 PM",
    participants: 24,
    venue: "Indoor Sports Complex",
    coordinator: {
      name: "Neha Singh",
      contact: "+91 98765 43213",
    },
  }, // Outdoor Events (IDs 9-17)

  9: {
    slug: "dodgeball-girls",
    id: 9,
    name: "Dodgeball (Girls)",
    type: "outdoor",
    banner:
      "https://www.shutterstock.com/image-vector/colorful-vector-editable-dodgeball-player-600nw-2641795521.jpg",
    description: "High-energy team competition. Last player standing wins!",
    time: "10:00 AM - 1:00 PM",
    participants: 30,
    venue: "Basketball Court",
    coordinator: {
      name: "Sneha Reddy",
      contact: "+91 98765 43214",
    },
  },
  10: {
    slug: "overarm-cricket-boys",
    id: 10,
    name: "Overarm Cricket (Boys)",
    type: "outdoor",
    banner:
      "https://thumbs.dreamstime.com/b/dynamic-cricket-banner-bold-colors-action-graphics-high-energy-design-featuring-vivid-abstract-shapes-silhouettes-385109310.jpg",
    description:
      "T20 Overarm Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
    time: "8:00 AM - 1:00 PM",
    participants: 80,
    venue: "Main Cricket Ground",
    coordinator: {
      name: "Vikram Malhotra",
      contact: "+91 98765 43215",
    },
  },
  11: {
    slug: "tug-of-war-boys",
    id: 11,
    type: "outdoor",
    name: "Tug of War (Boys)",
    banner:
      "https://ichef.bbci.co.uk/news/480/cpsprodpb/61bf/live/ae15cb30-6170-11ef-9ad8-5bacd187043d.jpg.webp",
    description: "Test of strength and teamwork. Pull your way to victory.",
    time: "12:00 PM - 3:00 PM",
    participants: 20,
    venue: "Central Arena",
    coordinator: {
      name: "Arjun Kumar",
      contact: "+91 98765 43216",
    },
  },
  12: {
    slug: "kabaddi-boys-girls",
    id: 12,
    name: "Kabaddi (Boys & Girls)",
    type: "outdoor",
    banner:
      "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_xl_2x/f_auto/primary/q9tfseaumm3llmkwvp63",
    description:
      "Traditional Indian contact sport emphasizing agility, breath control, and strength.",
    time: "1:00 PM - 5:00 PM",
    participants: 40,
    venue: "Kabaddi Court",
    coordinator: {
      name: "Rajeshwari Iyer",
      contact: "+91 98765 43217",
    },
  },
  13: {
    slug: "box-cricket-both",
    id: 13,
    name: "Box Cricket (Both)",
    type: "outdoor",
    banner:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMq6U5EUHZr6Dy_4nmpIWBknpRzvf42EslWw&s",
    description: "Fast-paced, high-scoring cricket played in an enclosed area.",
    time: "9:00 AM - 2:00 PM",
    participants: 60,
    venue: "Box Cricket Arena",
    coordinator: {
      name: "Sanjay Mehta",
      contact: "+91 98765 43218",
    },
  },
  14: {
    slug: "football-boys",
    id: 14,
    name: "Football (Boys)",
    type: "outdoor",
    banner:
      "https://www.shutterstock.com/shutterstock/videos/3515852867/thumb/1.jpg?ip=x480",
    description:
      "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
    time: "2:00 PM - 6:00 PM",
    participants: 64,
    venue: "Football Ground",
    coordinator: {
      name: "Karan Joshi",
      contact: "+91 98765 43219",
    },
  },
  15: {
    slug: "volleyball-boys",
    id: 15,
    name: "Volleyball (Boys)",
    type: "outdoor",
    banner:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Brasil_vence_a_Fran%C3%A7a_no_v%C3%B4lei_masculino_1037987-15.08.2016_ffz-6369.jpg/1200px-Brasil_vence_a_Fran%C3%A7a_no_v%C3%B4lei_masculino_1037987-15.08.2016_ffz-6369.jpg",
    description:
      "Volleyball Championship. Team coordination and quick reflexes are essential for victory.",
    time: "3:00 PM - 7:00 PM",
    participants: 40,
    venue: "Volleyball Court",
    coordinator: {
      name: "Amit Chauhan",
      contact: "+91 98765 43220",
    },
  },
  16: {
    slug: "throwball-girls",
    id: 16,
    name: "Throwball (Girls)",
    type: "outdoor",
    banner:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy2gHzXqwJuTxD7EOaBHFNDzl4q8SMMd5Vsw&s",
    description:
      "A popular team sport, focusing on throwing and catching the ball over a net.",
    time: "3:00 PM - 6:00 PM",
    participants: 24,
    venue: "Throwball Court",
    coordinator: {
      name: "Pooja Nair",
      contact: "+91 98765 43221",
    },
  },
  17: {
    slug: "kho-kho-girls",
    id: 17,
    name: "Kho-kho (Girls)",
    type: "outdoor",
    banner:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqxLHlqSxcyUoucBf9J8E5Wj_WMVUPCeGcNA&s",
    description:
      "One of the oldest tag games, demanding speed, stamina, and strategic chasing.",
    time: "11:00 AM - 2:00 PM",
    participants: 30,
    venue: "Kho-kho Ground",
    coordinator: {
      name: "Divya Sharma",
      contact: "+91 98765 43222",
    },
  },
};

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = allEvents[eventId];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [liveParticipantCount, setLiveParticipantCount] = useState(
    event ? event.participants : 0
  );
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [userTeam, setUserTeam] = useState(null);

  useEffect(() => {
    const fetchLiveStats = async () => {
      if (!event) return;
      try {
        const response = await api.get("api/sports/");
        const matchingSport = response.data.find(
          (sport) => sport.name.trim() === event.name.trim()
        );
        if (matchingSport) {
          console.log(
            "Found matching sport:",
            matchingSport.name,
            "Count:",
            matchingSport.participants_count
          );
          setLiveParticipantCount(matchingSport.participants_count);
        } else {
          console.warn("Could not find a sport in DB with name:", event.name);
        }
      } catch (error) {
        console.error("Could not fetch live stats:", error);
      }
    };
    fetchLiveStats();
  }, [eventId, event]);

  useEffect(() => {
    let mounted = true;
    async function checkRegistration() {
      if (!event || !event.slug) return;
      try {
        const res = await api.get("api/user-registration-info/");
        const regs = res.data.registrations || [];
        const found = regs.find((r) => r.sport && r.sport.slug === event.slug);
        if (mounted) setIsRegistered(Boolean(found));
      } catch (err) {
        console.warn("Could not check registration", err);
      }
    }
    checkRegistration();
    return () => (mounted = false);
  }, [event]);

  useEffect(() => {
    // if registered, check whether user already belongs to a team in this sport
    let mounted = true;
    async function checkUserTeam() {
      if (!event || !event.slug) return;
      try {
        const res = await api.get(`api/sports/${event.slug}/user-team/`);
        if (mounted) setUserTeam(res.data);
        console.log(res.data);
      } catch (err) {
        console.warn("Could not fetch user team status", err);
      }
    }
    if (isRegistered) checkUserTeam();
    return () => (mounted = false);
  }, [isRegistered, event]);

  function CreateTeamModal({ open, onClose }) {
    const [name, setName] = useState("");
    const [branch, setBranch] = useState("COMPS");
    const [submitting, setSubmitting] = useState(false);
    if (!open) return null;

    async function submit(e) {
      e.preventDefault();
      setSubmitting(true);
      try {
        if (!event?.slug) {
          throw new Error("Sport slug missing");
        }
        const res = await api.post(`api/sports/${event.slug}/teams/create/`, {
          name,
          branch,
        });
        alert("Team created: " + res.data.name);
        onClose();
      } catch (err) {
        console.error(err);
        alert(
          err.response?.data?.error || err.message || "Failed to create team"
        );
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={submit}
          style={{
            background: "#0f1724",
            padding: 20,
            borderRadius: 8,
            minWidth: 360,
            color: "#fff",
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Create Team for {event?.name}</h3>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>
              Sport (pre-selected)
            </label>
            <input
              value={event?.name || ""}
              disabled
              style={{
                width: "100%",
                padding: 8,
                background: "#111827",
                color: "#fff",
                border: "1px solid #374151",
                borderRadius: 6,
              }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>
              Team Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: 8, borderRadius: 6 }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>
              Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              style={{ width: "100%", padding: 8, borderRadius: 6 }}
            >
              <option value="COMPS">COMPS</option>
              <option value="IT">IT</option>
              <option value="AIML">AIML</option>
              <option value="DS">DS</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 12px", borderRadius: 6 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                background: "#7c3aed",
                color: "#fff",
              }}
            >
              {submitting ? "Creating..." : "Create Team"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  function JoinTeamModal({ open, onClose }) {
    const [teamId, setTeamId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    if (!open) return null;
    async function submit(e) {
      e.preventDefault();
      setSubmitting(true);
      try {
        const res = await api.post(`api/teams/${teamId}/join/`);
        alert("Request sent");
        onClose();
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.error || "Failed to send join request");
      } finally {
        setSubmitting(false);
      }
    }
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={submit}
          style={{
            background: "#0f1724",
            padding: 20,
            borderRadius: 8,
            minWidth: 320,
            color: "#fff",
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Join Team</h3>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.8 }}>
              Team ID
            </label>
            <input
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
              style={{ width: "100%", padding: 8, borderRadius: 6 }}
            />
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: "8px 12px", borderRadius: 6 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                background: "#059669",
                color: "#fff",
              }}
            >
              {submitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center pt-20">
        <div className="text-purple-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">
            The event you're looking for doesn't exist.
          </p>
          <Link
            href="/sports"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Sports
          </Link>
        </div>
      </div>
    );
  }

  const isIndoor = event.type === "indoor";
  const gradientColors = isIndoor
    ? "from-red-500 to-orange-500"
    : "from-green-500 to-blue-500";
  const backLink = isIndoor ? "/sports/indoor" : "/sports/outdoor";

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");

    try {
      if (!isAuthenticated) {
        setMessage("⚠️ Please log in to register for this event.");
        setLoading(false);
        return;
      }

      const response = await api.post("api/registrations/", {
        sport_slug: event.slug,
      });

      if (response.status === 201) {
        setMessage("✅ Successfully registered for the event!");
        setLiveParticipantCount((prev) => prev + 1);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage("⚠️ You may already be registered or input is invalid.");
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to {isIndoor ? "Indoor" : "Outdoor"} Events
        </Link>

        <div className="flex items-center pt-15 justify-center">
          <div className="bg-gray-800 rounded-2xl border border-gray-700 h-full w-full overflow-hidden">
            {/* Banner */}
            <div className={`h-64 bg-gradient-to-r ${gradientColors} relative`}>
              <div className="absolute inset-0 flex items-center justify-center text-white/20 text-2xl font-bold">
                {event.name}
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`${
                    isIndoor ? "bg-red-500" : "bg-green-500"
                  } text-white px-4 py-2 rounded-full text-sm font-semibold`}
                >
                  {isIndoor ? "Indoor" : "Outdoor"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-6">
                {event.name}
              </h1>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Time</div>
                  <div className="text-white font-semibold">{event.time}</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Participants</div>
                  <div className="text-white font-semibold">
                    {liveParticipantCount}
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Venue</div>
                  <div className="text-white font-semibold">{event.venue}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">
                  About This Event
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event Coordinator Section */}
              <div className="bg-gray-700/30 rounded-xl p-6 mb-8 border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Event Coordinator
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-300 text-lg font-semibold">
                      {event.coordinator.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {event.coordinator.contact}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      Call
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  disabled={loading || !isAuthenticated}
                  className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                    !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading
                    ? "Registering..."
                    : isAuthenticated
                    ? "Register for Event"
                    : "Log in to Register"}
                </button>
              ) : // If user is already member of a team in this sport, show button linking to that team
              userTeam && userTeam.in_team ? (
                <Link
                  href={`/sports/teams/${userTeam.team.id}`}
                  className="w-full inline-block text-center bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  View Your Team: {userTeam.team.name}
                </Link>
              ) : (
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCreateTeam(true)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Create Team
                  </button>
                  <button
                    onClick={() => setShowJoinTeam(true)}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Join Team
                  </button>
                </div>
              )}

              {/* Status message */}
              {message && (
                <p className="text-center mt-4 text-sm text-gray-300">
                  {message}
                </p>
              )}
              <CreateTeamModal
                open={showCreateTeam}
                onClose={() => setShowCreateTeam(false)}
              />
              <JoinTeamModal
                open={showJoinTeam}
                onClose={() => setShowJoinTeam(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
