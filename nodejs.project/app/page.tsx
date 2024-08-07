'use client'
import Image from "next/image";

import { useState,useEffect } from "react";
import{firestore} from '@/firebase'
import { collection,deleteDoc,doc,getDocs, query, getDoc,setDoc } from "firebase/firestore";
import { Box,Modal,Typography,Stack, TextField,Button} from "@mui/material";



export default function Home() {
  const [nodejs, setNodejs] = useState([])
  const [open, setOpen] = useState(false)
  const [itemname, setItemName] = useState('')

  const updatenodejs = async () =>{
    const snapshot = query(collection(firestore,'nodejs'))
    const docs = await getDocs (snapshot)
    const nodejsList = []
    docs.forEach ((doc) => {
      nodejsList.push ({
name: doc.id,
...doc.data()
      })
    })
    setNodejs(nodejsList)
  }

  const additem = async (item) => {
    const docRef = doc(collection(firestore,'nodejs'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
       
        await setDoc(docRef,{quantity: quantity +1})
    } else {
      await setDoc(docRef,{quantity:1})
    }
    await updatenodejs()
   
  } 

  const removeitem = async (item) => {
    const docRef = doc(collection(firestore,'nodejs'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
       if (quantity === 1){
        await deleteDoc(docRef)
       } else {
        await setDoc(docRef,{quantity: quantity - 1})
         } 
      }
    await updatenodejs() 
  }   



    useEffect(()=> {
      updatenodejs()
    }, [])
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(true)

    

   

    
    return(
      <Box 

        width='90vw'
        height='100vh'
        flexDirection={"column"}
         display='flex'
          justifyContent='center'
           alignItems='center'
           gap={2}
           >
       <Modal

              open={open} 
               onclose={handleClose}
               >
        <Box 
        position='absolute'
         top='50%'
         left='50%'
         width={600}
         bgcolor='white'
         border='2px solid #000'
         bordershahdow={24}
         p={2}
         display='flex'
         flexDirection='column'
         gap='3'
         sx={{transform:'translate(-50%,-50%)'}}
         >

           <Typography variant="h6">Add Items</Typography>
          <Stack width='100%' direction='row' spacing={2}>
            <TextField
            variant="outlined"
            fullWidth
            value={itemname}
            onChange={(e) => {
              setItemName(e.target.value)
            }}
              />
              <button 
              variant="outlined"
              onClick={() => {
                additem(itemname)
                setItemName('')
                handleClose() 
              }}
              >
                Add
              </button>
          </Stack>
          </Box>
       </Modal>
       <Button
       
          varient="contained" 
          onClick={() => { 
            handleOpen()
          }}
          
          
           >
           add new Items
       </Button>
       <Box border=' 1px solid  #333'>
        <Box width='900px' height='100px' bgcolor='#ADD8E6'justifyContent="center" display='flex'alignItems='center'>
         <Typography variant="h6">Items</Typography>
        </Box>
       
       <Stack width='900px' height='500px' overflow='auto' spacing={2}>
          {nodejs.map(({name, quantity}) => (
            <Box 
               key={name}
          width='100%'
          minHeight='150px'
          display='flex'
          alignItems='center'
          justifyContent='space-evenly'
          bgcolor='#f0f0f0'
          padding={5}>
            <Typography
            variant="h3"
            color='#333'
            textAlign='center'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography
            variant="h3"
            color='#333'
            textAlign='center'>
              {quantity}
            </Typography>
            <Button
            variant='contained' 
            onClick={() => {
             additem(name)
               }}>
              add
            </Button>
            <Button
            variant='contained' 
            onClick={() => {
             removeitem(name)
               }}>
              Remove
            </Button>
        
          </Box>
         ))}
         </Stack>
         </Box>
       </Box>
    )
  }

          
          
        

        
          
           
            
          
        
      
    

    
     

             
        
          
    
   
  