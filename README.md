# Utatte

**Utatte** is a web-based karaoke application with automatic scoring system using voice pitch detection. It offers simple-to-use menu and fully animated game screen (lyrics and piano roll).

The application is written in TypeScript. It uses Redux, Redux Toolkit and RTK Query for state management and data fetching from API. The menu components are written in React. The gameplay screen elements are rendered using HTML5 Canvas API.

> **Warning**
> This version of the application is proof-of-concept. Core elements are implemented, but the app is NOT failsafe and the only supported language is Polish. New version is now in development, but at this moment it is not ready for use. For now, to check out this application, I recommend this version, (keep in mind though it's just an alpha). If you are interested in the new version, the source code is available here: https://github.com/szezjo/utatte2

> **Note**
> To use this application, API server has to be running in the background. You can find it here: https://github.com/szezjo/utatte-api

## Example screens
**Song selection screen**

![ezgif-5-4ff3b9c31f](https://user-images.githubusercontent.com/20361252/232488335-fb65c357-1924-4558-87ea-2a6c7c93d9d6.gif)

**Song settings**

![ezgif-1-9cc2ffa4a1](https://user-images.githubusercontent.com/20361252/232488363-ead5e9ca-83d5-4e5f-b04b-f5e54aeb88f2.gif)

**Gameplay**

https://user-images.githubusercontent.com/20361252/232488605-4d623f2c-dcd9-473e-9c15-0851cb517266.mp4

## How to run
The application uses Yarn package manager. The first time you download the code use this command to install the dependencies:
```
yarn install
```

To run the application use:
```
yarn dev
```

## External links
The application uses pitch processing library by Peter Suggate:
https://github.com/peter-suggate/wasm-audio-app
