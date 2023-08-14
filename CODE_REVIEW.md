Observations and improvements:

In the Libs -> Books -> feature -> src -> lib:

- Add an `ngOnDestroy` method to the `book-search` and `reading-list` component for unsubscribing and preventing memory leaks
- For mobile phones, we can allow each book item to occupy the full width, and we may remove the template columns for smaller screen resolutions
- We can address width-related issues by using width: auto and setting a max-width. Additionally, we can implement scrolling for smaller screens or ensure that the content is displayed without cropping for 'reading-list-container'.
- in reading-list.reducer file we have loaded property which is true in readingListAdapter.setAll(action.list, state) directly this could loose the initial value of loaded which was set to false into initialState If the data loading process takes some time, it's important to keep the initial loaded value as false until the data is successfully loaded.
- For reading-list reducer test cases which were failing are fixed
    - failedAddToReadingList Test Case:
      - Previous Expectation: Only book 'A' should remain in the state after the failed addition.
      - Updated Expectation: Both books 'A' and 'B' should remain in the state after the failed addition, reflecting the intention to undo the addition.

    - failedRemoveFromReadingList Test Case:
        - Previous Expectation: Book 'C' should still be present in the state after the failed removal.
        - Updated Expectation: Both books 'A' and 'B' should still be in the state after the failed removal, aligning with the test's purpose of undoing the removal.

--------------------------------------------------------------------------------------------

Lighthouse results:
- Accessibility:
  - The contrast ratio between background and foreground colors needs improvement.

  --------------------------------------------------------------------------------------------

  Accessibility issue
  - The search button should have a meaningful name.
  - Once the search button is pressed, it should not return focus to the search textbox.
  - The input element can have a meaningful aria-label attribute, and we can also add a label for that input to improve accessibility.
  - After performing a search, the focus was directly going to the "Want to Read" button. To address this, Added a tabindex attribute to the book section to make it focusable.
  - The reading list close button was not conveying its purpose clearly. Therefore, I have added a close button with a meaningful aria-label to make it more understandable for users with disabilities.
