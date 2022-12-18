window.onload= init;

// The contact manager as a global variable
let gm; 


function init() { 
	// create an instance of the contact manager
	gm = new GameManager();
	
  	gm.addTestData();
  	gm.printGamesToConsole();

	  // Display contacts in a table
	  // Pass the id of the HTML element that will contain the table
	  gm.displayGamesAsATable("Games");
}



function formSubmitted() {
	// Get the values from input fields
	let titre = document.querySelector("#titre");
  	let genre = document.querySelector("#genre");
	let plateforme = document.querySelector("#plateforme");
	let editeur = document.querySelector("#editeur");
	let annee = document.querySelector("#annee");
	let affiche = document.querySelector("#affiche")
	let newgame = new Game(titre.value, genre.value, plateforme.value, editeur.value, annee.value, affiche.value);
	gm.add(newgame);
	// Empty the input fields
	titre.value = "";
	genre.value = "";
	plateforme.value = "";
	editeur.value = "";
	annee.value = "";
	affiche.value = "";
	
	
	// refresh the html table
	gm.displayGamesAsATable("Games");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	gm.empty();
  	gm.displayGamesAsATable("Games");
}

function loadList() {
	gm.load();
  	gm.displayGamesAsATable("Games");
}

function triagetitre() {
	gm.sort("titre");
  	gm.displayGamesAsATable("Games");
}




class Game {
	constructor(titre, genre, plateforme, editeur, annee, affiche) {
		this.titre = titre;
		this.genre = genre;
		this.plateforme = plateforme;
		this.editeur = editeur;
		this.annee = annee;
		this.affiche = affiche;
		
		
	}
}

class GameManager {
	constructor() {
		// when we build the contact manager, it
		// has an empty list of contacts
		this.listOfGames = [];
	}
	
	addTestData() {
		var c1 = new Game("Elden Ring", "RPG", "PC - Xbox series - PS5", "From Software", "2022-02-25", "https://www.journaldugeek.com/content/uploads/2021/10/template-jdg-2021-10-18t165104-139.jpg");
  		var c2 = new Game("CyberPunk", "RPG - FPS", "PC - Xbox series - PS5", "CD Projekt", "2022-12-10", "https://static.bandainamcoent.eu/high/cyberpunk/cyberpunk-2077/00-page-setup/cp2077_game-thumbnail.jpg");
  		var c3 = new Game("Halo Infinite", "FPS", "PC - Xbox series", "343 Industries", "2021-12-08", "https://store-images.s-microsoft.com/image/apps.21536.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.68796bde-cbf5-4eaa-a299-011417041da6");
  		var c4 = new Game("Warhammer 40k: Darktide", "FPS", "PC", "Fatshark", "2022-11-30", "https://cdn.akamai.steamstatic.com/steam/apps/1361210/capsule_616x353.jpg?t=1670979917");
		var c5 = new Game("Dying Light 2", "FPS", "PC - Xbox series - PS5", "Techland", "2022-02-04", "https://pic.clubic.com/v1/images/1771225/raw?fit=smartCrop&width=1200&height=675&hash=f876f6713fc946b3eca1d59e027f780f8d8d41de");

		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		this.add(c5);
		
		// Let's sort the list of contacts by Name
		this.sort();
	}
	
	// Will erase all contacts
	empty() {
		this.listOfGames = [];
	}
	
	add(Game) {
		this.listOfGames.push(Game);
	}
	/*
	remove(Game) {
		for(let i = 0; i < this.listOfGame.length; i++) { 
			var c = this.listOfGame[i];

			if(c.email === contact.email) {
				// remove the contact at index i
				this.listOfContacts.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	*/
	sort() {
		// As our array contains objects, we need to pass as argument
		// a method that can compare two contacts.
		// we use for that a class method, similar to the distance(p1, p2)
		// method we saw in the ES6 Point class in module 4
		// We always call such methods using the name of the class followed
		// by the dot operator
		this.listOfGames.sort(GameManager.compareByTitre);
	}

	
	// class method for comparing two contacts by name
	static compareByTitre(c1, c2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (c1.titre < c2.titre)
     		return -1;
		
    	if (c1.titre > c2.titre)
     		return 1;
  
    	return 0;
	}
	
	printGamesToConsole() {
		this.listOfGames.forEach(function(c) {
			console.log(c.titre);
		});
	}
	
	load() {
		if(localStorage.Games !== undefined) {
			// the array of contacts is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfGames = JSON.parse(localStorage.Games);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of contacts to JSON
		localStorage.Games = JSON.stringify(this.listOfGames);
	} 
	
  	displayGamesAsATable(idOfContainer) {
		// empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfGames.length === 0) {
			container.innerHTML = "<p>No games to display!</p>";
			// stop the execution of this method
			return;
		}  
  
    	// creates and populate the table with users
    	var table = document.createElement("table");

		/*var img= document.createElement("img");
		img.src = currentGame.affiche;
		img.style.width = "100px";
		img.style.height = "100px";
		*/
		var headrow = table.insertRow();
		headrow.innerHTML += "<tr> <th onclick='triagetitre(0)' id='titre'>Titre</th> <th id='genre'>Genre</th> <th>Plateforme</th> <th>Editeur</th> <th>Année de sortie</th> <th>Affiche</th> </tr>";
		
          
    	// iterate on the array of users
    	this.listOfGames.forEach(function(currentGame) {
        	// creates a row

			

        	var row = table.insertRow();
        
			row.innerHTML = "<td>" + currentGame.titre + "</td>"
							+ "<td>" + currentGame.genre + "</td>"
							+ "<td>" + currentGame.plateforme + "</td>"
							+ "<td>" + currentGame.editeur + "</td>"
							+ "<td>" + currentGame.annee + "</td>"
							
							
				
				
				
			var img= document.createElement("img");
			img.src = currentGame.affiche;
			img.style.width = "280px";
			img.style.height = "280px";
			row.appendChild(img);			
						
        
	  
			
		var button = document.createElement("button");
		button.innerHTML = "\ud83d\uddd1";
		row.appendChild(button);
			
		button.onclick = function button() {
			var row = this.parentNode;
			row.parentNode.removeChild(row);

		}
				
		
     	});
		
		 
     	// adds the table to the div
     	container.appendChild(table);
		
  	}
}

