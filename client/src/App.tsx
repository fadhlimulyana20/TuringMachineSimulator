import React, { useEffect, useState } from 'react';
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
  const [accepted, setAccepted] = useState(false)
  const [tsidx, setTsidx] = useState(0)
  const [guide, setGuide] = useState<any>()

  const addGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4, q5]</li>
      <li className="list-disc list-inside">Symbols : [0, c, b, x]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [0, c]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q5]</li>
      <li className="list-disc list-inside">e.g 000c00, c is a delimeter</li>
    </ul>
  )

  const substractGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9]</li>
      <li className="list-disc list-inside">Symbols : [0, c, b, x]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [0, c]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q9]</li>
      <li className="list-disc list-inside">e.g 0000c00, c is a delimeter</li>
    </ul>
  )

  const multiplytGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4, q5, q6, q7]</li>
      <li className="list-disc list-inside">Symbols : [1, 0, b, x]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [0, 1]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q7]</li>
      <li className="list-disc list-inside">e.g 0001001, 1 is a delimeter</li>
    </ul>
  )

  const divideGuide = (
    <ul>
      <li className="list-disc list-inside">State : [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9]</li>
      <li className="list-disc list-inside">Symbols : [1, c, e, z, b]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [1, c]</li>
      <li className="list-disc list-inside">Initial State : [s0]</li>
      <li className="list-disc list-inside">Accepting state : [s0]</li>
      <li className="list-disc list-inside">e.g 1111c11, c is a delimeter</li>
    </ul>
  )

  const factorialGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4 q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25]</li>
      <li className="list-disc list-inside">Symbols : [0, 1, b, x]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [0]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q24]</li>
      <li className="list-disc list-inside">e.g 0000, it's mean 4!</li>
    </ul>
  )

  const modGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4 q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21]</li>
      <li className="list-disc list-inside">Symbols : [0, c, x, y, b]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [0, c]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q19]</li>
      <li className="list-disc list-inside">e.g 000c000, it's mean 3mod3</li>
    </ul>
  )

  const powGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4 q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17, q18, q19, q20, q21, q22, q23, q24, q25, q26, q27, q28, q29, q30, q31, q32]</li>
      <li className="list-disc list-inside">Symbols : [1, x, b, y, c]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [1, c]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q32]</li>
      <li className="list-disc list-inside">e.g 111c11, it's mean 3^2</li>
    </ul>
  )

  const binlogGuide = (
    <ul>
      <li className="list-disc list-inside">State : [q0, q1, q2, q3, q4 q5, q6, q7, q8, q9, q10, q11, q12]</li>
      <li className="list-disc list-inside">Symbols : [1, 0, x, b]</li>
      <li className="list-disc list-inside">Blank Symbol : b</li>
      <li className="list-disc list-inside">Input Symbol : [1]</li>
      <li className="list-disc list-inside">Initial State : [q0]</li>
      <li className="list-disc list-inside">Accepting state : [q12]</li>
      <li className="list-disc list-inside">e.g 11</li>
    </ul>
  )

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


    if (tsidx == tapeString.length - 1) {
      setHalted(true)
    } else {
      setHalted(false)
    }
  }

  const handleForward = (e: any) => {
    e.preventDefault()
    if (tsidx < tapeString.length - 1) {
      setTsidx(tsidx + 1)
    }

    moveTape(tsidx)
  }

  const handleBackward = (e: any) => {
    e.preventDefault()
    if (tsidx > 0) {
      setTsidx(tsidx - 1)
    }

    moveTape(tsidx)
  }

  useEffect(() => {
    let interval: any
    if (played && tapeString && tsidx < tapeString.length) {
      interval = setInterval(() => {
        setTsidx(tsidx + 1)
        console.log(tsidx)
        moveTape(tsidx)
      }, 1000)
    } else {
      clearInterval(interval);
      setPlayed(false)
    }
    return () => clearInterval(interval)
  }, [tsidx, played])

  useEffect(() => {
    if (mode === 'add') {
      setGuide(addGuide)
    } else if (mode === 'substract') {
      setGuide(substractGuide)
    } else if (mode === 'multiply') {
      setGuide(multiplytGuide)
    } else if (mode === 'divide') {
      setGuide(divideGuide)
    } else if (mode === 'factorial') {
      setGuide(factorialGuide)
    } else if (mode === 'mod') {
      setGuide(modGuide)
    } else if (mode === 'pow') {
      setGuide(powGuide)
    } else if (mode === 'binlog') {
      setGuide(binlogGuide)
    } else {
      setGuide(null)
    }
  }, [mode])

  const startCompute = async () => {
    console.log('compute...')
    try {
      setComputing(true)
      const body = { input_symbols: inputSymbols, mode }
      const res = await axios.post('http://127.0.0.1:8000/turing', body)
      setTapeString(res.data.tape_string)
      setAccepted(res.data.is_accepted)

      if (res.data.tape_string) {
        const tape = res.data.tape_string[0][0].split(' ')
        setTape(tape)
        setState(res.data.tape_string[0][1])
        setHalted(false)
      }

      setTsidx(0)
    } catch (e) {
      console.log(e)
    } finally {
      setComputing(false)
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
              <div className={`py-2 rounded text-center ${accepted ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-2 mb-4 w-20`} id="state">
                <h1 className={`text-sm ${accepted ? 'text-green-500' : 'text-red-500'} mb-0`}>Accepted</h1>
                <h1 className={`text-md font-bold ${accepted ? 'text-green-700' : 'text-red-700'}`}>{accepted ? 'yes' : 'no'}</h1>
              </div>
            </div>
            <div className="flex gap-1" id="tape">
              {tapeElement}
            </div>
            <div className="flex justify-center my-4 gap-1">
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={handleBackward}>
                <FontAwesomeIcon icon={faBackward} />
              </button>
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={() => setPlayed(!played)}>
                <FontAwesomeIcon icon={played ? faPause : faPlay} />
              </button>
              <button className="w-20 bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded" onClick={handleForward}>
                <FontAwesomeIcon icon={faForward} />
              </button>
            </div>
            <div className="bg-yellow-100 py-3 px-5 rounded">
              <h1 className="text-md font-medium">Guide</h1>
              {guide}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
