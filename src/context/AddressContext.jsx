import { createContext, useContext, useEffect, useState } from "react";

const AddressContext = createContext()

export const AddressProvider =({children})=>{

    const [address, setAddress] = useState(() => {
  return JSON.parse(localStorage.getItem("address")) || []
})

const [selectedAddressId, setSelectedAddressId] = useState(() => {
  return JSON.parse(localStorage.getItem("selectedAddressId")) || null
})
    // const[address, setAddress] = useState([])
    //  const [selectedAddressId, setSelectedAddressId] = useState(null)

    //  useEffect(()=>{
    //     const savedAddress = JSON.parse(localStorage.getItem("address")) || []
    //     const savedSelectedId = JSON.parse(localStorage.getItem("selectedAddressId"))

    //      setAddress(savedAddress)
    //     setSelectedAddressId(savedSelectedId)
    //  },[])


     useEffect(()=>{
        localStorage.setItem('address', JSON.stringify(address))
     },[address])
     useEffect(()=>{
        localStorage.setItem('selectedAddressId', JSON.stringify(selectedAddressId))
     },[selectedAddressId])

      const selectedAddress = address.find(
    addr => addr.id === selectedAddressId
  )

    return(
        <AddressContext.Provider value={{selectedAddress,address,setAddress,selectedAddressId, setSelectedAddressId}}>
         {children}
        </AddressContext.Provider>
    )

}

export const useAddress = ()=> useContext(AddressContext)