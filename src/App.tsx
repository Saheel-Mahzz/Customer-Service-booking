
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { Toaster } from './components/ui/sonner'


function App() {

  return (
    <>
    <RouterProvider router={router}/>
     <Toaster position='top-center'  richColors/>
    </>
  )
}

export default App
