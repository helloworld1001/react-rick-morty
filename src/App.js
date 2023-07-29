import Characters from './pages/Characters';

import './scss/app.scss';

function App() {
  return (
    <>
      <Characters/>
      <div className="scroll-top isHideBtn">
        <i className="fa-solid fa-circle-arrow-up"></i>
      </div>
    </>
  );
}

export default App;
