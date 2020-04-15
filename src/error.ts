import { resolveTagName } from './block-kit/utils'
import { JSXSlack } from './jsx'

interface JSXSource {
  columnNumber: number
  fileName: string
  lineNumber: number
}

const getSource = (source: unknown): JSXSource | undefined => {
  const src = JSXSlack.isValidElement(source)
    ? source.$$jsxslack.props?.__source
    : source

  if (
    typeof src === 'object' &&
    src &&
    Object.prototype.hasOwnProperty.call(src, 'columnNumber') &&
    Object.prototype.hasOwnProperty.call(src, 'fileName') &&
    Object.prototype.hasOwnProperty.call(src, 'lineNumber')
  )
    return src

  return undefined
}

export class JSXSlackError extends Error {
  /** An original stack trace. */
  readonly originalStack?: string

  /**
   * Create JSXSlackError instance.
   *
   * @param message Error message
   * @param source JSX or `__source` property of the cause element
   */
  constructor(message: string, source?: unknown) {
    super(message)

    this.name = new.target.name
    this.originalStack = this.stack

    Object.setPrototypeOf(this, new.target.prototype)
    this.resetStack(source)
  }

  private resetStack(source: unknown) {
    const src = getSource(source)
    if (!src) return

    const tag = resolveTagName(source) || 'JSX element'

    this.stack = `${this.name}: ${this.message}
    at ${tag} (${src.fileName}:${src.lineNumber}:${src.columnNumber})`
  }
}
