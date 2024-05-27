import './App.css'

function App() {

  return (
    <div className='screen'>
      <h1>Password Generator</h1>

      <div className='screen-middle'>
        <h2>434324234</h2>
        <button>copy</button>
      </div>

      {/* todas as classes de caracter eu coloquei em português, porque acho difícil escrever em inglês */}
      <div className='screen-bottom'>
        <div className='caracteres'>
          <div className='caracteres-top'>
            <p className='caracter-length'>Character Length</p>
            <h3>10</h3>
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
          <div className='strenght-right'>nível</div>
        </div>
        <button className='generate-btn'>Generate</button>
      </div>
    </div>
  )
}

export default App
