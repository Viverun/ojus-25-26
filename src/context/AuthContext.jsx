"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '@/api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function checkAuth(){
      const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null
      if(!token){
        if(mounted){ setIsAuthenticated(false); setUser(null); setLoading(false) }
        return
      }

      try{
        // Call backend user detail endpoint
        const res = await api.get('auth/me/')
        if(mounted){
          if(res.status === 200){
            setUser(res.data)
            console.log(res.data)
            setIsAuthenticated(true)
          }else{
            setUser(null)
            setIsAuthenticated(false)
          }
        }
      }catch(err){
        if(mounted){
          setUser(null)
          setIsAuthenticated(false)
        }
      }finally{
        if(mounted) setLoading(false)
      }
    }

    checkAuth()
    return () => { mounted = false }
  }, [])

  function logout(){
    if(typeof window !== 'undefined') localStorage.removeItem('access')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    isAuthenticated,
    loading,
    logout,
    setUser,
    setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
  return useContext(AuthContext)
}
