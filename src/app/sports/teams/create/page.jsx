"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TeamForm from '../../TeamForm'
import api from '@/api/api'
import { useAuth } from '@/context/AuthContext'

export default function CreateTeamPage(){
  const [status, setStatus] = useState(null)
  const router = useRouter()
  const { user, isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-purple-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user?.is_manageing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-400 mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-8">Only managers can create teams.</p>
          <a href="/sports/teams/list/all" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
            Back to Teams
          </a>
        </div>
      </div>
    );
  }

  async function handleSubmit(formData){
    setStatus('saving')
    try{
      const res = await api.post('api/teams/', formData)
      setStatus({ success: res.data })
      setTimeout(() => router.push('/sports/teams/list/all'), 2000)
    }catch(e){
      const errData = e.response?.data || e.message
      setStatus({ error: errData })
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-12 px-6">
      <div className="container mx-auto max-w-2xl">
        <a href="/sports/teams/list/all" className="text-purple-400 hover:text-purple-300 text-sm mb-6 inline-block">
          ← Back to Teams
        </a>
        <h1 className="text-5xl font-black mb-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent tracking-tight">
          CREATE TEAM
        </h1>
        <p className="text-gray-400 mb-8">Set up your sports team</p>
        <TeamForm onSubmit={handleSubmit} submitLabel="Create Team" />
        {status && status.error && <pre style={{color:'#ff6b6b',marginTop:16,padding:16,backgroundColor:'#1a1a1a',borderRadius:8}}>{JSON.stringify(status.error,null,2)}</pre>}
        {status === 'saving' && <div style={{color:'#74c0fc',marginTop:16,padding:12,backgroundColor:'#1a1a1a',borderRadius:8}}>Creating team...</div>}
        {status && status.success && <div style={{color:'#51cf66',marginTop:16,padding:12,backgroundColor:'#1a1a1a',borderRadius:8}}>Team created successfully! Redirecting...</div>}
      </div>
    </main>
  )
}
