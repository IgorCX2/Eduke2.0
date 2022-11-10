import markdownToHtml from '../../../script/markdownToHtml'
import { getContents } from '../../../script/getContent'
import markdownStyles from '../../../components/markdown-styles.module.css'
import { parseCookies, setCookie } from 'nookies'
import Image from 'next/image'
var jwt = require('jsonwebtoken');
const { promisify } = require('util');
import { useRouter } from 'next/router'
const imageLoader = ({ src }) => {
    return `https://eduke21.vercel.app/${src}`;
};
import { useState, useEffect, cache } from 'react'
const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });
import dynamic from 'next/dynamic'
export default function PlainStudy(props){
    const router = useRouter()
    if (router.isFallback) {
        return <div>Não Encontramos nada =)...</div>
    }
    const [answer, SetAnswer] = useState({
        questao: '',
        alternativa: ''
    })
    const [concluirR, SetconcluirR] = useState("")
    const [countpage, SetCountPage] = useState(0)
    const [video, SetVideo] = useState(false)
    const [InfoBD, setInfoBD] = useState({
        resposta: "",
        pagina: "",
    })
    const [Decodificado, setDecodificado] = useState({
        id: '',
        nick: ''
    })
    async function CarregarInfoBD(id){
        const resEstado = await fetch('https://eduke20.vercel.app/api/userconfig/user-id', {
            method: 'POST',
            body: JSON.stringify({ "id": Number(Decodificado.id)-1}),
            headers: { 'Content-Type': 'application/json'}
        });
        const responseEstado = await resEstado.json();
        const filterItemsE = (query) => {
            return responseEstado.estado.split(',')?.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
        };
        const resHistorico = await fetch('https://eduke20.vercel.app/api/nivel/historico', {
            method: 'POST',
            body: JSON.stringify({ "id": Number(Decodificado.id)-1, "cod": props.carregarestudo.metadata.cod.toString()}),
            headers: { 'Content-Type': 'application/json' }
        });
        const responseHistorico = await resHistorico.json();
        if(responseHistorico.status.toString() != "feito"){
            if(filterItemsE(props.carregarestudo.metadata.cod.toString()).length <= 0){
                const carregarPlain = await fetch('https://eduke20.vercel.app/api/userconfig/add-plain', {
                    method: 'POST',
                    body: JSON.stringify({ "id": Number(Decodificado.id)-1, "estado": props.carregarestudo.metadata.cod.toString()}),
                    headers: { 'Content-Type': 'application/json' }
                });
            }
            const resActive = await fetch('https://eduke20.vercel.app/api/planodeestudo/ativo', {
                method: 'POST',
                body: JSON.stringify({ "id": Number(Decodificado.id)-1, "cod": props.carregarestudo.metadata.cod.toString()}),
                headers: { 'Content-Type': 'application/json' }
            });
            const responseActive = await resActive.json();
            console.log(responseActive)
            if(responseActive.pagina.length < 0){
                setInfoBD(responseActive)
                setInfoBD({
                    resposta: responseActive.resposta.toString(),
                    pagina: responseActive.pagina.toString(),
                })
            }else{
                setInfoBD({
                    resposta: responseActive.resposta.toString(),
                    pagina: responseActive.pagina.toString(),
                })
            }
        }else{
            setInfoBD({
                resposta: 'F',
                pagina: 'F',
            })
        }
    }
    const namepages = props.carregarestudo.metadata.page.split(',')
    const pages = props.markcontent.split('£')
    var p = -1
    var n = -1
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
        if(action == 'c'){
            Concluir()  
        }
      }
    async function MandarView(pagina, resposta){
        const resHistorico = await fetch('https://eduke20.vercel.app/api/planodeestudo/add-ativo', {
            method: 'POST',
            body: JSON.stringify({ "id": Number(Decodificado.id)-1, "visu": pagina, "res": resposta}),
            headers: { 'Content-Type': 'application/json' }
        });
    }
    
    const filterItems = (query) => {
        const InfoBdPa = InfoBD.pagina?.split(',')
        return InfoBdPa?.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
      };
    useEffect(() => {
        if(InfoBD.pagina != "" && InfoBD.pagina != "F"){
            if(InfoBD.pagina?.split(',').indexOf(`${countpage-1}${props.carregarestudo.metadata.cod.toString()}`) == -1){
                MandarView(`${InfoBD.pagina},${countpage-1}${props.carregarestudo.metadata.cod.toString()}`, InfoBD.resposta)
                setInfoBD({
                    pagina: `${InfoBD.pagina},${countpage-1}${props.carregarestudo.metadata.cod.toString()}`,
                    resposta: InfoBD.resposta
                })
            }
        }
    }, [countpage])
    useEffect(() => {
        async function InfoUser() {
            const cookies = await parseCookies();
            if(cookies.fromClient == undefined ){
                setStats("N");
            }else{
                const decode = await promisify(jwt.verify)(cookies.fromClient, "OD2DS8S21DSA4SD4SS3A");
                setDecodificado({
                    id: decode.id,
                    nick: decode.nick
                });
            }
        }
        InfoUser()
      }, [])
    if(InfoBD.pagina == ""){
        return(
            <div onClick={() => CarregarInfoBD()}>Carrgar seus dados</div>
        )
    }
    const filterItemsR = (query) => {
        const InfoBdRs = InfoBD.resposta?.split(',')
        return InfoBdRs?.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) > -1);
      };
    async function Concluir(){
        const filtrocarr = filterItemsR(`${props.carregarestudo.metadata.cod.toString()}+`)
        if(filterItems(`${props.carregarestudo.metadata.cod.toString()}`).length >= namepages.length-1 && filtrocarr.length >= Number(props.carregarestudo.metadata.qtq.toString())){
            //const arrayfunciton = filtrocarr.toString().split(',')
            var newarry = []
            filtrocarr.map((newsp) => {
                newarry.push(newsp.split('+')[1])
            })
            const novonivel = newarry.toString().replace(/§/g, "=").replace(/¢/g, ",");
            const resHist = await fetch('https://eduke20.vercel.app/api/planodeestudo/add-historico', {
                method: 'POST',
                body: JSON.stringify({ "id": Number(Decodificado.id)-1, "cod": props.carregarestudo.metadata.cod.toString()}),
                headers: { 'Content-Type': 'application/json' }
            });
            const resStatus = await fetch('https://eduke20.vercel.app/api/userconfig/mudar-status', {
                method: 'POST',
                body: JSON.stringify({ "id": Number(Decodificado.id)-1, "newstatus": props.carregarestudo.metadata.cod.toString()}),
                headers: { 'Content-Type': 'application/json' }
            });
            const resNivel = await fetch('https://eduke20.vercel.app/api/nivel/nivel', {
                method: 'POST',
                body: JSON.stringify({ "id": Number(Decodificado.id)-1, "nivel": novonivel}),
                headers: { 'Content-Type': 'application/json' }
            });
            const resRevomerCOnt = await fetch('https://eduke20.vercel.app/api/planodeestudo/remov-ativo', {
                method: 'POST',
                body: JSON.stringify({ "id": Number(Decodificado.id)-1, "cod":props.carregarestudo.metadata.cod.toString()}),
                headers: { 'Content-Type': 'application/json' }
            });
            router.push("/plano-de-estudo")
        }else{
            SetconcluirR("Ops: Falta responder/visualizar algo =(")
        }
      }
    return(
        <div className="fixed w-full h-full left-0 top-0 justify-between flex z-20 bg-white">
            <aside className="w-1/5 h-full drop-shadow-n2xl bg-white flex flex-col">
                <div className="bg-gray-200	py-14 px-8">
                    <h1 className="font-bold text-3xl">{props.carregarestudo.metadata.title}</h1>
                    <h2>{InfoBD.resposta == "F" || filterItems(`${props.carregarestudo.metadata.cod.toString()}`).length >= namepages.length-1 ? "Concluido" : !concluirR ? "Em Aberto" : concluirR }</h2>
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
                                        <strong className='text-xl'>{namepages[n]}{filterItemsR(`${props.carregarestudo.metadata.cod.toString()}+`).length}</strong>
                                        <p>{filterItemsR(`${valordn}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F" ? "Respondido" : "Em andyamento"}</p>
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
                                        <p>{InfoBD.pagina?.split(',').indexOf(`${valordn}${props.carregarestudo.metadata.cod.toString()}`) == -1 && InfoBD.pagina != "F" ? "Em andamento" : "Visualizado"}</p>
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
                            const valordp = p
                            if(nav == '1'){
                                return(
                                    <div id={namepages[p]?.toString()} className='relative w-full h-full overflow-auto scrollbonito text-center flex flex-col items-center'>
                                        <div className='flex justify-center'>
                                            <div className='w-full h-96 absolute top-0'>
                                                {pages[p].split('{')[1] ? <Image loader={imageLoader} src={`/${pages[p].split('{')[1]}`} alt="Picture of the author" fill={true} style={{objectFit: "cover"}}/> : ""}
                                            </div>
                                            <div className={`relative max-w-4xl w-full h-full bg-white rounded-lg p-10 pb-20 ${pages[p].split('{')[1] ? "mt-44" : "mt-10"}`}>
                                                <div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:pages[p].split('{')[0]}}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            if(nav == '2'){
                                const idvideo = p
                                return(
                                    <div id={namepages[p]?.toString()} className='overflow-auto scrollbonito h-full w-full text-center'>
                                        <ReactPlayer url={pages[p]}  width='100%' height='100%' controls showinfo={0} playing={video == false ? false : video == idvideo ? true : false} onPlay={() => SetVideo(idvideo)}/>
                                    </div>
                                )
                            }
                            if(nav == '3'){
                                const squestion = pages[p].split('¹')
                                const alternativadoconsole = squestion[1].split('³')
                                const NumberOfQuestion = namepages[p].replace(/([^\d])+/gim, '');
                                const Answer= async e => {
                                    if(answer != null && answer.questao == NumberOfQuestion){
                                        const filtro = await filterItemsR(`${p}${props.carregarestudo.metadata.cod.toString()}+`)
                                        if(filtro.length <= 0){
                                            MandarView(InfoBD.pagina, `${InfoBD.resposta},${valordp}${props.carregarestudo.metadata.cod.toString()}+${answer.alternativa}`)
                                            setInfoBD({
                                                pagina: InfoBD.pagina,
                                                resposta: `${InfoBD.resposta},${valordp}${props.carregarestudo.metadata.cod.toString()}+${answer.alternativa}`
                                            })
                                        }
                                    }
                                }
                                return(
                                    <div id={namepages[p]?.toString()} className='overflow-auto scrollbonito h-full w-full text-center pb-28'>
                                        <section className='w-full bg-gray-200 flex flex-col justify-center items-center py-7'>
                                            <div className='w-3/5'>
                                                <div className='flex justify-between text-lg mb-10'>
                                                    <div className={`text-center bg-white rounded-lg py-1 w-36`}>{namepages[p]}{p}</div>
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
                                            </div> 
                                        </section>
                                        <section className={`relative flex flex-col items-center justify-center ${filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F" ? 'pointer-events-none' : ''}`}>
                                            <div className='flex w-3/5 justify-between py-10'>
                                                <div className=' flex flex-col gap-5 text-lg'>
                                                    <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg ${alternativadoconsole[1][0] > 0 && (filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F")? 'bg-blue-500 text-white' : ''}`} onClick={() => SetAnswer({questao: NumberOfQuestion,alternativa: alternativadoconsole[1]})}>
                                                        <strong>A)</strong><div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:alternativadoconsole[0]}}/>
                                                    </button>
                                                    <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg ${alternativadoconsole[3][0] > 0 && (filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F")? 'bg-blue-500 text-white' : ''}`} onClick={() => SetAnswer({questao: NumberOfQuestion,alternativa: alternativadoconsole[3]})}>
                                                        <strong>B)</strong><div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:alternativadoconsole[2]}}/>
                                                    </button>
                                                    <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg ${alternativadoconsole[5][0] > 0 && (filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F")? 'bg-blue-500 text-white' : ''}`} onClick={() => SetAnswer({questao: NumberOfQuestion,alternativa: alternativadoconsole[5]})}>
                                                        <strong>C)</strong><div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:alternativadoconsole[4]}}/>
                                                    </button>
                                                    <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg ${alternativadoconsole[7][0] > 0 && (filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F")? 'bg-blue-500 text-white' : ''}`} onClick={() => SetAnswer({questao: NumberOfQuestion,alternativa: alternativadoconsole[7]})}>
                                                        <strong>D)</strong><div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:alternativadoconsole[6]}}/>
                                                    </button>
                                                    <button className={`flex cursor-pointer py-1 focus:underline focus:scale-105 rounded-lg ${alternativadoconsole[9][0] > 0 && (filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F")? 'bg-blue-500 text-white' : ''}`} onClick={() => SetAnswer({questao: NumberOfQuestion,alternativa: alternativadoconsole[9]})}>
                                                        <strong>E)</strong><div className={`${markdownStyles['markdown']}`} dangerouslySetInnerHTML={{ __html:alternativadoconsole[8]}}/>
                                                    </button>
                                                </div>
                                                <div className='flex flex-col justify-between gap-5 ml-4'>
                                                    <button className='rounded-lg bg-blue-500 text-white p-2 font-bold h-full' onClick={() => Answer()}>RESPONDER</button>
                                                </div>
                                            </div>
                                        </section>
                                        {filterItemsR(`${valordp}${props.carregarestudo.metadata.cod.toString()}+`).length != 0 || InfoBD.resposta == "F" ?
                                            <section className='w-full h-1/2 mt-10 flex justify-center'>
                                                <div className='w-3/5'>
                                                    <h1 className='text-left text-lg font-semibold mb-5'>Resposta:</h1>
                                                    <ReactPlayer url={alternativadoconsole[10]}  width='100%' height='100%' controls showinfo={0} playing={video == false ? false : video == valordp ? true : false} onPlay={() => SetVideo(valordp)}/>
                                                </div>
                                            </section>
                                        : ""}
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
                    <a href={"#"+namepages[countpage]?.toString()} ><div className='rounded-lg bg-blue-500 text-white p-2 font-bold py-2.5 px-4' onClick={() => Contador(`${countpage != namepages.length-1 ? "+" : "c"}`)}>{countpage != namepages.length-1 ? "PROXIMO" : "CONCLUIR"}</div></a>
                </div> 
            </main>
        </div>
    )
}
export async function getStaticPaths() {
    return { paths: [], fallback: true }
  }
console.log
export async function getStaticProps(context)  {
    const conteudo = context.params.conteudo
    const materia = context.params.materia
    const carregarestudo = getContents(conteudo, materia);
    const markcontent = await markdownToHtml(carregarestudo.content || '')
    const notFound = carregarestudo.content == "erro" ? true : false;
    return {
      props: {
        carregarestudo,
        markcontent
      },
      notFound
    };
}