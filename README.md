<div align="center">
  
  ![PokéRef](/public/readme%20images/Pok%C3%A9Ref.png)
</div>

---

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/thibaudbrault/pokeref)
![GitHub issues](https://img.shields.io/github/issues/thibaudbrault/pokeref)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thibaudbrault/pokeref)

</div>

<h3 align="center">PokéRef is a pokémon encyclopedia built with Next JS, Typescript and Styled-Components and uses data from PokéAPI and Smogon</h3>  
<p align="center">You'll find a ton of information on every pokémon, moves, abilities, items and a lot more</p>  
<div align="center">
  <a href="https://pokeref.app/">Live version</a>  
</div>  
  
<p align="center">Leave a 🌟 if you like my project 👍</p>

---

<details open="open">  
  <summary>Table of contents</summary>

1.  [Roadmap](#roadmap)
2.  [Description](#description)
3.  [Technologies](#technologies)
4.  [Acknowledgements](#acknowledgements)
5.  [Other](#other)

</details>

<h2 id="roadmap">Roadmap</h2>

<h4>Features</h4>

✅A page for every pokémon / move / ability / type / item  
✅Filter pokémon by name / form / generation / type (possibility to filter by one or two types)  
✅Filter moves / abilities / machines by name  
✅Change certain data according to the game selected  
✅Pokémon cries  
✅Dark mode  
✅404 page  
✅Autocomplete search  
✅Responsive

🛠Use React-Table for my tables (allow for virtualization, sorting and filtering)  
🛠Use Framer Motion to add animations

🔜Profile page with possibility to save teams  
🔜Types relations for each pokémon  
🔜Contest section in a move's page

<h4>Performance improvements</h4>

✅Use of Next SSG for static pages and SSR for dynamic pages.  
✅Use of React-Query to fetch data only once by using `cacheTime: Infinity` and `staleTime: Infinity`. The data will very rarely change so there is no use in re-fetching it every x minutes / hours.  
✅Use of Next JS next/image to optimize images. Very important for this app because some pages (like the index.js or the items.js) have a lot of images and they are one of the main problems regarding my performances so optimizing them to make the loading faster is very important.  
✅Use of dynamic import (the Next JS equivalent of lazy loading component from ES2020) to load components when they are needed by the users. This means that if a user never interacts with a component that is dynamically imported, it will never be loaded.  
✅Turned into a PWA with the next-pwa package.

🛠Refactoring the code  

🔜Implement PokeAPI Service Worker.

<h2 id="description">Description</h2>

<h4>Main goal</h4>

My main goal for this site was to get better at React JS and to learn how to use an API and to use Styled-Components.  
I chose to use PokéAPI because there are a lot of tutorials to start from, the documentation is very clear and easy to use and there is a ton of information so I could make a bigger site with multiple pages.

<h4>Story of this project</h4>

- Started by using vanilla JS + Sass to learn how to fetch data from an API in vanilla JS
- Quickly moved to React JS + Sass to learn React by working on a big project
- Moved to React JS + Styled-Components to learn a new way to write CSS. It was a good move for me because I really like Styled-Components because it has the advantages of Sass, is easily importable / exportable between files and supports theming.
- Added React-Query to fetch data. It's a great library that makes it easy to manage caching, fetching, loading and error handling for every data fetch.
- Finally moved to Next JS (instead of CRA) + Styled-Components to learn to use Next JS. I chose to use Next JS to benefit from the image optimization given by the <Image /> component because the app has a lot of images to render and every optimization is welcome. I also chose it to benefit from the Static-Site generation.
- Upgraded to Next 13. There were some problems that made the transition to using the app folder instead of the pages one not possible, but I benefited from the changes to the <Image /> component (it no longer creates spans) and the <Link /> component (it no longer need to have an anchor tag inside).
- Added React-Table and converted all my tables to benefit from virtualization, sorting and filtering for every column making it easier to find the desired information.

<h4>Problems encountered (ordered from the oldest to the most recent)</h4>

- Learning to fetch data from an API and use this data. That was the first time that I've used an API and at first I had problems to understand how the fetch API worked and how to use and display the data returned.
- Moving to Styled-Components. Not a big problem because it uses nesting like Sass so I didn't have to modify a lot of CSS, but I had to learn how to create global styles and how to create themes and switch between them.
- Implementing an infinite scroll (now removed) in React with <a href="https://www.npmjs.com/package/react-infinite-scroll-component" target="_blank">react-infinite-scroll-component</a>. I had problems with creating the function that fetches more data and the function that says when there are more elements to return. Maybe I'll try to implement it with React-Query but it's currently not a priority.
- Tried to virtualize the moves, abilities and items pages' lists. I tried to implement it by using <a href="https://github.com/bvaughn/react-virtualized" target="_blank">react-virtualized</a> and <a href="https://github.com/petyosi/react-virtuoso" target="_blank">react-virtuoso</a>, but I had a few problems (the main one being that it did not take into account the sorting of the list and returned the list without it).
- Implementing React-Query. I had to learn how to modify my custom hooks to make it work with React-Query and how to import the data from the hooks. It took me some time to make the transition works, but I don't regret it because my code is more readable (mainly the part where I import my hooks, but also the way I handle the loading state to return an animation while the data is being fetched) and it's an easy way to cache data.
- Moving from CRA to Next. The main problem I had was learning to use dynamic routing and when I understood it the migration became easier. It still took me some time because I had to move all my files in other folders, change the paths in imports, implement the <Image /> component along with a width and height, correct some problems with the images (the creation of multiple spans wrapping the image that was solved by using next/future/image before moving to Next 13) and a few other problems with the <Link /> component (the fact that it can't have multiple children, that it needs to have a 'href' instead of the 'to' used in react-router to give the path and that you need to put an anchor tag inside the Link and use passHref).
- Converting all the files to Typescript and declare all the types. Currently working on it and nearly finished.

<h4>Contents</h4>

- All the 1008 pokémon + regional variants, mega and gmax
- Moves : basic data, effect, pokémon that can learn it, ...
- Abilities : effect, pokémon that have this ability (normal or hidden), ...
- Types : effectiveness against other types, pokémon with this type, ...
- Items : effect, flinch power, ...
- Machines : list of TM and HM for every game
- Locations : every place and the pokémon that can be encountered
- And much more

<h2 id="technologies">Technologies</h2>

- <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
- <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
- <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white" />
- <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
- <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" />
- <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />

<h2 id="acknowledgements">Acknowledgements</h2>

A huge thanks to everyone that helped me by answering to my questions on Stack Overflow and Reddit.  
A big thanks also to the PokeAPI team for creating such a huge, detailed and very well organized API.

<h4>Data</h4>

<a href="https://pokeapi.co/docs/v2" target="_blank">PokéAPI</a>  
<a href="https://github.com/pkmn/smogon" target="_blank">Smogon</a>

<h4>Dependencies</h4>

<a href="https://www.npmjs.com/package/@tanstack/react-query" target="_blank">Tanstack React-Query</a>  
<a href="https://www.npmjs.com/package/@tanstack/react-table" target="_blank">Tanstack React-Table</a>  
<a href="https://www.npmjs.com/package/react-hook-form" target="_blank">React Hook Form</a>  
<a href="https://www.npmjs.com/package/react-select" target="_blank">React Select</a>  
<a href="https://www.npmjs.com/package/yup" target="_blank">Yup</a>  
<a href="https://www.npmjs.com/package/eslint" target="_blank">ESLint</a>  
<a href="https://www.npmjs.com/package/prettier" target="_blank">Prettier</a>  
<a href="https://www.npmjs.com/package/next-pwa" target="_blank">Next PWA</a>

<h2 id="other">Other</h2>

![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![GitHub](https://img.shields.io/github/license/thibaudbrault/pokeref)
