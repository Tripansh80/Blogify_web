import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authservice from './Appwrite/auth'
import { login,logout } from './store/Authslice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  console.log('The env is',import.meta.env.VITE_APPWRITE_URL)
  const dispatch=useDispatch()
const [loading, setloading] = useState(true)
useEffect(() => {
authservice.getCurrentUser()
.then((userData)=>{
if (userData) {
  dispatch(login({userData}));
}
else{
  dispatch(logout())
}
})
.finally(()=>setloading(false))
}, [])

  return !loading?(
    
<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
<div className='w-full block text-center'>

  <Header />
  <main>
    <Outlet />
  </main>
  <Footer />
</div>
</div>
     
    
  ): null
}

export default App
