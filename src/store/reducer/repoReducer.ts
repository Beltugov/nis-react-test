import {createSlice} from "@reduxjs/toolkit";

export interface IRepo {
    id: number,
    name: string,
    language: string,
    forks: number,
    updated_at: string,
    stargazers_count: number,
    description: string,
    license: {
        "key": string,
        "name": string,
        "spdx_id": string,
        "url": string,
        "node_id": string
    }
}

interface RepoState {
    repoList: null | IRepo[]
}

const initialState: RepoState = {
    repoList: null
}

const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        repoAddAll(state, action: { type: string, payload: IRepo[] }) {
            return {
                repoList: action.payload
            }
        }
    }
})

export const {repoAddAll} = repoSlice.actions
export default repoSlice.reducer