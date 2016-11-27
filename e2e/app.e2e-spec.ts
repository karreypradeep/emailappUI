import { EmailappPage } from './app.po';

describe('emailapp App', function() {
  let page: EmailappPage;

  beforeEach(() => {
    page = new EmailappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
