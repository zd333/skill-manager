import { SkdsmPage } from './app.po';

describe('skdsm App', function() {
  let page: SkdsmPage;

  beforeEach(() => {
    page = new SkdsmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
