"use client"
import Link from 'next/link'
import { useState } from 'react'
import api from '@/api/api'

export default function TeamCard({ team, onDeleted }){
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(){
    if(!confirm('Delete this team?')) return
    setDeleting(true)
    try {
      await api.delete(`api/teams/${team.id}/`)
      if(onDeleted) onDeleted(team.id)
    } catch(e) {
      alert('Failed to delete: ' + (e.response?.data?.detail || e.message))
    }
    setDeleting(false)
  }

  return (
    <div style={{border:'1px solid #ddd',padding:12,borderRadius:6,display:'flex',flexDirection:'column',gap:8}}>
      <h3 style={{margin:'0 0 8px 0'}}>{team.name}</h3>
      <div><strong>Sport:</strong> {team.sport?.name || '—'}</div>
      <div><strong>Branch:</strong> {team.branch}</div>
      <div><strong>Manager:</strong> {team.manager?.username || '—'}</div>
      <div><strong>Captain:</strong> {team.captain?.username || '—'}</div>
      <div><strong>Members:</strong> {team.members?.length || 0}</div>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <Link href={`/sports/teams/${team.id}`} style={{textDecoration:'none',color:'#0066cc'}}>View</Link>
        <Link href={`/sports/teams/${team.id}/edit`} style={{textDecoration:'none',color:'#0066cc'}}>Edit</Link>
        <button onClick={handleDelete} disabled={deleting} style={{cursor:'pointer',background:'#cc0000',color:'white',border:'none',padding:'4px 8px',borderRadius:3}}>
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
