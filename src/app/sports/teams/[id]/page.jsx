"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/api/api'
import { useAuth } from '@/context/AuthContext'
import {
  ArrowLeft,
  Trophy,
  MapPin,
  Shield,
  UserCircle,
  Users,
  Edit3,
  Trash2,
  Loader2,
  Calendar
} from 'lucide-react'

export default function TeamDetail() {
  const params = useParams()
  const router = useRouter()
  const { id } = params || {}

  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  const { user, loading: authLoading } = useAuth()

  useEffect(() => {
    let mounted = true

    async function fetchTeam() {
      try {
        const res = await api.get(`/api/teams/${id}/`)
        if (mounted) setTeam(res.data)
      } catch (e) {
        console.error(e)
        if (e.response?.status === 401) {
          router.push("/auth/login")
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    if (id) fetchTeam()

    return () => { mounted = false }
  }, [id, router])

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${team.name}"? This action cannot be undone.`)) return

    setDeleting(true)
    try {
      await api.delete(`/api/teams/${team.id}/`)
      router.push('/sports/teams/list/all')
    } catch (e) {
      alert('Failed to delete: ' + (e.response?.data?.detail || e.message))
      setDeleting(false)
    }
  }

  // 1. Loading State
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Loading team details...</span>
        </div>
      </div>
    )
  }

  // 2. Not Found State
  if (!team) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-800">
            <Shield className="w-8 h-8 text-slate-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Team Not Found</h1>
          <p className="text-slate-400 mb-6">The team you are looking for doesn't exist or has been removed.</p>
          <Link
            href="/sports/teams/list/all"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </Link>
        </div>
      </div>
    )
  }

  const isManager = user?.moodleID === team.manager?.moodleID

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 py-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-4xl">

        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/sports/teams/list/all"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teams
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{team.name}</h1>
                {team.sport?.name && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-semibold text-slate-300">
                    <Trophy className="w-3 h-3" />
                    {team.sport.name}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {team.branch}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {team.members?.length || 0} Members
                </div>
              </div>
            </div>

            {/* Actions for Manager */}
            {isManager && (
              <div className="flex items-center gap-3 mt-4 md:mt-0">
                <Link
                  href={`/sports/teams/${team.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Team
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-800 text-sm font-medium rounded-lg transition-all disabled:opacity-50"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Leadership Info */}
          <div className="lg:col-span-1 space-y-6">

            {/* Manager Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-white">Manager</h3>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
                <p className="text-slate-200 font-medium">
                  {team.manager?.username || <span className="text-slate-500 italic">Unassigned</span>}
                </p>
                {team.manager?.moodleID && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">ID: {team.manager.moodleID}</p>
                )}
              </div>
            </div>

            {/* Captain Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <UserCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-white">Captain</h3>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/50">
                <p className="text-slate-200 font-medium">
                  {team.captain?.username || <span className="text-slate-500 italic">Unassigned</span>}
                </p>
                {team.captain?.moodleID && (
                  <p className="text-xs text-slate-500 mt-1 font-mono">ID: {team.captain.moodleID}</p>
                )}
              </div>
            </div>

            {/* Timestamp/Extra Info (Optional placeholder) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2 text-slate-400">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
              </div>
              <p className="text-sm text-slate-300">
                Active • {team.members?.length >= 2 ? 'Ready to play' : 'Recruiting'}
              </p>
            </div>
          </div>

          {/* Right Column: Roster */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full">
              <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold text-white">Team Roster</h3>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-slate-800 rounded text-slate-400">
                  Total: {team.members?.length || 0}
                </span>
              </div>

              <div className="p-5">
                {team.members?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {team.members.map(member => (
                      <div
                        key={member.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 text-slate-400 font-medium text-xs">
                          {member.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-200 text-sm font-medium truncate">{member.username}</p>
                          <p className="text-slate-500 text-xs font-mono mt-0.5 truncate">{member.moodleID}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                    <Users className="w-10 h-10 mb-3 opacity-20" />
                    <p>No members added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}