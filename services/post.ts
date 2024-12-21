import api from './api';

export interface Community {
    id: number;
    name: string;
}

export interface CommunityResponse {
    statusCode: number;
    message: string;
    data: Community[];
}

export interface Comment {
    id: number;
    content: string;
    user: User;
}

export interface User {
    id: number;
    username: string;
    img: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    community: Community;
    user: User;
    comments: Comment[];
}

export interface PostResponse {
    statusCode: number;
    message: string;
    data: Post[];
}

export const findAllCommunity = async (): Promise<CommunityResponse> => {
    const { data } = await api.get<CommunityResponse>('/post/community');
    return data;
};

export const findAllPosts = async (
    communityId?: number | null
): Promise<PostResponse> => {
    const url = communityId ? `/post?communityId=${communityId}` : `/post`;
    const { data } = await api.get<PostResponse>(url);
    return data;
};

export const createPost = async (body: {
    communityId: number;
    title: string;
    content: string;
}): Promise<PostResponse> => {
    const { data } = await api.post<PostResponse>('/post', body);
    return data;
};
