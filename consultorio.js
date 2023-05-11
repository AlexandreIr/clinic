//mapeia os elementos html
const form=document.querySelector('form')
const pre=document.querySelector('pre')
const h3=document.querySelector('h3')
//cria um array global
let fila=[]
//função responsavel por mostrar os pacientes na tela
const mostrarFila=()=>{
    let pacientes=''
    for(const pct of fila){
        pacientes+=pct+'\n'
    }
    pre.innerText=pacientes
    form.patientName.value=''
    form.patientName.focus()
}
//Listener do submit
form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const paciente=form.patientName.value
    fila.push(paciente)
    mostrarFila()
    //dispatch no botão invísvel
    form.infoBtn.dispatchEvent(new Event('click'))
})
//Listener do botão de emergência
form.emergencyBtn.addEventListener('click',()=>{
    if(form.patientName.value==''){
        alert('Por favor digite o nome do paciente no campo indicado')
        form.patientName.focus()
        return
    }

    const paciente=form.patientName.value
    fila.unshift(paciente)

    mostrarFila()

    form.infoBtn.dispatchEvent(new Event('click'))
})
//listener do botão de consultar, retira um nome do array
form.consultBtn.addEventListener('click', ()=>{
    if(fila.length==0){
        alert('Nâo há nenhum paciente no aguardo')
        form.patientName.focus()
        return
    }

    const consultando=fila.shift()

    h3.innerText='Paciente em consulta: '+consultando

    mostrarFila()

    form.infoBtn.dispatchEvent(new Event('click'))
})
//listener do botão invisível que salva o array em localStorage
form.infoBtn.addEventListener('click', ()=>{
    if(!localStorage.getItem('fila')) localStorage.setItem('fila', fila)

    if(localStorage.getItem('fila')){
        localStorage.removeItem('fila')
        localStorage.setItem('fila', fila)
    }
})
//Listener do carregamento da janela, recupera o localStorage se houver e joga no array vazio
window.addEventListener('load', ()=>{
    if(localStorage.getItem('fila')) {
        fila=localStorage.getItem('fila').split(',')
        mostrarFila()
    }
})