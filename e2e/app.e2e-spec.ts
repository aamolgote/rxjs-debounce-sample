import { RxjsDebouncePage } from './app.po';

describe('rxjs-debounce App', () => {
  let page: RxjsDebouncePage;

  beforeEach(() => {
    page = new RxjsDebouncePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
