        // client.js
        document.addEventListener('DOMContentLoaded', () => {
            const searchForm = document.getElementById('searchForm');
            const searchInput = document.getElementById('searchInput');
            const resultsContainer = document.getElementById('results');
          
            searchForm.addEventListener('submit', async (e) => {
                console.log("CLICKED")
              e.preventDefault();
              const searchTerm = searchInput.value.trim();
          
              if (searchTerm !== '') {
                try {
                  // Send an HTTP request to your Node.js server with the search query
                  const response = await fetch(`/search?query=${searchTerm}`);
                  const data = await response.json();
                  console.log(data)
          
                  // Handle the response data as needed
                  displayResults(data);
                } catch (error) {
                  console.error('Error:', error);
                }
              }
            });
          
            function displayResults(results) {
              resultsContainer.innerHTML = ''; // Clear previous results
              // Iterate through the results and display them on the page
              /*for (const result of results) {
                const resultElement = document.createElement('div');
                resultElement.textContent = result.title;
                resultsContainer.appendChild(resultElement);
              }*/
              data = results["results"] //get the array from the object 
              console.log(data)
              for(const anime of data ){
                const resultElement = document.createElement("div")
                resultElement.className = 'card'
        
                resultElement.innerHTML=`
                <h2>${anime.title}</h2>
                <p>${anime.releaseDate}</p>
                <p>${anime.subOrDub}</p>
                <img src="${anime.image}"/>
                `
                resultsContainer.appendChild(resultElement)
              }
        
            }
          });