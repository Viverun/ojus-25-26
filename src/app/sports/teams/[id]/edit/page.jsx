"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TeamForm from '../../../TeamForm'
import api from '@/api/api'

export default function EditTeamPage(){
  const params = useParams()
  const router = useRouter()
  const { id } = params || {}
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth/login");
      return;
    }

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

  if(loading) return <div style={{padding:24}}>Loading team...</div>
  if(!team) return <div style={{padding:24}}>Team not found</div>

  const initial = {
    name: team.name,
    branch: team.branch,
    sport_id: team.sport?.id,
    member_ids: team.members?.map(m => m.id) || [],
    captain_id: team.captain?.id
  }

  return (
    <div style={{padding:24}}>
      <h1>Edit Team: {team.name}</h1>
      <TeamForm onSubmit={handleSubmit} submitLabel="Update Team" initial={initial} />
      {status && status.error && <pre style={{color:'red',marginTop:16}}>{JSON.stringify(status.error,null,2)}</pre>}
      {status === 'saving' && <div style={{color:'blue',marginTop:16}}>Updating team...</div>}
      {status && status.success && <div style={{color:'green',marginTop:16}}>Team updated successfully! Redirecting...</div>}
    </div>
  )
}
