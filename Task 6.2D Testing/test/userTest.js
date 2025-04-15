const expect = require("chai").expect;
const request = require("request");

describe("User Project API", function () {
  const baseUrl = "http://localhost:3006";

  it("returns status 200 for base API", function (done) {
    request(`${baseUrl}/api/pjts`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should save a valid user project", function (done) {
    const query = "?first_name=John&last_name=Doe&email=john@example.com&password=1234";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should fail on missing email", function (done) {
    const query = "?first_name=John&last_name=Doe&password=1234";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should fail when all fields are empty strings", function (done) {
    const query = "?first_name=&last_name=&email=&password=";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });  

  it("should handle extremely long input values gracefully", function (done) {
    const longString = "a".repeat(10000); // 10,000 characters
    const query = `?first_name=${longString}&last_name=${longString}&email=long@example.com&password=12345`;
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      // Depending on your app, either allow or reject long inputs
      expect(response.statusCode).to.not.equal(500); // should NOT crash
      done();
    });
  });
  
  it("should fail with invalid email format", function (done) {
    const query = "?first_name=Alice&last_name=Smith&email=notanemail&password=pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });  
});
