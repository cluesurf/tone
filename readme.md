<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/termsurf/tone/blob/make/view/view.svg?raw=true' height='312'/>
</p>

<h3 align='center'>tone</h3>
<p align='center'>
  A Cross-Cultural Writing System
</p>

<br/>
<br/>
<br/>

## Discussions

Checkout the [Discord server](https://discord.gg/FB4RYUY8) with any
thoughts/comments/questions you have, or start a
[GitHub discussion](https://github.com/termsurf/tone/discussions) or add
something to the [Reddit group](https://www.reddit.com/r/tonetext/) if
you'd like as well.

## Summary

Tone Text (esoteric name Hanákana) is a Universal Writing System (UWS),
capable of representing all human voice sounds in a concise and readable
script. We like to think of them as **modern runes**. This means you can
write any human language on Earth in tone text (constructed language or
natural language) and read it without having to learn that language's
specific quirks. Here is an example of the modern runes using the new
[ToneEtch](https://github.com/termsurf/tone/blob/make/text/ToneEtch.otf)
font. You can try it in the
[interactive online Editor](https://tone.surf/dawn).

<p align="center">
  <img src="https://github.com/termsurf/tone/blob/make/view/tone-etch-2.png?raw=true" width="500" />
</p>

Tone text is a sound-based script like the
[Ancient Runes](https://en.wikipedia.org/wiki/Runes), which means when
you read see a symbol/letter, you know exactly how it is pronounced.
There are no weird edge cases or specific words for which you have to
memorize the sound. You simply learn the script and can pronounce the
words and texts.

<p align="center">
  <img src="https://github.com/termsurf/tone/blob/make/view/example.jpg?raw=true" />
</p>

You may note that Linguistics also has the International Phonetic
Alphabet
([IPA](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet)),
which seems to accomplish a similar thing. But the IPA is not for
writing anything but the most detailed pronunciation guides, not for
writing sentences or long texts. Tone Text is meant for the later, for
writing like you would in a normal language.

The ASCII encoding is mapped to IPA for your knowledge in the
[Chat Text](https://github.com/termsurf/chat). Ideally, Tone Text would
be included in the Unicode standard, but
[that is unlikely](http://www.unicode.org/pending/proposals.html). We
have suggested it be used as a writing system
[on Mars](https://twitter.com/termsurf/status/1372723474741927938) 😂.

It doesn't necessarily play well with dyslexia, which might find the
highly symmetric patterns difficult. We think there are far better
methods of learning outside of writing systems than trying to invent the
perfect script for all cases. To most natural languages, dyslexia is an
unsolved problem. We instead strive to make a minimal seed from which
knowledge can be modelled from primitive parts, memorized, and then used
to derive further knowledge.

Tone Text is also a monospaced font, to be used eventually for
programming. All sounds are derived from 3 base shapes, that for `i`,
`a`, and `u`. Rotating and extending tails on them gives you the
remaining base letters. Then adding dots to them extends the sound of
the base letter slightly. From this it should be straightforward to
memorize how to pronounce words in a day or so, and from there you can
read and write any language pretty well.

<p align="center">
  <img src="https://github.com/termsurf/tone/blob/make/view/transform.gif?raw=true" height="300" />
</p>

## Usage

```ts
import tone, {
  symbols,
  consonants,
  vowels,
  numerals,
} from '@termsurf/tone'

// Makes TalkText ASCII format into Tone-compatible font format.
tone('aa+xa+a-ita-') // => aa3xa3a4ita4
```

## The Alphabet

These are the main sounds. Everything else are variations of these
sounds. These "variations" are accomplished in a structured way, see the
[guide](https://tone.rest). Indic retroflex consonants are added with a
dot on the tailless side. Arabic sounds are added with a dot on the
tailed side usually. Clicks are mapped to the closest
mouth-position-oriented sound. Ejectives and implosives are simply added
with accent marks. Etc.

<p align="center">
  <img src="https://github.com/termsurf/tone/blob/make/view/alphabet.png?raw=true" width="500" />
</p>

Alphabetical order is this (1-36):

```
i
e
a
o
u
A
E
I
U
O
u$
o$
m
n
q
g
d
b
p
t
k
h
s
f
v
z
j
x
c
C
y
w
Q
'
l
r
```

Everything else is a modification on this base. Here are many more
sounds. They are given the numerical value of the corresponding base
symbol, and are ordered correspondingly, with retroflex, then
pharyngealized, then ejectives, implosives, stops, tenses, clicks. The
stops and pharyngealizations don't get any extra points.

```
N n
L l
X x
D d
J j
T t
R r
H h
K k
V v
F f
d~ d (pharyngealization, 1 dot on tailed side)
t~ t
s~ s
C~ C
l~ l
p! p (ejective)
t! t
k! k
s! s
x! x
T! t
K! k
g? g (implosive)
b? b
p. p (stop, 2 dots on tailless side)
t. t
k. k
p@ p (tense, 3 dots on tailless side)
t@ t
k@ k
s@ s
d* d (click, arc on tailless side)
p* p
t* t
k* k
l* l
```

Here is the full spectrum of sounds basically (about 175 sounds):

```
i
e
a
o
u
A
E
I
U
O
u$
o$
m
n
q
g
d
b
p
t
k
h
s
f
v
z
j
x
c
C
y
w
G
'
l
r
i$
a$
e$
N
D
T
K
H
F
V
J
X
Z
R
L
Y
Q
p!
t!
k!
s!
x!
T!
K!
F!
c!
X!
H!
S!
g?
d?
b?
b.
d.
g.
p.
t.
k.
p@
t@
k@
s@
d*
p*
t*
k*
l*
mh!
nh!
qh!
gh~
dh~
bh~
ph~
th~
kh~
hh~
jh~
xh~
lh~
rh~
Xh~
Dh~
Jh~
Th~
Lh~
Rh~
Kh~
gQ~
dQ~
bQ~
pQ~
tQ~
kQ~
sQ~
cQ~
CQ~
lQ~
xQ~
KQ~
mG~
nG~
gG~
dG~
bG~
pG~
tG~
kG~
sG~
fG~
vG~
zG~
jG~
xG~
lG~
rG~
my~
ny~
gy~
by~
py~
ky~
sy~
fy~
vy~
zy~
jy~
xy~
cy~
Cy~
ly~
ry~
Ty~
Ky~
Xy~
mw~
qw~
gw~
dw~
bw~
pw~
tw~
kw~
Dw~
Tw~
Kw~
gh~y~
dh~y~
bh~y~
ph~y~
th~y~
kh~y~
jh~y~
xh~y~
lh~y~
rh~y~
Xh~y~
Th~y~
Kh~y~
```

## Phonology

Here is the consonant IPA phonology chart mapping.

<p align="center">
  <img src="https://github.com/termsurf/tone/blob/make/view/phonology.4.png?raw=true" />
</p>

## Numerology

There are at least 10 classes of numerological encodings:

1. **36 sound encoding**. This is where letters are in order based on
   their sound, numbered 1-36.
1. 29 sound encoding. This counts the 14 voiced and unvoiced consonants
   as 7 instead of 14, as described below.
1. 22 shape encoding. These are the unique shapes ignoring mirror
   symmetry. qjfvQxschwkbaoeiE2uAI1.
1. **16 shape encoding**. These are the unique shapes ignoring
   rotational symmetry. qnfrQyszhmkpaeIO.
1. **9 shape encoding**. These are the unique shapes ignoring rotational
   _and_ mirror symmetry. They are also numbered similarly. qfQshkaeI.
1. 12 shape encoding. These are the tailless shapes, including all
   symmetries. They are numbered i, a, o, u.
1. 10 shape encoding. These are the tailless shapes, ignoring mirror
   symmetry. They are numbered i, a, u.
1. 4 shape encoding. These are the tailless shapes, ignoring rotational
   symmetry. They are numbered i, a, o, u.
1. 3 shape encoding. These are the tailless shapes, ignoring rotational
   _and_ mirror symmetry. They are numbered i, a, u.
1. 2 shape encoding. These are comparing tailed vs. tailless characters,
   ignoring rotational and mirror symmetry.

The most common are the 36 sound encoding, the 16 shape encoding, and
the 9 shape encoding. The 16 shape encoding is how you would play a game
with one-sided tiles. The 9 shape encoding is how you would play a game
with two-sided tiles. The 16 shape encoding can be encoded in
hexadecimal. The 9 in digits 1-9.

Here is the 29 sound encoding.

```
i
e
a
o
u
A
E
I
U
O
u$
o$
m
n
q
g k
d t
b p
h
s z
f v
j x
c C
y
w
Q
'
l
r
```

## Usage

To get access to the font for your own system, just click and download
the
[ToneEtch.otf](https://github.com/termsurf/tone/blob/make/text/ToneEtch.otf)
directly.

## Development

- [Keyman Development](https://help.keyman.com/developer/14.0/guides/command-line)
  for the Keyman keyboard.
  - https://help.keyman.com/developer/17.0/reference/kmc/cli/kmcomp-migration
  - https://help.keyman.com/developer/current-version/reference/file-types/metadata
  - https://help.keyman.com/developer/current-version/guides/distribute/packages

```bash
pnpm make:keyboard
```

## License

MIT

## TermSurf

This is being developed by the folks at [TermSurf](https://term.surf), a
California-based project for helping humanity master information and
computation. Find us on [Twitter](https://twitter.com/termsurf),
[LinkedIn](https://www.linkedin.com/company/termsurf), and
[Facebook](https://www.facebook.com/termsurf). Check out our other
[GitHub projects](https://github.com/termsurf) as well!
