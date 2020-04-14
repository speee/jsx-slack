/* eslint-disable @typescript-eslint/no-empty-interface, @typescript-eslint/no-namespace, import/export, no-redeclare,  */
import { OptgroupProps } from './block-kit/composition/Optgroup'
import { OptionProps } from './block-kit/composition/Option'
import { ButtonProps } from './block-kit/elements/Button'
import { SelectProps } from './block-kit/elements/Select'
import { TextareaProps } from './block-kit/input/Textarea'
import { DividerProps } from './block-kit/layout/Divider'
import { ImageProps } from './block-kit/layout/Image'
import { InputProps } from './block-kit/layout/Input'
import { SectionProps } from './block-kit/layout/Section'

export interface BuiltInComponent<P extends {}> extends JSXSlack.FC<P> {
  readonly $$jsxslackComponent: { name: string } & Record<any, any>
}

/**
 * The helper function to cast the output type from JSX element to `any`. Just
 * returns the passed value with no operations.
 *
 * This function is provided for TypeScript user and migrated user from
 * jsx-slack v1.
 *
 * @param element - JSX element
 * @return The passed JSX element with no-ops
 */
export function JSXSlack(element: JSXSlack.JSX.Element): any {
  return element
}

/** @internal */
export const createElementInternal = (
  type: JSXSlack.FC | keyof JSXSlack.JSX.IntrinsicElements,
  props: JSXSlack.Props | null = null,
  ...children: JSXSlack.ChildElement[]
): JSXSlack.JSX.Element | null => {
  let rendered: JSXSlack.Node | null = Object.create(null)

  if (typeof type === 'function') {
    const p = { ...(props || {}) }

    if (children.length === 1) [p.children] = children
    else if (children.length > 1) p.children = children

    rendered = type(p)
  }

  if (rendered && typeof rendered === 'object') {
    // Apply JSON normalization
    for (const key of Object.keys(rendered)) {
      if (rendered[key] === undefined) delete rendered[key]
    }

    if (!rendered.$$jsxslack) {
      // Children in metadata must be an array
      let metaChildren = children

      if (children.length === 0) {
        // Fallback to children props
        const { children: propsChildren } = props || {}
        if (propsChildren !== undefined) metaChildren = [].concat(propsChildren)
      }

      Object.defineProperty(rendered, '$$jsxslack', {
        value: { type, props, children: metaChildren },
      })
    }
  }

  return rendered
}

/**
 * Create the component for JSON payload building with jsx-slack.
 *
 * The passed functional component has to return JSON object or `null`, to build
 * JSON payload for Slack. Unlike a simple functional component defined by
 * JavaScript function, the output would be always preserved in JSON even if it
 * was an array.
 *
 * @remarks
 * `createComponent()` is an internal helper to create built-in components for
 * jsx-slack. Typically user must use a simple function definition of JavaScript
 * to create the functional component.
 *
 * @internal
 * @param name - Component name for showing in debug log
 * @param component - The functional component to turn into jsx-slack component
 * @param meta - An optional metadata for jsx-slack component
 * @return A created jsx-slack component
 */
export const createComponent = <P extends {}, O extends object>(
  name: string,
  component: (props: JSXSlack.Props<P>) => O | null,
  meta: Record<any, any> = {}
): BuiltInComponent<P> =>
  Object.defineProperty(component, '$$jsxslackComponent', {
    value: Object.freeze(
      Object.defineProperty({ ...meta }, 'name', {
        value: name || '[Anonymous component]',
        enumerable: true,
      })
    ),
  })

/** @internal */
export const FragmentInternal = createComponent<
  { children: JSXSlack.ChildElements },
  JSXSlack.ChildElement[]
>('Fragment', ({ children }) =>
  // Should return array's shallow copy to remove metadata from array
  ([] as JSXSlack.ChildElement[]).concat(children)
)

/**
 * Verify the passed function is a jsx-slack component.
 *
 * @internal
 * @param fn - A function to verify
 * @return `true` if the passed object was a jsx-slack component., otherwise
 *   `false`
 */
export const isValidComponent = <T = any>(
  fn: unknown
): fn is BuiltInComponent<T> =>
  typeof fn === 'function' &&
  !!Object.prototype.hasOwnProperty.call(fn, '$$jsxslackComponent')

/**
 * Verify the passed object is a jsx-slack element created from built-in
 * component.
 *
 * @internal
 * @param element - An object to verify
 * @param component - The optional component to match while verifying
 * @return `true` if the passed object was a jsx-slack element created from
 *   built-in component, otherwise `false`
 */
export const isValidElementFromComponent = (
  obj: unknown,
  component?: JSXSlack.FunctionalComponent<any>
): obj is JSXSlack.JSX.Element =>
  JSXSlack.isValidElement(obj) &&
  isValidComponent(obj.$$jsxslack.type) &&
  (!component || obj.$$jsxslack.type === component)

/**
 * Clean up hidden meta value for jsx-slack from object.
 *
 * If the built-in component has nested JSX output such as alias, a hidden
 * metadata can reference an internal JSX from the public partial object. An
 * internal would not matter for jsx-slack user, so the error message displaying
 * private JSX info may confuse.
 *
 * It just re-assigns public objects into new object, but this helper makes
 * clear its purpose.
 *
 * @internal
 * @param element - The object with meta value for jsx-slack
 * @return The object without meta value
 */
export const cleanMeta = <T extends object>(
  element: T
): T extends Array<infer R> ? Array<R> : Omit<T, keyof JSXSlack.Node> =>
  (Array.isArray(element) ? [...element] : { ...element }) as any

export namespace JSXSlack {
  interface StringLike {
    toString: () => string
  }

  /** A element allowed as a child. */
  export type ChildElement =
    | Node
    | string
    | StringLike
    | ChildElement[] // as fragment elements (WARN: Recrusive type has required TypeScript >= 3.7)
    | boolean // will remove while normalization
    | null // will remove while normalization
    | undefined // will remove while normalization

  /** Elements allowed as children. */
  export type ChildElements = ChildElement | ChildElement[]

  /** Similar to `ChildElement`, but excluded string and string-like object. */
  export type ChildNode = Node | ChildNode[] | boolean | null | undefined

  /** Similar to `ChildElements`, but excluded string and string-like object. */
  export type ChildNodes = ChildNode | ChildNode[]

  type FilteredChild = Node | string | StringLike
  type MapCallbackFn<T> = (
    this: FilteredChild | null,
    child: FilteredChild | null,
    index: number
  ) => T

  export type Props<P = any> = { children?: ChildElements } & P

  export type FunctionalComponent<P extends {} = {}> = (
    props: Props<P>
  ) => Node | null

  export type FC<P extends {} = {}> = FunctionalComponent<P>

  export interface Node<P extends {} = any> {
    readonly $$jsxslack: {
      type: FC<P> | string
      props: Props<P>
      children: ChildElement[]
    }
  }

  /**
   * Verify the passed object is a jsx-slack element.
   *
   * @param element - An object to verify
   * @return `true` if the passed object was a jsx-slack element, otherwise
   *   `false`
   */
  export const isValidElement = (obj: unknown): obj is JSXSlack.JSX.Element =>
    typeof obj === 'object' &&
    !!obj &&
    !!Object.prototype.hasOwnProperty.call(obj, '$$jsxslack')

  /**
   * Create and return a new jsx-slack element of the given type.
   *
   * The `type` argument can be either a component function, a tag name string
   * such as `'strong'` or `'em'`, and a fragment (`JSXSlack.Fragment`).
   *
   * **NOTE**: _You won't typically invoke this directly if you are using JSX._
   *
   * @param type - A component function, fragment, or intrinsic HTML tag name
   * @param props - Property values to pass into the element for creation
   * @param children - Children elements of a new jsx-slack element
   * @return A new jsx-slack element
   */
  export const createElement = createElementInternal

  /** An alias into `JSXSlack.createElement`. */
  export const h = createElementInternal

  /**
   * Group a list of JSX elements.
   *
   * Typically the component for jsx-slack should return a single JSX element.
   * Wrapping multiple elements in `JSXSlack.Fragment` lets you return a list of
   * children.
   */
  export const Fragment = FragmentInternal

  const flatChildren = (children: ChildElement[]) =>
    children.reduce((reduced: Array<FilteredChild | null>, child) => {
      if (Array.isArray(child) && !isValidElementFromComponent(child)) {
        reduced.push(...flatChildren(child))
      } else if (child == null || child === true || child === false) {
        reduced.push(null)
      } else {
        reduced.push(child)
      }
      return reduced
    }, [])

  /**
   * Make flatten JSX elements into an array consited by allowed children and
   * `null`.
   *
   * @remarks
   * This function does not traverse children of the built-in component,
   * included `JSXSlack.Fragment`.
   *
   * @internal
   * @param children - The target child or children
   */
  const flat = (children: ChildElements) => flatChildren([children])

  /**
   * Provide utilities for dealing with the `props.children` opaque data
   * structure.
   */
  export const Children = Object.freeze({
    /**
     * Return the total number of elements in `children`.
     *
     * It would be same as the number of times `JSXSlack.Children.map()` would
     * invoke the callback.
     *
     * @param children - The target element(s) to count
     * @return The total number of elements in the passed children
     */
    count: (children: ChildElements): number =>
      children == null ? 0 : flat(children).length,

    /**
     * Like `JSXSlack.Children.map()`, but no return value.
     *
     * @param children - The target element(s) to traverse
     * @param callbackFn - Callback function
     */
    forEach: (children: ChildElements, callbackFn: MapCallbackFn<void>) => {
      Children.map(children, callbackFn)
    },

    /**
     * Invoke callback function on every immediate child in `children`.
     *
     * The callback function allows up to 2 arguments compatible with
     * `Array.prototype.map()`, and `this` will be a traversed child. The
     * callback can return any value for transforming, or the nullish value for
     * to skip mapping.
     *
     * @remarks
     * When the passed `children` is `null` or `undefined`, this function
     * returns the passed value instead of an array as it is.
     *
     * If `JSXSlack.Fragment` was passed as `children`, it will be treated as _a
     * single child_. The callback won't invoke with every child of the
     * fragment.
     *
     * @param children - The target element(s) to traverse
     * @param callbackFn - Callback function
     * @return An array of the value returned by callback function, or nullish
     *   value when passed `null` or `undefined`.
     */
    map: <T>(children: ChildElements, callbackFn: MapCallbackFn<T>) => {
      if (children == null) return children

      return flat(children).reduce(
        (reduced: Exclude<T, null | undefined>[], child, idx) => {
          const ret: any = callbackFn.call(child, child, idx)
          if (ret != null) reduced.push(ret)

          return reduced
        },
        []
      )
    },

    /**
     * Verify whether `children` has an only one child of jsx-slack element and
     * return it. Otherwise, throw an error.
     *
     * @remarks
     * Even if passed a single jsx-slack element, this method may throw an error
     * when the component returned `null` or any primitive value such as string,
     * number, etc.
     *
     * @param children - The target element(s)
     * @return A single jsx-slack element if verified
     * @throws Will throw an error if `children` is not a single JSX element
     */
    only: (children: ChildElements): JSX.Element => {
      if (isValidElement(children)) return children

      throw new Error(
        'JSXSlack.Children.only expected to receive a single JSXSlack element child.'
      )
    },

    /**
     * Return an array made flatten the `children` opaque data structure.
     *
     * Useful for manipulating or re-ordering collection of children passed to
     * the component.
     *
     * @remarks
     * If an array in the children could be a subset of JSON payload, such as a
     * returned array from the built-in component, it would not be flatten.
     *
     * @param children - The target element(s)
     * @return A flatten array consisted of JSX elements
     */
    toArray: (children: ChildElements): FilteredChild[] =>
      flat(children).reduce((reduced: FilteredChild[], child) => {
        if (child == null) return reduced

        // Make flatten fragment's children
        if (isValidElementFromComponent(child, Fragment))
          return reduced.concat(Children.toArray([...(child as any)]))

        return [...reduced, child]
      }, []),
  })

  let currentExactMode = false

  /**
   * Set the state of the exact mode, to enable or disable forcible styling in
   * rendered Slack mrkdwn.
   *
   * Some special characters to style text will work only in the break of words.
   * By turning the exact mode on, jsx-slack will insert zero-width space around
   * special chars generated by HTML-like elements (`<b>`, `<i>`, `<s>`, etc),
   * to enable styling forcibly.
   *
   * @remarks
   * __Exact mode is the last resort__, because zero-width space included text
   * may confuse a reader when editing the copied message. _You should consider
   * to deal with inserting whitespaces around the styled text manually instead
   * of turning on exact mode._
   *
   * @param mode - A boolean value to indicate whether turning on exact mode
   * @return The current state of exact mode
   */
  export const exactMode = (mode?: boolean) => {
    if (mode !== undefined) currentExactMode = mode
    return currentExactMode
  }

  export namespace JSX {
    export interface Element extends Node {}
    export interface IntrinsicElements {
      /** An HTML-compatible alias into `<Divider>` layout block. */
      hr: DividerProps

      /**
       * A HTML-compatible alias into `<Image>` layout block and block element.
       */
      img: ImageProps

      /** A HTML-compatible alias into `<Section>` layout block. */
      section: SectionProps

      /** A HTML-compatible alias into `<Button>` block element. */
      button: ButtonProps

      /** A HTML-compatible alias into `<Textarea>` input component. */
      textarea: TextareaProps

      /**
       * A HTML-compatible alias into `<Input>` layout block, input component,
       * and helpers for modal.
       */
      input: InputProps

      /**
       * A HTML-compatible alias into `<Optgroup>` component for composition
       * object.
       */
      optgroup: OptgroupProps

      /**
       * A HTML-compatible alias into `<Option>` component for composition
       * object.
       */
      option: OptionProps

      /**
       * A HTML-compatible alias into `<Select>` block element and input
       * component.
       */
      select: SelectProps

      // HTML-like elements
      a: { href: string; children?: ChildElements }
      b: {}
      blockquote: {}
      br: { children?: never }
      code: {}
      del: {}
      em: {}
      i: {}
      li: { value?: number; children: ChildElements }
      ol: {
        start?: number
        type?: '1' | 'a' | 'A' | 'i' | 'I'
        children: ChildElements
      }
      p: {}
      pre: {}
      s: {}
      small: {}
      span: {}
      strike: {}
      strong: {}
      time: {
        datetime: string | number | Date
        fallback?: string
        children?: ChildElements
      }
      ul: {}
    }
    export interface ElementChildrenAttribute {
      children: {}
    }
  }
}

Object.freeze(JSXSlack)
