"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // <-- FIXED: Uses proper Next.js hook
import { ArrowUp, ArrowDown, Save, Loader2, GripVertical, Trophy, Medal, Shield, Plus, Minus, CheckCircle, Lock, ChevronRight } from 'lucide-react';
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// --- AUTH CHECK ---
const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const user = JSON.parse(userStr);
                    if (user.is_staff || user.is_superuser) setIsAdmin(true);
                }
            } catch (e) { setIsAdmin(false); }
        }
    }, []);
    return isAdmin;
};

// --- Components ---

const RankIcon = ({ rank }) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300 fill-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600 fill-amber-600" />;
    return <span className="font-mono font-bold text-gray-500 text-lg">#{rank}</span>;
};

function SortableItem({ item, index, handleManualMove, handleAdjustPoints, isFinalized }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 0, position: 'relative' };
  
  // Dept points calculation (Visual preview)
  const deptPoints = index === 0 ? 3 : index === 1 ? 2 : index === 2 ? 1 : 0;
  const dragListeners = isFinalized ? {} : listeners;

  return (
    <div ref={setNodeRef} style={style} className={`group grid grid-cols-12 items-center gap-4 p-4 border-b border-gray-800 transition-colors ${isDragging ? 'shadow-2xl ring-1 ring-blue-500 z-50 bg-gray-800 scale-[1.02]' : isFinalized ? 'bg-gray-900/60' : 'bg-gray-900 hover:bg-gray-800'}`}>
      
      {/* Drag Handle */}
      <div className="col-span-1 flex justify-center cursor-pointer text-gray-600 hover:text-white" {...dragListeners} {...attributes}>
        {isFinalized ? <Lock size={18} className="text-red-500/50" /> : <GripVertical size={20} />}
      </div>
      
      <div className="col-span-1 flex justify-center"><RankIcon rank={index + 1} /></div>
      
      <div className="col-span-5">
        <div className="font-bold text-white text-lg truncate">{item.display_name}</div>
        <div className="flex items-center gap-2 text-xs text-gray-500 uppercase">
            <span className="bg-gray-800 px-2 py-0.5 rounded">{item.branch}</span>
            {deptPoints > 0 && (
                 <span className="text-yellow-600 bg-yellow-900/20 px-1.5 rounded font-mono font-bold border border-yellow-900/50">
                    +{deptPoints} Dept Pts
                </span>
            )}
        </div>
      </div>

      {/* Game Score Control */}
      <div className="col-span-3 flex items-center justify-center gap-2">
         <button onClick={() => handleAdjustPoints(item.id, 'subtract')} disabled={isFinalized} className="p-1 rounded-full bg-gray-800 text-gray-400 hover:bg-red-900/30 hover:text-red-500 transition-colors disabled:opacity-30"><Minus size={14} /></button>
         <div className="flex flex-col items-center w-12">
            <span className="text-lg font-bold text-blue-400">{item.score || 0}</span>
            <span className="text-[9px] text-gray-500 uppercase">Score</span>
         </div>
         <button onClick={() => handleAdjustPoints(item.id, 'add')} disabled={isFinalized} className="p-1 rounded-full bg-gray-800 text-gray-400 hover:bg-green-900/30 hover:text-green-500 transition-colors disabled:opacity-30"><Plus size={14} /></button>
      </div>

      {!isFinalized && (
        <div className="col-span-2 flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => handleManualMove(index, 'up')} className="p-2 hover:bg-gray-700 rounded text-gray-400"><ArrowUp size={16}/></button>
            <button onClick={() => handleManualMove(index, 'down')} className="p-2 hover:bg-gray-700 rounded text-gray-400"><ArrowDown size={16}/></button>
        </div>
      )}
    </div>
  );
}

function ReadOnlyItem({ item, index }) {
    const displayDeptPoints = item.points; // Read strictly from DB
    return (
        <div className={`grid grid-cols-12 items-center gap-4 p-5 border-b border-gray-800 transition-all ${index < 3 ? 'bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent' : 'hover:bg-gray-900/50'}`}>
            <div className="col-span-2 flex justify-center items-center"><RankIcon rank={item.position} /></div>
            <div className="col-span-7">
                <div className="font-bold text-white text-xl mb-1">{item.display_name}</div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                   <span className="text-gray-400">{item.branch}</span>
                   {displayDeptPoints > 0 && (
                        <span className="text-yellow-600 bg-yellow-900/20 px-1.5 rounded font-mono font-bold border border-yellow-900/50">
                            +{displayDeptPoints} Dept Pts
                        </span>
                    )}
                </div>
            </div>
            <div className="col-span-3 text-right pr-6">
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-mono font-bold text-blue-400">{item.score || 0}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Score</span>
                </div>
            </div>
        </div>
    );
}

// --- Main Page ---
export default function SportLeaderboardPage() {
  // 1. FIX: Use useParams hook instead of props to handle Next.js 15 async params correctly
  const params = useParams(); 
  const router = useRouter();
  const sportSlug = params?.slug;
  
  const isAdmin = useIsAdmin();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [sports, setSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(true);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  // Fetch sports list for switcher
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/sports/`);
        if (!res.ok) throw new Error('Failed to fetch sports');
        const data = await res.json();
        setSports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setSportsLoading(false);
      }
    };
    fetchSports();
  }, []);

  const handleSportSwitch = (sport) => {
    if (sport.slug) {
      router.push(`/sports/leaderboard/${sport.slug}`);
    }
  };

  // Fetch logic
  useEffect(() => {
    if (!sportSlug) return;

    setLoading(true);
    fetch(`${API_BASE_URL}/api/leaderboard/sport/${sportSlug}/`)
      .then(res => {
          if(!res.ok) throw new Error("Failed to fetch standings");
          return res.json();
      })
      .then(data => {
          setStandings(data);
          setLoading(false);
      })
      .catch(err => {
          console.error(err);
          setMsg({type: 'error', text: "Could not load data."});
          setLoading(false);
      });
  }, [sportSlug]);

  // Handlers
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setStandings((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleManualMove = (index, dir) => {
    const newIndex = dir === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < standings.length) {
        setStandings(items => arrayMove(items, index, newIndex));
    }
  };

  const handleAdjustPoints = async (id, action) => {
      const token = localStorage.getItem('access');
      if (!token) return setMsg({type: 'error', text: "Login required."});

      setStandings(prev => prev.map(item => item.id === id ? { 
          ...item, 
          score: action === 'add' ? (item.score || 0) + 1 : Math.max(0, (item.score || 0) - 1) 
      } : item));

      try {
          await fetch(`${API_BASE_URL}/api/leaderboard/result/${id}/adjust/`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify({ action })
          });
      } catch (e) { 
          setMsg({type: 'error', text: "Failed to sync score."});
      }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('access');
    if (!token) return setMsg({type: 'error', text: "Login required."});
    
    setSaving(true);
    const payload = standings.map((item, index) => ({ id: item.id, position: index + 1 }));

    try {
        const res = await fetch(`${API_BASE_URL}/api/leaderboard/sport/${sportSlug}/update/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("Save failed");
        
        const updatedData = await res.json();
        setStandings(updatedData); 
        setMsg({type: 'success', text: "Draft standings updated."});
        setTimeout(() => setMsg(null), 3000);
    } catch (err) { setMsg({type: 'error', text: "Failed to save ranking."}); }
    finally { setSaving(false); }
  };

  const handleFinalize = async () => {
      const token = localStorage.getItem('access');
      if (!token) return;
      if(!confirm("Finalize rankings? Points will be distributed to departments.")) return;

      try {
          const res = await fetch(`${API_BASE_URL}/api/leaderboard/sport/${sportSlug}/finalize/`, {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${token}` }
          });
          if (!res.ok) throw new Error("Failed");
          
          setMsg({type: 'success', text: "🏆 Points Distributed!"});
          // Refetch to update the finalized state locally
          const refreshRes = await fetch(`${API_BASE_URL}/api/leaderboard/sport/${sportSlug}/`);
          const refreshData = await refreshRes.json();
          setStandings(refreshData);
      } catch (e) { setMsg({type: 'error', text: "Error finalizing."}); }
  };

  if (loading) return <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /><p className="text-gray-500">Loading standings...</p></div>;

  const isFinalized = standings.length > 0 ? standings[0].sport_is_finalized : false;
  const sportName = standings.length > 0 ? standings[0].sport_name : sportSlug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Sport Switcher */}
        <div className="mb-8 border border-purple-500/30 rounded-lg p-6 bg-purple-500/5 backdrop-blur-sm">
          <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wide mb-4">Switch Sport</h3>
          {sportsLoading ? (
            <div className="flex justify-center items-center h-10">
              <Loader2 className="w-5 h-5 animate-spin text-purple-500" />
            </div>
          ) : sports.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  onClick={() => handleSportSwitch(sport)}
                  className={`p-2 rounded-lg text-sm font-semibold transition-all ${
                    sport.slug === sportSlug
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-purple-400'
                  }`}
                >
                  {sport.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No sports available.</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-6 border-b border-gray-800 gap-4">
            <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 capitalize mb-2">{sportName}</h1>
                <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-sm uppercase font-semibold">Results & Standings</p>
                    {isFinalized ? <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-bold rounded flex items-center gap-1"><CheckCircle size={12}/> FINALIZED</span> 
                                 : <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> DRAFT (Live)</span>}
                </div>
            </div>
            {isAdmin && (
                <div className="flex gap-3">
                    <button onClick={handleSave} disabled={isFinalized || saving} className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl font-bold disabled:opacity-50">Save Order</button>
                    <button onClick={handleFinalize} disabled={isFinalized} className={`px-4 py-2 rounded-xl font-bold disabled:opacity-50 ${isFinalized ? 'bg-green-900/30 text-green-500' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                        {isFinalized ? 'Distributed' : 'Finalize'}
                    </button>
                </div>
            )}
        </div>

        {msg && <div className={`mb-8 p-4 rounded-xl border text-center font-medium ${msg.type === 'error' ? 'bg-red-900/20 border-red-800 text-red-200' : 'bg-green-900/20 border-green-800 text-green-200'}`}>{msg.text}</div>}

        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
             <div className="grid grid-cols-12 gap-4 p-4 bg-gray-900 border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider">
                {isAdmin && <div className="col-span-1 text-center">Drag</div>}
                <div className={`${isAdmin ? 'col-span-1' : 'col-span-2'} text-center`}>Rank</div>
                <div className={`${isAdmin ? 'col-span-5' : 'col-span-7'}`}>Participant & Dept</div>
                <div className={`${isAdmin ? 'col-span-3' : 'col-span-3'} text-center`}>Score/Pts</div>
                {isAdmin && <div className="col-span-2 text-center">Move</div>}
            </div>
            {standings.length === 0 ? <div className="p-12 text-center text-gray-500">No results yet.</div> :
             isAdmin && !isFinalized ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={standings.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        {standings.map((item, index) => <SortableItem key={item.id} item={item} index={index} handleManualMove={handleManualMove} handleAdjustPoints={handleAdjustPoints} isFinalized={isFinalized} />)}
                    </SortableContext>
                </DndContext>
             ) : (
                <div className="divide-y divide-gray-800/50">
                    {standings.map((item, index) => <ReadOnlyItem key={item.id} item={item} index={index} />)}
                </div>
             )}
        </div>
      </div>
    </div>
  );
}