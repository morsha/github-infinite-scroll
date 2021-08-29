# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

src
|
|--components
|  |
|  |--Header
|  |--InfiniteScroll
|  |--LoadingSpinner
|
|--utils
   |--fetchGithubApi
   |--useFetchApi

You can view the project on
https://morsha.github.io/github-infinite-scroll/

This project could be done with redux / redux-saga to make the data-stream and api logic
more understandable, but due to the small structure, We chose not to. Instead, storing data
in customHook with some useEffects does the work.

The website is divides into 2 parts, Header and InfiniteScroll.
The former controls the searchTerm, and changes website's path when user types anything in 500ms
The latter has an IntersectionObserver attached to an invisible element set at the end of list,
by observing it appears in window, we call fetchMore api to get more data for displaying.

Because of Github search's api limit, we could only attain 10 requests per minute. In order to let
user know when shall he/she wait, we set a countdown by requesting rate-limit api to get the reset
time of quotas, and we calculate the seconds diff with a plus 1 second for deviation.

For api, we use a custom hook mocking Apollo GraphQL's useQuery, and a simple axios get handler.
Although the custom hook was set for itemList-like api, it still could be easily extracted for any
data-like api structure.

Also, due to another small project I once created
https://morsha.github.io/to-pick-one
its api server is still on heroku so github-page is considered instead