<div align="center">
  
  ![PokéRef](/public/readme%20images/Pok%C3%A9Ref.png)
</div>

---

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/thibaudbrault/pokeref)
![GitHub issues](https://img.shields.io/github/issues/thibaudbrault/pokeref)
![GitHub pull requests](https://img.shields.io/github/issues-pr/thibaudbrault/pokeref)
![GitHub last commit](https://img.shields.io/github/last-commit/thibaudbrault/pokeref)
![Lines of code](https://img.shields.io/tokei/lines/github/thibaudbrault/pokeref)

</div>

<h3 align="center">PokéRef is a pokémon encyclopedia built using React JS, Styled-Components and PokéAPI</h3>  
<p align="center">You'll find a ton of information on every pokémon, moves, abilities, items and much more</p>  
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

✅A page for every pokémon / move / ability / type / item  
✅Filter pokémon by name / form / generation / type  
✅Filter moves / abilities / machines by name  
✅Change certain data according to the game selected  
✅Dark mode  
✅404 page  
✅Autocomplete  
✅Responsive  
✅Service Worker

🛠Types relations for each pokémon  
🛠Location page

🔜Authentication with profile page and "create your team" functionality  
🔜Animation on scroll

<h2 id="description">Description</h2>

<h4>Main goal</h4>

My main goal for this site was to get better at React JS and to learn how to use an API and to use Styled-Components. I chose to use PokéAPI because there are a lot of tutorials to start from, the documentation is very clear and easy to use and there is a ton of information so I could make a bigger site with multiple pages.

<h4>Story of this project</h4>

- Started by using vanilla JS + Sass to learn how to fetch data from an API in vanilla JS
- Quickly moved to React JS + Sass to learn React by working on a big project
- Moved to React JS + Styled-Components to learn a new way to write CSS. It was a good move for me because I really like Styled-Components because it has the advantages of Sass, is easily importable / exportable between files and supports theming.
- Added React-Query to fetch data. It's a great library that makes it easy to manage caching, fetching, loading and erro handling for every data fetch.
- Finally moved to Next JS (instead of CRA) + Styled-Components to learn to use Next JS. I chose to use Next JS to benefit from the image optimization given by the <Image /> component because the app has a lot of images to render and every optimization is welcome. I also chose it to benefit from the Server-Side Rendering.

<h4>Contents</h4>

- All the 898 pokémon + regional variants, mega and gmax
- Moves : basic data, effect, pokémon that can learn it, ...
- Abilities : effect, pokémon that have this ability (normal or hidden), ...
- Types : effectiveness against other types, pokémon with this type, ...
- Items : effect, flinch power, ...
- Machines : list of TM and HM for every game
- Locations : coming soon

<h2 id="technologies">Technologies</h2>

- <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
- <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />
- <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />
- <img src="https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white" />

<h2 id="acknowledgements">Acknowledgements</h2>

A huge thanks to everyone that helped me by answering to my questions on Stack Overflow and Reddit.  
A big thanks also to the PokeAPI team for creating such a huge, detailed and very well organized api.

<h4>Data</h4>

<a href="https://pokeapi.co/docs/v2" target="_blank">PokéAPi</a>

<h4>Dependencies</h4>

<a href="https://www.npmjs.com/package/react-infinite-scroll-component>" target="_blank">React Infinite Scroll Component</a>  
<a href="https://www.npmjs.com/package/react-query" target="_blank">React Query</a>

<h2 id="other">Other</h2>

![Dependabot](https://img.shields.io/badge/dependabot-025E8C?style=for-the-badge&logo=dependabot&logoColor=white)
![GitHub](https://img.shields.io/github/license/thibaudbrault/pokeref)
