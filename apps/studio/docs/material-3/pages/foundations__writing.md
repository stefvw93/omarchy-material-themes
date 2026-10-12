# Writing and text

Source: <https://m3.material.io/foundations/writing> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:36:35.129Z)

> Ensure text is helpful, clear, and resilient to change

## Best practices

#### Accessibility text

Accessibility text refers to text that is used by screen reader accessibility software, such as Google’s TalkBack on Android, Apple’s VoiceOver on iOS, and Freedom Scientific’s JAWS on desktop. Screen readers read aloud the on-screen text and elements (such as buttons), including both visible and nonvisible alternative text.

##### Adjacent text

To make an image more accessible, the text in and around images should consider presenting key information about the image.

[Image: Stacked card with image, caption, and adjacent text identified.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj55hv4-8.png?alt=media&token=229d4f46-48c7-4ed4-99a2-ba2527936425)

_1. Image
2. Caption
3. Adjacent text_

##### Captions

Captions are the text that appear below an image. They explain contextual information about the image to help the reader understand how it relates to the content. Both sighted and screen reader users rely on captions for descriptions of images.

[Image: Stacked card with image, alt text as caption, and adjacent text identified.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5628d-9.png?alt=media&token=c1ceac48-0ee3-4822-b7b2-dba96be35c7e)

_Use captions to help readers understand how the image relates to the content_

##### Embedded text in images

Screen readers are unable to read text that is embedded in imagery. If there is essential information embedded as text in the image, include the essential information in the alt text (https://m3.material.io/m3/pages/alt-text).

[Image: Stacked card with image, caption overlayed on image, and adjacent text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj56jdc-10.png?alt=media&token=3712cd9c-c733-4fa1-aaff-5cad15b89ff0)

_Take caution when embedding essential information anywhere a screenreader can't access, like text inside an image_

##### Alternative text (Alt text)

Alt text helps translate a visual UI into a text-based UI. Alt text is a short label (up to 125 characters) in the code that describes an image for users who are unable to see them. Since alt text is only for images, there is no need to add “image of” or “picture of” to the alt text. A screen reader will read the alt text aloud in place of the image. 

Alt text is valuable for sighted users, as well, because alt text appears if an image fails to load. Include targeted keywords to help inform the user about the image. Keywords can also improve search engine optimization (SEO).

Learn more about writing alt text (https://m3.material.io/m3/pages/alt-text)

[Image: A DJ standing in front of music equipment with alt text underneath describing image.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj573aa-7.png?alt=media&token=8b8899da-ed71-4e4f-822a-0005e637691e)

_Use alt text to convey what the image is showing in an informative, short phrase.
Alt text example: A DJ performs a set under lights and lasers_

#### Text color

##### Essential and non-essential elements

Informative images have essential and non-essential elements. Essential information should have a 3:1 minimum color contrast for large text and 4.5:1 for small text.

[Image: SIM card installation with essential and non-essential elements.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj57nfl-11.png?alt=media&token=170373e6-8391-4e97-a1dd-a5623716d0cb)

_The illustration contains both essential and non-essential information:

1. Essential: The text meets all contrast ratios and size requirements
2. Essential: An illustrative visual representation of the instructions that follows color contrast guidelines
3. Non-essential: The decorative elements create background and personality for the illustration. They do not relay information and do not have to meet Material's contrast requirements._

## Text truncation

#### Text truncation

Information should always be available to readers, even if text is truncated or wrapped.

##### Background

Increased size of text, increased spacing between text, and translation into longer languages shouldn’t result in losing content. This requires designing for text truncation and creating designs flexible enough to accommodate any viewport size or increase in zoom. Some common methods of designing for larger text include text wrapping, increased height or width of components, and truncation with ellipses and hover or link.

##### Requirements

Content, understandability, and functionality must not be lost when users modify their type settings. There may be exceptions to these requirements for non-Latin alphabet languages.

##### Text wrapping

- “Wrapped” text extends from one line to another, increasing the height of the text container
- Text should be wrapped when it’s critical, to ensure understandability, or when there’s space in the component

[Image: Body copy text wrapped inside a dialogue with an option to expand content.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5ao0k-18.png?alt=media&token=9823f564-5494-43f3-85ad-21af8dd5b024)

_Wrap text, and if it still doesn’t fit, provide a way for users to see more_

[Image: Body copy text wrapped inside a dialogue, cut off at the bottom, without an option to expand.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5b36c-19.png?alt=media&token=f638592f-e9a7-446c-b7e3-84ef22c0d79c)

_Don’t cut off text without providing a way for users to view it_

##### Height and width of components

- Some components can extend vertically or horizontally for more text

[Image: Layout of UI- cards of different sizes organized in a stacked grid.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5bfye-20.png?alt=media&token=fa20bfc7-0b26-4ed1-a256-8cb933dbacb4)

_Use flexible component containers that change size to fit their content_

[Image: A stretched UI card with a small headline and a large photograph.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5c5w5-21.png?alt=media&token=76cd69f0-f8db-4e21-8a38-221cd4d51984)

_Avoid setting text size limits that don’t fit the space in a component. Use all space available._

##### Ellipses with hover or link

- Truncated text can be replaced with an ellipsis if the text is available through a tooltip or link
- Links can be used when they’re contained in the text that’s truncated, and when the link displays what's been truncated
- If there's an ellipsis, but no way to show the truncated text, it is not accessible
- Note that this option can add difficulty for some people

[Video: A calendar with a cursor hovering over a day of the week displays a tooltip that reads “Tuesday.”](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5e7k2-GM3-Foundations-WritingAndText-Accessibility-1-v01.mp4?alt=media&token=2fbeb491-6ae1-4c4c-930b-02914cdf93af)

_Use links to reveal truncated text when space is limited, such as the ability to click a linked card to see an expanded view of its text_

[Image: On a multiple selection list, the marked checkbox’s label is truncated by an ellipsis.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm0qvmgvh-24.png?alt=media&token=db765429-c069-476c-85ef-f831e9bc6bd7)

_Don’t truncate content without providing users another way to see it_

## Text resizing

#### Text resizing

##### Background

People with low vision or those who prefer large text must be able to scale up the size of text in a UI. This adjustment is often performed through a device OS setting or in-app option.

UIs should support a minimum text increase of 200%.

Most components behave the same when text is resized:

- Text and line height scale up proportionally, multiplied by scale value
- Padding remains constant at 1x the default size
- Spacing between elements in a component remain constant at 1x the default size

[Image: Padding is the same on the top and bottom edges of the buttons.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5gijr-8.png?alt=media&token=76c97c12-c912-435f-aca9-f06637257b7b)

_Button text displayed at 1x, 1.3x, and 2x scales. All have top and bottom padding of 8dp._

[Image: Button text displayed at 1x, 1.3x, and 2x scales. All have left and right padding of 24dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5gt05-9.png?alt=media&token=876f39d6-c14f-4d45-bd7c-d945f82fff12)

_Left and right padding remains constant at 24dp as the text size increases._

When text resizing isn't controlled by the device OS, offer multipliers such as 1.5x or 2x to allow users to increase the text size. Using multipliers to scale text can result in values with decimals, but this approach is more feasible for implementation.

To calculate a font's size using multipliers, take the **default font size** (density = 0) and **multiply it by the scale value**.

[Image: Button with label text at 1x and 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5h7wy-10.png?alt=media&token=821d0159-4996-4342-a717-15f3a5d3b375)

_For example, if a font is 14pt at 1x scale, then the font size should be 28pt when enlarged to 2x scale: (14pt) x (scale value 2) = 28._

Components that don't include text, like progress indicators, checkboxes, or radio buttons, aren't affected by text resizing.

[Image: Icon button with the icon shown at 1x scale and incorrectly at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5hl59-11.png?alt=media&token=0d6620aa-6743-4478-b6a8-cec7da279ca7)

_When designing for text resizing, don't resize components without text_

[Image: Menu with labels at 1x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5hzv6-12.png?alt=media&token=0fbdf847-88fa-4bb6-86bd-7827ef797454)

_UI text displayed at 1x_

[Image: Menu with labels at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5iftq-13.png?alt=media&token=8b0674ad-6a2b-40a2-a54f-88e499dd6ae9)

_UI text displayed at 2x in which only text and line height is enlarged; the padding between components remains the same as in the 1x UI._

##### Designing for large type

Large type is used regularly by people with low vision and those with difficulty processing written words. They tend to increase text size:

- To make it easier to read

- To limit interruptions and focus on one task

- To avoid overwhelming their senses

Use these methods to design a product to handle large type properly.

[Image: Menu with labels at 2x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4bi7b7k-13-b.png?alt=media&token=622a927e-dd3e-4ecc-9cb6-2231e702ead5)

_Text that is too small and dense can appear overwhelming and difficult to read_

[Image: Menu with labels at 1x scale.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm4bi7fz7-13-a.png?alt=media&token=ece17269-405b-472a-9c38-4d087535740d)

_Larger text can help people focus on one decision at a time and improve understanding_

##### Methods

Avoid common text resizing issues by increasing container size, reflowing layout, enabling scrolling, and adding tooltips.

[Image: Side by side of 4 commonly found issues when resizing text up.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5iwyv-14.png?alt=media&token=b794a6a7-fe17-4365-95dd-8c85565c9d17)

_1. Unresponsive container; unintentionally clipped text
2. Unresponsive text
3. Overlapping elements
4. Unwanted truncation_

###### **Increase container size**

Resizing containers can prevent text from overlapping, clipping, or truncating.

Consider how text might reflow in a way that allows the eye to follow the end of one line to the beginning of the following line.

###### **Reflow the layout**

Consider reflowing the layout, especially when components grow very long. To accommodate larger text, components can be stacked on top of one another, rather than fixed side-by-side.

[Image: left: buttons placed side-by-side. Right: buttons stacked on top of one another.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5jdor-15.png?alt=media&token=82a605c0-5cc9-4d32-897e-d07133b39012)

_1. UI displayed at 1x: buttons positioned side-by-side in a standard layout
2. UI displayed at 2x: buttons stacked to fit the limited horizontal width after text is resized_

###### **Enable content to scroll**

When long strings of enlarged text don’t fit on one screen, consider adding a scrollbar to provide access to more content.

Vertical scrolling is preferable to horizontal. Users should only be asked to scroll in one direction, rather than both vertically and horizontally.

[Image: Dialog with a lot of text at 2x size. The text is cut off but accessible when scrolling.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5ldz9-16.png?alt=media&token=164a658d-4e2a-4d67-a35c-c4cb051f3389)

_Some screens may not be able to resize and display necessary content. In this situation a scrollbar can be used to access more text._

###### **Use touch & hold tooltips to provide enlarged labels**

Some components, such as app bars and navigation bars, position text in spaces with stricter space and character limits. In these situations, you can add a tooltip to display enlarged content in the UI.

In this case, the text size in the component remains displayed at 1x while the scaled up text is displayed in a tooltip on touch & hold.

Tooltips are the best choice for displaying enlarged text in:  

- Top app bar
- Navigation bar
- Navigation rail
- Tabs, when fixed to the top of a screen and don’t move off-screen upon scrolling

[Image: Tooltip on navigation rail displays scaled up label text.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Flwj5lr50-17.png?alt=media&token=c1272c3a-bf9b-473d-a942-4bb2c3221ffd)

_Scale up text in an adjacent tooltip to maintain space in a UI for consuming content._
