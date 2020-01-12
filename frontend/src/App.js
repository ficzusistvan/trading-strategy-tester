import React from 'react';
import HeaderLayoutPart from './layout-parts/Header.layoutpart';
import MainLayoutPart from './layout-parts/Main.layoutpart';
import FooterLayoutPart from './layout-parts/Footer.layoutpart';

const App = () => (
  <div>
    <HeaderLayoutPart />
    <MainLayoutPart />
    <FooterLayoutPart />
  </div>
)

export default App;