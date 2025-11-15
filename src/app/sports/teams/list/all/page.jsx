"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TeamCard from '../../../TeamCard'
import api from '@/api/api'

export default function TeamsListAll(){
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth/login");
      return;
    }

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
  },[router])

  if(loading) return <div style={{padding:24}}>Loading teams...</div>

  return (
    <div style={{padding:24}}>
      <h1 style={{marginBottom:16}}>All Teams</h1>
      {teams.length === 0 && <div>No teams found. <a href="/sports/teams/create">Create one</a></div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {teams.map(t=> <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  )
}
