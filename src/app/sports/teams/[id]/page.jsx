"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import api from '@/api/api'

export default function TeamDetail(){
  const params = useParams()
  const router = useRouter()
  const { id } = params || {}
  const [team, setTeam] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if(loading) return <div style={{padding:24}}>Loading team...</div>
  if(!team) return <div style={{padding:24}}>Team not found</div>

  return (
    <div style={{padding:24,maxWidth:720}}>
      <h1>{team.name}</h1>
      <div style={{marginBottom:16}}>
        <p><strong>Sport:</strong> {team.sport?.name}</p>
        <p><strong>Branch:</strong> {team.branch}</p>
        <p><strong>Manager:</strong> {team.manager?.username}</p>
        <p><strong>Captain:</strong> {team.captain?.username}</p>
      </div>
      <div style={{marginBottom:16}}>
        <h3>Members ({team.members?.length || 0})</h3>
        <ul>
          {team.members?.map(m => (
            <li key={m.id}>{m.username} ({m.moodleID})</li>
          ))}
        </ul>
      </div>
      <div style={{display:'flex',gap:8}}>
        <a href={`/sports/teams/${team.id}/edit`} style={{padding:'10px 20px',background:'#0066cc',color:'white',textDecoration:'none',borderRadius:4}}>Edit</a>
        <a href="/sports/teams/list/all" style={{padding:'10px 20px',background:'#666',color:'white',textDecoration:'none',borderRadius:4}}>Back</a>
      </div>
    </div>
  )
}
