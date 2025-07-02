import { RecoilRoot } from "recoil";
// import { TopBar } from "./components/TopBar";
import { TopBar } from "./components/TopBarAsync";

function App() {
  return (
    <RecoilRoot>
      <TopBar />
    </RecoilRoot>
  );
}



export default App;
