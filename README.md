# Filmie :clapper:
![example workflow](https://github.com/UIC-CS484/assignment-2---final-project-repository-team-28/actions/workflows/main.yml/badge.svg)

<img src="https://github.com/riccardo-nannini/filmie/blob/main/assets/movie.gif?raw=true" width="1000">

The Filmie website is available [here](https://www.filmie.org)<br/><br/>
Filmie aims at creating a place where *cinephiles* can discover new contents and find any kind of informations about movies.<br/><br/>
Filmie users can create list of their favorite movies, set up a watch list as well as give ratings.<br/><br/>
Each movie has a dedicated page where users can find any kind of informations such as trailer, streaming provider (based on your country), plot overview, cast, budget and so on...<br/><br/>
The website also employs internalization! Try changing your default browser language and navigate the website.<br/>
Filmie uses the TMDB API but is not endorsed or certified by TMDB.
## Developer :bust_in_silhouette:
 #### Riccardo Nannini :it:
- Frontend, Backend, Database
<br><br>
[GitHub](https://github.com/riccardo-nannini), [Linkedin](https://www.linkedin.com/in/riccardo-nannini/), [Twitter](https://twitter.com/NanniniRiccardo)

## Build and run :pager:

Requirements:

- [node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

Build the React front-end
```
cd client
npm install
npm run build
```
Run the back-end
```
cd ..
npm install
node index.js
```

By default the server will run on port 8080, it is possible to change the port with PORT=*yourport* in a **_.env_** file

## Chart  :chart_with_upwards_trend:
The rate distribution chart has been implemented using the [Victory React.js components](https://formidable.com/open-source/victory/).

This chart let users know how the different ratings that contribute to the final rate of a movie are distributed. Given two equal final rates, say 50%, there are countless distribution that can create such a score. For instance in one case the majority of the ratings could be around 40%-60% while another case would have ratings polarized through the ends (the typical situation for the 'you hate it or you love it' movies).

<img src="https://github.com/riccardo-nannini/filmie/blob/main/assets/chart.gif?raw=true" width="600">

## ERD  :floppy_disk:
<br>
<img src="https://github.com/riccardo-nannini/filmie/blob/main/assets/ERD.png?raw=true" width="800">

## Test Strategy :hammer:
**Unit tests** will be created for every meaningful part of the application.<br>
_Stubs_ and _mocks_ are going to be implemented in order to execute unit tests that require networking or database access.

Unit tests that will be implemented include, but not limit to:
- **Login validation**: validation of salted and hashed password against the hash stored in the database

- **Client-side validation of sign-up input**: e-mail validity, enforcing of strong passwords (minimum length, at least an upper/lowercase letter and a number) [Implementation](https://github.com/UIC-CS484/assignment-2---final-project-repository-team-28/blob/development/test/registerInputValidationFrontEnd.test.js) :white_check_mark:

- **Server-side validation of sign-up input**: e-mail is valid and unique, enforcing of strong passwords (minimum length, at least an upper/lowercase letter and a number) [Implementation](https://github.com/UIC-CS484/assignment-2---final-project-repository-team-28/blob/development/test/registerInputValidationBackEnd.test.js) :white_check_mark:

- **RatingDAO**: checks that the rating of a movie is correctly computed taking into account every review, validate insertion and update of ratings.

- **Comment DAO**: checks the functionalities of the comment dao (insertion/deletion/retrieval of a comment related to a particular movie)

- **FavoriteDAO**: checks insertion/deletion/retrieval of movies from the favorite list

- **WatchlistDAO**: checks insertion/deletion/retrieval of movies from the watchlist

- **UserDAO**: validates the update/deletion of users account

The general idea is to test the application logic as well as everything that interacts with the database.<br>
Hence, Data access object are going to have an unit test each as well as for routes that implement some form application logic (e.g. input validation when signing-up)


## Branching Workflow Strategy :bar_chart:

Since the team is composed by one member only, I have decided to opt for a simple branching workflow.

This workflow is based on a **master** branch that will host the _production software_.<br>
Instead of being committed directly on the master branch, changes to the code base will be carried on the **development** branch.<br>
Once the software in the development branch is ready to be deployed, development branch will be merged with the master one.<br>
A **bug fix** branch could be created when needed in order to fix bugs that have been found in the production software.

A graphic view of the workflow strategy can be observed in the image below:<br><br>


<img src="https://github.com/UIC-CS484/assignment-1---team-project-proposal-team-28/blob/master/branching_workflow.png?raw=true" width="800">


## Development tools :wrench:

- [VsCode](https://code.visualstudio.com/) Editor
- [GitHub](https://github.com/) Repository hosting
- [Postman](https://www.postman.com/) Testing



