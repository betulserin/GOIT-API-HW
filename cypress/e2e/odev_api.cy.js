describe('Gutendex API Automation Assignment', () => {
  const baseUrl = 'https://gutendex.com/books/';
  it('should return 200 status code for the main endpoint', () => {
    cy.request(baseUrl).then((response) => {
      assert.equal(200, response.status);
    });
  });

  it('should have a results field in the response body', () => {
    cy.request(baseUrl).then((response) => {
      assert.isDefined(response.body.results);
    });
  });

  it('should filter books by author name Dickens', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: { search: 'Dickens' }
    }).then((response) => {
      assert.equal(200, response.status);
      assert.include(response.body.results[0].authors[0].name, 'Dickens');
    });
  });

  it('should filter books by English language', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: { languages: 'en' }
    }).then((response) => {
      assert.equal(response.body.results[0].languages[0], 'en');
    });
  });

  it('should filter books by author birth year range', () => {
    cy.request({
      method: 'GET',
      url: baseUrl,
      qs: { author_year_start: 1800, author_year_end: 1850 }
    }).then((response) => {
      assert.isAbove(response.body.results.length, 0);
    });
  });

  it('should send and verify a custom User-Agent header', () => {
    const customUA = 'MyTestAgent';
    cy.request({
      method: 'GET',
      url: baseUrl,
      headers: { 'User-Agent': customUA } 
    }).then((response) => {
      assert.equal(200, response.status);
    });
  });

  it('should respond within 2 seconds', () => {
    cy.request(baseUrl).then((response) => {
      assert.isBelow(response.duration, 2000); 
    });
  });

  it('should return exactly 32 books per page', () => {
    cy.request(baseUrl).then((response) => {
      assert.equal(response.body.results.length, 32);
    });
  });

  it('should return 404 for a non-existing book ID', () => {
    cy.request({
      method: 'GET',
      url: baseUrl + '999999/',
      failOnStatusCode: false 
    }).then((response) => {
      assert.equal(404, response.status); 
    });
  });

  it('should return 403 when attempting a POST request', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      failOnStatusCode: false
    }).then((response) => {
      assert.equal(403, response.status);
    });
  });
});