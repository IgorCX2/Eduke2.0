import fs from 'fs';
import grayMatter from 'gray-matter';
export function getContents(conteudo, materia){
    try{
        const fileContent = fs.readFileSync(`./_content/PlanoDeEstudos/${materia}/${conteudo}.md`, 'utf-8')
        const { content, data: metadata } = grayMatter(fileContent);
        var metadado = metadata
        var conteu = content
    }catch(err){
        var metadado = "eroo"
        var conteu ="erro"
    }
    return{
        metadata:{
            ...metadado, 
        },
        content: conteu
    }
}