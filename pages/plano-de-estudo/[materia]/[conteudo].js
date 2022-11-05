import markdownToHtml from '../../../script/markdownToHtml'
import { getContents } from '../../../script/getContent'
import markdownStyles from '../../../components/markdown-styles.module.css'
export default function PlainStudy(props){
    return(
        <div>
            <h1>{props.conteudo}</h1>
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
    var markcontent = ''
    const conteudo = context.params.conteudo
    const materia = context.params.materia
    const arrymateria = ['Matemática', 'Português', 'Biologia', 'Geografia', 'História', 'Química', 'Física', 'Filosofia',' Sociologia']
    if(arrymateria.indexOf(materia) != 1){
        const carregarestudo = getContents(conteudo, materia);
        markcontent = await markdownToHtml(carregarestudo.content || '')
    }
    return {
      props: {
        conteudo,
        materia
      },
    };
}