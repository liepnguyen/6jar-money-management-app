export const enum CALC_KEY {
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Divide = '/',
  Multiply = '*',
  Plus = '+',
  Minus = '-',
  Del = 'DEL',
  Clear = 'C',
  TripleZero = '000',
  Dot = '.',
  Equal = '='
}

export const NUMBER_KEY = {
	[CALC_KEY.Zero]: 1,
	[CALC_KEY.TripleZero]: 1,
	[CALC_KEY.One]: 1,
	[CALC_KEY.Two]: 1,
	[CALC_KEY.Three]: 1,
	[CALC_KEY.Four]: 1,
	[CALC_KEY.Five]: 1,
	[CALC_KEY.Six]: 1,
	[CALC_KEY.Seven]: 1,
	[CALC_KEY.Eight]: 1,
	[CALC_KEY.Nine]: 1,
}

export const OP_KEY = {
	[CALC_KEY.Plus]: 1,
	[CALC_KEY.Minus]: 1,
	[CALC_KEY.Multiply]: 1,
	[CALC_KEY.Divide]: 1,
}

