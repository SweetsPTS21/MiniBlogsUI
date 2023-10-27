import "./App.css";
import "./styles/navbar.css";
import "./styles/content.css";
import "./styles/loading.css";
import "./styles/paginate-page.css";
import Navbar from "./components/navbar";
import Content from "./layout/Content";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./blogs";

function App() {
    //store.dispatch(getBlogs());

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <Navbar />
                    <Content />
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
