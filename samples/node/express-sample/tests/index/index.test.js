/**
 * URL: [/](/)
 * Main page tests.
 */
describe('/ - Main page', function() {

  /**
   * The page is answering to '/' with a status 200 and a body text containing
   * 'Express' in its response.
   */
  it("renders successfully", function(done) {
    request(app).get('/')
      .expect(200)
      .end(function(err, res) {

        expect(res)
          .to.have.property('text')
          .with.length.above(0);

        expect(res.text)
          .to.be.a('string')
          .and.contains('Express');

        done();
      });
  })
})
