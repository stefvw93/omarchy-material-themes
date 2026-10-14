# View logic

What the lock view decides, outside QML.

- **Avatar initial.** The monogram avatar shows the first letter of the user's name, upper-cased. A name that starts with something other than a letter or digit (a dot, an underscore) skips to the first letter or digit. An empty name, or one with no letter or digit, shows no initial.
- **Submit.** The arrow button submits only when input is enabled, the field holds at least one character, and no password check is running.
