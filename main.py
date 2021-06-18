from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel
import time

from turing.turing_machine import TuringMachine

app = FastAPI()


class TuringInput(BaseModel):
    input_symbols: str
    mode: str
    tape_string: Optional[list[str]] = None
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
            tm.step()
            tm.print()

        if tm.accepted_input():
            turingInput.is_accepted = True
            turingInput.tape_string = tm.tape_string

        return turingInput
