import { Search } from "./components/search/search";
import { CareDataContextProvider } from "./CareRecipientDataContextProvider";
import { CareRecipient } from "./components/careRecipient/careRecipient";
import { DatePicker } from "./components/datePicker/datePicker";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <nav>
        <img className="logo" src="./birdie-logo.svg" alt="logo" />
      </nav>
      <CareDataContextProvider>
        <Search />
        <CareRecipient />
        <DatePicker />
      </CareDataContextProvider>
      <img className="heart" src="./heart.svg" alt="heart icon" />
    </div>
  );
}

export default App;
