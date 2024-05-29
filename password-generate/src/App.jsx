import React from 'react'; // para usar a notação de classe tive que importar o react :(
import './App.css'
import {generate, password_strength} from './password-gen/generator.js'

// mudei a função App para uma classe pois acho que fica um pouco mais organizado
class App extends React.Component{
  constructor(props){
    super(props);
    //state guarda todas as informações necessárias para gerar a senha
    this.state = {
      strenght_value:'',
      len:10,
      password:"P4$5W0rD!", 
      strength:0,
      lowercase:false,
      uppercase:false,
      numbers:false,
      symbols:false};
  }

  // função que lida com o clique no botão "generate" e atualiza a força da senha
  handle_generate_click = () =>{
    if (this.clique_lowercase == 0 && this.clique_uppercase == 0 && this.clique_numbers == 0 && this.clique_symbols == 0){
      this.setState ({password:"Error"});
    } else {
      this.setState({
        password:generate(this.state.len, this.state.uppercase, this.state.lowercase, this.state.numbers, this.state.symbols)
      });
    }
    this.setState({
      strength:password_strength(this.state.password)
    });

    if (this.state.strength == 1) {
      document.getElementById('barra1').style.backgroundColor = 'green';
      document.getElementById('barra2').style.background = 'none';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"very easy"});
    } else if (this.state.strength == 2) {
      document.getElementById('barra1').style.backgroundColor = 'green';
      document.getElementById('barra2').style.backgroundColor = 'green';
      document.getElementById('barra3').style.background = 'none';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"easy"});
    } else if (this.state.strength == 3) {
      document.getElementById('barra1').style.backgroundColor = 'yellow';
      document.getElementById('barra2').style.backgroundColor = 'yellow';
      document.getElementById('barra3').style.backgroundColor = 'yellow';
      document.getElementById('barra4').style.background = 'none';
      this.setState({strenght_value:"medium"});
    } else if (this.state.strength == 4) {
      document.getElementById('barra1').style.backgroundColor = 'red';
      document.getElementById('barra2').style.backgroundColor = 'red';
      document.getElementById('barra3').style.backgroundColor = 'red';
      document.getElementById('barra4').style.backgroundColor = 'red';
      this.setState({strenght_value:"hard"});
    }

  // para trocar a cor do placeholder pela da senha ao gerar a primeira vez
    document.getElementById('password').style.color = '#dadada';
  }
  
  // conexão dos states com os checkboxes
  clique_uppercase = 0;       //uppercase
  chk_Uppercase = () => {
    if (this.clique_uppercase == 0){
      this.setState({ uppercase:true });
      this.clique_uppercase = 1;
    } else {
      this.setState({ uppercase:false });
      this.clique_uppercase = 0
    }
  }

  clique_lowercase = 0;       //lowercase
  chk_Lowercase = () => {
    if (this.clique_lowercase == 0){
      this.setState({ lowercase:true });
      this.clique_lowercase = 1;
    } else {
      this.setState({ lowercase:false });
      this.clique_lowercase = 0
    }
  }

  clique_numbers = 0;        //numbers
  chk_Numbers = () => {
    if (this.clique_numbers == 0){
      this.setState({ numbers:true });
      this.clique_numbers = 1;
    } else {
      this.setState({ numbers:false });
      this.clique_numbers = 0
    }
  }

  clique_symbols = 0;        //symbols
  chk_Symbols = () => {
    if (this.clique_symbols == 0){
      this.setState({ symbols:true });
      this.clique_symbols = 1;
    } else {
      this.setState({ symbols:false });
      this.clique_symbols = 0
    }
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
          <button className='img-btn'><img src="\img-copiar.png" alt="img" className='img' /></button>
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
            <input type="checkbox" className='chk' onClick={this.chk_Uppercase} />
            <p>Include Uppercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' onClick={this.chk_Lowercase} />
            <p>Include Lowercase Letters</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' onClick={this.chk_Numbers} />
            <p>Include Numbers</p>
          </div>
          <div className='includes'>
            <input type="checkbox" className='chk' onClick={this.chk_Symbols} />
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
