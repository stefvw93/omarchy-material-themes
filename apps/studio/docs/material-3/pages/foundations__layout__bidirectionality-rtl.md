# Bidirectionality &amp; RTL

Source: <https://m3.material.io/foundations/layout/bidirectionality-rtl> (content version 2026-09-23_06-10-05, page updated 2026-08-05T08:56:11.377Z)

> Design products that adapt to languages that read right-to-left (RTL)

## Tab 1

Over 2 billion people (https://www.w3.org/International/questions/qa-scripts.en.html) read and write in right-to-left (RTL) languages like Arabic, Hebrew, Farsi, and Urdu. Layouts should support both left-to-right (LTR) and RTL languages through mirroring and other best practices to ensure content is easy for global audiences to understand and navigate. Consider the holistic experience including global writing (https://m3.material.io/m3/pages/global-writing/overview), localizing voice and design principles for culturally appropriate icons (https://m3.material.io/m3/pages/icons/designing-icons#5f0e344b-17f8-4b91-b0e4-45671b9900f4).

Material's components are built to support RTL, such as naming elements and tokens as "leading" and "trailing." However, extra configuration may be needed to achieve specific RTL situations.

#### Mirroring

When a layout is changed from LTR to RTL (or vice-versa), or flipped horizontally, it’s often called mirroring. UI elements and text that typically appear on the left in LTR aligns to the right. Reading flow starts from the top right corner, instead of the top left.

Not all elements mirror with RTL languages. For example, graphs and charts maintain a LTR directionality for Persian and Urdu.

[Image: Layout in LTR and mirrored for RTL language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftouf7-01.png?alt=media&token=3f31f1fa-7b90-41f8-9250-3ff8e5f4fcc2)

_A mirrored layout in an RTL language reverses the alignment and ordering of elements_

#### Text rendering

Correct text rendering is foundational for a great user experience, and it’s critical for readability and usability. Text rendering has two parts:

1. 

Alignment: How the edges of the text box are placed alongside other elements
2. 

Directionality: How text and other elements flow within a text box, like left-to-right or right-to-left

In RTL languages, text is usually right-aligned, and elements flow from right-to-left.

Common issues with RTL language rendering are text entry, cursor position, punctuation, phone numbers, and URLs.

Improperly rendering text in RTL languages can create cognitive overload and negatively impact user sentiment and trust.

[Image: Text field incorrectly displaying the word order of an email address and cursor placement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftq4kx-02-dont.png?alt=media&token=7c0390e2-bdeb-4053-8ded-37e520184178)

_Don't reverse the order of the email username and domain (@google.com). The domain should always be to the right of the username. Usernames can still be written RTL, with the cursor moving to the left.

Note: This example isn’t translated to illustrate a common issue with text rendering._

[Image: Dialog window incorrectly displaying word order decreasing readability.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftrw89-03-dont.png?alt=media&token=70bbad87-51c4-4ca8-a0fd-f20c4145a3ff)

_Don’t apply LTR directionality to RTL content, because it may scramble word order. To ensure readability across all languages, the content should have both RTL alignment and directionality.

Note: This example isn’t translated to illustrate a common issue with text rendering._

#### Icons & symbols

In RTL languages, directional UI icons, like back and forward, should be mirrored. However, in Hebrew, timelines and media controls on a page should retain left-to-right directionality.

The meaning of icons and symbols can vary significantly across cultures. For additional guidance, refer to design principles for icons (https://m3.material.io/m3/pages/icons/designing-icons#5f0e344b-17f8-4b91-b0e4-45671b9900f4).

[Image: Back and forward icons in LTR and RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftt2b2-04.png?alt=media&token=36523e52-cb30-4b7f-a1e8-85c4ff6978e3)

_Back and foward icons are mirrored in RTL_

[Image: Send and question mark icons in LTR and RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftts4z-05.png?alt=media&token=28c77745-432d-4b82-a269-f651d1ee8c4d)

_Send buttons are mirrored in RTL. Help icons are mirrored in some RTL languages, like Urdu and Persian._

#### Time

Linear representations of time are often mirrored in RTL language experiences. 

Linear progress indicators should move from right to left for most RTL languages, except Hebrew where it should remain LTR.

Circular representations of time remain the same.

[Image: RTL linear progress indicator filling from right to left and circular progress indicator filling clockwise.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsftutz2-06.png?alt=media&token=34db22f3-cc7d-4f83-9c49-cbdd11452a72)

_1. 

RTL linear progress indicator starts to fill progress from the right 
2. 

Circular progress indicators move clockwise_

##### Media players

Media controls for video or audio players are always LTR.

[Image: Media player with control and progress in LTR and all other content is RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu1nlp-07.png?alt=media&token=8311f5c0-f4ec-4ed4-8e27-8119044d2129)

_In Urdu, controls and progress for media and a podcast title are shown in LTR, while all other content is RTL_

##### Clocks

For RTL languages, the directionality of time remains LTR, and clocks still turn clockwise. However, the AM/PM symbols for 12h clocks should be placed to the left. The 24-hour clock is often used in countries where the primary language isn’t English.

Clock icons, circular refresh icons, and progress indicators with arrows pointing clockwise shouldn’t be mirrored.

[Image: 24-hour clock in RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu311j-08.png?alt=media&token=3cf57eaa-c1fa-46b0-a383-f95ab03fcd92)

_24-hour clocks in RTL move clockwise, but mirror elements such as buttons_

[Image: 12-hour clock in RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu4524-09.png?alt=media&token=1036a9dc-b20e-490e-b3fe-afa0e7a6668c)

_12-hour clocks in RTL move clockwise, but mirror UI elements such as AM/PM and buttons_

#### Canonical layout examples

##### List-detail

The list-detail layout (https://m3.material.io/m3/pages/canonical-examples/list-detail):

- 

Is a single-pane at compact breakpoints, switching between list and detail views
- 

Divides the window into two side-by-side panes on large screens
- 

Is mirrored in RTL

[Image: RTL list layout on mobile.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu5hg5-10.png?alt=media&token=12ab81fc-7dc4-4316-afce-9c91bc0b0a51)

_List-detail mirrored for RTL, where text and other elements are aligned to the right and flow from right to left_

##### Feed

Use a feed layout (https://m3.material.io/m3/pages/canonical-examples/feed) to arrange content elements like cards in a configurable grid for quick, convenient viewing of a large amount of content. The feed layout is mirrored in RTL.

[Image: RTL feed layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu84eb-11.png?alt=media&token=93b00f52-1ea4-4746-85ec-f6c18efd6f2b)

_Feed layout mirrored for RTL, where the order of text, grid, and other elements align to the right and flow from right to left_

##### Supporting pane

Use the supporting pane layout (https://m3.material.io/m3/pages/canonical-examples/supporting-pane) to organize content into primary and secondary display areas. The supporting pane layout is mirrored in RTL.

[Image: RTL supporting pane in an RTL language.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfu93jo-12.png?alt=media&token=4a4c3c14-091a-4957-bb33-6196deeb9815)

_Supporting pane to the left of the primary content. Text and other elements within the pane are aligned to the right and flow from right to left._

#### Component examples

##### Badges

Change the position and alignment of badges (https://m3.material.io/m3/pages/badges/overview) for RTL languages.

[Image: Small badge on the top left of a folder icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfuadi8-13.png?alt=media&token=0ad59dcd-7216-4770-a324-dfd1e396d755)

_Small badge appears on the top left of the icon_

[Image: Large badge on the top left of an image icon.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfub9sg-14.png?alt=media&token=45b981ca-083c-4a25-9df3-360ffbbe8a02)

_Large badge appears on the top left of the icon_

##### Toolbars

Toolbars (https://m3.material.io/m3/pages/toolbars/overview) provide actions related to the current page. For RTL languages, mirror the order of the tools.

[Image: RTL floating toolbar.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfucmb1-15.png?alt=media&token=e321b356-aad8-4f2c-b11a-7a65d29967db)

_Mirrored floating toolbar, where the FAB appears on the left_

##### App bars

App bars (https://m3.material.io/m3/pages/app-bars/overview) are placed at the top of the screen to help people navigate through a product:

- 

Mirror an app bar’s layout in RTL
- 

Flip appropriate icons, such as arrows

[Image: 4 app bars in RTL.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfue0zv-16.png?alt=media&token=a130f3ec-fd26-451b-838d-34cc43d06d8b)

_1. 

RTL center-aligned, small app bars 
2. 

RTL medium, flexible app bar 
3. 

RTL large, flexible app bar_

##### Navigation rail

The navigation rail (https://m3.material.io/m3/pages/navigation-rail/overview) is placed on the leading edge of the screen, on the left side for LTR, and on the right for RTL.

[Image: Nav rail on the right side for an RTL language, and left side for LTR.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfufptj-18.png?alt=media&token=08483121-0bf4-4be1-b2cb-d290af26ea74)

_Based on the language, a navigation rail is set on a screen’s leading edge:

- 

Right side for RTL languages
- 

Left side for LTR languages_

##### Expanded navigation rail

Expanded navigation rails that open from the side are always placed on the leading edge of the screen, on the left for LTR languages, and on the right for RTL.

[Image: RTL expanded navigation rail, including mirrored icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfugr2m-17.png?alt=media&token=260d0ace-0f1c-432c-a1ed-062941cafbd5)

_RTL expanded navigation rails open from the leading edge and should include mirrored icons_

##### Text fields

Icons in text fields (https://m3.material.io/m3/pages/text-fields/guidelines#5c8a5f07-b1a5-455f-bf76-7ff0d724f6b0) are optional. Leading and trailing icons change their position based on LTR or RTL contexts.

[Image: Text fields in RTL with leading and trailing icons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfuhyps-19.png?alt=media&token=4856666e-38a7-4df9-883d-8f08950c03c4)

_Icons, symbols, and label text for RTL: 

1. 

Icon signifier 
2. 

Valid or error icon 
3. 

Clear icon 
4. 

Voice input icon 
5. 

Dropdown icon 
6. 

Image_

##### Chips

The leading icon of input chips can be an icon, logo, or circular image.

The trailing icon is always aligned to the end side of the container. It’s placed on the right for LTR and on the left for RTL.

[Image: Filter chips with checkmark icons in RTL layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfuiwrg-20.png?alt=media&token=a75b02ec-b1e4-4b43-9293-b3812262687e)

_Filter chips shown in an RTL layout. Note: This example is not translated to help illustrate mirroring._

#### Swipe gestures

Gestures are the ways people interact with UI elements using touch or body motion.

People can navigate horizontally between peer views like tabs and to complete actions. 

RTL swiping and gestures should mirror their counterparts in LTR. If a product includes a delete icon revealed when swiped from the right for LTR languages, the same should be possible on the left for RTL languages.

[Image: RTL list layout with swipe gesture revealing additional actions.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fm3%2Fimages%2Fmsfumeds-21.png?alt=media&token=26fd8c0c-9f20-4432-8249-bfab98f6c03c)

_Swiping reveals additional action in RTL list layout_

On Android, predictive back (https://github.com/material-components/material-components-android/blob/master/docs/foundations/PredictiveBack.md) allows people to swipe left or right on the screen to go back or dismiss modal components.

RTL predictive back features should mirror those found in a LTR context.

[Video: Back swipe for RTL languages. The back swipe on a bottom sheet takes person back to previous screen of a photo feed.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp3l3v9p-GM3_Bidirectionality_Interaction%20Gestures_6_IA_v02.mp4?alt=media&token=76864157-f79f-4b54-a468-20af37b0af23)

_The predictive back gesture should adjust for RTL languages_
