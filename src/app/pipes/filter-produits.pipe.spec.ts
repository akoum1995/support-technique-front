import { FilterProduitsPipe } from './filter-produits.pipe';

describe('FilterProduitsPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterProduitsPipe();
    expect(pipe).toBeTruthy();
  });
});
