"use client"
import Link from 'next/link'
import { useState, memo } from 'react'
import api from '@/api/api'
import { Users, Trophy, MapPin, UserCircle, Shield, Eye, Edit3, Trash2, Loader2 } from 'lucide-react'

function TeamCard({ team, onDeleted }) {
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    // In a full production app, replace native confirm with a Modal component
    if (!confirm(`Are you sure you want to delete "${team.name}"? This action cannot be undone.`)) return

    setDeleting(true)
    try {
      await api.delete(`api/teams/${team.id}/`)
      if (onDeleted) onDeleted(team.id)
    } catch (e) {
      alert('Failed to delete: ' + (e.response?.data?.detail || e.message))
      setDeleting(false)
    }
  }

  return (
    <div className="group h-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 flex flex-col">
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
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
        <div className="flex-1 space-y-3 mb-5">
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

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-4" />

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Link
            href={`/sports/teams/${team.id}`}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-md transition-colors"
          >
            <Eye className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium">View</span>
          </Link>

          <Link
            href={`/sports/teams/${team.id}/edit`}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-blue-900/20 hover:bg-blue-900/30 text-blue-400 hover:text-blue-300 border border-blue-900/30 hover:border-blue-800 rounded-md transition-colors"
          >
            <Edit3 className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs font-medium">Edit</span>
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 bg-red-900/10 hover:bg-red-900/20 text-red-400 hover:text-red-300 border border-red-900/20 hover:border-red-800 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
                <span className="text-xs font-medium">...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 flex-shrink-0" />
                <span className="text-xs font-medium">Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// Optimization: Memoize to prevent re-renders in list views
export default memo(TeamCard)