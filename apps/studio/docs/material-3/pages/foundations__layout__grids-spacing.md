# Grids &amp; spacing

Source: <https://m3.material.io/foundations/layout/grids-spacing> (content version 2026-09-23_06-10-05, page updated 2026-07-17T05:07:21.447Z)

> Grids and spacing organize content and actions for any layout

## Overview

- 

Grids create a consistent foundation and adapt across breakpoints (previously window size classes)
- 

Use spacing to group related information and direct people’s attention to key actions
- 

Density helps people see and compare more information in data-heavy views

[Image: Mobile and desktop UIs with grid lines.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4if1f9-01.png?alt=media&token=47ca8a21-cde7-4866-89cf-be7b12c1650b)

_Layouts in Material are based on a grid that adapts across all screen sizes_

#### Availability & resources

| Type | Resource | Status |
| --- | --- | --- |
| Design | M3 Design Kit (Figma) (https://www.figma.com/community/file/1035203688168086460) | Available |
| Spacing system & tokens (https://m3.material.io/m3/pages/spacing/overview) | Available |  |
| Implementation | Jetpack Compose: Rulers (https://developer.android.com/reference/kotlin/androidx/compose/ui/layout/Ruler) | Available |

#### What’s new

###### **May 2026**

- 

How to use grids and rulers to adapt layouts across devices
- 

Expressive spacing guidelines

[Image: Tablet with content divided into 8 columns. Each pane of content is 4 columns wide.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp4int8e-02.png?alt=media&token=7600ac30-bf69-4602-8bfb-61a90256ba0d)

_As screen size increases, additional columns allow for a richer layout_

## Grids

- 

Layouts in Material are based on a grid that adapts across all breakpoints (previously window size classes)
- 

Parts of the layout scaffold like rails and panes are positioned on this grid to create consistent adaptive layouts
- 

The structure and spacing values used in a grid can add personality to a product’s layout

#### How to use grids

##### Start with placing grid columns

Grids adapt across breakpoints. As the size increases, column count, width, and spacing change as well.

[Image: A mockup of grid columns, showing compact, medium/expanded, and large/extra-large breakpoints.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp54500h-03.png?alt=media&token=2dcb98ec-a57d-4d9b-a4f9-44227e456977)

_The number and size of columns changes based on breakpoints_

When moving between sizes, column count may increase to show more content or controls.

[Image: A course listing on a compact screen, with 4 columns.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp54dby8-04.png?alt=media&token=04b776f7-e5bc-4a68-9143-464df6e33251)

_On compact screens, fewer columns are used to create a focused layout_

[Image: A course listing on a foldable screen, with 8 columns.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp54ejyh-05.png?alt=media&token=acde1184-80ae-4066-853d-4e2e21443b45)

_As screen size increases, for example when a foldable screen is unfolded, additional columns allow for a richer layout_

##### Place bars & rails

Populate regions of the layout scaffold that are closest to the edges of the screen’s usable space first. This may include:

- 

Bars like the navigation bar and rail
- 

Components like toolbars and app bars

[Image: A compact screen with a toolbar highlighted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp55v0r6-06.png?alt=media&token=06b7ed36-86b6-4a5f-9e72-3d43ed36524f)

_The bar region can contain a toolbar_

[Image: A large screen with a leading navigation rail highlighted.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp55w2g9-07.png?alt=media&token=6bc41919-a8f2-481a-8bad-f463479cdfb8)

_The rail region on larger screens usually contains a navigation rail_

##### Place panes

Next, populate the main region of the screen with panes with content and components, based on available space and structure.

See the canonical layout examples (https://m3.material.io/m3/pages/canonical-examples) for ideas on which panes are appropriate for a product.

[Image: Mobile UI with 1 pane. Foldable UI with 2 panes in a supporting pane layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp55yqda-08.png?alt=media&token=2b0b4c87-9448-4a1a-b576-55c2a08e20ba)

_1. 

Primary pane
2. 

Supporting pane_

#### Rulers & alignment

Rulers are a set of recommended global alignment lines that help create consistent focal points in a product, while keeping content and components consistently aligned.

How to implement rulers in Compose (https://developer.android.com/reference/kotlin/androidx/compose/ui/layout/Ruler)

[Image: 1 compact and 1 desktop UI mapping rulers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp56n0pg-09.png?alt=media&token=aaa37678-f50e-45b3-a64d-09d126bfb433)

_1. 

Margin
2. 

Bar or safety region
3. 

Title
4. 

Content 1
5. 

Content 2
6. 

Content 3
7. 

Content 4
8. 

Bar or safety region
9. 

Rail_

##### Bar & safety rulers

Bar and safety rulers reserve space for system UI (https://developer.android.com/training/system-ui) elements like the status bar and gesture navigation.

They ensure actionable content like app bars aren’t covered by system UI.

[Image: 2 mobile UIs showing bar and safety rulers at the top and bottom.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp573btr-10.png?alt=media&token=8cb7f6fd-802a-4ac4-b0f8-e78c29f4acc1)

_Bar and safety rulers align to the edges of a screen’s usable space, providing a reference for where system UI like the status bar or gesture navigation appear_

##### Title rulers

The title ruler creates consistency for the screen’s title, aligning the text, icons, and other components in an app bar.

[Image: 1 mobile and 1 desktop UI showing title rulers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp574ab3-11-key02%20-%20TO%20PUBLISH.png?alt=media&token=24881915-d4ed-4466-9fab-8a8462a27df3)

_The title ruler aligns with the title in an app bar_

##### Content rulers

Use content rulers to align and anchor key content, such as headlines and carousels.

- 

First content ruler: Emphasizes major blocks like hero images, headlines, or primary components
- 

Secondary rulers: Determine where supplementary text or actions begin

[Image: 1 mobile and 1 desktop UI showing content rulers.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp575wo3-12-key02%20-%20TO%20PUBLISH.png?alt=media&token=615dfb4c-55b3-48fb-aad7-218ee4af69d6)

_Content rulers offer flexible alignment options to help create a consistent layout across a product_

[Video: Carousel and text resizing to align with content rulers, creating a structured layout.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5778zb-GM3%20-Layout%20-%20Grids%20%20-%20Spacing%20-13%20-%20Ruler%20Hero%20-%20IA%20-%20v02.mp4?alt=media&token=ba498b49-3f64-467d-bc3a-852a122cdfb8)

_Realigning primary components or content to a content ruler can create strong hierarchy and visual rhythm across a product_

##### Ruler options

Margin rulers come with some wiggle room to determine how tight or loose a product’s content feels on-screen. The standard ruler can be adjusted to the left or right.

Choosing a narrower or wider margin can create or remove negative space, or create expressive moments in a content-forward product.

[Video: Mobile UI showing a recipe layout where text margins narrow while the hero photo expands.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp578joa-GM3%20-Layout%20-%20Grids%20%20-%20Spacing%20-14%20-%20Ruler%20Options%20-%20IA%20-%20v02.mp4?alt=media&token=88e11830-1df2-4dfd-89ad-c0a17dd90a99)

_Margin rulers can adjust to create more or less negative space_

Rulers can also be used to create more immersive experiences. For example, a photo grid can take the full width of the screen, while components like search use wider margins.

[Image: Mobile UI for a photo app showing a full-width image grid and a search bar with wide margins.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp579mwo-15.png?alt=media&token=38c06930-bb63-44ef-8ff7-ec7d3a3d49af)

_Rulers allow components and media to use different margin widths_

## Spacing

- 

Spacing helps group content, direct attention, and shape the personality of a product
- 

A denser layout can feel more serious and focused, while a more spacious layout can feel calm and open
- 

Material’s spacing system can adapt to breakpoints and density settings. More on the spacing system (https://m3.material.io/m3/pages/spacing/overview)

[Image: 2 screens: 1 mobile with tight spacing, 1 desktop with wider spacing.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp51ef8p-01.png?alt=media&token=b9e641e7-464d-42c8-b459-a55c08a1e61c)

_Desktop layouts can use more generous spacing than mobile layouts_

#### Spacing to group content

Grouping connects related elements that share context, such as an image and its caption. Use spacing to visually tie elements together and establish boundaries between unrelated items.

[Image: Photo of dumplings with a caption reading “restaurants in the area”.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp51khdt-02.png?alt=media&token=d07293c7-059d-4f6c-a403-dbcd689e4b09)

_Placing a caption under an image creates an implicit group_

**Explicit grouping** uses visual boundaries like outlines, dividers, and shadows to group related elements in an enclosed area. 

It can also indicate that an item is interactive, such as:

- 

List items between dividers
- 

A card displaying an image and its caption

[Image: A contact grouped in an outlined card with a photo and caption.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5334mv-03.png?alt=media&token=d9bd66c9-9edb-4d91-8cad-904d673eadd2)

_Outlines define clear boundaries to explicitly group elements_

**Implicit grouping** uses close proximity and open space (rather than lines and shadows) to group related items. 

For example, the items in a carousel are placed close together, with space around the composition to separate them from other content.

[Image: Carousel of food-related photos.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5346br-04.png?alt=media&token=1f88d093-f743-4346-8e5e-503c1e4897b9)

_Close spacing implicitly groups carousel images_

#### Spacing to direct attention

Use rhythm, similarity, and other grouping principles to distinguish and highlight important elements.

##### Rhythm

Consistent spacing between related elements or groups makes them easier to navigate with the eye.

[Image: 4 art courses in a row of cards with consistent horizontal spacing and different heights.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp53c1l8-05.png?alt=media&token=92246361-0621-4d06-89a1-5a085baf0d4d)

_Cards should maintain consistent horizontal spacing to establish a strong rhythm when their height varies_

##### Similarity

Similar elements should have the same spacing and sizing in a layout to show they’re related.

Leading elements like thumbnails, avatars, or icons should always be aligned.

[Image: 3 shopping basket list items with the same thumbnail sizes and text styles.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp53g651-06.png?alt=media&token=83a99498-55ae-416a-8461-f0ebfa64940c)

_Thumbnails in a shopping basket should use identical sizes and styles to signal that each one represents a product, even if the original photos have different aspect ratios_

##### Proximity

Place components near each other to create cohesive groups. This helps people understand the relationships between information and actions.

For example, buttons should be close to the content they’re affecting.

[Image: Email message with Reply and Reply all buttons positioned close together.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp71sefu-07.png?alt=media&token=9a73f364-89ce-4344-90b8-a10cfe8ecd56)

_Placing two buttons as a group near content implies they’ll both affect it in similar ways_

##### Continuity

Place related elements in a container, row, or column to establish a clear group or relationship.

[Image: Clothing product page with a horizontal row of size chips, with 6 selected.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp53i2w6-08.png?alt=media&token=ba970765-9086-4446-a407-15046c1fbd58)

_Use a row of chips to signal a single, unified control_

#### Spacing as expression

Give the most important content, tasks, or actions visual prominence with generous spacing and the brightest surfaces.

##### Focal points

Consistent placement of key actions and information helps build recognizable focal points across a product.

[Image: 2 mobile screens showing carousels with identical layouts and title placement.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp53roq5-09.png?alt=media&token=63c1529a-8246-4126-a39b-e0786665db05)

_Carousel images, categories, and titles should appear in a consistent location across pages_

##### Negative space

Allow negative space to give form and meaning to elements on screen. Framing important actions or content with generous spacing creates emphasis.

[Image: A mobile screen shows generous negative space around carousel images.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp53ttu6-10.png?alt=media&token=12b19a8d-ceba-4cab-9c0b-bc78a463f7ec)

_Negative space gives shape and emphasis to the course header_

## Density

- 

Information density is the consideration of the amount of information visible on the screen
- 

The default target size should be at least 48x48 CSS pixels
- 

People can change density as long as the density controls are accessible
- 

Apply density thoughtfully; not every layout needs it
- 

Layout and component scaling (component adaptation or component density) can allow people to scan, view, or compare more information at once

[Video: A website design with a denser arrangement of text and graphics.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5c4fqq-m6fec25z-GM3-Components-Density-2-v03.mp4?alt=media&token=a22edf15-85b4-48ea-8052-f29c533956fd)

_Information density can change based on context and preference_

[Video: 5 components scaling with multiple size examples.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5c5sj5-m6fedlg1-GM3-Components-Density-1-v02.mp4?alt=media&token=6b087963-ddcc-40e9-83bb-7628df356d6b)

_Consider whether components should scale_

**Information density**

- 

Information density can be achieved through layout and design decisions without using component scaling
- 

Some people may not benefit from increased density

**Component scaling**

- 

Components can adapt and change dimensions to help people scan, view, or compare different amounts of information
- 

Don't apply component scaling by default if it would result in a target below 48x48 CSS pixels

[Video: An email app with “Appearance settings” open to change information density between cozy, comfortable, and compact.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5but2k-m6feg3jn-GM3-Components-Density-3-v02.mp4?alt=media&token=ed3019bd-6a4e-428a-b4b3-9a4c2697b5c4)

_Information density and component scaling can be used together to provide more information and additional user control_

#### Information density

Information density refers to the amount of content (such as text, images, or videos) in a given space.

A layout’s spacing dimensions, including margins, spacers, and padding, can change to increase or decrease its information density. High density layouts are useful when people need to scan, view, or compare a lot of information, such as in a data table. Increasing the layout density of lists, tables, and long forms makes more content available on-screen.

Consider density settings in the context of a device. Although a person may prefer a denser layout for desktop, they may not for mobile. Density shouldn’t automatically change across breakpoints or orientation unless a person changes it.

[Image: 2 layouts: 1 with low density and 1 with high density.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5bjd4j-03.png?alt=media&token=f2d98641-43b3-4be6-813e-b788a638eadf)

_Consider using higher density information design when people need to scan lots of information_

[Image: News website on desktop displaying a high information density.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5bh69d-04.png?alt=media&token=83e62cde-d2ca-451d-8b01-339cab7fa6af)

_Consider the amount and priority of information on-screen. Higher density can be useful for data-rich products where people expect to scan lots of information quickly. Examples: News, financial portals, dashboards_

[Image: News website on desktop displaying a low information density.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5bi6cs-05.png?alt=media&token=8dc0f800-b3aa-4927-bfc5-585d0f7a8513)

_Lower density can be better for sites prioritizing aesthetics, a focused message, less information, or easier navigation_

#### Component scaling

The component density scale controls the internal spacing of individual components.

The density scale is numbered, starting at 0 for a component’s default density. The scale moves to negative numbers (-1, -2, -3) as space decreases, creating higher density.

Higher density is typically applied by decreasing the top and bottom padding or overall height by 4dp.

[Image: 3 buttons with densities of 0, -1, -2.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5b9chq-07.png?alt=media&token=38a1cee0-2071-46f7-9bf5-acf853ad4775)

_Apply component density based on the needs and layout of a design_

Center the grouped element within the component container.

Text size shouldn’t change as the container size scales.

[Image: Text field showing 20dp between label and input](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5b68d4-08.png?alt=media&token=8c5cc11c-001b-42bc-b0f5-dbf7714e503a)

_The measurement between the label and input is 20dp_

[Image: Parent container showing label above input.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5b7f5f-09.png?alt=media&token=f56f5d6f-18cd-4244-8ad2-219b353925a1)

_The label and input are centered within their parent container_

[Image: Dropdown menu with high density items and selectable space height of 38dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5b2pqp-10-dont.png?alt=media&token=bc17826a-5b44-4cc5-84e1-70357fe2e69a)

_Don’t increase density in UIs that involve focused tasks, such as selecting from a menu. It reduces usability by limiting selectable space._

[Image: Single-line snackbar with high density.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp5b47ji-11-dont.png?alt=media&token=e5339b42-6c49-4881-9d69-9b2886f21bf3)

_Don't increase the density in components that alert a person of changes, such as snackbars or dialogs_

##### Avoid applying component scaling by default

People should be able to **opt in** to dense layouts and components.

To ensure density settings can be easily reverted, settings interactions must use default target sizes (48x48 CSS pixels).  

Don't scale layouts below 48x48dp by default.

[Video: A density menu with large, medium, and small options to customize the screen layout of a table on desktop.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fm7fb8wiw-GM3_Expressive_Density_12a_IA_v03.mp4?alt=media&token=58f22bac-a396-447c-aa5d-aa666e9c180b)

_People can opt in to dense layouts in settings_

#### Targets

Dense components can be less accessible because interactive elements are smaller, so use caution when increasing information density.

[Image: Selectable target of only 40dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp58kiob-13-caution.png?alt=media&token=f0e95ca4-7692-4b33-9fa8-79198007756b)

_Use caution when applying component scaling where selectable targets will be reduced to less than 48x48dp. Only apply density where it provides a better experience._

Use caution when applying density to interaction targets. Accessible targets should retain a minimum of 48x48dp, even if the visual element, such as an icon, is smaller.

[Image: Settings button icon is 24x24dp, but has interaction target of 48x48dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp58gdij-14.png?alt=media&token=9eb2d101-aabf-47e8-9e84-254391cfffce)

_The target should remain 48x48dp, even if the icon is smaller_

[Image: Button with height of 36dp and interaction target of 48dp.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp58i79t-15.png?alt=media&token=29992fdf-bc4e-46c2-afde-7d477b3bd803)

_The interaction target of a common button can be larger, as long as it meets the 48x48dp minimum size_

#### Pixel density

Pixel density is the number of pixels per inch. High-density screens have more pixels per inch than low-density ones. Elements with the same pixel dimensions appear larger on low-density screens and smaller on high-density screens.

To calculate pixel density:

Pixel density = Screen width (or height) in pixels / Screen width (or height) in inches

[Image: Magnified UI element showing a high number of pixels in the focus area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp586kzq-16.png?alt=media&token=635b6806-b358-48bf-927b-670a1c848fde)

_High-density elements have more pixels per inch_

[Image: Magnified UI element showing a low number of pixels in the focus area.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp587qzn-17.png?alt=media&token=e2b7ead4-9211-4000-9a76-9596875282b4)

_Low-density elements have fewer pixels per inch_

##### Density-independent pixels

Density-independent pixels, written as dp, are flexible units that scale to have uniform dimensions on any screen. They provide a flexible way to accommodate a design across devices. The Material design system uses density-independent pixels to display elements consistently on screens with different densities.

A dp is equal to one physical pixel on a screen with a density of 160.

To calculate dp: 
dp = (width in pixels * 160) / screen density

[Image: Screen with grid representing a low number of pixels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp57upl7-18.png?alt=media&token=d73cdac2-1ff8-4a67-8808-f40ba6ffc395)

_Low-density screen displayed with density independence_

[Image: Screen with grid representing a high number of pixels.](https://firebasestorage.googleapis.com/v0/b/design-spec/o/projects%2Fgoogle-material-3%2Fimages%2Fmp57w9fy-19.png?alt=media&token=8a92b118-e18b-40fb-a4a5-4a740ce3ac69)

_High-density screen displayed with density independence_

| Screen physical width | Screen density | Screen width in pixels | Screen width in dps |
| --- | --- | --- | --- |
| 1.5 in | 120 | 180 px | 240dp |
| 1.5 in | 160 | 240 px |  |
| 1.5 in | 240 | 360 px |  |
