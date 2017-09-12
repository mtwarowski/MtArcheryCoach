import { MtArcheryCoachPage } from './app.po';

describe('mt-archery-coach App', () => {
  let page: MtArcheryCoachPage;

  beforeEach(() => {
    page = new MtArcheryCoachPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
