export interface GitHubBranchRow {
    name?: string;
}

export interface GitHubTreeRow {
    type?: string;
    path?: string;
}

export interface GitHubJsonError {
    message?: string;
}

export interface GitHubTreeBody extends GitHubJsonError {
    tree?: GitHubTreeRow[];
}

export interface GitHubContentBody extends GitHubJsonError {
    content?: string;
}

export interface GitHubCommitRow {
    sha?: string;
}
