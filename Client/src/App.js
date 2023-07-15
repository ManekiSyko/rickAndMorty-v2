import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx'
import axios from 'axios'
import GlobalFonts from './fonts/fonts.js'
import About from './about/About.jsx'
import Detail from './components/Detail/Detail.jsx';
import Error404 from './components/Error404/Error404.jsx'
import Form from './components/Form/Form';
import Favorites from './components/Favorites';


function App() {
   const { pathname } = useLocation()
   const navigate = useNavigate()

   const [characters, setCharacters] = useState([])
   const [access, setAccess] = useState(false)

   async function login({ email, password }){
      try {
         const { data } = await axios(`localhost:3001/rickandmorty/login?email=${email}&password=${password}`)

         const { access } = data;

         setAccess(access)
         access && navigate('/home')

      } catch (error) {
         alert(error.response)       
      }
   }
   
   useEffect(()=>{
      !access && navigate('/')
   },[access])

   async function onSearch(id) {
      if(characters.find(char => char.id === Number(id))) {
         return alert(`Ya esta el personaje con el ID #${id}`)
      }
      try {
         const {data} = await axios(`http://
         localhost:3001/rickandmorty/character/${id}`)

         setCharacters(oldChars => [...oldChars, data])

      } catch (error) {
         
         alert(error.response.data)
         
      }
      
   }

   function onClose(id) {
      setCharacters(characters.filter(char => 
         char.id !== Number(id)))
   }

   return (
      
      <div className='App'>
         <style>{'body { background-color: rgb(212, 205, 191); }'}</style>
         <GlobalFonts />
         { pathname !== '/' && <Nav onSearch={onSearch}/> }   
         <Routes>
            <Route exact path= '/' element={
               <Form login={login}/>
            }/>
            <Route path='/Home' element={
               <Cards characters={characters}
                  onClose={onClose}/>
               }/>
            <Route path='/About' element={
               <About />
               }/>
            <Route path='/Detail/:id' element={
               <Detail />
            }/>
            <Route path='/Favorites' element={
               <Favorites />
            }/>
            <Route path='*' element={Error404}/>
         </Routes>      
      </div>
   );
 }

export default App;