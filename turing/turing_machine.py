import time
from collections import defaultdict
from dataclasses import dataclass, field
from typing import DefaultDict, Dict, List, Set, Tuple


@dataclass
class TuringMachine:
    states: Set[str] = field(init=False)
    symbols: Set[str] = field(init=False)
    blank_symbol: str = field(init=False)
    input_symbols: Set[str] = field(init=False)
    initial_state: str = field(init=False)
    accepting_states: Set[str] = field(init=False)
    transitions: Dict[Tuple[str, str],
                      Tuple[str, str, int]] = field(init=False)
    # state, symbol -> new state, new symbol, direction

    head: int = field(init=False)
    tape: DefaultDict[int, str] = field(init=False)
    current_state: str = field(init=False)
    halted: bool = field(init=False, default=True)

    tape_string: List[Tuple[str, str]] = field(init=False)

    def initialize(self, input_symbols: 'dict[int, str]'):
        self.head = 0
        self.halted = False
        self.current_state = self.initial_state
        self.tape = defaultdict(lambda: self.blank_symbol, input_symbols)
        self.tape_string = []

    def additionMode(self):
        self.states = {'q0', 'q1', 'q2', 'q3', 'q4', 'q5'}
        self.symbols = {'0', 'c', 'b', 'x'}
        self.blank_symbol = 'b'
        self.input_symbols = {'0', 'c'}
        self.initial_state = 'q0'
        self.accepting_states = {'q5'}
        self.transitions = {('q0', '0'): ('q1', 'x', 1),
                            ('q1', '0'): ('q1', '0', 1),
                            ('q1', 'c'): ('q2', 'c', 1),
                            ('q2', '0'): ('q2', '0', 1),
                            ('q2', 'b'): ('q3', '0', -1),
                            ('q3', '0'): ('q3', '0', -1),
                            ('q3', 'c'): ('q4', 'c', -1),
                            ('q4', '0'): ('q4', '0', -1),
                            ('q4', 'x'): ('q0', 'x', 1),
                            ('q0', 'c'): ('q5', 'b', 1), }

    def substractionMode(self):
        self.states = {'q0', 'q1', 'q2', 'q3',
                       'q4', 'q5', 'q6', 'q7', 'q8', 'q9'}
        self.symbols = {'0', 'c', 'b', 'x'}
        self.blank_symbol = 'b'
        self.input_symbols = {'0', 'c'}
        self.initial_state = 'q0'
        self.accepting_states = {'q9'}
        self.transitions = {('q0', 'b'): ('q1', 'b', 1),
                            ('q0', '0'): ('q1', '0', 0),
                            ('q1', '0'): ('q2', 'b', 1),
                            ('q2', '0'): ('q2', '0', 1),
                            ('q2', 'c'): ('q3', 'c', 1),
                            ('q3', '0'): ('q3', '0', 1),
                            ('q3', 'b'): ('q4', 'b', -1),
                            ('q4', '0'): ('q5', 'b', -1),
                            ('q5', '0'): ('q6', '0', -1),
                            ('q5', 'c'): ('q9', 'b', 0),
                            ('q6', '0'): ('q6', '0', -1),
                            ('q6', 'c'): ('q7', 'c', -1),
                            ('q7', '0'): ('q8', '0', -1),
                            ('q7', 'b'): ('q9', 'b', 0),
                            ('q8', '0'): ('q8', '0', -1),
                            ('q8', 'b'): ('q1', 'b', 1)}

    def multiplicationMode(self):
        self.states = {'q0', 'q1', 'q2', 'q3',
                       'q4', 'q5', 'q6', 'q7'}
        self.symbols = {'1', '0', 'b', 'x'}
        self.blank_symbol = 'b'
        self.input_symbols = {'0', '1'}
        self.initial_state = 'q0'
        self.accepting_states = {'q7'}
        self.transitions = {('q0', '0'): ('q1', 'b', 1),
                            ('q0', '1'): ('q6', 'b', 1),
                            ('q1', '0'): ('q1', '0', 1),
                            ('q1', '1'): ('q2', '1', 1),
                            ('q2', '0'): ('q3', 'x', 1),
                            ('q2', '1'): ('q5', '1', -1),
                            ('q3', '0'): ('q3', '0', 1),
                            ('q3', '1'): ('q3', '1', 1),
                            ('q3', 'b'): ('q4', '0', -1),
                            ('q4', '0'): ('q4', '0', -1),
                            ('q4', '1'): ('q4', '1', -1),
                            ('q4', 'x'): ('q2', 'x', 1),
                            ('q5', '0'): ('q5', '0', -1),
                            ('q5', '1'): ('q5', '1', -1),
                            ('q5', 'x'): ('q5', '0', -1),
                            ('q5', 'b'): ('q0', 'b', 1),
                            ('q6', '0'): ('q6', 'b', 1),
                            ('q6', '1'): ('q7', 'b', 1)}

    def divisionMode(self):
        self.states = {'s0', 's1', 's2', 's3',
                       's4', 's5', 's6', 's7', 's8', 's9', }
        self.symbols = {'1', 'c', 'e', 'z', 'b'}
        self.blank_symbol = 'b'
        self.input_symbols = {'1', 'c'}
        self.initial_state = 's0'
        self.accepting_states = {'s9'}
        self.transitions = {('s0', '1'): ('s1', 'b', 1),
                            ('s0', 'c'): ('s8', 'b', 1),
                            ('s1', '1'): ('s1', '1', 1),
                            ('s1', 'c'): ('s2', 'c', 1),
                            ('s2', '1'): ('s2', '1', 1),
                            ('s2', 'e'): ('s2', 'e', 1),
                            ('s2', 'z'): ('s3', 'z', -1),
                            ('s2', 'b'): ('s3', 'b', -1),
                            ('s3', '1'): ('s4', 'e', -1),
                            ('s3', 'e'): ('s3', 'e', -1),
                            ('s4', '1'): ('s6', '1', -1),
                            ('s4', 'c'): ('s5', 'c', 1),
                            ('s5', 'e'): ('s5', '1', 1),
                            ('s5', 'z'): ('s5', 'z', 1),
                            ('s5', 'b'): ('s6', 'z', -1),
                            ('s6', '1'): ('s6', '1', -1),
                            ('s6', 'c'): ('s7', 'c', -1),
                            ('s6', 'z'): ('s6', 'z', -1),
                            ('s7', '1'): ('s7', '1', -1),
                            ('s7', 'b'): ('s0', 'b', 1),
                            ('s8', '1'): ('s8', 'b', 1),
                            ('s8', 'z'): ('s8', '1', 1),
                            ('s8', 'b'): ('s9', 'b', 0)}

    def step(self):
        if self.halted:
            raise RuntimeError('Cannot step halted machine')

        try:
            state, symbol, direction = self.transitions[(
                self.current_state, self.tape[self.head])]
        except KeyError:
            self.halted = True
            return

        self.tape[self.head] = symbol
        self.current_state = state
        self.head += direction

    def accepted_input(self):
        if not self.halted:
            raise RuntimeError('Machine still running')
        return self.current_state in self.accepting_states

#   def print(self, window=10):
#         print('... ', end='')
#         print(' '.join(self.tape[i] for i in range(self.head - window, self.head + window + 1)), end='')
#         print(f' ... state={self.current_state}')
#         print(f'{" " * (2 * window + 4)}^')

    def print(self, window=10):
        # print('... ', end='')
        # print(' '.join(self.tape[i] for i in range(
        #     self.head - window, self.head + window + 1)), end='')
        tape = ' '.join(self.tape[i] for i in range(
            self.head - window, self.head + window + 1))
        tape_state = (tape, self.current_state)
        self.tape_string.append(tape_state)

        # print(f' ... state={self.current_state}')
        # print(f'{" " * (2 * window + 4)}^')


# if __name__ == '__main__':
#     # tm = TuringMachine(states={'a', 'b', 'c', 'H'},
#     #                    symbols={'0', '1'},
#     #                    blank_symbol='0',
#     #                    input_symbols={'1'},
#     #                    initial_state='a',
#     #                    accepting_states={'H'},
#     #                    transitions={('a', '0'): ('b', '1', 1),
#     #                                 ('a', '1'): ('c', '1', -1),
#     #                                 ('b', '0'): ('a', '1', -1),
#     #                                 ('b', '1'): ('b', '1', 1),
#     #                                 ('c', '0'): ('b', '1', -1),
#     #                                 ('c', '1'): ('H', '1', 1),
#     #                                 }
#     #                    )

#     tm = TuringMachine()
#     tm.divisionMode()

#     tm.initialize({0: '1', 1: '1', 2: '1', 3: '1', 4: 'c', 5: '1', 6: '1'})

#     while not tm.halted:
#         tm.print()
#         tm.step()
#         # time.sleep(1)

#     print('Accepted : ', tm.accepted_input())
#     # print(tm.tape_string)
