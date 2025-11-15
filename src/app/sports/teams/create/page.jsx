"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TeamForm from '../../TeamForm'
import api from '@/api/api'

export default function CreateTeamPage(){
  const [status, setStatus] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/auth/login");
    }
  }, [router]);

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
    <div style={{padding:24}}>
      <h1>Create Team</h1>
      <TeamForm onSubmit={handleSubmit} submitLabel="Create Team" />
      {status && status.error && <pre style={{color:'red',marginTop:16}}>{JSON.stringify(status.error,null,2)}</pre>}
      {status === 'saving' && <div style={{color:'blue',marginTop:16}}>Creating team...</div>}
      {status && status.success && <div style={{color:'green',marginTop:16}}>Team created successfully! Redirecting...</div>}
    </div>
  )
}
