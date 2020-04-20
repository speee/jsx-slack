# Change Log

## [Unreleased]

jsx-slack v2 has improved JSX structure and built-in components to output the real JSON from JSX! **[See highlights of v2 updates](docs/highlights/v2.md)**.

### Breaking

- Checked states defined in `<CheckboxGroup values>` and `<Checkbox checked>` do no longer merge

###### For TypeScript

- Require TypeScript >= 3.7 when using jsx-slack through TypeScript
- Exported type `JSXSlack.Child` and `JSXSlack.Children` have been renamed into `JSXSlack.ChildElement` and `JSXSlack.ChildElements` and no longer provided generics

### Changed

- Fully rewrote JSX structure to render from JSX to JSON directly
- All built-in components can render the partial JSON of Block Kit
- `<Home>` container now accepts `<Input type="hidden" />` and custom transformer to store private metadata
- `value` prop for `<Option>` has made optional to follow HTML specification
- `confirm` prop for interactive block elements accepts the raw confirm composition object
- `<a>` tag renders short syntax for hyperlink if possible
- Throws error with more helpful message and stacktrace when there is invalid JSX structure ([#143](https://github.com/speee/jsx-slack/pull/143))
- Bundle modules through rollup ([#144](https://github.com/speee/jsx-slack/pull/144))

### Added

- React-compatible public APIs: `JSXSlack.createElement`, `JSXSlack.isValidElement`, and `JSXSlack.Children` helpers
- HTML-compatible `<Option selected>` and `<RadioButton checked>`
- `value` prop as an alias into `initialXXX` prop in some interactive components
- Added JSDoc to many public APIs and components
- Support new JSX transpile via `automatic` runtime in Babel >= 7.9 _(experimental)_ ([#142](https://github.com/speee/jsx-slack/pull/142))

### Fixed

- Suggest string literals on IDE when typing the kind of conversation in `<ConversationsSelect include>` ([#145](https://github.com/speee/jsx-slack/pull/145))

### Removed

- Deprecated features in v1: `JSXSlack.legacyParser()` and `jsxslack.fragment`

### Deprecated

- `jsxslack.raw` template literal tag (It has become just an alias to `jsxslack` in v2)

## v1.7.0 - 2020-04-07

### Added

- `style` prop for `<Confirm>` composition object component ([#114](https://github.com/speee/jsx-slack/issues/114), [#139](https://github.com/speee/jsx-slack/pull/139))
- `<Button>` inherits its style to assigned confirm composition object if `<Confirm>` has not defined style ([#139](https://github.com/speee/jsx-slack/pull/139))

### Changed

- All props of `<Confirm>` component have made optional ([#138](https://github.com/speee/jsx-slack/issues/138), [#139](https://github.com/speee/jsx-slack/pull/139))
- Upgrade dependent packages to the latest version ([#137](https://github.com/speee/jsx-slack/pull/137), [#140](https://github.com/speee/jsx-slack/pull/140))

## v1.6.0 - 2020-03-20

### Added

- `responseUrlEnabled` property for modal's input component to `<ConversationsSelect>` and `<ChannelsSelect>` ([#134](https://github.com/speee/jsx-slack/issues/134), [#135](https://github.com/speee/jsx-slack/pull/135))
- Experimental filter properties to `<ConversationsSelect>`: `include`, `excludeExternalSharedChannels`, and `excludeBotUsers` ([#133](https://github.com/speee/jsx-slack/issues/133), [#136](https://github.com/speee/jsx-slack/pull/136))

## v1.5.1 - 2020-03-16

### Added

- `value` attribute for `<li>` element ([#130](https://github.com/speee/jsx-slack/pull/130))

### Fixed

- Fix mention detection to match to longer Slack ID ([#129](https://github.com/speee/jsx-slack/pull/129))

### Changed

- Upgrade deep dependencies ([#131](https://github.com/speee/jsx-slack/pull/131))

## v1.5.0 - 2020-03-12

### Changed

- Improve escaping special characters to keep original character as possible ([#124](https://github.com/speee/jsx-slack/issues/124), [#125](https://github.com/speee/jsx-slack/pull/125))
- Make JSX element for passing to Slack API serializable to JSON directly ([#126](https://github.com/speee/jsx-slack/pull/126))
- `jsxslack` template literal tag now returns raw JSX element, or JSON if serializable ([#127](https://github.com/speee/jsx-slack/pull/127))

### Added

- `jsxslack.raw` template literal tag to generate JSX element always ([#127](https://github.com/speee/jsx-slack/pull/127))

### Deprecated

- Confusable `jsxslack.fragment` template literal tag has deprecated (Use `jsxslack` or `jsxslack.raw` instead) ([#127](https://github.com/speee/jsx-slack/pull/127))

## v1.4.0 - 2020-03-06

### Added

- Support `type` attribute for `<ol>` element ([#117](https://github.com/speee/jsx-slack/pull/117))

### Changed

- Allow text formatting through mrkdwn and HTML-like elements in `<RadioButton>` ([#119](https://github.com/speee/jsx-slack/issues/119), [#122](https://github.com/speee/jsx-slack/pull/122))
- Change spaces for indenting lists into unicode spaces that were based on measured width in Slack's font ([#117](https://github.com/speee/jsx-slack/pull/117))
- Upgrade development Node and dependent packages to the latest version ([#123](https://github.com/speee/jsx-slack/pull/123))

### Fixed

- Prevent over-escaping for link and time formatting ([#118](https://github.com/speee/jsx-slack/issues/118), [#120](https://github.com/speee/jsx-slack/pull/120))

### Deprecated

- Mark the legacy parser as deprecated ([#121](https://github.com/speee/jsx-slack/pull/121))

## v1.3.1 - 2020-02-14

### Fixed

- Fix regression about not rendered special spaces around the content ([#113](https://github.com/speee/jsx-slack/pull/113))

## v1.3.0 - 2020-02-14

### Changed

- [Fully-rewrite HTML parser](https://github.com/speee/jsx-slack/blob/master/docs/html-like-formatting.md#about-parser) to reduce bundle size drastically (x43 smaller) ([#112](https://github.com/speee/jsx-slack/pull/112))

### Added

- [`legacyParser()`](https://github.com/speee/jsx-slack/blob/master/docs/html-like-formatting.md#legacy-parser) for switching into legacy parser ([#112](https://github.com/speee/jsx-slack/pull/112))

## v1.2.0 - 2020-02-10

### Added

- [`<CheckboxGroup>`](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#checkbox-group) and [`<Checkbox>`](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#checkbox) interactive component ([#108](https://github.com/speee/jsx-slack/issues/108), [#109](https://github.com/speee/jsx-slack/pull/109))
- [Redirect the content of `<small>` element into `description`](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#redirect-small-into-description) in `<Checkbox>` and `<RadioButton>` ([#109](https://github.com/speee/jsx-slack/pull/109))
- Add the build for ES modules to make tree-shakable ([#110](https://github.com/speee/jsx-slack/pull/110))

### Changed

- Upgrade dependent packages to the latest version ([#107](https://github.com/speee/jsx-slack/pull/107))
- Upgrade development Node to 12.15.0

## v1.1.0 - 2020-01-20

### Added

- [Custom transformer](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#custom-transformer) for modal's private metadata ([#106](https://github.com/speee/jsx-slack/pull/106))

### Changed

- Mark `<Home>` container as stable ([#105](https://github.com/speee/jsx-slack/pull/105))

## v1.0.0 - 2020-01-10

### Breaking

- Components for [the outdated dialog](https://api.slack.com/dialogs) provided in `@speee-js/jsx-slack/dialog` can no longer use ([#84](https://github.com/speee/jsx-slack/pull/84))
- Drop Node 8 support ([#100](https://github.com/speee/jsx-slack/pull/100))

### Added

- `<Mrkdwn>` text composition component ([#73](https://github.com/speee/jsx-slack/issues/73), [#97](https://github.com/speee/jsx-slack/pull/97) by [@javaPhil](https://github.com/javaPhil), [#103](https://github.com/speee/jsx-slack/pull/103))

### Fixed

- Prevent over-escaping in valid emoji shorthand ([#98](https://github.com/speee/jsx-slack/issues/98), [#101](https://github.com/speee/jsx-slack/pull/101))

### Changed

- Upgrade dependent packages to the latest version ([#92](https://github.com/speee/jsx-slack/pull/92), [#104](https://github.com/speee/jsx-slack/pull/104))
- Upgrade development Node to 12.14.1 ([#104](https://github.com/speee/jsx-slack/pull/104))

### Removed

- Remove deprecated dialog support ([#84](https://github.com/speee/jsx-slack/pull/84), [#99](https://github.com/speee/jsx-slack/pull/99))
- Get rid of `lodash.flattendeep` dependency ([#102](https://github.com/speee/jsx-slack/pull/102))

## v0.12.0 - 2019-11-22

### Added

- Radio buttons for modal ([#88](https://github.com/speee/jsx-slack/issues/88), [#91](https://github.com/speee/jsx-slack/pull/91))
  - `<RadioButtonGroup>` now can use in `<Modal>` container and acts as input component for modal

### Changed

- Upgrade dependent packages to the latest version ([#90](https://github.com/speee/jsx-slack/pull/90))

## v0.11.1 - 2019-11-13

### Fixed

- Don't throw error even if `<Overflow>` has only one `<OverflowItem>` ([#85](https://github.com/speee/jsx-slack/issues/85), [#86](https://github.com/speee/jsx-slack/pull/86))
- Fix 413 error from Block Kit Builder when translated huge JSON on REPL demo ([#82](https://github.com/speee/jsx-slack/pull/82))
- Improve internal type definitions for overloaded props ([#83](https://github.com/speee/jsx-slack/pull/83))

### Changed

- Upgrade dependent packages to the latest version ([#87](https://github.com/speee/jsx-slack/pull/87))

## v0.11.0 - 2019-10-24

### Added

- Add (an experimental) `<Home>` container component for home tab ([#75](https://github.com/speee/jsx-slack/issues/75), [#78](https://github.com/speee/jsx-slack/pull/78))
- [`<RadioButtonGroup>`](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#radio-button-group) and [`<RadioButton>`](https://github.com/speee/jsx-slack/blob/master/docs/block-elements.md#radio-button) interactive component for home tab ([#74](https://github.com/speee/jsx-slack/issues/74), [#80](https://github.com/speee/jsx-slack/pull/80))
- "Copy to clipboard" button on REPL demo ([#77](https://github.com/speee/jsx-slack/pull/77))

### Changed

- Upgrade Node for development to v12 LTS ([#79](https://github.com/speee/jsx-slack/pull/79))

### Fixed

- Throw an error when using `<File>` in `<Modal>` ([#76](https://github.com/speee/jsx-slack/pull/76))
- REPL demo can transfer the complete modal JSON to Block Kit Builder ([#77](https://github.com/speee/jsx-slack/pull/77))

### Deprecated

- Output warning about deprecated dialog components ([#72](https://github.com/speee/jsx-slack/pull/72))

## v0.10.2 - 2019-10-11

### Fixed

- Make interpolated fragments in template literal work correctly ([#71](https://github.com/speee/jsx-slack/pull/71))

## v0.10.1 - 2019-10-10

### Fixed

- Fix invalid array children in template literal ([#69](https://github.com/speee/jsx-slack/pull/69))

### Changed

- Upgrade Node and dependent packages to the latest version ([#70](https://github.com/speee/jsx-slack/pull/70))

## v0.10.0 - 2019-10-02

### Added

- [Multi-select menus](https://api.slack.com/reference/block-kit/block-elements#multi_select) ([#56](https://github.com/speee/jsx-slack/issues/56), [#58](https://github.com/speee/jsx-slack/pull/58))
- [Modals support](https://api.slack.com/block-kit/surfaces/modals) ([#57](https://github.com/speee/jsx-slack/issues/57))
  - `<Modal>` container component ([#60](https://github.com/speee/jsx-slack/pull/60))
  - `<Input>` layout block and component ([#61](https://github.com/speee/jsx-slack/pull/61))
  - `<Textarea>` component ([#62](https://github.com/speee/jsx-slack/pull/62))
  - Input-compatible props to select-like elements and `<DatePicker>` ([#63](https://github.com/speee/jsx-slack/pull/63))
  - Intrinsic HTML elements of input components ([#65](https://github.com/speee/jsx-slack/pull/65))
  - Add extra types for `<Input>` component ([#66](https://github.com/speee/jsx-slack/pull/66))
  - Update REPL demo to support Modals ([#68](https://github.com/speee/jsx-slack/pull/68))

### Changed

- Bump dependent packages to the latest version ([#59](https://github.com/speee/jsx-slack/pull/59))
- Check invalid elements in `<Blocks>` and `<Input>` strictly ([#64](https://github.com/speee/jsx-slack/pull/64))
- Split test cases for Block Kit components into multiple files ([#66](https://github.com/speee/jsx-slack/pull/66))
- Organize documentation ([#20](https://github.com/speee/jsx-slack/issues/20), [#67](https://github.com/speee/jsx-slack/pull/67))

### Deprecated

- Mark `<Dialog>` as soft-deprecated in favor of Slack Modals ([#60](https://github.com/speee/jsx-slack/pull/60))

## v0.9.2 - 2019-08-29

### Fixed

- Nested fragments fail ([#53](https://github.com/speee/jsx-slack/issues/53), [#54](https://github.com/speee/jsx-slack/pull/54))

### Changed

- Update dependent packages to the latest version ([#52](https://github.com/speee/jsx-slack/pull/52))

## v0.9.1 - 2019-08-15

### Fixed

- Fix regression of not preserved `<pre>` whitespaces ([#48](https://github.com/speee/jsx-slack/issues/48), [#49](https://github.com/speee/jsx-slack/pull/49))

### Changed

- Update dependent packages to the latest version ([#50](https://github.com/speee/jsx-slack/pull/50))

## v0.9.0 - 2019-08-15

### Breaking

- Disabled heuristic detection for HTML entities (Escaping works [just as same as React JSX](https://reactjs.org/docs/jsx-in-depth.html#string-literals)) ([#33](https://github.com/speee/jsx-slack/pull/33))
- Some raw characters for mrkdwn link, `<`, `>`, and `&` will always escape to entities ([#45](https://github.com/speee/jsx-slack/issues/45))

### Changed

- Improve html entity decoding in JSX and template literal tag ([#33](https://github.com/speee/jsx-slack/pull/33), [#45](https://github.com/speee/jsx-slack/issues/45), [#47](https://github.com/speee/jsx-slack/pull/47))
- Allow links in the inside of `<code>` and `<pre>` element ([#16](https://github.com/speee/jsx-slack/pull/16), [#46](https://github.com/speee/jsx-slack/pull/46))

## v0.8.1 - 2019-08-07

### Added

- Better dialog support for `jsxslack` template literal ([#42](https://github.com/speee/jsx-slack/issues/42), [#43](https://github.com/speee/jsx-slack/pull/43))
- Update REPL demo to add dialog example ([#43](https://github.com/speee/jsx-slack/pull/43))

### Fixed

- Coerce number-expected prop to integer ([#44](https://github.com/speee/jsx-slack/pull/44))

## v0.8.0 - 2019-08-06

### Added

- Dialog support ([#19](https://github.com/speee/jsx-slack/issues/19), [#39](https://github.com/speee/jsx-slack/pull/39))

### Fixed

- Don't prevent generating `<SelectFragment>` with no options ([#41](https://github.com/speee/jsx-slack/pull/41))

### Changed

- Update `htm` to [v2.2.0](https://github.com/developit/htm/releases/tag/2.2.0) ([#38](https://github.com/speee/jsx-slack/pull/38))

## v0.7.0 - 2019-07-29

### Added

- `<File>` block component ([#34](https://github.com/speee/jsx-slack/issues/34), [#35](https://github.com/speee/jsx-slack/pull/35))
- `jsxslack.fragment` template literal tag ([#32](https://github.com/speee/jsx-slack/pull/32))
- Codecov integration and coverage badge ([#36](https://github.com/speee/jsx-slack/pull/36))

### Changed

- Update dependent packages to the latest version ([#37](https://github.com/speee/jsx-slack/pull/37))

## v0.6.0 - 2019-07-20

### Added

- Convert `<span>` in `<Context>` into mrkdwn element ([#26](https://github.com/speee/jsx-slack/issues/26), [#31](https://github.com/speee/jsx-slack/pull/31))
- `<Fragment>` built-in component ([#29](https://github.com/speee/jsx-slack/pull/29))

## v0.5.1 - 2019-07-14

### Added

- Support mention to global user ID for Enterprise Grid ([#25](https://github.com/speee/jsx-slack/pull/25))

### Changed

- Update dependent packages to the latest version ([#28](https://github.com/speee/jsx-slack/pull/28))

## v0.5.0 - 2019-06-28

### Added

- Support Node.js 12 ([#23](https://github.com/speee/jsx-slack/pull/23))

### Changed

- Make interchangeable with `<Image>` component and intrinsic `<img>` tag ([#21](https://github.com/speee/jsx-slack/pull/21))
- Upgrade dependent packages to the latest version ([#24](https://github.com/speee/jsx-slack/pull/24))

### Removed

- Remove deprecated `<Block>` component ([#22](https://github.com/speee/jsx-slack/pull/22))

## v0.4.3 - 2019-05-15

### Fixed

- Fix vanishing styled channel links and mentions ([#15](https://github.com/speee/jsx-slack/issues/15), [#17](https://github.com/speee/jsx-slack/pull/17))

### Changed

- Upgrade dependent packages to the latest version ([#18](https://github.com/speee/jsx-slack/pull/18))

## v0.4.2 - 2019-04-13

### Added

- Add `style` prop for `<Button>` component ([#13](https://github.com/speee/jsx-slack/issues/13), [#14](https://github.com/speee/jsx-slack/pull/14))

## v0.4.1 - 2019-03-13

### Added

- `<Blocks>` container component ([#12](https://github.com/speee/jsx-slack/pull/12))

### Deprecated

- Mark a confusable `<Block>` fragment component as deprecated in favor of added `<Blocks>` ([#11](https://github.com/speee/jsx-slack/issues/11), [#12](https://github.com/speee/jsx-slack/pull/12))

## v0.4.0 - 2019-03-12

### Added

- Support nested list ([#10](https://github.com/speee/jsx-slack/pull/10))

## v0.3.0 - 2019-03-11

### Added

- Add `<SelectFragment>` component ([#9](https://github.com/speee/jsx-slack/pull/9))

### Changed

- Right-aligned number in ordered list ([#8](https://github.com/speee/jsx-slack/pull/8))

## v0.2.0 - 2019-03-07

### Added

- `jsxslack` template literal tag for using jsx-slack without transpiler, powered by [htm](https://github.com/developit/htm) ([#6](https://github.com/speee/jsx-slack/issues/6), [#7](https://github.com/speee/jsx-slack/pull/7))

### Fixed

- Improve `README.md` with some minor fixes ([#4](https://github.com/speee/jsx-slack/pull/4))
- Revert ignored audit ([#5](https://github.com/speee/jsx-slack/pull/5))

## v0.1.0 - 2019-03-01

- Initial release.
