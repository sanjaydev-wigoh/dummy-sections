 **Widgets & Layout Extraction Instructions**

Separate JSON Files for Layouts and Widgets
I have created separate JSON files for layouts and widgets.

Run the Widgets Script
Use the following command to automatically process and separate the JSON data:

bash
node widgets.js

This script uses the default input.json file.

It filters the data into two separate files:

layout.filter.json – contains only layout elements.

widget.filter.json – contains only widget elements.

Available Supporting Files

All Wix computed styles are available in the computed.json file. - 

All Wix raw HTML is stored in the maindummy.html file.

Important Note
⚠️ Do not run the clean-computed-styles.js file.

It is not required and may interfere with the separation process.

File Output
After running widgets.js, you will get two clearly identifiable files:

One for layouts (layout.filter.json)

One for widgets (widget.filter.json)
