"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';
import React,{ useState, useEffect } from 'react';
import api from "@/api/api";
import { useAuth } from "@/context/AuthContext";
// Complete event data matching IDs from both indoor and outdoor
const allEvents = {
  // Indoor Events (IDs 1-8)
  1: {
    slug: "valorant-tournament",
    id: 1,
    name: "Valorant Tournament",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "5v5 Competitive Tournament. Show off your tactical skills and team coordination in this intense gaming competition.",
    time: "10:00 AM - 2:00 PM",
    participants: 50,
    prize: "₹10,000",
  },
  2: {
    slug: "badminton-singles",
    id: 2,
    name: "Badminton Singles",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
    time: "3:00 PM - 6:00 PM",
    participants: 32,
    prize: "₹5,000",
  },
  3: {
    slug: "table-tennis-championship",
    id: 3,
    name: "Table Tennis Championship",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
    time: "11:00 AM - 4:00 PM",
    participants: 24,
    prize: "₹3,000",
  },
  4: {
    slug: "chess-masters",
    id: 4,
    name: "Chess Masters",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
    time: "2:00 PM - 5:00 PM",
    participants: 40,
    prize: "₹2,000",
  },
  5: {
    id: 5,
    name: "CS:GO Showdown",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Team Deathmatch Tournament. Experience the intensity of competitive CS:GO gameplay.",
    time: "11:00 AM - 3:00 PM",
    participants: 40,
    prize: "₹8,000",
  },
  6: {
    id: 6,
    name: "Badminton Doubles",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
    time: "4:00 PM - 7:00 PM",
    participants: 16,
    prize: "₹6,000",
  },
  7: {
    id: 7,
    name: "FIFA 24 Championship",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "1v1 FIFA Tournament. Showcase your football gaming skills and claim the championship title.",
    time: "12:00 PM - 5:00 PM",
    participants: 64,
    prize: "₹7,000",
  },
  8: {
    id: 8,
    name: "Table Tennis Doubles",
    type: "indoor",
    banner: "/api/placeholder/600/300",
    description: "Double Match Tournament. Team up and dominate the table with perfect coordination.",
    time: "2:00 PM - 6:00 PM",
    participants: 20,
    prize: "₹4,000",
  },

  // Outdoor Events (IDs 9-20)
  9: {
    id: 9,
    name: "Cricket Tournament",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "T20 Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
    time: "8:00 AM - 1:00 PM",
    participants: 80,
    prize: "₹15,000",
  },
  10: {
    id: 10,
    name: "Football League",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
    time: "2:00 PM - 6:00 PM",
    participants: 64,
    prize: "₹12,000",
  },
  11: {
    id: 11,
    name: "Basketball Showdown",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "3v3 Street Basketball. Showcase your streetball skills and team chemistry in fast-paced matches.",
    time: "10:00 AM - 4:00 PM",
    participants: 32,
    prize: "₹8,000",
  },
  12: {
    id: 12,
    name: "Volleyball Championship",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "Beach Volleyball Tournament. Team coordination and quick reflexes are essential for victory.",
    time: "3:00 PM - 7:00 PM",
    participants: 40,
    prize: "₹6,000",
  },
  13: {
    id: 13,
    name: "Cricket Finals",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "Grand Finals - T20 Cricket. The ultimate showdown between the best cricket teams.",
    time: "9:00 AM - 2:00 PM",
    participants: 2,
    prize: "₹25,000",
  },
  14: {
    id: 14,
    name: "Football Knockouts",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "Quarter & Semi Finals. Intense knockout matches that will determine the finalists.",
    time: "3:00 PM - 7:00 PM",
    participants: 16,
    prize: "₹15,000",
  },
  15: {
    id: 15,
    name: "Athletics Meet",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "100m, 200m, Long Jump Events. Test your speed, strength, and jumping abilities.",
    time: "8:00 AM - 12:00 PM",
    participants: 50,
    prize: "₹5,000",
  },
  16: {
    id: 16,
    name: "Football Grand Finale",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "Championship Match. The ultimate football showdown for the championship title.",
    time: "4:00 PM - 7:00 PM",
    participants: 2,
    prize: "₹20,000",
  },
  17: {
    id: 17,
    name: "Basketball Finals",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "3v3 Championship Finals. The final battle for basketball supremacy.",
    time: "2:00 PM - 5:00 PM",
    participants: 4,
    prize: "₹10,000",
  },
  18: {
    id: 18,
    name: "Relay Races",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "4x100m Relay Competition. Teamwork and speed combine in this thrilling race.",
    time: "10:00 AM - 1:00 PM",
    participants: 48,
    prize: "₹7,000",
  },
  19: {
    id: 19,
    name: "All-Star Match",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "Celebrity vs Champions Match. A fun exhibition match featuring special guests.",
    time: "3:00 PM - 6:00 PM",
    participants: 22,
    prize: "Trophy + Medals",
  },
  20: {
    id: 20,
    name: "Marathon",
    type: "outdoor",
    banner: "/api/placeholder/600/300",
    description: "5km Fun Run & Competition. Challenge your endurance in this community event.",
    time: "6:00 AM - 9:00 AM",
    participants: 100,
    prize: "Medals & Certificates",
  },
};

const EventDetailsPage = () => {
  const params = useParams();
  const eventId = parseInt(params.id);
  const event = allEvents[eventId];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [liveParticipantCount, setLiveParticipantCount] = useState(event ? event.participants : 0);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false)
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [showJoinTeam, setShowJoinTeam] = useState(false)
  const [userTeam, setUserTeam] = useState(null)

 useEffect(() => {
    const fetchLiveStats = async () => {
      if (!event) return;
      try {
        const response = await api.get("api/sports/");
        const matchingSport = response.data.find(
          (sport) => sport.name.trim() === event.name.trim()
        );
        if (matchingSport) {
          console.log("Found matching sport:", matchingSport.name, "Count:", matchingSport.participants_count);
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

  useEffect(()=>{
    let mounted = true
    async function checkRegistration(){
      if(!event || !event.slug) return
      try{
        const res = await api.get('api/user-registration-info/')
        const regs = res.data.registrations || []
        const found = regs.find(r => r.sport && r.sport.slug === event.slug)
        if(mounted) setIsRegistered(Boolean(found))
      }catch(err){
        console.warn('Could not check registration', err)
      }
    }
    checkRegistration()
    return ()=> mounted=false
  }, [event])
  
  useEffect(()=>{
    // if registered, check whether user already belongs to a team in this sport
    let mounted = true
    async function checkUserTeam(){
      if(!event || !event.slug) return
      try{
        const res = await api.get(`api/sports/${event.slug}/user-team/`)
        if(mounted) setUserTeam(res.data)
          console.log(res.data)
      }catch(err){
        console.warn('Could not fetch user team status', err)
      }
    }
    if(isRegistered) checkUserTeam()
    return ()=> mounted=false
  }, [isRegistered, event])

  function CreateTeamModal({ open, onClose }){
    const [name, setName] = useState("")
    const [branch, setBranch] = useState('COMPS')
    const [submitting, setSubmitting] = useState(false)
    if(!open) return null

    async function submit(e){
      e.preventDefault()
      setSubmitting(true)
      try{
        if(!event?.slug){ throw new Error('Sport slug missing') }
        const res = await api.post(`api/sports/${event.slug}/teams/create/`, { name, branch })
        alert('Team created: ' + res.data.name)
        onClose()
      }catch(err){
        console.error(err)
        alert(err.response?.data?.error || err.message || 'Failed to create team')
      }finally{ setSubmitting(false) }
    }

    return (
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <form onSubmit={submit} style={{background:'#0f1724',padding:20,borderRadius:8,minWidth:360,color:'#fff'}}>
          <h3 style={{marginBottom:12}}>Create Team for {event?.name}</h3>
          <div style={{marginBottom:8}}>
            <label style={{display:'block',fontSize:12,opacity:0.8}}>Sport (pre-selected)</label>
            <input value={event?.name || ''} disabled style={{width:'100%',padding:8,background:'#111827',color:'#fff',border:'1px solid #374151',borderRadius:6}} />
          </div>
          <div style={{marginBottom:8}}>
            <label style={{display:'block',fontSize:12,opacity:0.8}}>Team Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%',padding:8,borderRadius:6}} />
          </div>
          <div style={{marginBottom:8}}>
            <label style={{display:'block',fontSize:12,opacity:0.8}}>Branch</label>
            <select value={branch} onChange={e=>setBranch(e.target.value)} style={{width:'100%',padding:8,borderRadius:6}}>
              <option value="COMPS">COMPS</option>
              <option value="IT">IT</option>
              <option value="AIML">AIML</option>
              <option value="DS">DS</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button type="button" onClick={onClose} style={{padding:'8px 12px',borderRadius:6}}>Cancel</button>
            <button type="submit" disabled={submitting} style={{padding:'8px 12px',borderRadius:6,background:'#7c3aed',color:'#fff'}}>{submitting? 'Creating...':'Create Team'}</button>
          </div>
        </form>
      </div>
    )
  }

  function JoinTeamModal({ open, onClose }){
    const [teamId, setTeamId] = useState("")
    const [submitting, setSubmitting] = useState(false)
    if(!open) return null
    async function submit(e){
      e.preventDefault()
      setSubmitting(true)
      try{
        const res = await api.post(`api/teams/${teamId}/join/`)
        alert('Request sent')
        onClose()
      }catch(err){
        console.error(err)
        alert(err.response?.data?.error || 'Failed to send join request')
      }finally{ setSubmitting(false) }
    }
    return (
      <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <form onSubmit={submit} style={{background:'#0f1724',padding:20,borderRadius:8,minWidth:320,color:'#fff'}}>
          <h3 style={{marginBottom:12}}>Join Team</h3>
          <div style={{marginBottom:8}}>
            <label style={{display:'block',fontSize:12,opacity:0.8}}>Team ID</label>
            <input value={teamId} onChange={e=>setTeamId(e.target.value)} required style={{width:'100%',padding:8,borderRadius:6}} />
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button type="button" onClick={onClose} style={{padding:'8px 12px',borderRadius:6}}>Cancel</button>
            <button type="submit" disabled={submitting} style={{padding:'8px 12px',borderRadius:6,background:'#059669',color:'#fff'}}>{submitting? 'Sending...':'Send Request'}</button>
          </div>
        </form>
      </div>
    )
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

      const response = await api.post(
        "api/registrations/",
        { sport_slug: event.slug }
      );

      if (response.status === 201) {
        setMessage("✅ Successfully registered for the event!");
        setLiveParticipantCount(prev => prev + 1);
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
              <h1 className="text-4xl font-bold text-white mb-6">{event.name}</h1>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Time</div>
                  <div className="text-white font-semibold">{event.time}</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Participants</div>
                  <div className="text-white font-semibold">  {liveParticipantCount}</div>
                </div>
                <div className="bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-gray-400 text-sm mb-1">Prize</div>
                  <div className="text-yellow-400 font-semibold">{event.prize}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-3">About This Event</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Register Button */}
              {!isRegistered ? (
                <button
                  onClick={handleRegister}
                  disabled={loading || !isAuthenticated}
                  className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                    !isAuthenticated ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading
                    ? "Registering..."
                    : isAuthenticated
                    ? "Register for Event"
                    : "Log in to Register"}
                </button>
              ) : (
                // If user is already member of a team in this sport, show button linking to that team
                userTeam && userTeam.in_team ? (
                  <Link href={`/sports/teams/${userTeam.team.id}`} className="w-full inline-block text-center bg-indigo-600 py-3 rounded-md">{userTeam.team.name}</Link>
                ) : (
                  <div style={{display:'flex',gap:8}}>
                    <button onClick={()=>setShowCreateTeam(true)} className="w-1/2 bg-blue-600 py-3 rounded-md">Create Team</button>
                    <button onClick={()=>setShowJoinTeam(true)} className="w-1/2 bg-emerald-600 py-3 rounded-md">Join Team</button>
                  </div>
                )
              )}

              {/* Status message */}
              {message && (
                <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
              )}
              <CreateTeamModal open={showCreateTeam} onClose={()=>setShowCreateTeam(false)} />
              <JoinTeamModal open={showJoinTeam} onClose={()=>setShowJoinTeam(false)} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;






// "use client";

// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import React,{ useState, useEffect } from 'react';
// import api from "@/api/api";
// // Complete event data matching IDs from both indoor and outdoor
// const allEvents = {
//   // Indoor Events (IDs 1-8)
//   1: {
//     id: 1,
//     name: "Valorant Tournament",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "5v5 Competitive Tournament. Show off your tactical skills and team coordination in this intense gaming competition.",
//     time: "10:00 AM - 2:00 PM",
//     participants: 50,
//     prize: "₹10,000",
//   },
//   2: {
//     slug: "badminton-singles",
//     id: 2,
//     name: "Badminton Singles",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Single Elimination Tournament. Test your endurance, skill, and strategic gameplay on the court.",
//     time: "3:00 PM - 6:00 PM",
//     participants: 32,
//     prize: "₹5,000",
//   },
//   3: {
//     slug: "table-tennis-championship",
//     id: 3,
//     name: "Table Tennis Championship",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Best of 5 matches. Whether you're a defensive player or aggressive attacker, this is your chance to shine.",
//     time: "11:00 AM - 4:00 PM",
//     participants: 24,
//     prize: "₹3,000",
//   },
//   4: {
//     id: 4,
//     name: "Chess Masters",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Rapid Chess Tournament. Challenge your mind with strategic thinking and pattern recognition.",
//     time: "2:00 PM - 5:00 PM",
//     participants: 40,
//     prize: "₹2,000",
//   },
//   5: {
//     id: 5,
//     name: "CS:GO Showdown",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Team Deathmatch Tournament. Experience the intensity of competitive CS:GO gameplay.",
//     time: "11:00 AM - 3:00 PM",
//     participants: 40,
//     prize: "₹8,000",
//   },
//   6: {
//     id: 6,
//     name: "Badminton Doubles",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Double Elimination Tournament. Perfect your teamwork and coordination with your partner.",
//     time: "4:00 PM - 7:00 PM",
//     participants: 16,
//     prize: "₹6,000",
//   },
//   7: {
//     id: 7,
//     name: "FIFA 24 Championship",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "1v1 FIFA Tournament. Showcase your football gaming skills and claim the championship title.",
//     time: "12:00 PM - 5:00 PM",
//     participants: 64,
//     prize: "₹7,000",
//   },
//   8: {
//     id: 8,
//     name: "Table Tennis Doubles",
//     type: "indoor",
//     banner: "/api/placeholder/600/300",
//     description: "Double Match Tournament. Team up and dominate the table with perfect coordination.",
//     time: "2:00 PM - 6:00 PM",
//     participants: 20,
//     prize: "₹4,000",
//   },

//   // Outdoor Events (IDs 9-20)
//   9: {
//     id: 9,
//     name: "Cricket Tournament",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "T20 Cricket Championship. Perfect your shots and strategize your bowling under the open sky.",
//     time: "8:00 AM - 1:00 PM",
//     participants: 80,
//     prize: "₹15,000",
//   },
//   10: {
//     id: 10,
//     name: "Football League",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "7-a-side Football Tournament. Fast-paced action, teamwork, and skill define this exciting competition.",
//     time: "2:00 PM - 6:00 PM",
//     participants: 64,
//     prize: "₹12,000",
//   },
//   11: {
//     id: 11,
//     name: "Basketball Showdown",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "3v3 Street Basketball. Showcase your streetball skills and team chemistry in fast-paced matches.",
//     time: "10:00 AM - 4:00 PM",
//     participants: 32,
//     prize: "₹8,000",
//   },
//   12: {
//     id: 12,
//     name: "Volleyball Championship",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "Beach Volleyball Tournament. Team coordination and quick reflexes are essential for victory.",
//     time: "3:00 PM - 7:00 PM",
//     participants: 40,
//     prize: "₹6,000",
//   },
//   13: {
//     id: 13,
//     name: "Cricket Finals",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "Grand Finals - T20 Cricket. The ultimate showdown between the best cricket teams.",
//     time: "9:00 AM - 2:00 PM",
//     participants: 2,
//     prize: "₹25,000",
//   },
//   14: {
//     id: 14,
//     name: "Football Knockouts",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "Quarter & Semi Finals. Intense knockout matches that will determine the finalists.",
//     time: "3:00 PM - 7:00 PM",
//     participants: 16,
//     prize: "₹15,000",
//   },
//   15: {
//     id: 15,
//     name: "Athletics Meet",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "100m, 200m, Long Jump Events. Test your speed, strength, and jumping abilities.",
//     time: "8:00 AM - 12:00 PM",
//     participants: 50,
//     prize: "₹5,000",
//   },
//   16: {
//     id: 16,
//     name: "Football Grand Finale",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "Championship Match. The ultimate football showdown for the championship title.",
//     time: "4:00 PM - 7:00 PM",
//     participants: 2,
//     prize: "₹20,000",
//   },
//   17: {
//     id: 17,
//     name: "Basketball Finals",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "3v3 Championship Finals. The final battle for basketball supremacy.",
//     time: "2:00 PM - 5:00 PM",
//     participants: 4,
//     prize: "₹10,000",
//   },
//   18: {
//     id: 18,
//     name: "Relay Races",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "4x100m Relay Competition. Teamwork and speed combine in this thrilling race.",
//     time: "10:00 AM - 1:00 PM",
//     participants: 48,
//     prize: "₹7,000",
//   },
//   19: {
//     id: 19,
//     name: "All-Star Match",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "Celebrity vs Champions Match. A fun exhibition match featuring special guests.",
//     time: "3:00 PM - 6:00 PM",
//     participants: 22,
//     prize: "Trophy + Medals",
//   },
//   20: {
//     id: 20,
//     name: "Marathon",
//     type: "outdoor",
//     banner: "/api/placeholder/600/300",
//     description: "5km Fun Run & Competition. Challenge your endurance in this community event.",
//     time: "6:00 AM - 9:00 AM",
//     participants: 100,
//     prize: "Medals & Certificates",
//   },
// };

// const EventDetailsPage = () => {
//   const params = useParams();
//   const eventId = parseInt(params.id);
//   const event = allEvents[eventId];

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check login status on mount
//   useEffect(() => {
//     const token = localStorage.getItem("access");
//     if (token) setIsLoggedIn(true);
//   }, []);

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
//       const token = localStorage.getItem("access");
//       if (!token) {
//         setMessage("⚠ Please log in to register for this event.");
//         setLoading(false);
//         return;
//       }

//       const response = await api.post(
//         "api/registrations/",
//         { sport_slug: event.slug },
//         { headers: { Authorization: Bearer ${token} } }
//       );

//       if (response.status === 201) {
//         setMessage("✅ Successfully registered for the event!");
//       }
//     } catch (error) {
//       if (error.response?.status === 400) {
//         setMessage("⚠ You may already be registered or input is invalid.");
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
//             <div className={h-64 bg-gradient-to-r ${gradientColors} relative}>
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
//                   <div className="text-white font-semibold">{event.participants}</div>
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
//               <button
//                 onClick={handleRegister}
//                 disabled={loading}
//                 className={`w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
//                   !isLoggedIn ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {loading
//                   ? "Registering..."
//                   : isLoggedIn
//                   ? "Register for Event"
//                   : "Log in to Register"}
//               </button>

//               {/* Status message */}
//               {message && (
//                 <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default EventDetailsPage;