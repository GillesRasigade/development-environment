/**
 * Tests describing the index page.
 */
describe('Index Page', function() {

  /**
   * The page is answering correctly to '/' and with a body content containing
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
