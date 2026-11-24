import { strictEqual } from 'node:assert/strict'
import tone, { symbols } from './index.js'

// The labialized and aspirated sonorants, and the aspirated palatalized
// and labialized stops, that talk writes for Bantu, Caucasian and Igbo
// clusters. Each draws with the marks of its siblings already in the
// table: a letter whose palatal mark is `3` (`my~` `m3`) is labialized
// `33` and aspirated `%`; one whose palatal mark is `5` (`ly~` `l5`) is
// labialized `55` and aspirated `^`; a dotted letter (`H` `h5`, `K` `k6`)
// keeps its dot first (`Hw~` `h533`, `Kh~` `k6%`).
const EXPECTED: [string, string][] = [
  ['mw~a', 'm33a'],
  ['nw~a', 'n33a'],
  ['nw~h~a', 'n%33a'],
  ['ny~h~a', 'n%3a'],
  ['qw~a', 'q33a'],
  ['qw~h~a', 'q%33a'],
  ['qh~a', 'q%a'],
  ['rw~a', 'r33a'],
  ['rw~h~a', 'r%33a'],
  ['lw~a', 'l55a'],
  ['py~h~a', 'p%3a'],
  ['by~h~a', 'b^5a'],
  ['dzw~h~a', 'dz%33a'],
  ['txw~h~a', 'tx^55a'],
  ['Sw~a', 's533a'],
  ['Zw~a', 'z633a'],
  ['Zh~a', 'z6%a'],
  ['fh~a', 'f%a'],
  ['vh~a', 'v^a'],
  ['yh~a', 'y%a'],
  ['wh~a', 'w^a'],
  // Unchanged neighbors.
  ['nya', 'nya'],
  ['ny~a', 'n3a'],
  ['nwa', 'nwa'],
  ['Za', 'z6a'],
]

for (const [text, font] of EXPECTED) {
  strictEqual(tone(text), font, text)
}

make('byu^dy')
make('diU--U-m')
make('ky~O!n')
// make('ny~O-O+')
// make('uu--u-y')
// make('e-Qi-Qo$-')
// make('a-a+fa+')
// make('a-a-kpo$&-')
// make('a-a+ri&+')
// make('aa+si-ki+')
// make('a+a+si-kiri-imu-')
// make('aa+xa+a-ita-')
// make('a-a-wE-')
// make('a-a-yo-')
// make('Omo$&lE-')
// make('ya-u+ya-u+u-')
// make('ka@ga@sh~Uqdjy~a@')
// make('ka@_ga@hha@da@')
// make('ka@ga@VoVo')
// make('sa!a--a-w')
// make("sO-!O--p'!")
// make('oia')
// make('oyawi')
// make('blartxUnnak')
// make('sOfIstUkeytId')
// make('suprkAlUfrAdjUlIstIkEkspiAlOdoxOs')
// make('spri^qkl')

console.log(symbols)

function make(a: string) {
  console.log('text => ' + a)
  console.log('  font => ' + tone(a))
}
