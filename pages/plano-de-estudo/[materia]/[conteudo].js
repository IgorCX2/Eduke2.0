import markdownToHtml from '../../../script/markdownToHtml'
import { getContents } from '../../../script/getContent'
import markdownStyles from '../../../components/markdown-styles.module.css'
import Image from 'next/image'
const imageLoader = ({ src }) => {
    return `http://localhost:3000/${src}`;
};
import { useState, useEffect } from 'react'
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });
import dynamic from 'next/dynamic'
export default function PlainStudy(props){
    const [countpage, SetCountPage] = useState(0)
    const [video, SetVideo] = useState(false)
    const namepages = props.carregarestudo.metadata.page.split(',')
    const pages = props.markcontent.split('£')
    var p = -1
    var n = -1
    var qtq = -1
    async function Contador(action) {
        SetVideo(false)
        if(action == "-"){
            if(countpage  > 0){
                SetCountPage(countpage-1)
            }
        }
        if(action == '+'){
            if(countpage < namepages.length-1){
                SetCountPage(countpage+1)
            }
        }
      }
    return(
        <div className="fixed w-full h-full left-0 top-0 justify-between flex z-20 bg-white">
            <aside className="w-1/5 h-full drop-shadow-n2xl bg-white flex flex-col">
                <div className="bg-gray-200	py-14 px-8">
                    <h1 className="font-bold text-3xl">{props.carregarestudo.metadata.title}</h1>
                </div>
                <div className="px-8 overflow-y-scroll scrollbonito h-full" onClick={()=>SetVideo(false)}>
                {props.carregarestudo.metadata.pageinfo.split(',').map((nav) => {
                    n++
                    const valordn = n
                    if(nav == '3'){
                        return(
                            <a href={"#"+namepages[n]?.toString()} onClick={()=>SetCountPage(valordn)}>
                                <div className="flex gap-5 items-center border-b-2 py-6 px-6">
                                    <div>
                                        <Image loader={imageLoader} src="booknotsmoke.svg" alt="Picture of the author" width={40} height={40}/>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className='text-xl'>Questão</strong>
                                        <p>Em andamento</p>
                                    </div>
                                </div>
                            </a>
                        )
                    }else{
                        return(
                            <a href={"#"+namepages[n]?.toString()} onClick={()=>SetCountPage(valordn)}>
                                <div className="flex gap-5 items-center border-b-2 py-6">
                                    <div>
                                        <Image loader={imageLoader} src="booknotsmoke.svg" alt="Picture of the author" width={50} height={50}/>
                                    </div>
                                    <div className="flex flex-col">
                                        <strong className='text-xl'>{namepages[n]}</strong>
                                        <p>Em andamento</p>
                                    </div>
                                </div>
                            </a>
                        )

                    }
                })}
                </div>
            </aside>
            <main className="w-4/5 flex flex-col items-center justify-end">
                <div className='top-0 w-full h-full'>
                    <div className='scroll-smooth overflow-y-hidden h-full w-full'>
                        {props.carregarestudo.metadata.pageinfo.split(',').map((nav) => {
                            p++
                            if(nav == '1'){
                                return(
                                    <div id={namepages[p]?.toString()} className='relative w-full h-full overflow-auto scrollbonito text-center flex flex-col items-center'>
                                        <div className='w-full h-96 absolute top-0'>
                                            {pages[p].split('{')[1] ? <Image loader={imageLoader} src={`/${pages[p].split('{')[1]}`} alt="Picture of the author" fill={true} style={{objectFit: "cover"}}/> : ""}
                                        </div>
                                        <div className={`relative mb-100  w-3/5 h-full bg-white rounded-lg p-10 ${pages[p].split('{')[1] ? "mt-44" : "mt-10"}`}>
                                            <div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:pages[p].split('{')[0]}}/>
                                        </div>
                                    </div>
                                )
                            }
                            if(nav == '2'){
                                return(
                                    <div id={namepages[p]?.toString()} className='overflow-auto scrollbonito h-full w-full text-center'>
                                        <ReactPlayer url={pages[p]}  width='100%' height='100%' controls showinfo={0} playing={video} onPlay={() => SetVideo(true)}/>
                                    </div>
                                )
                            }
                            if(nav == '3'){
                                const squestion = pages[p].split('¹')
                                console.log(squestion[0].split('²').length)
                                return(
                                    <div id={namepages[p]?.toString()} className='overflow-auto scrollbonito h-full w-full text-center'>
                                        <div className='w-full bg-gray-200 flex flex-col justify-center items-center py-7'>
                                            <div className='w-3/5'>
                                                <div className='flex justify-between text-lg mb-10'>
                                                    <div className={`text-center bg-white rounded-lg py-1 w-36`}>{namepages[p]}</div>
                                                </div>
                                                <div className='flex w-full justify-between items-start	flex-wrap'>
                                                    {squestion[0].split('²').map((qtdquestion) => {
                                                        return(
                                                            <div>
                                                                <div className={`${markdownStyles['markdown']} ${squestion[0].split('²').length == 1 ? "text-left" : "text-center"}`} dangerouslySetInnerHTML={{ __html:qtdquestion.split('{')[0]}}/>
                                                                <div className={`${markdownStyles['markdown']}  text-right text-sm`} dangerouslySetInnerHTML={{ __html:qtdquestion.split('{')[1]}}/>
                                                            </div>

                                                            
                                                        )

                                                    })}
                                                </div>
                                                {squestion.length > 0 ? <div className={`${markdownStyles['markdown']} text-lg text-left`} dangerouslySetInnerHTML={{ __html:squestion[1]}}/> : <div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:squestion[0]}}/>}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className='absolute w-2/4 rounded-lg py-3 drop-shadow-n2xl bg-white mb-10 px-12 flex justify-between items-center'>
                    <a href={"#"+namepages[countpage]?.toString()} ><div className='rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4' onClick={() => Contador('-')}>ANTERIOR</div></a>
                    <div className='flex gap-16 items-center'>
                        <div className='font-bold text-lg'>{countpage+1}/{namepages.length}</div>
                    </div>
                    <a href={"#"+namepages[countpage]?.toString()} ><div className='rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4' onClick={() => Contador(`${countpage != namepages.length-1 ? "+" : "CONCLUIR"}`)}>{countpage != namepages.length-1 ? "PROXIMO" : "CONCLUIR"}</div></a>
                </div> 
            </main>
        </div>
    )
}
export async function getStaticPaths(){
    return{
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps(context)  {
    const conteudo = context.params.conteudo
    const materia = context.params.materia
    const arrymateria = ['Matemática', 'Português', 'Biologia', 'Geografia', 'História', 'Química', 'Física', 'Filosofia',' Sociologia']
    if(arrymateria.indexOf(materia) != 1){
        var carregarestudo = getContents(conteudo, materia);
        var markcontent = await markdownToHtml(carregarestudo.content || '')
    }
    return {
      props: {
        carregarestudo,
        markcontent
      },
    };
}