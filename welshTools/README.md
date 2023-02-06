# Welsh Translation Utilities

## Translation workflow after updating English content
When you have made a change which includes any changed English content (e.g. changing existing messages or adding new ones) you should send the updated messages spreadsheet to the HMRC Welsh Unit for translation. The workflow is:

1. Update the English content as required
2. Run `yarn welsh:export`
3. Send the `translationOutput/translations.xlsx` to the Welsh Unit for translation
4. Wait until they send the translations back
5. They might miss off the `Key` column, so reconstruct it by copying the "Welsh" column back into the original spreadsheet you sent them
6. Use Excel to save the new spreadsheet as a CSV to `welshTools/latestTranslations.csv`
7. Run `yarn welsh:import`
8. Commit the updated `welshTools/latestTranslations.csv` file along with the updated `cy.ts` file (so that it always reflects the latest set of translations for the next time someone sends for some translations).

> Note that you will likely need to do some offline management to ensure that we don't accidentally send the same thing for translation multiple times

## Individual tool details

### Creating the Welsh Translation CSV
In the root of the project directory, run:

```yarn messages:csv```

This will create a new file (or overwrite the existing file): `translationOutput/current.csv`

### Creating the Screenshots
In the root of the project directory, run:

```yarn messages:screenshots```

This will create a bunch of PNG screenshots in : `translationOutput`

### Updating the Welsh language file
In the root of the project directory, run:

```yarn messages:update```

This will rebuild the `src/translations/cy.ts` file.

It uses the following sources in order to find a Welsh translation for a key:

* If the file `translationOutput/translations.csv` contains a Welsh translation for the key then that it used
* Failing that, if the existing `cy.ts` file contains a translation (without the '(Welsh)' placeholder suffix) then that is used
* Otherwise it falls back to the English content and, if it's not a URL, it automatically appends a '(Welsh)' placehold suffix to it

Note that by running this command when there is no `translationOutput/translations.csv` it can effectively be used to update the Welsh language file if new keys have been added to the English one.

### Creating a file to send for translation
In the root of the project directory, run:

```yarn messages:create-sheet```

This will:

* Read in `translationOutput/current.csv` to get the latest list of messages from the UI
* Read in `welshTools/previous.csv` to get the last list of translations from the Welsh Unit
* Create a file `translationOutput/translations.xlsx` with the latest messages, their current tranlations, and a comment against each
