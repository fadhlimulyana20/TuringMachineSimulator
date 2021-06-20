from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
import time

from turing.turing_machine import TuringMachine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TuringInput(BaseModel):
    input_symbols: str
    mode: str
    tape_string: Optional[List[str]] = None
    is_accepted: Optional[bool] = False


def split(word):
    return [char for char in word]


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/turing")
async def create_turing(turingInput: TuringInput):
    if turingInput.mode == 'add':
        tm = TuringMachine()
        tm.additionMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'substract':
        tm = TuringMachine()
        tm.substractionMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'multiply':
        tm = TuringMachine()
        tm.multiplicationMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'divide':
        tm = TuringMachine()
        tm.divisionMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'mod':
        tm = TuringMachine()
        tm.moduloMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'pow':
        tm = TuringMachine()
        tm.powerMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'factorial':
        tm = TuringMachine()
        tm.factorialMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    elif turingInput.mode == 'binlog':
        tm = TuringMachine()
        tm.binaryMode()

        symbols = ','.join(turingInput.input_symbols)
        symbols = symbols.split(',')
        symbols_dict = {}

        for i in range(len(symbols)):
            symbols_dict[i] = symbols[i]

        tm.initialize(symbols_dict)

        timeout = time.time() + 60*5
        while not tm.halted:
            tm.print()
            tm.step()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput

    else:
        return turingInput
