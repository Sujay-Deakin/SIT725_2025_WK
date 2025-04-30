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
    const query = "?first_name=Sujay&last_name=Aitham&email=Sujay@example.com&password=Pass@1234";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should fail on missing email", function (done) {
    const query = "?first_name=Sujay&last_name=Aitham&password=1234";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  //checking password strength for better security
  it("should reject weak password which do not meet pre-defined requirements", function (done) {
    const query = "?first_name=Weak&last_name=Password&email=weakpass@example.com&password=Weakpasswordbutlongerthan8chars";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  
  it("should accept a strong password meeting all pre-set requirements", function (done) {
    const query = "?first_name=Strong&last_name=pass&email=strongpass@example.com&password=Str0nger@Password1";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it("should fail when first & last names contain invalid data types instead of alphabets", function (done) {
    const query = "?first_name=Sujay123&last_name=Aitham17&email=test@example.com&password=pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  //following 2 test cases check empty strings and whitespaces

  it("should fail when all fields are empty strings", function (done) {
    const query = "?first_name=&last_name=&email=&password=";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should not process fields with only whitespaces", function (done) {
    const query = "?first_name=   &last_name=   &email=    &password=   ";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  //
  
  it("should fail when email already exists", function (done) {
    const query = "?first_name=Sujay&last_name=Aitham&email=sujaycopy@example.com&password=Pass@1234";
    request.get(`${baseUrl}/api/projects${query}`, function () {
      request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
        expect(response.statusCode).to.equal(409);
        done();
      });
    });
  });
  
  it("should allow same names and password but different email", function (done) {
    const query1 = "?first_name=Sujay&last_name=Aitham&email=email1@example.com&password=Pass@1234";
    const query2 = "?first_name=Sujay&last_name=Aitham&email=email2@example.com&password=Pass@1234";
  
    request.get(`${baseUrl}/api/projects${query1}`, function () {
      request.get(`${baseUrl}/api/projects${query2}`, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  
  it("should handle extremely long input values gracefully", function (done) {
    const longString = "abc".repeat(10000);
    const query = `?first_name=${longString}&last_name=${longString}&email=longstring@example.com&password=12345`;
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(500);
      done();
    });
  });
  
  it("should fail with invalid email format", function (done) {
    const query = "?first_name=Deena&last_name=Natalia&email=falseemail&password=pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  }); 
  
  //the following tests simulate SQL Injection on all data entries

  it("should reject injection attempt in first name", function (done) {
    const query = "?first_name={$ne:''}&last_name=Aitham&email=sujay3@example.com&password=Pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject injection attempt in last name", function (done) {
    const query = "?first_name=Sujay&last_name={$gt:''}&email=sujay4@example.com&password=Pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject injection attempt in email field", function (done) {
    const query = "?first_name=Sujay&last_name=Aitham&email={$regex:'.*'}&password=Pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  it("should reject injection attempt in password", function (done) {
    const query = "?first_name=Sujay&last_name=Aitham&email=sujay5@example.com&password={$ne:null}";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });

  //adding javascript XSS injection for email entry and name
  it("should reject JavaScript injection in email", function (done) {
    const query = "?first_name=Sujay&last_name=Aitham&email=<script>alert(1)</script>&password=Pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(200);
      done();
    });
  });
  it("should handle XSS script injection in name field", function (done) {
    const query = "?first_name=<script>alert(1)</script>&last_name=User&email=xss@example.com&password=pass123";
    request.get(`${baseUrl}/api/projects${query}`, function (error, response, body) {
      expect(response.statusCode).to.not.equal(500);
      done();
    });
  });
});
