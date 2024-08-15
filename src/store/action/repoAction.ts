import {Dispatch} from "react";
import {IRepo, repoAddAll} from "../reducer/repoReducer";

export const getRepoAction = (repoName: string) =>
    async (dispatch: Dispatch<{payload: IRepo[], type: "repo/repoAddAll"}>): Promise<IRepo[] | void> => {
        const data = await fetch(`https://api.github.com/search/repositories?q=${repoName}`).then((data) => data.json())
        dispatch(repoAddAll(data.items))
    }

