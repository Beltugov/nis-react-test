import React, {useState} from 'react';
import './App.scss';
import {Input, Button} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid/DataGrid';

import {useTypeDispatch} from "./hooks/useTypeDispatch";
import {getRepoAction} from "./store/action/repoAction";
import {useTypeSelector} from "./hooks/useTypeSelector";
import {
    GridCallbackDetails,
    GridColDef,
    GridRowParams,
    GridRowsProp,
    MuiEvent
} from "@mui/x-data-grid";
import {IRepo} from "./store/reducer/repoReducer";


function App() {
    const dispatch = useTypeDispatch()
    const repoState = useTypeSelector((state) => state.repoReducer)
    const [inputValue, setInputValue] = useState<string>("")
    const [selectedRepo, setSelectedRepo] = useState<IRepo | null>(null)

    const getRepo = (value: string) => {
        dispatch(getRepoAction(value))
    }

    const columns: GridColDef[] = [
        {field: 'title', headerName: 'Название', flex: 1},
        {field: 'lang', headerName: 'Язык', flex: 1},
        {field: 'forks', headerName: 'Число форков', flex: 1},
        {field: 'stars', headerName: 'Число звезд', flex: 1},
        {field: 'up_date', headerName: 'Дата обновления', flex: 1},
    ]

    const row: GridRowsProp = repoState.repoList !== null ? repoState.repoList.map((elem, id) => {
        const date = elem.updated_at.split("T")[0].replaceAll("-", ".").split(".").reverse().join(".")
        return {
            id,
            title: elem.name,
            lang: elem.language,
            forks: elem.forks,
            stars: elem.stargazers_count,
            up_date: date
        }
    }) : []

    const repoDetailHandler = (params: GridRowParams<any>, event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>, details: GridCallbackDetails<any>) => {
        setSelectedRepo(repoState.repoList![params.row.id])
    }

    return (
        <div className="App">
            <header className="header">
                <Input placeholder="Введите поисковой запрос" disableUnderline={true} value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}/>
                <Button variant="contained" size="large" onClick={() => getRepo(inputValue)}>ИСКАТЬ</Button>
            </header>
            <main>
                {repoState.repoList === null ?
                    <div className="welcome">Добро пожаловать</div> :
                    <div className="main-content">
                        <DataGrid columns={columns} rows={row} className="main-content__repo-list"
                                  onRowClick={(params, event, details) => repoDetailHandler(params, event, details)}/>
                            <div className="main-content__repo-detail">{selectedRepo !== null ?
                                <div className="selected">
                                    <div className="selected-title">{selectedRepo.name}</div>
                                    <div className="selected-lang-and-stars">
                                        <div  className="selected-lang-and-stars__lang">{selectedRepo.language}</div>
                                        <div className="selected-lang-and-stars__star" >
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 15.77L16.18 19.5L14.54 12.47L20 7.74L12.81 7.13L10 0.5L7.19 7.13L0 7.74L5.46 12.47L3.82 19.5L10 15.77Z" fill="#FFB400"/>
                                        </svg>
                                            {selectedRepo.stargazers_count}</div>
                                    </div>
                                    <div className="selected-description">{selectedRepo.description}</div>
                                    <div className="selected-license">{selectedRepo.license.name}</div>
                                </div> : <div className="unselected">Выберите репозиторий</div>}</div>
                    </div>}
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
