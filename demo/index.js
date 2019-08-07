import CodeMirror from 'codemirror'
import debounce from 'lodash.debounce'
import { jsxslack } from '../src/index'
import * as _examples from './example'
import schema from './schema'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/xml-hint'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'

const jsx = document.getElementById('jsx')
const json = document.getElementById('json')
const error = document.getElementById('error')
const errorDetails = document.getElementById('errorDetails')
const examplesSelect = document.getElementById('examples')
const previewBtn = document.getElementById('preview')

json.addEventListener('click', () => json.select())

const parseHash = (hash = window.location.hash) => {
  if (!hash.toString().startsWith('#')) return undefined
  return decodeURIComponent(hash.toString().slice(1))
}

const examples = Object.assign(Object.create(null), _examples)

// CodeMirror
const completeAfter = (cm, pred) => {
  if (!pred || pred())
    setTimeout(() => {
      if (!cm.state.completionActive) cm.showHint({ completeSingle: false })
    }, 100)
  return CodeMirror.Pass
}

const completeIfAfterLt = cm =>
  completeAfter(cm, () => {
    const cur = cm.getCursor()
    return cm.getRange(CodeMirror.Pos(cur.line, cur.ch - 1), cur) === '<'
  })

const completeIfInTag = cm =>
  completeAfter(cm, () => {
    const tok = cm.getTokenAt(cm.getCursor())
    if (
      tok.type === 'string' &&
      (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) ||
        tok.string.length === 1)
    )
      return false
    const inner = CodeMirror.innerMode(cm.getMode(), tok.state).state
    return inner.tagName
  })

const jsxEditor = CodeMirror(jsx, {
  autoCloseBrackets: true,
  autoCloseTags: true,
  extraKeys: {
    "'<'": completeAfter,
    "'/'": completeIfAfterLt,
    "' '": completeIfInTag,
    "'='": completeIfInTag,
    'Ctrl-Space': 'autocomplete',
  },
  hintOptions: { schemaInfo: schema },
  indentUnit: 2,
  lineWrapping: true,
  mode: 'jsx',
  value: (() => {
    const hash = parseHash()

    if (examples[hash]) {
      examplesSelect.value = hash
      return examples[hash]
    }

    return examples.blockKit
  })(),
})

const convert = () => {
  try {
    const output = jsxslack([jsxEditor.getValue()])
    json.value = JSON.stringify(output, null, '  ')

    if (Array.isArray(output)) {
      previewBtn.removeAttribute('tabindex')
      previewBtn.setAttribute(
        'href',
        `https://api.slack.com/tools/block-kit-builder?blocks=${encodeURIComponent(
          JSON.stringify(output)
        )}`
      )
      previewBtn.classList.remove('disabled')
    } else {
      previewBtn.setAttribute('tabindex', -1)
      previewBtn.classList.add('disabled')
    }

    error.classList.add('hide')
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)

    errorDetails.textContent = e.message.trim()
    error.classList.remove('hide')
  }
}

const onChangeEditor = debounce(convert, 600)
jsxEditor.on('change', onChangeEditor)

convert()

examplesSelect.addEventListener('change', () => {
  if (examplesSelect.value) {
    jsxEditor.off('change', onChangeEditor)
    setTimeout(() => jsxEditor.on('change', onChangeEditor), 0)

    window.location.hash = `#${examplesSelect.value}`
    jsxEditor.setValue(examples[examplesSelect.value])
    convert()
  }
})
