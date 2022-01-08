const fs = require('fs')
const path = require('path')

/*
//leitura de forma sincrona, trava até terminar o processamento
fs.readFile('./assets/salsicha.jpg', (erro, buffer) => {
    console.log('imagem foi bufferizada')
    console.log(buffer)

    fs.writeFile('./assets/salsicha2.jpg', buffer, (erro) =>{
        console.log('imagem foi escrita')
    })
})
*/

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    
    // mais indicado é a utilização de streams modo Assíncrono faz em paralelo
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEhValido){
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))

    } else {
        const erro = "Tipo é Inválido"
        console.log('Erro! Tipo inválido') 
        callbackImagemCriada(erro)
    }
}
