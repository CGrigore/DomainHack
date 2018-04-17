import { AppPage } from './app.po';

describe('domain-hack App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('test', () => {
    page.navigateTo();
    return true;
  });
});
