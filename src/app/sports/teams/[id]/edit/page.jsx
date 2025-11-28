"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TeamForm from '../../../TeamForm'
import api from '@/api/api'
import { useAuth } from '@/context/AuthContext'

export default function EditTeamPage(){
  const params = useParams()
  const router = useRouter()
  const { id } = params || {}
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const { user, isAuthenticated, loading: authLoading } = useAuth()

  // useEffect(()=>{
  //   let mounted = true
  //   async function fetchTeam(){
  //     try{
  //       const res = await api.get(`api/teams/${id}/`)
  //       if(mounted) setTeam(res.data)
  //     }catch(e){
  //       console.error(e)
  //       if (e.response?.status === 401) {
  //         router.push("/auth/login");
  //       }
  //     }finally{ if(mounted) setLoading(false) }
  //   }
  //   if(id) fetchTeam()
  //   return ()=> mounted=false
  // },[id, router])

  if(authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-purple-400 text-lg">Loading...</div>
      </div>
    );
  }

  if(!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Not Authenticated</h1>
          <p className="text-gray-400 mb-8">Please log in to edit teams.</p>
          <a href="/auth/login" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
            Log In
          </a>
        </div>
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

  const isManager = user.moodleID === team.manager?.moodleID;

  if(!isManager) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">Only the team manager can edit this team.</p>
          <a href={`/sports/teams/${id}`} className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
            Back to Team
          </a>
        </div>
      </div>
    );
  }

  async function handleSubmit(formData){
    setStatus('saving')
    try{
      const res = await api.put(`api/teams/${id}/`, formData)
      setStatus({ success: res.data })
      setTimeout(() => router.push(`/sports/teams/${id}`), 1500)
    }catch(e){
      const errData = e.response?.data || e.message
      setStatus({ error: errData })
    }
  }

  const initial = {
    name: team.name,
    branch: team.branch,
    sport_id: team.sport?.id,
    member_ids: team.members?.map(m => m.id) || [],
    captain_id: team.captain?.id
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <a href={`/sports/teams/${id}`} className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back to Team
        </a>
        <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
          EDIT TEAM
        </h1>
        <p className="text-gray-400 mb-8">{team.name}</p>
        <TeamForm onSubmit={handleSubmit} submitLabel="Update Team" initial={initial} />
        {status && status.error && <pre style={{color:'#ff6b6b',marginTop:16,padding:16,backgroundColor:'#1a1a1a',borderRadius:8}}>{JSON.stringify(status.error,null,2)}</pre>}
        {status === 'saving' && <div style={{color:'#74c0fc',marginTop:16,padding:12,backgroundColor:'#1a1a1a',borderRadius:8}}>Updating team...</div>}
        {status && status.success && <div style={{color:'#51cf66',marginTop:16,padding:12,backgroundColor:'#1a1a1a',borderRadius:8}}>Team updated successfully! Redirecting...</div>}
      </div>
    </main>
  )
}
