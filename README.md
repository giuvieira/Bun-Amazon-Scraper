# Bun-Amazon-Scraper
Task | aplicativo web simples para raspar listagens de produtos da Amazon

## **Objective**

Create a simple script to scrape Amazon product listings from the first page of search results for a given keyword.

---

### **Task Requirements**

#### **Backend/API (Bun)**

1.  Set up a Bun project with the necessary dependencies (express, axios, and JSDOM).
2.  Write a script using `axios` to fetch the contents of the Amazon search results page for a given keyword.
3.  Use `JSDOM` to parse the HTML content and extract the following details for each product listing on the first page:
    * Product Title
    * Rating (stars out of five)
    * Number of reviews
    * Product image URL
4.  Create an endpoint `/api/scrape` where a GET request with a query parameter `?keyword=yourKeyword` initiates the scraping process and returns the extracted data in JSON format.

---

#### **Frontend (HTML, CSS, Vanilla JavaScript with Vite)**

1.  Develop a simple webpage with:
    * An input field to enter the search keyword.
    * A button to initiate the scraping process.
2.  Style the webpage to be user-friendly and presentable.
3.  Implement JavaScript to make an AJAX call to the backend endpoint when the button is clicked, and display the results formatted cleanly on the page.

---

### **Documentation**

1.  Provide comments within your code to offer clarity on your logic and process.
2.  Include a `README.md` file with the setup and running instructions.

---

### **Considerations**

1.  Ensure you handle errors gracefully both on the backend and frontend.
2.  Provide clear instructions on how to run the application.
3.  The cleaner and more functional the code is, the better.
