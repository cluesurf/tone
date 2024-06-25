import fsp from 'fs/promises'
import { SYMBOLS, Link } from '../index.js'

make()

async function make() {
  const text: Array<string> = []

  text.push(`c Tone Text Keyboard
store(&version) '17.0'
store(&name) 'Tone'
store(&copyright) '© 2024 TermSurf'
store(&message) 'Keyboard originally created by TermSurf'
store(&bitmap) 'tone.ico'
store(&targets) 'windows macosx linux web'
store(&keyboardversion) '1.0'

begin Unicode > use(main)

group(main) using keys`)

  SYMBOLS.forEach(x => {
    // digits.
    if (x.i.match(/^\d$/)) {
      text.push(`+ '${x.i}' > ${uo(x)} ${c(x)}`)
    } else if (x.i.match(/\+\+|\-\-|\+|\-/)) {
      text.push(`'${x.i}' + [K_TAB] > ${uo(x)} ${c(x)}`)
    } else if (x.i.match(/y~h~/)) {
      text.push(
        `'${x.i.replace('y~h~', '')}YH' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/w~h~/)) {
      text.push(
        `'${x.i.replace('w~h~', '')}WH' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/w~/)) {
      text.push(
        `'${x.i.replace('w~', '')}W' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/\*h~$/)) {
      text.push(
        `'${x.i.replace('h~', '')}H' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/h~/)) {
      text.push(
        `'${x.i.replace('h~', '')}H' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/h!/)) {
      text.push(
        `'${x.i.replace('h!', '')}H!' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/G~/)) {
      text.push(
        `'${x.i.replace('G~', '')}G' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/Q~/)) {
      text.push(
        `'${x.i.replace('Q~', '')}Q' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i.match(/h~/)) {
      text.push(
        `'${x.i.replace('h~', '')}H' + [K_TAB] > ${uo(x)} ${c(x)}`,
      )
    } else if (x.i === "'") {
      text.push(`+ [K_QUOTE] > ${uo(x)} ${c(x)}`)
    } else if (x.i.startsWith("'")) {
      text.push(
        `${ui(x)} + [K_TAB] > ${[...x.o].map(toUnicode).join(' ')} ${c(
          x,
        )}`,
      )
    } else if (x.i.match(/_$/)) {
      text.push(`'${x.i}' + [K_TAB] > ${uo(x)} ${c(x)}`)
    } else if (x.i.match(/[\!\?\.\@]$/)) {
      text.push(`'${x.i}' + [K_TAB] > ${uo(x)} ${c(x)}`)
    } else if (x.i.match(/\*$/)) {
      text.push(`'${x.i}' + [K_TAB] > ${uo(x)} ${c(x)}`)
    } else if (x.i.startsWith('=')) {
      text.push(`'${x.i.replace('=', '')}' > ${uo(x)} ${c(x, '=')}`)
    } else if (x.i.match(/^[a-zA-Z]$/)) {
      text.push(`+ '${x.i}' > ${uo(x)} ${c(x)}`)
    } else {
      text.push(`'${x.i}' + [K_TAB] > ${uo(x)} ${c(x)}`)
    }
  })

  await fsp.writeFile(`text/keyboard/tone.kmn`, text.join('\n'))
}

// unicode
function ui(x: Link) {
  if (x.i.startsWith("'")) {
    return `"${x.o}"`
  } else {
    return `'${x.o}'`
  }
}
function uo(x: Link) {
  if (x.unicode) {
    return toUnicode(x.o)
  } else if (x.o.match("'")) {
    return `"${x.o}"`
  } else {
    return `'${x.o}'`
  }
}

function toUnicode(x: string) {
  return `U+${x
    .codePointAt(0)!
    .toString(16)
    .toUpperCase()
    .padStart(4, '0')}`
}

// comment
function c(x: Link, replace?: string) {
  const code = replace
    ? `'${x.i.replace(replace, '')}'`
    : x.i.match("'")
    ? `"${x.i}"`
    : `'${x.i}'`
  const text = [`c Mapping for the '${code}' key`]
  if (x.name) {
    text.push(`the ${x.name.toLowerCase()}`)
  }
  return text.join(', ')
}
