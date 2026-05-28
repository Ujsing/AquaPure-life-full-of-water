import { useEffect, useState } from 'react'

export default function useDebounce(value, t =500) {
    const[debounce , setDebounce] = useState(value)
    

    useEffect(()=>{
      const timer = setTimeout(() => {
          setDebounce(value)
      }, t);
      return ()=>clearTimeout(timer)
    },[value, t])

  return debounce
}
