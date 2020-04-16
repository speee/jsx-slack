/** @jsx createElementInternal */
import { View } from '@slack/types'
import {
  PrivateMetadataTransformer,
  generateActionsValidator,
  generateBlocksContainer,
  generateSectionValidator,
} from './utils'
import { Divider } from '../layout/Divider'
import { Image } from '../layout/Image'
import { Section } from '../layout/Section'
import { Input } from '../layout/Input'
import {
  JSXSlack,
  cleanMeta,
  createComponent,
  createElementInternal,
} from '../../jsx'

interface HomeProps {
  children: JSXSlack.ChildNodes

  /**
   * An identifier for this modal to recognize it in various events from Slack.
   */
  callbackId?: string

  /** A unique ID for all views on a per-team basis. */
  externalId?: string

  /**
   * An optional metadata string for handling stored data in callback events
   * from Slack API. (3000 characters maximum)
   *
   * If not defined, the home tab container will use values defined in
   * `<Input type="hidden">` as metadata stringified to JSON.
   *
   * ### Custom transformer
   *
   * You can also customize how to transform hidden values into string by
   * passing the custom transformer function.
   *
   * @example
   * ```jsx
   * <Home
   *   privateMetadata={(hidden) => hidden && new URLSearchParams(hidden).toString()}
   * >
   *   <Input type="hidden" name="A" value="foobar" />
   *   <Input type="hidden" name="B" value={123} />
   *   <Input type="hidden" name="C" value={true} />
   * </Home>
   * ```
   *
   * In this example, the private metadata would be `A=foobar&B=123&C=true` by
   * transformation using `URLSearchParams`.
   *
   * The transformer takes an argument: JSON object of hidden values, or
   * `undefined` when there was no hidden values. It must return the transformed
   * string, or `undefined` if won't assign private metadata.
   */
  privateMetadata?: string | PrivateMetadataTransformer
}

const HomeBlocks = generateBlocksContainer({
  name: 'Home',
  availableBlockTypes: {
    actions: generateActionsValidator(),
    context: true,
    divider: true,
    image: true,
    section: generateSectionValidator(),
  },
  aliases: { hr: Divider, img: Image, section: Section },
})

/**
 * The container component for the view of
 * {@link https://api.slack.com/surfaces/tabs|home tabs}.
 *
 * `<Home>` can include following block elements:
 *
 * - `<Section>` (`<section>`)
 * - `<Image>` (`<img>`)
 * - `<Divider>` (`<hr>`)
 * - `<Context>`
 * - `<Actions>`
 *
 * And you can also use `<Input type="hidden">` to store private metadata.
 *
 * @example
 * ```jsx
 * api.views.publish({
 *   user_id: 'UXXXXXXXX',
 *   view: (
 *     <Home>
 *       <Section>Welcome to my home!</Section>
 *     </Home>
 *   ),
 * })
 * ```
 *
 * **NOTE**: TypeScript requires to cast JSX into suited type / `any`, or wrap
 * with `JSXSlack(<Home>...</Home>)`.
 *
 * @return The object of `view` payload, for `view` field in
 *   {@link https://api.slack.com/methods/views.publish|views.publish} API.
 */
export const Home = createComponent<HomeProps, View>('Home', (props) => {
  let pmObject: Record<string, any> | undefined

  const children = JSXSlack.Children.toArray(props.children).reduce(
    (reducer: any[], child) => {
      if (JSXSlack.isValidElement(child)) {
        const { type, props: childProps } = child.$$jsxslack

        if (
          (type === Input || type === 'input') &&
          childProps.type === 'hidden'
        ) {
          pmObject = pmObject || {}
          pmObject[childProps.name] = childProps.value
          return reducer
        }
      }

      if (typeof child === 'object') return [...reducer, child]
      return reducer
    },
    []
  )

  const private_metadata = (() => {
    if (typeof props.privateMetadata === 'string') return props.privateMetadata
    if (typeof props.privateMetadata === 'function')
      return props.privateMetadata(pmObject)

    return pmObject && JSON.stringify(pmObject)
  })()

  return {
    type: 'home',
    callback_id: props.callbackId,
    external_id: props.externalId,
    private_metadata,
    blocks: cleanMeta(<HomeBlocks children={children} />) as any[],
  }
})
