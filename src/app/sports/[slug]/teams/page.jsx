"use client"
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import TeamCard from '../../TeamCard'
import api from '@/api/api'

function CreateTeamModal({ open, onClose, sportSlug, onCreated }){
  const [name, setName] = useState("")
  const [branch, setBranch] = useState('COMPS')
  const [loading, setLoading] = useState(false)

  if(!open) return null

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await api.post(`sports/${sportSlug}/teams/create/`, { name, branch })
      onCreated(res.data)
      onClose()
    }catch(err){
      console.error(err)
      alert(err.response?.data?.error || 'Failed to create team')
    }finally{ setLoading(false) }
  }

  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={submit} style={{background:'#fff',padding:20,borderRadius:8,minWidth:320}}>
        <h3>Create Team</h3>
        <div style={{marginBottom:8}}>
          <label>Team Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%'}} />
        </div>
        <div style={{marginBottom:8}}>
          <label>Branch</label>
          <select value={branch} onChange={e=>setBranch(e.target.value)} style={{width:'100%'}}>
            <option value="COMPS">COMPS</option>
            <option value="IT">IT</option>
            <option value="AIML">AIML</option>
            <option value="DS">DS</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>
        </div>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={loading}>{loading? 'Creating...':'Create'}</button>
        </div>
      </form>
    </div>
  )
}

function JoinTeamModal({ open, onClose, onRequested }){
  const [teamId, setTeamId] = useState("")
  const [loading, setLoading] = useState(false)
  if(!open) return null
  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await api.post(`teams/${teamId}/join/`)
      onRequested(res.data)
      onClose()
    }catch(err){
      console.error(err)
      alert(err.response?.data?.error || 'Failed to send request')
    }finally{ setLoading(false) }
  }
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <form onSubmit={submit} style={{background:'#fff',padding:20,borderRadius:8,minWidth:320}}>
        <h3>Join Team</h3>
        <div style={{marginBottom:8}}>
          <label>Team ID</label>
          <input value={teamId} onChange={e=>setTeamId(e.target.value)} required style={{width:'100%'}} />
        </div>
        <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={loading}>{loading? 'Sending...':'Send Request'}</button>
        </div>
      </form>
    </div>
  )
}

export default function TeamsBySport(){
  const params = useParams()
  const router = useRouter()
  const { slug } = params || {}
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [sport, setSport] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)

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
        // check user registration for this sport
        try{
          const regRes = await api.get('user-registration-info/')
          const regs = regRes.data.registrations || []
          const found = regs.find(r => r.sport && r.sport.slug === slug)
          if(mounted) setIsRegistered(Boolean(found))
        }catch(e){ console.warn('Failed to fetch registration info', e) }
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

      {!isRegistered && (
        <div style={{marginBottom:12}}>
          You are not registered for this sport. Please register first to create or join teams.
        </div>
      )}

      {isRegistered && (
        <div style={{display:'flex',gap:8,marginBottom:12}}>
          <button onClick={()=>setShowCreate(true)}>Create Team</button>
          <button onClick={()=>setShowJoin(true)}>Join Team</button>
        </div>
      )}

      <CreateTeamModal open={showCreate} onClose={()=>setShowCreate(false)} sportSlug={slug} onCreated={(t)=>setTeams(prev=>[...prev,t])} />
      <JoinTeamModal open={showJoin} onClose={()=>setShowJoin(false)} onRequested={(r)=>console.log('request sent',r)} />

      {teams.length === 0 && <div>No teams for this sport.</div>}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12}}>
        {teams.map(t=> <TeamCard key={t.id} team={t} />)}
      </div>
    </div>
  )
}
