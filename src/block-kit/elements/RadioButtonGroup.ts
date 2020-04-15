import { RadioButtons as RadioButtonsElement, InputBlock } from '@slack/types'
import { ActionProps } from './utils'
import { ConfirmableProps } from '../composition/Confirm'
import {
  RadioButton,
  RadioButtonOption,
  radioButtonCheckedSymbol,
} from '../composition/RadioButton'
import { InputComponentProps, wrapInInput } from '../layout/Input'
import { resolveTagName } from '../utils'
import { JSXSlackError } from '../../error'
import { JSXSlack, BuiltInComponent, createComponent } from '../../jsx'

interface RadioButtons
  extends Omit<RadioButtonsElement, 'options' | 'initial_option'> {
  options: RadioButtonOption[]
  initial_option?: RadioButtonOption
}

interface RadioButtonGroupBaseProps extends ActionProps, ConfirmableProps {
  children: JSXSlack.ChildNodes

  /**
   * A value of the initially selected radio button.
   *
   * It must choose a string of `value` prop from defined `<RadioButton>`
   * elements in children. If not defined, an inital checked button will follow
   * the state of `<RadioButton checked>`.
   */
  value?: string | null
}

type RadioButtonGroupProps = InputComponentProps<RadioButtonGroupBaseProps>

/**
 * The interactive component or input component for
 * {@link https://api.slack.com/reference/block-kit/block-elements#radio the `radio_buttons` block element}.
 *
 * Provide the container to choose one of the options supplied by
 * `<RadioButton>`.
 *
 * _This component is available only in `<Modal>` and `<Home>` container, and
 * cannot use in `<Blocks>` container for messaging._
 *
 * @example
 * ```jsx
 * <Home>
 *   <Section>
 *     Select the tier of our service:
 *     <RadioButtonGroup actionId="tier">
 *       <RadioButton value="free" checked>
 *         <b>Free</b>
 *         <small>$0!</small>
 *       </RadioButton>
 *       <RadioButton value="standard">
 *         <b>Standard</b>
 *         <small>
 *           $5/month, <b>and 30 days trial!</b>
 *         </small>
 *       </RadioButton>
 *       <RadioButton value="premium">
 *         <b>Premium</b>
 *         <small>$30/month</small>
 *       </RadioButton>
 *       <RadioButton value="business">
 *         <b>Business</b>
 *         <small>
 *           <i>Please contact to support.</i>
 *         </small>
 *       </RadioButton>
 *     </RadioButtonGroup>
 *   </Section>
 * </Home>
 * ```
 *
 * @return The partial JSON of a block element for the container of radio
 *   buttons, or `input` layout block with it
 */
export const RadioButtonGroup: BuiltInComponent<RadioButtonGroupProps> = createComponent<
  RadioButtonGroupProps,
  RadioButtons | InputBlock
>('RadioButtonGroup', (props) => {
  let initialOption: RadioButtonOption | undefined

  const options = JSXSlack.Children.toArray(props.children).filter(
    (option): option is RadioButtonOption => {
      if (!JSXSlack.isValidElement(option)) return false

      if (option.$$jsxslack.type !== RadioButton) {
        const tag = resolveTagName(option)
        throw new JSXSlackError(
          `<RadioButtonGroup> must contain only <RadioButton>${
            tag ? ` but it is included ${tag}` : ''
          }.`,
          option
        )
      }

      if (option[radioButtonCheckedSymbol]) initialOption = option as any

      return true
    }
  )

  if (options.length === 0)
    throw new JSXSlackError(
      '<RadioButtonGroup> must contain least of one <RadioButton>.',
      props['__source'] // eslint-disable-line dot-notation
    )

  const radioButtons: RadioButtons = {
    type: 'radio_buttons',
    action_id: props.actionId || props.name,
    options,
    initial_option:
      props.value !== undefined
        ? options.find((opt) => opt.value === props.value)
        : initialOption,
    confirm: props.confirm as any,
  }

  return wrapInInput(radioButtons, props, RadioButtonGroup)
})
