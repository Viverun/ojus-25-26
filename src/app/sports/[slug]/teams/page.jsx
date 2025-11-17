"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TeamCard from '../../TeamCard'
import api from '@/api/api'

export default function TeamsBySport(){
  const params = useParams()
  const router = useRouter()
  const { slug } = params || {}
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [sport, setSport] = useState(null)

  useEffect(()=>{
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    let mounted = true
    async function fetchFiltered(){
      try{
        const res = await api.get('teams/')
        const data = res.data
        // filter by sport slug
        const filtered = data.filter(t => t.sport && t.sport.slug === slug)
        if(filtered.length > 0) {
          setSport(filtered[0].sport)
        }
        if(mounted) setTeams(filtered)
      }catch(e){ 
        console.error(e)
        if (e.response?.status === 401) {
          router.push("/auth/login");
        }
      }
      finally{ if(mounted) setLoading(false) }
    }
    if(slug) fetchFiltered()
    return ()=> mounted=false
  },[slug, router])

  if(loading) return <div style={{padding:24}}>Loading teams...</div>

  return (
    <div style={{padding:24}}>
      <h1 style={{marginBottom:16}}>Teams for {sport?.name || slug}</h1>
      {teams.length === 0 && <div>No teams for this sport. <a href="/sports/teams/create">Create one</a></div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {teams.map(t=> <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  )
}
