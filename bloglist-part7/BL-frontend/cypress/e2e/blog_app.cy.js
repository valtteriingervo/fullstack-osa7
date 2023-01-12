describe('Blog', function () {
  beforeEach(function () {
    // Reset the DB before each test
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    // Create user to the DB
    const user = {
      name: 'Valtteri Ingervo',
      username: 'valttering',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    // And go to the site under test before each test
    cy.visit('http://localhost:3000')
  })

  // t 5.17
  it('Login form is shown', function () {
    // Text expected is shown
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    // User can type and click on the login form
    cy.get('#username').type('typeTest')
    cy.get('#password').type('pwtest')
    cy.get('#login-button').click()
  })

  // t 5.18
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('valttering')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('valttering logged in')
      cy.contains('blogs')
      cy.contains('create new')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('valttering')
      cy.get('#password').type('incorrect')
      cy.get('#login-button').click()

      cy.get('#notification')
        .should('contain', 'Wrong username or password. Please try again')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'valttering logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // Log user in
      cy.login({ username: 'valttering', password: 'salainen' })
    })

    it('A blog can be created', function () {
      // Make the blog form visible
      cy.contains('new blog').click()

      cy.get('#title').type('Test Blog')
      cy.get('#author').type('John Smith')
      cy.get('#url').type('www.test-blog.com')

      cy.get('#create-button').click()

      // There should be a notification of succesful blog adding
      cy.contains('A new blog Test Blog by John Smith added')
      // And the new blog should now exist
      cy.contains('Test Blog - John Smith')
    })

    describe('And a blog has been created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test Blog',
          author: 'John Smith',
          url: 'www.test-blog.com'
        })
      })
      it('Blog can be liked', function () {
        // Click view to show all info
        cy.contains('view').click()

        //At start likes should be at zero
        cy.get('#info-likes').should('contain', 'likes 0')

        // Click the like button
        cy.get('#like-button').click()

        // Likes should be incremented by 1
        cy.get('#info-likes').should('contain', 'likes 1')
      })

      it('Blog can be deleted', function () {
        // Click view to show all info
        cy.contains('view').click()

        // Before removing should contain all the info
        cy.get('#info-title-author').as('titleAuthor')
        cy.get('#info-url').as('URL')
        cy.get('#info-likes').as('likes')
        cy.get('#info-user-name').as('userFullName')

        // Click remove to delete the blog
        cy.get('#remove-button').click()
        // (Cypress will auto accept our alert)

        // None of the info shown before should be visible
        cy.get('@titleAuthor').should('not.be.visible')
        cy.get('@URL').should('not.be.visible')
        cy.get('@likes').should('not.be.visible')
        cy.get('@userFullName').should('not.be.visible')
      })
    })

    describe('Multiple blogs have been created with different like amounts', function () {
      beforeEach(function () {
        // Create blogs with differing like amounts not in correct like order
        cy.createBlog({
          title: 'Five Likes Blog',
          author: 'Jennifer Caniston',
          url: 'www.five-likes.com',
          likes: 5
        })

        cy.createBlog({
          title: 'Ten Likes Blog',
          author: 'Larry Wheeler',
          url: 'www.ten-likes.com',
          likes: 10
        })

        cy.createBlog({
          title: 'Two Likes Blog',
          author: 'Chris Cranbery',
          url: 'www.two-likes.com',
          likes: 2
        })

        cy.createBlog({
          title: 'Twenty Likes Blog',
          author: 'Julia Lullerby',
          url: 'www.twenty-likes.com',
          likes: 20
        })
      })

      it('The blogs are in order by likes from most to least', function () {
        cy.get('.blog').eq(0).should('contain', 'Twenty Likes Blog')
        cy.get('.blog').eq(1).should('contain', 'Ten Likes Blog')
        cy.get('.blog').eq(2).should('contain', 'Five Likes Blog')
        cy.get('.blog').eq(3).should('contain', 'Two Likes Blog')
      })
    })
  })
})