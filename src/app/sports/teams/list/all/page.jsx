"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TeamCard from '../../../TeamCard'
import api from '@/api/api'
import { useAuth } from '@/context/AuthContext'

export default function TeamsListAll(){
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { isAuthenticated, loading: authLoading } = useAuth()

  useEffect(()=>{
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (authLoading) return;

    let mounted = true
    async function fetchTeams(){
      try{
        const res = await api.get('api/teams/')
        if(mounted) setTeams(res.data)
      }catch(e){
        console.error(e)
        if (e.response?.status === 401) {
          router.push("/auth/login");
        }
      }finally{ if(mounted) setLoading(false) }
    }
    fetchTeams()
    return ()=> mounted=false
  },[router, authLoading, isAuthenticated])

  if(authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-purple-400 text-lg">Loading teams...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent mb-2">
              ALL TEAMS
            </h1>
            <p className="text-gray-400">{teams.length} team{teams.length !== 1 ? 's' : ''} found</p>
          </div>
          <a href="/sports/teams/create" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            + Create Team
          </a>
        </div>

        {teams.length === 0 ? (
          <div className="border border-purple-500/30 rounded-lg p-12 bg-gray-900/50 text-center">
            <p className="text-gray-400 mb-4">No teams created yet.</p>
            <a href="/sports/teams/create" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Create First Team
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(t => <TeamCard key={t.id} team={t} />)}
          </div>
        )}
      </div>
    </main>
  )
}
