import React from 'react'; // para usar a notação de classe tive que importar o react :(
import './App.css'
import {generate, password_strength} from './password-gen/generator.js'
import Slider from './Slider';
// mudei a função App para uma classe pois acho que fica um pouco mais organizado
class App extends React.Component{
  constructor(props){
    super(props);
    //state guarda todas as informações necessárias para gerar a senha
    this.state = {
      strenght_value:'',
      len:10,
      password:"P4$5W0rD!", 
      strength:-1,
      lowercase:false,
      uppercase:false,
      numbers:false,
      symbols:false};
  }

  handleSliderChange = (value) => {
    this.setState({ len: value });
  }

  // função que lida com o clique no botão "generate" e atualiza a força da senha
  handle_generate_click = () =>{
    if (!this.state.uppercase && !this.state.lowercase && !this.state.numbers && !this.state.symbols) {
      this.setState({password:"P4$5W0rD!"});
      document.getElementById('password').style.color = '#464652';
      this.setState({strength:-1});
      this.enable_bars(-1);
    }
    else {
      const new_pass = generate(this.state.len, this.state.uppercase, this.state.lowercase, this.state.numbers, this.state.symbols);
      this.setState({password:new_pass});
      const p_strength = password_strength(new_pass);
      this.setState({strength:p_strength});
      this.enable_bars(p_strength);
      // para trocar a cor do placeholder pela da senha ao gerar a primeira vez
      document.getElementById('password').style.color = '#dadada';
    }
  }
  
  // mudança da força de acordo com a senha e demorando por 50 milisegundos
  enable_bars = (p_strength) => {
    if (p_strength == -1) {
      document.getElementById('barra1').style.background = 'none';
      document.getElementById('barra2').style.background = 'none';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:""});
    }
    else if (p_strength == 0) {
      document.getElementById('barra1').style.background = 'none';
      document.getElementById('barra2').style.background = 'none';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"inexistent"});
    }
    else if (p_strength == 1) {
      document.getElementById('barra1').style.backgroundColor = 'green';
      document.getElementById('barra2').style.background = 'none';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"very easy"});
    }
    else if (p_strength == 2) {
      document.getElementById('barra1').style.backgroundColor = 'green';
      document.getElementById('barra2').style.backgroundColor = 'green';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"easy"});
    }
    else if (p_strength == 3) {
      document.getElementById('barra1').style.backgroundColor = 'yellow';
      document.getElementById('barra2').style.backgroundColor = 'yellow';
      document.getElementById('barra3').style.backgroundColor = 'yellow';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"medium"});
    }
    else if (p_strength == 4) {
      document.getElementById('barra1').style.backgroundColor = 'red';
      document.getElementById('barra2').style.backgroundColor = 'red';
      document.getElementById('barra3').style.backgroundColor = 'red';
      document.getElementById('barra4').style.backgroundColor = 'red';
      this.setState({strenght_value:"hard"});
    }
  }

  // lida com as checkboxes
  change_checkbox = (event) => {
    this.setState({[event.target.getAttribute("checkbox-type")]:event.target.checked});
  }

  // copia a senha gerada
  clipboardCopy = () => {
    let password = document.querySelector("#password").innerHTML;
    if (password === "Error") {
      alert('A senha não foi gerada corretamente.');
      return; 
    }
  
    setTimeout(() => {
      navigator.clipboard.writeText(password)
        .then(() => {
          alert('Senha copiada para a área de transferência!');
        })
        .catch(err => {
          console.error('Erro ao copiar a senha: ', err);
          alert('Erro ao copiar a senha. Por favor, tente novamente.');
        });
    }, 100);
  }

  render(){
    return (
      // troquei alguns dos textos placeholder por referencias ao state
      // falta colocar referencias ao state nas checkboxes
      <div className='screen'>
        <h1>Password Generator</h1>
  
        <div className='screen-middle'>
          {/* tipo aqui embaixo é uma referencia ao state agora */}
          <h2 id='password'>{this.state.password}</h2>
          <button className='img-btn' onClick={this.clipboardCopy}><img src="\img-copiar.png" alt="img" className='img' /></button>
        </div>
  
        {/* todas as classes de caracter eu coloquei em português, porque acho difícil escrever em inglês */}
        <div className='screen-bottom'>
          <div className='caracteres'>
            <div className='caracteres-top'>
              <p className='caracter-length'>Character Length</p>
              <h3>{this.state.len}</h3>
            </div>
            <div className='caracteres-bottom'>
            <Slider 
                min={0} 
                max={20} 
                value={this.state.len} 
                onChange={this.handleSliderChange} 
              />
            </div>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' checkbox-type="uppercase" onClick={this.change_checkbox} />
            <p>Include Uppercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' checkbox-type="lowercase" onClick={this.change_checkbox} />
            <p>Include Lowercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' checkbox-type="numbers" onClick={this.change_checkbox} />
            <p>Include Numbers</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' checkbox-type="symbols" onClick={this.change_checkbox} />
            <p>Include Symbols</p>
          </div>
          <div className='strenght'>
            <h4>Strenght</h4>
            <div className='strenght-right'>
              <h5 id='strenght-value'>{this.state.strenght_value}</h5>
              <div className='barra' id='barra1'></div>
              <div className='barra' id='barra2'></div>
              <div className='barra' id='barra3'></div>
              <div className='barra' id='barra4'></div>
            </div>
          </div>
          <button className='generate-btn' onClick={this.handle_generate_click}>Generate</button>
        </div>
      </div>
    )
  }
}

export default App
