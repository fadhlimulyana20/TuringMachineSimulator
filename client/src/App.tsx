import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function App() {
  const [inputSymbols, setInputSymbols] = useState('')
  const [mode, setMode] = useState('')
  const [tape, setTape] = useState(['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b'])
  const [state, setState] = useState('q0')
  const [halted, setHalted] = useState(true)
  const [played, setPlayed] = useState(false)
  const [computing, setComputing] = useState(false)
  const [tapeString, setTapeString] = useState<Array<Array<string>>>([])
  const [accepted, setAccepted] = useState()
  const [tsidx, setTsidx] = useState(0)

  const tapeElement = tape.map((item, index) => {
    if (index === 10) {
      return (
        <div className="flex-1 w-full bg-red-100 rounded border-2 border-red-500 text-center font-medium" key={index}>{item}</div>
      )
    }
    return (
      <div className="flex-1 w-full bg-green-100 rounded border-2 border-green-500 text-center font-medium" key={index}>{item}</div>
    )
  })

  const moveTape = (tsid: number) => {
    const tape = tapeString[tsid][0].split(' ')
    setTape(tape)

    setState(tapeString[tsid][1])
  }

  const handleForward = () => {
    setTsidx(tsidx + 1)

    moveTape(tsidx)
  }

  const startCompute = async () => {
    console.log('compute...')
    try {
      const body = { input_symbols: inputSymbols, mode }
      const res = await axios.post('http://127.0.0.1:8000/turing', body)
      setTapeString(res.data.tape_string)
      setAccepted(res.data.is_accepted)

      const tape = res.data.tape_string[0][0].split(' ')
      setTape(tape)

      setState(res.data.tape_string[0][1])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      <div className="container mx-auto md:px-20 px-2 py-10">
        <h1 className="text-3xl font-bold text-center">Turing Machine Simulator</h1>
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-white shadow-lg p-3 rounded-md">
            <h1 className="text-xl font-medium mb-3">Control Panel</h1>
            <div className="mb-3">
              <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="username" >
                Language
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="language" type="text" placeholder="Insert Language, e.g 000c00" onChange={(e) => setInputSymbols(e.target.value)} value={inputSymbols} />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-md font-bold mb-2" >
                Select Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <button
                    className={`w-full ${mode === 'add' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('add')}
                  >
                    Add
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'substract' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('substract')}
                  >
                    Substract
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'multiply' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('multiply')}
                  >
                    Multiply
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'divide' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('divide')}
                  >
                    Divide
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'factorial' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('factorial')}
                  >
                    Factorial
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'mod' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('mod')}
                  >
                    Modulo
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'pow' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('pow')}
                  >
                    Power
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode === 'binlog' ? 'bg-blue-700 border-blue-900  hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('binlog')}
                  >
                    Binnary Logarithm
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button className="w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded disabled:opacity-50" onClick={() => startCompute()} disabled={computing}>
                {computing ? 'Computing' : 'Start Compute'}
              </button>
            </div>
          </div>
          <div className="bg-white shadow-lg p-3 col-span-2 rounded-md">
            <h1 className="text-xl font-medium mb-3">Simulation</h1>
            <div className="flex gap-1">
              <div className="py-2 rounded text-center bg-blue-100 border-2 border-blue-500 mb-4 w-20" id="state">
                <h1 className="text-sm text-blue-500 mb-0">State</h1>
                <h1 className="text-md font-bold text-blue-700">{state}</h1>
              </div>
              <div className="py-2 rounded text-center bg-blue-100 border-2 border-blue-500 mb-4 w-20" id="state">
                <h1 className="text-sm text-blue-500 mb-0">Halted</h1>
                <h1 className="text-md font-bold text-blue-700">{halted ? 'True' : 'False'}</h1>
              </div>
              <div className="py-2 rounded text-center bg-blue-100 border-2 border-blue-500 mb-4 w-20" id="state">
                <h1 className="text-sm text-blue-500 mb-0">Mode</h1>
                <h1 className="text-md font-bold text-blue-700">{mode}</h1>
              </div>
            </div>
            <div className="flex gap-1" id="tape">
              {tapeElement}
            </div>
            <div className="flex justify-center my-4 gap-1">
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                <FontAwesomeIcon icon={played ? faPause : faPlay} />
              </button>
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => handleForward()}>
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
