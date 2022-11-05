import { useState, useEffect } from 'react'
export default function BoxStudy(props){
    const materia = ['Matemática', 'Português', 'Biologia', 'Geografia', 'História', 'Química', 'Física', 'Filosofia',' Sociologia']
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [statusplain, Setstatusplain] = useState({
        materia: props.PlanoDeEstudo.split('=')[1].split(':')[0],
        conteudo: props.PlanoDeEstudo.split('=')[1].split(':')[1],
    })
    useEffect(() => {
        setLoading(true)
        fetch('https://eduke20.vercel.app/api/slugcontent/planodeestudo', {
            method: 'POST',
            body: JSON.stringify({ "materia": statusplain.materia, "conteudo": statusplain.conteudo}),
            headers: { 'Content-Type': 'application/json' }
        })
          .then((res) => res.json())
          .then((data) => {
            setData(data)-
            setLoading(false)
          })
      }, [])
      if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>
    return(
        <div className='border max-h-36	h-full rounded-lg w-60 py-4 px-10 flex flex-col justify-between text-lg gap-7'>
            <div className='gap-1 flex flex-col'>
                <h1 className='font-bold text-lg'>{data.plainstudy}</h1>
                <h2>{materia[statusplain.materia]}</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <h3 className='text-sm'>Em Andamento</h3>
                <div className='h-px w-full bg-red-500'></div>
            </div>
        </div>
    )
}