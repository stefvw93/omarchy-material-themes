# Design tokens

Source: <https://m3.material.io/foundations/design-tokens> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:01:46.434Z)

> Design tokens are the building blocks of all UI elements. The same tokens are used in designs, tools, and code.

## Overview

- 

Tokens point to style values like colors, fonts, and measurements
- 

Use design tokens instead of hardcoded values
- 

Each token is named for how or where it’s used (for example, **md.comp.fab.primary.container.color** sets the container color for a FAB)
- 

Even if a token’s end value is changed, its name and use remain the same
- 

Material Design has three classes of tokens: reference (https://m3.material.io/m3/pages/design-tokens/overview#6a0933c0-50f5-4dd6-b055-b7c4ff2c1535), system (https://m3.material.io/m3/pages/design-tokens/overview#7f084930-cf5f-4b7e-b83c-614888f18a77), and component (https://m3.material.io/m3/pages/design-tokens/overview#b4d6bb35-ee69-4908-bcb4-b33b0a1997e2)

[Image: FAB container color token in a design mock, code, and product](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmihjfljt-tokens-overview-01-3P.png?alt=media&token=a794c15b-0ab7-4225-ac0b-60d8b34cb80a)

_Using design tokens instead of hardcoded values can streamline the work of building, maintaining, and scaling products with a design system_

#### Resources

| Type | Link | Status |
| --- | --- | --- |
| Design | Design Kit (http://goo.gle/m3-design-kit) (Figma) | Available |
| Material Theme Builder Figma plugin (https://goo.gle/material-theme-builder-figma) | Available |  |
| Implementation | Material baseline theme and tokens (https://github.com/material-foundation/material-tokens) (DSP) | Available |

#### What’s a design token?

Design tokens are small, reusable design decisions that make up a design system's visual style. Tokens replace static values with self-explanatory names.

A design token consists of 2 things:

1. 

A code-like name, such as **md.ref.palette.secondary90**
2. 

An associated value, such as **#E8DEF8**

The token's value can be one of several things: A color, typeface, measurement, or even another token.

[Image: Token md.ref.palette.secondary90 with arrow pointing to lilac color swatch #E8DEF8.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2bj1kfh-tokens-what-are-tokens.png?alt=media&token=0133a78f-7994-43a9-b66a-03c5f367391d)

_Example of a reference token and its color value_

Design tokens meaningfully connect style choices that would otherwise lack a clear relationship.

For example, if a designer's mock-ups and an engineer's implementation both reference the same token for the “secondary container color,” then they can be confident that the same color is being used in both places. This applies even if the hex value assigned to that token gets updated.

[Image: Diagram of FAB indicating system tokens: Secondary for surface color and on secondary for icon color](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2bj3fdz-tokens-what-are-tokens-2.png?alt=media&token=19408e58-fec8-487d-9a8e-7f2aa626ed2e)

_Example of tokens assigned to the secondary and on secondary color roles of a FAB’s container and icon, respectively_

#### Why are tokens important?

Tokens make it possible for a design system to have a single source of truth – a repository where style choices are recorded and changes can be tracked.

Because tokens are reusable and purpose-driven, they can define system-wide updates to themes and contexts. For example, you can use tokens to systematically apply a high-contrast color palette for improved visibility, or change the typographic scale to ensure that text is legible on a TV screen.

By using tokens for design and implementation, style updates propagate consistently through an entire product or suite of products. They also help designers and engineers "speak the same language,” reducing confusion during handoff from design to implementation.

[Image: Diagram of how changing the value of a token cascades from design system into a product area and 3 products](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fkudi7oge-kpzr9qtu-tokens-why-importan%20(1).gif?alt=media&token=142f8c9b-0d26-48b6-a660-800be473b1af)

_As design systems evolve, certain values will change. With design tokens, we can track changes and ensure consistency across our products._

#### Deciding if tokens are right for you

###### **Tokens will be most helpful if:**

- You plan to update the design of your product or are building a product from scratch
- Your design system is applied across a suite of products or platforms
- You want to make it easy to maintain or update styles in the future
- You want to get the most out of the Material Design system, including features like dynamic color

###### **Tokens will be less helpful if:**

- You have an existing app using hard-coded values that is unlikely to change in the next year or two
- Your product does not have a design system

#### Tokens & Material Design

In the past, Material styles were communicated through guidelines, design files, tools, and platform-specific component libraries.

With design tokens, you can now download, customize, and apply Material styles and integrate them across your design and development process.

Tokens allow decisions to be documented in a platform-agnostic and shareable format.

[Image: Diagram of design token connected to design tool and platform code](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2bj3wia-tokens-ref.png?alt=media&token=6cc21d48-b13c-4b57-81dd-e1685467f514)

_Design tokens provide a central repository for design choices, with a variety of integration points for engineers and designers_

On this site, you’ll see tokens listed in interactive modules.

These modules let you quickly look up the default baseline value stored by tokens for color, font, font size, font weight, etc. They also show the relationship between a role, its system token, reference token, and stored pre-set value.

[Image: A token module for the color system with 4 color swatches for the primary color set.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7ufbh-token-tables_1.png?alt=media&token=d1b933f1-6ae9-4476-80f4-acb1c279179d)

_Example of a token module_

You’ll also see tokens in the specs tabs of component articles.

Tokens are first grouped by **state** (enabled, disabled, hover, etc) and then by **element**, which is the part of the component that a token or value applies to, such as the container or label text.

Columns include:

- **Name **– The component style aspect that the token applies to, such as color or font
- **Token ID** – The token defining the component style aspect
- **Description** – Optional descriptive info
- **Context/value** – The value stored in the token for a given context

[Image: A token module for an elevated button organized by state (enabled, disabled, etc), then element (container, label text).](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7upc5-token-tables_2.png?alt=media&token=99ddd218-ef8d-48f0-b5e5-64615b38971f)

_The diagram and token module for elevated button_

##### How to use token modules

Let's say you need to verify the color role for a filled button's label text.

Navigate to Common buttons > Specs, find the token module for filled buttons, and search for the "label text" tokens under elements.

Copy the color token and paste it in code, or compare it to the color role in Figma.

[Image: How to find the label text color token.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2jdnd1z-Using-token-tables.png?alt=media&token=a8b308b5-cda7-4c42-bba3-6b3c824663c1)

_Diagram and token table for filled button label color_

#### Parts of a token name

The parts of a token name are separated by periods and proceed from the most general information ("md") to the most specific ("on-secondary").

1. All token names in a design system start with the system name (such as “md” for Material Design)
2. An abbreviation for the token class: “ref” for reference tokens, “sys” for system tokens, and “comp” for component tokens
3. The token ends with descriptive words communicating the token’s role

[Image: Diagram of the 3 parts of a design token name: system prefix, token type, and role description](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm4mwzkye-tokens-naming-convention.png?alt=media&token=82e4ca08-276e-4c3e-a617-6a2ed2255292)

_1. Communicates design system
2. Communicates token class
3. Communicates token’s purpose_

#### Classes of tokens

There are three classes of tokens in Material:

1. Reference tokens
All available tokens with associated values.
2. System tokens
Decisions and roles that give the design system its character, from color and typography, to elevation and shape.
3. Component tokens
The design properties assigned to elements in a component, such as the color of a button icon.

With three classes of tokens, teams can update design decisions globally or apply a change to a single component.

[Image: Color value stored in reference token stored in system token, stored in component token, appearing as the container color of a FAB](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7vmvv-tokens-types.png?alt=media&token=3410f8c8-74ca-4efe-9e99-7594befdcca5)

_A button that receives its container color through a system of three tokens that define scalable color values. The color tokens point to a specific hex value that can easily change without impacting the token syntax._

##### Reference tokens

These tokens make up all of the style options available in a design system.

They usually point to a static value – such as a color hex code or font size – but can also point to other reference tokens. Reference tokens don't change based on context.

By providing a list of options, reference tokens give your team a starting point of approved colors, typography, measurements, etc.

All reference tokens start with the prefix **ref**.

[Image: Token md.ref.palette.secondary90 pointing to #E8DEF8. Toke md.ref.typeface.plain-medium pointing to Roboto Medium](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7whio-tokens-ref.png?alt=media&token=500d9576-5009-488e-be5c-172669896933)

_Color and typography reference tokens and their values_

##### System tokens

These are the decisions that systematize the design language for a specific theme or context.

System tokens define the purpose a reference token serves in the UI.

This is where theming occurs. The system token can point to different reference tokens depending on the context, such as a light or dark theme.

Whenever possible, system tokens should point to reference tokens rather than static values. 

All system tokens start with the prefix **sys**.

[Image: System token md.sys.color.secondary-container pointing to token md.ref.palette.secondary90 pointing to #E8DEF8. System token md.sys.typescale.label-medium.font pointing to token md.ref.typeface.plain-medium pointing to Roboto Medium](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7wqsm-tokens-sys.png?alt=media&token=84883ac7-1c2a-4e29-8b01-cbf95f068e68)

_System tokens, reference tokens, and their values_

##### Component tokens (in development)

These represent the elements required to compose a component, such as containers, label text, icons, states, and their values such as size, shape, color, or elevation.

Whenever possible, component tokens should point to a system or reference token, and not contain hardcoded values such as hex codes.

Not every stylistic choice of a component will be able to be expressed as a token, but whenever a design choice applies to multiple components of similar intent, a token should be used.

All component tokens start with the prefix **comp**.

[Image: Extended FAB component tokens for container color and label text pointing to system tokens, pointing to reference tokens, pointing to resolved values](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7xj0c-tokens-comp.png?alt=media&token=fdaf6e1f-3f81-47bd-a5c4-a55832493fe9)

_Component tokens, system tokens, reference tokens, and their values_

#### Contexts

Tokens can point to different values depending on a set of conditions. These conditions are called contexts and their resulting values are called contextual values.

Examples of different contexts include: device form factors, dark theme, dense layouts, and right-to-left writing systems.

You can think of a context as a kind of tag. If a token value is tagged with dark theme then it will override the default token value in a dark theme context.

[Image: Diagram of system token for background color pointing to different values depending on the theme context](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fm2a7xyeq-tokens-contexs.png?alt=media&token=58caa03a-f74c-4e47-9482-9a9a4779c82a)

_The same system token for background color can point to different reference tokens depending on the context: Light theme or dark theme_

## How to use tokens

#### Download Material baseline tokens

Material Design’s baseline theme includes design tokens and default values. Download the theme (http://github.com/material-foundation/material-tokens) as a Design System Package (DSP) to customize, collaborate on, and use in your own designs and product code.  Learn about the DSP JSON format (https://github.com/AdobeXD/design-system-package-dsp)

#### Use tokens in Figma

To begin, install the Material Theme Builder (https://goo.gle/material-theme-builder-figma) Figma plugin from the community page.

##### Generate tokens

1. Open Figma and navigate to: **Plugins** > **Material Theme Builder** > **Open Plugin**
2. Select **Get started**, this will create **material-theme** with baseline values by default. Color and text styles will begin populating the right hand design panel. When your tokens are fully generated, your artboard will contain tonal palettes for light and dark color schemes, as well as a default type scale.
3. Your tokens are now represented as Figma styles (https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma) that can be used throughout your designs

##### Update token values

###### Using the Material Theme Builder Figma plugin (updates colors only)

1. Open Figma and navigate to: **Plugins** > **Material Theme Builder** > **Open Plugin**
2. Choose the colors. Updated color and text styles will begin populating the right hand design panel.
3. Your updated tokens are now represented as Figma styles (https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma) that can be used throughout your designs

###### Using Figma styles

1. In Figma, navigate to the file in which the tokenized style is defined. Shortcut: right click the style in the right hand sidebar and select **Go to style definition.**
2. In the right hand sidebar, hover over the style you want to update and **select the adjust icon when it appears**. Or, right click the style in the style picker and select **Edit style**.
3. Make your changes to the token name, description, properties, etc. using the **Edit style panel**. Close the panel when finished.

##### Use tokens in product mock-ups

1. Instead of manually setting the color or typography for elements in a layout, apply the Figma styles (https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma) representing your design tokens. This helps ensure that developers will correctly understand and apply your design choices.

##### Use tokens with the Material Design Kit

1. Duplicate the Material Design Kit in Figma
2. Navigate to **Plugins** > **Material Theme Builder** > **Open plugin**
3. With components selected, **select swap**. This will swap the baseline Material token style values with your own generated token style values.

##### Export tokens

1. Open Figma and navigate to: **Plugins** > **Material Theme Builder** > **Open Plugin**
2. Navigate to the **Export tab**. Select the format you want to export for (Android, Jetpack Compose)
3. Name your .zip file and select **Save**

Your tokens are ready to share!
