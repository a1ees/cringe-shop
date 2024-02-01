import "../assets/vendor/normalize.scss"
import '../assets/styles/App.scss';
import ThemeSelect from "./UI/ThemeSelect";
import * as React from "react";
import {useState} from "react";
import Input from "./UI/Input";
import {Routes, Route} from 'react-router-dom';
import {useTheme} from '../hooks/use-theme'
import SectionCard from "./SectionCard";
import BackButton from "./UI/BackButton";

function App() {
    const [searchValue, setSearchValue] = useState<string>('');
    const { theme, setTheme } = useTheme();

    return (
        <div className='page'>
            <div className='page__sidebar'>
                <ThemeSelect theme={theme} setTheme={setTheme}/>
            </div>
            <div className="page__container container">
                <Input searchValue={searchValue} setSearchValue={setSearchValue}/>
                <BackButton />
                <Routes>
                    <Route path='/' element={<SectionCard searchValue={searchValue} />} />
                    <Route path='/:id' element={<SectionCard searchValue={searchValue} subcategory={true}/>} />
                    <Route path='/:id/:id' element={<SectionCard searchValue={searchValue} subcategory={true} />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
