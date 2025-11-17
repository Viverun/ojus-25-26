"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/api/api'
import { useAuth } from '@/context/AuthContext'

export default function TeamDetail(){
  const params = useParams()
  const router = useRouter()
  const { id } = params || {}
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user, isAuthenticated, loading: authLoading } = useAuth()

  useEffect(()=>{
    let mounted = true
    async function fetchTeam(){
      try{
        const res = await api.get(`api/teams/${id}/`)
        if(mounted) setTeam(res.data)
      }catch(e){
        console.error(e)
        if (e.response?.status === 401) {
          router.push("/auth/login");
        }
      }finally{ if(mounted) setLoading(false) }
    }
    if(id) fetchTeam()
    return ()=> mounted=false
  },[id, router])

  if(authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-purple-400 text-lg">Loading team...</div>
      </div>
    );
  }

  if(!team) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Team Not Found</h1>
          <a href="/sports/teams/list/all" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
            Back to Teams
          </a>
        </div>
      </div>
    );
  }

  const isManager = user?.moodleID === team.manager?.moodleID;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-3xl">
        <a href="/sports/teams/list/all" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back to Teams
        </a>

        <div className="border border-purple-500/30 rounded-lg p-8 bg-gray-900/50 backdrop-blur-sm hover:border-purple-500/60 transition-all">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {team.name}
              </h1>
              <p className="text-purple-400 text-lg">{team.sport?.name} • {team.branch}</p>
            </div>
            {isManager && (
              <a href={`/sports/teams/${team.id}/edit`} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Edit Team
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-purple-500/20 rounded p-4 bg-black/30">
              <h3 className="text-purple-400 font-bold mb-2">Manager</h3>
              <p className="text-gray-300">{team.manager?.username}</p>
              <p className="text-gray-500 text-sm">ID: {team.manager?.moodleID}</p>
            </div>
            <div className="border border-purple-500/20 rounded p-4 bg-black/30">
              <h3 className="text-purple-400 font-bold mb-2">Captain</h3>
              <p className="text-gray-300">{team.captain?.username}</p>
              <p className="text-gray-500 text-sm">ID: {team.captain?.moodleID}</p>
            </div>
          </div>

          <div className="border-t border-purple-500/20 pt-8">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Team Members ({team.members?.length || 0})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {team.members?.length > 0 ? (
                team.members.map(member => (
                  <div key={member.id} className="border border-purple-500/10 rounded p-3 bg-black/30 hover:border-purple-500/30 transition-colors">
                    <p className="text-gray-300 font-semibold">{member.username}</p>
                    <p className="text-gray-500 text-sm">Moodle ID: {member.moodleID}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 col-span-full">No members added yet</p>
              )}
            </div>
          </div>
        </div>

        {isManager && (
          <div className="mt-8 border border-purple-500/20 rounded p-6 bg-purple-500/5">
            <p className="text-purple-400 text-sm mb-4">Manager Controls</p>
            <div className="flex gap-3">
              <a href={`/sports/teams/${team.id}/edit`} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Edit
              </a>
              <button onClick={() => {
                if (confirm('Delete this team?')) {
                  api.delete(`api/teams/${team.id}/`)
                    .then(() => router.push('/sports/teams/list/all'))
                    .catch(e => alert('Delete failed: ' + e.message))
                }
              }} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
