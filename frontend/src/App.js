import './App.css';
import { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('');
  const [resultado, setResultado] = useState('');
  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: 'Archivo 1',
      content: '',
    },
  ]);

  const handleFileOpen = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target.result;
        setCode(fileContent);
      };

      reader.readAsText(file);
    }
  };

  function analizar() {
    axios.post('http://localhost:5000/analizar', {
      entrada: code,
    })
      .then(function (response) {
        console.log(response);
        setResultado(response.data.resultado);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function analizar2() {
    axios.get('http://localhost:5000/CrearAST')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="navbar">
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileOpen}
          />
          <Button
            className="boton custom-button"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Abrir Archivo
          </Button>
          <Dropdown>
            <Dropdown.Toggle className="boton custom-button" id="dropdown-basic">
              Archivo
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="abrir">Abrir</Dropdown.Item>
              <Dropdown.Item eventKey="nuevo">Nuevo</Dropdown.Item>
              <Dropdown.Item eventKey="guardar">Guardar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button className="boton custom-button" onClick={analizar}>
            Analizar
          </Button>
        </div>

        <div className="editores">
          <div className="containerE">
            <div className="editor1">
              <MonacoEditor
                width="700"
                height="600"
                language="javascript"
                value={code}
                options={{ minimap: { enabled: false } }}
                onChange={setCode}
              />
            </div>
            <div className="editor2">
              <MonacoEditor
                width="700"
                height="600"
                language="javascript"
                value={resultado}
                options={{ readOnly: true }}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
