import React, { useState } from 'react';

function App() {
  const [mode, setMode] = useState('')

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
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="language" type="text" placeholder="Insert Language, e.g 000c00" />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 text-md font-bold mb-2" >
                Select Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <button
                    className={`w-full ${mode == 'add' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('add')}
                  >
                    Add
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'substract' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('substract')}
                  >
                    Substract
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'multiply' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('multiply')}
                  >
                    Multiply
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'divide' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('divide')}
                  >
                    Divide
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'factorial' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('factorial')}
                  >
                    Factorial
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'mod' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('mod')}
                  >
                    Modulo
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'pow' ? 'bg-blue-700 border-blue-900 hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('pow')}
                  >
                    Power
                  </button>
                </div>
                <div>
                  <button
                    className={`w-full ${mode == 'binlog' ? 'bg-blue-700 border-blue-900  hover:bg-blue-600' : 'bg-blue-500 border-blue-700 hover:bg-blue-400'} text-white font-medium py-2 px-4 border-b-4 hover:border-blue-500 rounded`}
                    onClick={() => setMode('binlog')}
                  >
                    Binnary Logarithm
                  </button>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <button className="w-full bg-green-500 hover:bg-green-400 text-white font-medium py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                Start Compute
              </button>
            </div>
          </div>
          <div className="bg-white shadow-lg p-3 col-span-2 rounded-md">
            <h1 className="text-xl font-medium">Simulation</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
