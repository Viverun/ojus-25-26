"use client"
import Link from 'next/link'
import { useState, useEffect, memo } from 'react'
import { useAuth } from '@/context/AuthContext'
import api from '@/api/api'
import { Users, Trophy, MapPin, UserCircle, Shield, Eye, Edit3, Trash2, Loader2 } from 'lucide-react'

function TeamCard({ team, onDeleted }) {
  const { user } = useAuth()
  const isManager = user && team?.manager && user.username === team.manager.username
  const [deleting, setDeleting] = useState(false)
  const [showRequests, setShowRequests] = useState(false)
  const [requests, setRequests] = useState([])
  const [loadingRequests, setLoadingRequests] = useState(false)

  async function handleDelete(e) {
    // 🛑 CRITICAL FIX: Prevent click from bubbling up or triggering navigation
    e.preventDefault()
    e.stopPropagation()

    if (!confirm(`Are you sure you want to delete "${team.name}"? This action cannot be undone.`)) return

    setDeleting(true)
    try {
      // ✅ FIX: Added leading slash ensures correct API path
      await api.delete(`/api/teams/${team.id}/`)

      // Notify parent to remove from UI immediately
      if (onDeleted) onDeleted(team.id)
    } catch (e) {
      alert('Failed to delete: ' + (e.response?.data?.detail || e.message))
      setDeleting(false)
    }
  }

  async function fetchRequests(){
    setLoadingRequests(true)
    try{
      const res = await api.get(`/teams/${team.id}/requests/`)
      setRequests(res.data)
    }catch(err){
      console.error('Failed to load requests', err)
      alert(err.response?.data?.detail || 'Failed to load requests')
    }finally{ setLoadingRequests(false) }
  }

  async function respond(requestId, action){
    try{
      await api.post(`/team-requests/${requestId}/respond/`, { action })
      setRequests(prev => prev.filter(r=> r.id !== requestId))
      if(action === 'accept'){
        // optimistic UI: increment member count locally if needed
      }
    }catch(err){
      console.error('Respond failed', err)
      alert(err.response?.data?.error || 'Action failed')
    }
  }

  return (
    <div className="group h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 flex flex-col">

      {/* ✅ UX IMPROVEMENT:
         Make the main body a Link so the whole card is clickable
         (except the buttons at the bottom)
      */}
      <Link href={`/sports/teams/${team.id}`} className="flex-1 p-5 flex flex-col hover:bg-slate-800/50 transition-colors">

        {/* Header with sport badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2 truncate leading-tight">
              {team.name}
            </h3>
            {team.sport?.name && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-full">
                <Trophy className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="text-xs font-medium text-slate-300 truncate">{team.sport.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Details Section - Compact Grid */}
        <div className="flex-1 space-y-3 mb-2">
          {/* Branch */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Branch</div>
              <div className="text-slate-200 font-medium truncate text-sm">{team.branch}</div>
            </div>
          </div>

          {/* Manager */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Manager</div>
              <div className="text-slate-200 font-medium truncate text-sm">
                {team.manager?.username || <span className="text-slate-600 italic">Unassigned</span>}
              </div>
            </div>
          </div>

          {/* Captain */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center flex-shrink-0">
              <UserCircle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Captain</div>
              <div className="text-slate-200 font-medium truncate text-sm">
                {team.captain?.username || <span className="text-slate-600 italic">Unassigned</span>}
              </div>
            </div>
          </div>

          {/* Members Count */}
          <div className="flex items-center gap-2.5 text-sm">
            <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Team Size</div>
              <div className="text-slate-200 font-semibold text-sm">
                {team.members?.length || 0} <span className="text-slate-500 font-normal">members</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Divider */}
      <div className="h-px bg-slate-800" />

      {/* Action Buttons - Outside the Link to prevent conflict */}
      <div className="grid grid-cols-4 divide-x divide-slate-800 bg-slate-900/50">
        <Link
          href={`/sports/teams/${team.id}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase">View</span>
        </Link>
        {isManager && (
          <>
            <Link
              href={`/sports/teams/${team.id}/edit`}
              className="flex flex-col items-center justify-center gap-1 py-3 text-blue-400 hover:text-blue-300 hover:bg-blue-900/10 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Edit</span>
            </Link>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex flex-col items-center justify-center gap-1 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase">Delete</span>
                </>
              )}
            </button>
            <button
              onClick={(e)=>{ e.preventDefault(); e.stopPropagation(); setShowRequests(true); fetchRequests(); }}
              className="flex flex-col items-center justify-center gap-1 py-3 text-amber-300 hover:text-amber-200 hover:bg-amber-900/6 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Requests</span>
            </button>
          </>
        )}
      </div>

      {showRequests && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold">Pending Requests for {team.name}</h3>
              <button onClick={()=>setShowRequests(false)} className="text-sm text-slate-600">Close</button>
            </div>
            <div className="space-y-3 max-h-80 overflow-auto">
              {loadingRequests && <div>Loading...</div>}
              {!loadingRequests && requests.length === 0 && <div className="text-sm text-slate-500">No pending requests.</div>}
              {requests.map(r => (
                <div key={r.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.student?.username || r.registeration?.student}</div>
                    <div className="text-xs text-slate-500">Branch: {r.registeration?.branch || '—'}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={()=>respond(r.id, 'accept')} className="px-3 py-1 bg-emerald-500 text-white rounded">Accept</button>
                    <button onClick={()=>respond(r.id, 'decline')} className="px-3 py-1 bg-red-500 text-white rounded">Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(TeamCard)