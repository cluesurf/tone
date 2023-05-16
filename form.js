
const st = require('@lancejpollard/script-tree')

const D = {
  '--': '44',
  '-': '4',
  '++': '33',
  '+': '3',
  '^': '9', // accent mark
  '~': '5', // variant
  '&': '0', // nasal
  '@': '00', // non-syllabic
  '_': '%', // long vowel
  '$': '^', // short vowel
  '': ''
}

const VOWELS = []
const BASE_VOWEL_GLYPHS = ['I', 'E', 'A', 'O', 'U', 'i', 'e', 'a', 'o', 'u']
const TONE_MARKS = ['--', '-', '++', '+', '']
const VARIANT_MARKS = ['~', '']
const NASAL_MARKS = ['&', '']
const DURATION_MARKS = ['_', '$', '']
const SYLLABIC_MARKS = ['@', '']
const ACCENT_MARKS = ['^', '']

BASE_VOWEL_GLYPHS.forEach(g => {
  ACCENT_MARKS.forEach(a => {
    DURATION_MARKS.forEach(l => {
      SYLLABIC_MARKS.forEach(s => {
        NASAL_MARKS.forEach(n => {
          VARIANT_MARKS.forEach(v => {
            TONE_MARKS.forEach(t => {
              const i = `${g}${v}${n}${t}${s}${l}${a}`
              // these two are treated specially, not getting the variant mark
              if (i.match(/([ou])#/)) {
                const x = RegExp.$1
                const o = l === '$'
                  ? `${x === 'o' ? 1 : 2}${D[a]}${D[t]}${D[l]}${D[n]}${D[s]}`
                  : `${x === 'o' ? 1 : 2}${D[l]}${D[a]}${D[t]}${D[n]}${D[s]}`
                VOWELS.push({ i, o })
              } else {
                const o = l === '$'
                  ? `${g}${D[a]}${D[t]}${D[l]}${D[n]}${D[s]}${D[v]}`
                  : `${g}${D[l]}${D[a]}${D[t]}${D[n]}${D[s]}${D[v]}`
                VOWELS.push({ i, o })
              }
            })
          })
        })
      })
    })
  })
})

const CONSONANTS = [
  { i: "=.", o: ".", name: 'Period literal' },
  { i: "=?", o: "?", name: 'Question literal' },
  { i: "=!", o: "!", name: 'Exclamation literal' },
  { i: "mh!", o: "m%9", name: 'Voiceless m sound' },
  { i: "mh~", o: "m%", name: 'Aspirated m sound' },
  { i: "mG~", o: "m4", name: 'Velarized m sound' },
  { i: "my~", o: "m3", name: 'Palatalized m sound' },
  { i: "mh~", o: "m%", name: 'Aspirated m sound' },
  { i: "m", o: "m", name: 'M sound' },
  { i: "Nh!", o: "n6%9", name: 'Voiceless Indian n sound' },
  { i: "Nh~", o: "n6%", name: 'Aspirated Indian n sound' },
  { i: "N", o: "n6", name: 'Indian n sound' },
  { i: "nh!", o: "n%9", name: 'Voiceless n sound' },
  { i: "nG~", o: "n4", name: 'Velarized n sound' },
  { i: "nh~", o: "n%", name: 'Aspirated n sound' },
  { i: "ny~", o: "n3", name: 'Palatalized n sound' },
  { i: "n", o: "n", name: 'N sound' },
  { i: "qh!", o: "q%9", name: 'Voiceless ng sound' },
  { i: "q!", o: "q94", name: 'Ejective ng sound' },
  { i: "q", o: "q", name: 'Ng sound' },
  { i: "Q", o: "q5", name: 'Arabic voiced pharyngeal fricative' },
  { i: "G", o: "G", name: 'French r sound' },
  { i: "gh!", o: "g^0", name: 'Voiceless g sound' },
  { i: "g?", o: "g06", name: 'Implosive g sound' },
  { i: "g@", o: "g00", name: 'Tense g sound' },
  { i: "gh~", o: "g^", name: 'Aspirated g sound' },
  { i: "gQ~", o: "g66", name: 'Pharyngealized g sound' },
  { i: "gG~", o: "g6", name: 'Velarized g sound' },
  { i: "gy~", o: "g5", name: 'Palatalized g sound' },
  { i: "gw~h~", o: "g^55", name: 'Aspirated labialized g sound' },
  { i: "gw~", o: "g55", name: 'Labialized g sound' },
  { i: "g", o: "g", name: 'G sound' },
  { i: "'", o: "'", name: 'Lack of sound, glottal stop' },
  { i: "'~", o: "'3", name: 'Hard transition' },
  { i: "dh!", o: "d^0", name: 'Voiceless d sound' },
  { i: "d!", o: "d05", name: 'Ejective d sound' },
  { i: "d?", o: "d06", name: 'Implosive d sound' },
  { i: "d*h~", o: "d^8", name: 'Aspirated click d sound' },
  { i: "d*", o: "d8", name: 'Click d sound' },
  { i: "dh~", o: "d^", name: 'Aspirated d sound' },
  { i: "dQ~", o: "d66", name: 'Pharyngealized d sound' },
  { i: "dG~", o: "d6", name: 'Velarized d sound' },
  { i: "dy~", o: "d5", name: 'Palatalized d sound' },
  { i: "dw~h~", o: "d^55", name: 'Aspirated labialized d sound' },
  { i: "dw~", o: "d55", name: 'Labialized d sound' },
  { i: "Dh~", o: "d^4", name: 'Aspirated Indian d sound' },
  { i: "D", o: "d4", name: 'Indian d sound' },
  { i: "d@", o: "d00", name: 'Tense d sound' },
  { i: "d", o: "d", name: 'D sound' },
  { i: "bh!", o: "b^0", name: 'Voiceless b sound' },
  { i: "bh~", o: "b^", name: 'Aspirated b sound' },
  { i: "bQ~", o: "b66", name: 'Pharyngealized b sound' },
  { i: "bG~", o: "b6", name: 'Velarized b sound' },
  { i: "by~", o: "b5", name: 'Palatalized b sound' },
  { i: "bw~h~", o: "b^55", name: 'Aspirated labialized b sound' },
  { i: "bw~", o: "b55", name: 'Labialized b sound' },
  { i: "b?", o: "b06", name: 'Implosive b sound' },
  { i: "b!", o: "b05", name: 'Ejective b sound' },
  { i: "b@", o: "b00", name: 'Tense b sound' },
  { i: "b", o: "b", name: 'B sound' },
  { i: "ph~", o: "p%", name: 'Aspirated p sound' },
  { i: "pQ~", o: "p44", name: 'Pharyngealized p sound' },
  { i: "pG~", o: "p4", name: 'Velarized p sound' },
  { i: "py~", o: "p3", name: 'Palatalized p sound' },
  { i: "pw~h~", o: "p%33", name: 'Aspirated labialized p sound' },
  { i: "pw~", o: "p33", name: 'Labialized p sound' },
  { i: "p!", o: "p93", name: 'Ejective p sound' },
  { i: "p*h~", o: "p%7", name: 'Aspirated click p sound' },
  { i: "p*", o: "p7", name: 'Click p sound' },
  { i: "p@", o: "p99", name: 'Tense p sound' },
  { i: "p.", o: "p9", name: 'Stop p sound' },
  { i: "p", o: "p", name: 'P sound' },
  { i: "Th~", o: "t4^", name: 'Aspirated T sound' },
  { i: "Ty~", o: "t45", name: 'Palatalized T sound' },
  { i: "T!", o: "t405", name: 'Ejective T sound' },
  { i: "T", o: "t4", name: 'Indian t sound' },
  { i: "ty~h~", o: "t^5", name: 'Aspirated palatalized t sound' },
  { i: "th~", o: "t^", name: 'Aspirated t sound' },
  { i: "tQ~", o: "t66", name: 'Pharyngealized t sound' },
  { i: "tG~", o: "t6", name: 'Velarized t sound' },
  { i: "ty~", o: "t5", name: 'Palatalized t sound' },
  { i: "tw~h~", o: "t^55", name: 'Aspirated labialized t sound' },
  { i: "tw~", o: "t55", name: 'Labialized t sound' },
  { i: "t!", o: "t05", name: 'Ejective t sound' },
  { i: "t*h~", o: "t^8", name: 'Aspirated click t sound' },
  { i: "t*", o: "t8", name: 'Click t sound' },
  { i: "t@", o: "t00", name: 'Tense t sound' },
  { i: "t.", o: "t0", name: 'Stop t sound' },
  { i: "t", o: "t", name: 'T sound' },
  { i: "k!", o: "k93", name: 'Ejective k sound' },
  { i: "k*h~", o: "k%7", name: 'Aspirated click k sound' },
  { i: "k*", o: "k7", name: 'Click k sound' },
  { i: "ky~h~", o: "k%3", name: 'Aspirated palatalized k sound' },
  { i: "kw~h~", o: "k%33", name: 'Aspirated labialized k sound' },
  { i: "kh~", o: "k%", name: 'Aspirated k sound' },
  { i: "kQ~", o: "k44", name: 'Pharyngealized k sound' },
  { i: "kG~", o: "k4", name: 'Velarized k sound' },
  { i: "ky~", o: "k3", name: 'Palatalized k sound' },
  { i: "kw~", o: "k33", name: 'Labialized k sound' },
  { i: "Kh~", o: "k6%", name: 'Arabic aspirated Q sound' },
  { i: "KQ~", o: "k644", name: 'Pharyngealized Arabic Q sound' },
  { i: "KG~", o: "k64", name: 'Velarized Arabic Q sound' },
  { i: "Ky~", o: "k63", name: 'Palatalized Arabic Q sound' },
  { i: "Kw~h~", o: "k6%33", name: 'Aspirated labialized Arabic Q sound' },
  { i: "Kw~", o: "k633", name: 'Labialized Arabic Q sound' },
  { i: "K!", o: "k693", name: 'Arabic ejective Q sound' },
  { i: "K", o: "k6", name: 'Arabic Q sound' },
  { i: "k@", o: "k99", name: 'Tense k sound' },
  { i: "k.", o: "k9", name: 'Stop k sound' },
  { i: "k", o: "k", name: 'K sound' },
  { i: "Hh", o: "h5%", name: 'Voiceless H sound' },
  { i: "H!", o: "h593", name: 'Ejective H sound' },
  { i: "Hy~", o: "h53", name: 'Palatalized H sound' },
  { i: "Hw~", o: "h533", name: 'Labialized H sound' },
  { i: "H", o: "h5", name: 'Hebrew harsh h sound' },
  { i: "hy~", o: "h3", name: 'Palatalized h sound' },
  { i: "hw~", o: "h33", name: 'Labialized h sound' },
  { i: "hh~", o: "h%", name: 'Breathy h sound' },
  { i: "h", o: "h", name: 'H sound' },
  { i: "Jh~", o: "j4^", name: 'Aspirated Indian j sound' },
  { i: "J", o: "j4", name: 'Indian j sound' },
  { i: "jh~", o: "j^", name: 'Aspirated j sound' },
  { i: "jy~", o: "j5", name: 'Palatalized j sound' },
  { i: "jw~", o: "j55", name: 'Labialized j sound' },
  { i: "j!", o: "j05", name: 'Ejective j sound' },
  { i: "j", o: "j", name: 'J sound' },
  { i: "S!", o: "s593", name: 'Navajo s sound ejective' },
  { i: "Sh~", o: "s%5", name: 'Aspirated Navajo s sound' },
  { i: "S", o: "s5", name: 'Navajo s sound' },
  { i: "sh~", o: "s%", name: 'Aspirated s sound' },
  { i: "sQ~", o: "s44", name: 'Pharyngealized s sound' },
  { i: "sG~", o: "s4", name: 'Velarized s sound' },
  { i: "sy~", o: "s3", name: 'Palatalized s sound' },
  { i: "sw~", o: "s33", name: 'Labialized s sound' },
  { i: "s@", o: "s99", name: 'Tense s sound' },
  { i: "s!", o: "s93", name: 'Ejective s sound' },
  { i: "s", o: "s", name: 'S sound' },
  { i: "F", o: "f6", name: 'Labial f sound' },
  { i: "fy~", o: "f3", name: 'Palatalized f sound' },
  { i: "fG~", o: "f4", name: 'Velarized f sound' },
  { i: "fw~", o: "f33", name: 'Labialized f sound' },
  { i: "f!", o: "f93", name: 'Ejective f sound' },
  { i: "f", o: "f", name: 'f sound' },
  { i: "V", o: "v3", name: 'Labial v sound' },
  { i: "vQ~", o: "v66", name: 'Pharyngealized v sound' },
  { i: "vG~", o: "v6", name: 'Velarized v sound' },
  { i: "vy~", o: "v5", name: 'Palatalized v sound' },
  { i: "vw~", o: "v55", name: 'Labialized v sound' },
  { i: "v", o: "v", name: 'V sound' },
  { i: "Z!", o: "z936", name: 'Ejective Zulu dl sound' },
  { i: "Z", o: "z6", name: 'Zulu dl sound' },
  { i: "zh~", o: "z%", name: 'Aspirated z sound' },
  { i: "zQ~", o: "z44", name: 'Pharyngealized z sound' },
  { i: "zy~", o: "z3", name: 'Palatalized z sound' },
  { i: "zw~", o: "z33", name: 'Labialized z sound' },
  { i: "z!", o: "z93", name: 'Ejective z sound' },
  { i: "z", o: "z", name: 'Z sound' },
  { i: "C#", o: "C3", name: 'Danish th/l sound' },
  { i: "CQ~", o: "C66", name: 'Pharyngealized C sound' },
  { i: "CG~", o: "C6", name: 'Velarized C sound' },
  { i: "Cy~", o: "C5", name: 'Palatalized C sound' },
  { i: "Cw~", o: "C55", name: 'Labialized C sound' },
  { i: "C", o: "C", name: 'Voiced th sound' },
  { i: "cy~", o: "c5", name: 'Palatalized c sound' },
  { i: "cw~", o: "c55", name: 'Labialized c sound' },
  { i: "c", o: "c", name: 'Unvoiced th sound' },
  { i: "Lh!", o: "l3^0", name: 'Voiceless Indian l sound' },
  { i: "Lh~", o: "l3^", name: 'Aspirated Indian l sound' },
  { i: "L", o: "l3", name: 'Indian l sound' },
  { i: "lh!", o: "l^0", name: 'Voiceless l sound' },
  { i: "lG~", o: "l6", name: 'Velarized l sound' },
  { i: "lQ~", o: "l66", name: 'Pharyngealized l sound' },
  { i: "ly~", o: "l5", name: 'Palatalized l sound' },
  { i: "lh~", o: "l^", name: 'Aspirated l sound' },
  { i: "l*h~", o: "l^8", name: 'Aspirated click l sound' },
  { i: "l*", o: "l8", name: 'Click l sound' },
  { i: "l!", o: "l05", name: 'Ejective l sound' },
  { i: "l", o: "l", name: 'L sound' },
  { i: "Rh~", o: "r5%", name: 'Aspirated Indian r sound' },
  { i: "R", o: "r5", name: 'Indian r sound' },
  { i: "rh!", o: "r%9", name: 'Voiceless rolling r sound' },
  { i: "ry~", o: "r3", name: 'Palatalized r sound' },
  { i: "rh~", o: "r%", name: 'Aspirated rolling r sound' },
  { i: "rG~", o: "r4", name: 'Velarized r sound' },
  { i: "r", o: "r", name: 'Single rolling r sound' },
  { i: "xh~", o: "x^", name: 'Aspirated x sound' },
  { i: "xQ~", o: "x66", name: 'Pharyngealized x sound' },
  { i: "xG~", o: "x6", name: 'Velarized x sound' },
  { i: "xy~h~", o: "x^5", name: 'Aspirated palatalized x sound' },
  { i: "xy~", o: "x5", name: 'Palatalized x sound' },
  { i: "xw~", o: "x55", name: 'Labialized x sound' },
  { i: "x!", o: "x05", name: 'Ejective sh sound' },
  { i: "Xh~", o: "x4^", name: 'Aspirated Indian sh sound' },
  { i: "Xy~", o: "x45", name: 'Palatalized x sound' },
  { i: "X!", o: "x405", name: 'Ejective X sound' },
  { i: "X", o: "x4", name: 'Indian sh sound' },
  { i: "x@", o: "x00", name: 'Tense sh sound' },
  { i: "x", o: "x", name: 'Sh sound' },
  { i: "wh!", o: "w^0", name: 'Voiceless w sound' },
  { i: "w!", o: "w05", name: 'Ejective w sound' },
  { i: "w", o: "w", name: 'W sound' },
  { i: "yw~", o: "y33", name: 'Labialized y sound' },
  { i: "yh!", o: "y%9", name: 'Voiceless y sound' },
  { i: "y", o: "y", name: 'Y sound' },
  { i: " ", o: " ", name: 'Space' },
  { i: ".", o: ".", name: 'Period' },
  { i: ",", o: ",", name: 'Comma' },
  { i: "(", o: "(", name: 'Opening parenthesis' },
  { i: ")", o: ")", name: 'Closing parenthesis' },
  { i: "[", o: "[", name: 'Opening bracket' },
  { i: "]", o: "]", name: 'Closing bracket' },
  { i: "|", o: "|", name: 'Pipe' },
  { i: "#", o: "#", name: 'At sign' },
  { i: "/", o: "/", name: 'Forward slash' },
  { i: "\\", o: "\\", name: 'Backward slash' },
  { i: ":", o: ":", name: 'Colon' }
]

const SYMBOLS = [...VOWELS, ...CONSONANTS]
const tree = st.fork(SYMBOLS)
const form = text => st.form(text, tree)

form.turn36 = {
  'i': 1,
  'e': 2,
  '2': 3,
  'E': 4,
  'g': 5,
  'w': 6,
  't': 7,
  'v': 8,
  'f': 9,
  'r': 10,
  'h': 11,
  'm': 12,
  'a': 13,
  'U': 14,
  'o': 15,
  'O': 16,
  '\'': 17,
  'x': 18,
  'c': 19,
  'C': 20,
  's': 21,
  'z': 22,
  'Q': 23,
  'y': 24,
  'u': 25,
  '1': 26,
  'A': 27,
  'I': 28,
  'l': 29,
  'j': 30,
  'd': 31,
  'b': 32,
  'k': 33,
  'p': 34,
  'q': 35,
  'n': 36,
}

form.size36 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 200, 300, 400, 500, 600, 700, 800, 900,
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000
]

// gw i tv e fr 2 hm E 'x cC oU aO sz Qy u lj 1 db A kp I qn
// i e 2 E gw tv fr hm oU aO 'x cC sz Qy u 1 A I lj db kp qn
form.turn22 = {
  'i': 1,
  'e': 2,
  '2': 3,
  'E': 4,
  'g': 5,
  'w': 5,
  't': 6,
  'v': 6,
  'f': 7,
  'r': 7,
  'h': 8,
  'm': 8,
  'o': 9,
  'U': 9,
  'a': 10,
  'O': 10,
  '\'': 11,
  'x': 11,
  'c': 12,
  'C': 12,
  's': 13,
  'z': 13,
  'Q': 14,
  'y': 14,
  'u': 15,
  '1': 16,
  'A': 17,
  'I': 18,
  'l': 19,
  'j': 19,
  'd': 20,
  'b': 20,
  'k': 21,
  'p': 21,
  'q': 22,
  'n': 22,
}

form.size22 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 200, 300, 400
]

// gm tr fv hw eiE2 'y Cz ao UO sc Qx 1AuI ln dp kb qj
// ie2E gm tr fv hw ao UO 'y Cz sc Qx u1AI ln dp kb qj
form.turn16 = {
  'i': 1,
  'e': 1,
  '2': 1,
  'E': 1,
  'g': 2,
  'm': 2,
  't': 3,
  'r': 3,
  'f': 4,
  'v': 4,
  'h': 5,
  'w': 5,
  'a': 6,
  'o': 6,
  'U': 7,
  'O': 7,
  '\'': 8,
  'y': 8,
  'C': 9,
  'z': 9,
  's': 10,
  'c': 10,
  'Q': 11,
  'x': 11,
  'u': 12,
  '1': 12,
  'A': 12,
  'I': 12,
  'l': 13,
  'n': 13,
  'd': 14,
  'p': 14,
  'k': 15,
  'b': 15,
  'q': 16,
  'j': 16,
}

form.size16 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 20, 30, 40, 50, 60, 70
]

// qjln fvtr Qx'y aoUO eiE2 1AuI scCz hwgm kbdp
// eiE2 gmhw trfv 1AuI lnqj dpkb aoUO 'yQx Czsc
form.turn9 = {
  'e': 1,
  'i': 1,
  'E': 1,
  '2': 1,
  'g': 2,
  'm': 2,
  'h': 2,
  'w': 2,
  't': 3,
  'r': 3,
  'f': 3,
  'v': 3,
  '1': 4,
  'A': 4,
  'u': 4,
  'I': 4,
  'l': 5,
  'n': 5,
  'q': 5,
  'j': 5,
  'd': 6,
  'p': 6,
  'k': 6,
  'b': 6,
  'a': 7,
  'o': 7,
  'U': 7,
  'O': 7,
  '\'': 8,
  'y': 8,
  'Q': 8,
  'x': 8,
  'C': 9,
  'z': 9,
  's': 9,
  'c': 9,
}

// i e 2 E aO oU u I A 1
form.turn10 = {
  'i': 1,
  'g': 1,
  'w': 1,
  'e': 2,
  't': 2,
  'f': 2,
  '2': 3,
  'h': 3,
  'm': 3,
  'E': 4,
  'r': 4,
  'v': 4,
  'a': 5,
  'O': 5,
  '\'': 5,
  'y': 5,
  'Q': 5,
  'x': 5,
  'o': 6,
  'U': 6,
  'C': 6,
  'z': 6,
  's': 6,
  'c': 6,
  'u': 7,
  'l': 7,
  'j': 7,
  'I': 8,
  'p': 8,
  'b': 8,
  'A': 9,
  'q': 9,
  'n': 9,
  '1': 10,
  'd': 10,
  'k': 10,
}

// ie2E Oo aU uIA1
// ie2Egmtrfvhw aUscQx Oo'yCz uIA1lndpkbqj
form.turn4 = {
  'i': 1,
  'e': 1,
  '2': 1,
  'E': 1,
  'g': 1,
  'm': 1,
  't': 1,
  'r': 1,
  'f': 1,
  'v': 1,
  'h': 1,
  'w': 1,
  'a': 2,
  'U': 2,
  's': 2,
  'c': 2,
  'Q': 2,
  'x': 2,
  'O': 3,
  'o': 3,
  '\'': 3,
  'y': 3,
  'C': 3,
  'z': 3,
  'u': 4,
  'I': 4,
  'A': 4,
  '1': 4,
  'l': 4,
  'n': 4,
  'd': 4,
  'p': 4,
  'k': 4,
  'b': 4,
  'q': 4,
  'j': 4,
}

// ie2E OoaU uIA1
// ie2Egmtrfvhw OoaU'yCzscQx uIA1lndpkbqj
form.turn3 = {
  'i': 1,
  'e': 1,
  '2': 1,
  'E': 1,
  'g': 1,
  'm': 1,
  't': 1,
  'r': 1,
  'f': 1,
  'v': 1,
  'h': 1,
  'w': 1,
  'O': 2,
  'o': 2,
  'a': 2,
  'U': 2,
  '\'': 2,
  'y': 2,
  'C': 2,
  'z': 2,
  's': 2,
  'c': 2,
  'Q': 2,
  'x': 2,
  'u': 3,
  'I': 3,
  'A': 3,
  '1': 3,
  'l': 3,
  'n': 3,
  'd': 3,
  'p': 3,
  'k': 3,
  'b': 3,
  'q': 3,
  'j': 3,
}

form.SYMBOLS = SYMBOLS

form.VOWELS = VOWELS

form.CONSONANTS = CONSONANTS

const turn = (mark, term) => {
  const turn = form[`turn${mark}`]
  if (!turn) throw new Error(`Invalid size ${mark}`)
  const size = form[`size${mark}`]
  return term
    .replace(/[^ie2EgmtrfvhwOoaU'yCzscQxuIA1lndpkbqj]/g, '')
    .split('')
    .map(x => size[turn[x] - 1])
}

form.list = text => st.list(text, tree)

form.turn = turn

if (typeof module != 'undefined') {
  module.exports = form
}
