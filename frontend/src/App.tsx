import { Search } from "./components/Search/Search";
import { CareDataContextProvider } from "./CareRecipientDataContextProvider";
import { Timeline } from "./components/Timeline/Timeline";
import { DatePicker } from "./components/DatePicker/DatePicker";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <nav>
        <img className="logo" src="./birdie-logo.svg" alt="logo" />
      </nav>
      <CareDataContextProvider>
        <Search />
        <Timeline />
        <DatePicker />
      </CareDataContextProvider>
      <img className="heart" src="./heart.svg" alt="heart icon" />
    </div>
  );
}

export default App;
