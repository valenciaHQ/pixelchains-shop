# Welcome to Pixeart shop

### This project has been started with CRA typescript tempate.

# Core libraries used

- Chakra-UI: UI library that has very useful, highly customizable components that supports responsiveness and WAI-ARIA follows
- Cypress: Automated testing

There is room for improvements!

- More unit testing
- Better UI - add colors, fonts
- Better Responsiveness

I take the desition of not to use a library for the infinite scroll but to write myself the required pieces:

- loadMore() method that will append more items to existing
- debounce to avoid throttling
- Observer to check whether user is near the bottom (100px)
- Created some custom hooks to handle data loading and scroll position
- I put some css passing as props into Chakra components
- I do not create a Context by myself but `<ChakraProvider theme={theme}>` is an example of how Context works, its injecting the theme over the elements tree.

### To run:

create `.env` with:

REACT_APP_API_KEY=0e090a5d0169429c9c96839dc9b24ec5
REACT_APP_API_URL=https://api.opensea.io/api/v1/assets?collection=pixelchain&order_direction=desc&limit=20&include_orders=false

(in normal production app i will not pass api key here)

then:

### `yarn && yarn start`

### To open cypress and run tests: `yarn run cypress-open`
