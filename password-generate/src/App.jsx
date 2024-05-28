import React from 'react'; // para usar a notação de classe tive que importar o react :(
import './App.css'
import {generate, password_strength} from './password-gen/generator.js'

// mudei a função App para uma classe pois acho que fica um pouco mais organizado
class App extends React.Component{
  constructor(props){
    super(props);
    //state guarda todas as informações necessárias para gerar a senha
    this.state = {
      len:10,
      password:"P4$5W0rD!", 
      strength:0,
      lowercase:true,
      uppercase:true,
      numbers:true,
      symbols:true};
  }

  // função que lida com o clique no botão "generate" e atualiza a força da senha
  handle_generate_click = () =>{
    this.setState({
      password:generate(this.state.len, this.state.uppercase, this.state.lowercase, this.state.numbers, this.state.symbols)
    });
    this.setState({
      strength:password_strength(this.state.password)
    });
  }

  render(){
    return (
      // troquei alguns dos textos placeholder por referencias ao state
      // falta colocar referencias ao state nas checkboxes
      <div className='screen'>
        <h1>Password Generator</h1>
  
        <div className='screen-middle'>
          {/* tipo aqui embaixo é uma referencia ao state agora */}
          <h2>{this.state.password}</h2>
          <button className='img-btn'><img src="\public\img-copiar.png" alt="img" className='img' /></button>
        </div>
  
        {/* todas as classes de caracter eu coloquei em português, porque acho difícil escrever em inglês */}
        <div className='screen-bottom'>
          <div className='caracteres'>
            <div className='caracteres-top'>
              <p className='caracter-length'>Character Length</p>
              <h3>{this.state.len}</h3>
            </div>
            <div className='caracteres-bottom'>
              <p>barra para selecionar o tamanho</p>
            </div>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' />
            <p>Include Uppercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' />
            <p>Include Lowercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' />
            <p>Include Numbers</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' />
            <p>Include Symbols</p>
          </div>
          <div className='strenght'>
            <h4>Strenght</h4>
            <div className='strenght-right'>{this.state.strength}</div>
          </div>
          <button className='generate-btn' onClick={this.handle_generate_click}>Generate</button>
        </div>
      </div>
    )
  }
}

export default App
