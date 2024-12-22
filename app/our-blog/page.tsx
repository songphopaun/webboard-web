'use client';

import React, { useEffect, useState } from 'react';
import SearchAndControls from '../components/SearchAndControls';
import {
    Community,
    deletePost,
    findAllByUser,
    findAllCommunity,
    Post,
    updatePost,
} from '@/services/post';
import PostCard from '../components/PostCard';
import DeletePostModal from '../components/model/DeletePostModel';
import axios from 'axios';
import { useAlertStore } from '../../stores';
import CreatePostModal from '../components/model/CreatePostModal';

interface DataUpdate {
    id: number;
    communityId: number;
    title: string;
    content: string;
}

function OurBlog() {
    const showAlert = useAlertStore.getState().showAlert;

    const [listPost, setListPost] = useState<Post[]>([]);
    const [communityId, setCommunityId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [listCommunity, setListCommunity] = useState<Community[]>([]);

    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpDate] = useState<DataUpdate>({
        id: 0,
        communityId: 0,
        title: '',
        content: '',
    });

    useEffect(() => {
        getListPost();
    }, [communityId]);

    useEffect(() => {
        getListCommunity();
    }, []);

    const getListPost = async () => {
        const res = await findAllByUser(communityId);
        setListPost(res.data);
    };

    const getListCommunity = async () => {
        const res = await findAllCommunity();
        setListCommunity(res.data);
    };

    const filteredPosts =
        searchQuery.length >= 2
            ? listPost.filter((post) =>
                  post.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : listPost;

    const handleOpenDeleteModal = (id: number) => {
        setPostIdToDelete(id);
        setIsModalDeleteOpen(true);
    };

    const handleSubmitDelete = async () => {
        try {
            setIsModalDeleteOpen(!isModalDeleteOpen);
            const res = await deletePost(postIdToDelete);
            showAlert(res.message, 'success');
            getListPost();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showAlert(
                    error.response?.data?.message ||
                        'An unexpected error occurred.',
                    'error'
                );
            } else {
                showAlert(
                    'An unexpected system error occurred. Please try again later.',
                    'error'
                );
            }
        }
    };

    const handleOpenUpdateModal = (
        id: number,
        communityId: number,
        title: string,
        content: string
    ) => {
        console.log('id', id);
        console.log('communityId', communityId);
        console.log('title', title);
        console.log('content', content);
        setDataUpDate({
            id,
            communityId,
            title,
            content,
        });
        setIsModalUpdateOpen(true);
    };

    const handleUpdatePost = async (data: {
        communityId: number;
        title: string;
        content: string;
    }) => {
        try {
            const res = await updatePost(data, dataUpdate.id);
            showAlert(res.message, 'success');

            getListPost();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showAlert(
                    error.response?.data?.message ||
                        'An unexpected error occurred.',
                    'error'
                );
            } else {
                showAlert(
                    'An unexpected system error occurred. Please try again later.',
                    'error'
                );
            }
        }
    };

    return (
        <main className="flex-1 overflow-auto">
            <SearchAndControls
                communityId={communityId}
                setCommunityId={setCommunityId}
                setSearchQuery={setSearchQuery}
                getListPost={getListPost}
            />
            <div className="max-w-6xl mx-auto px-4 pt-6">
                {filteredPosts.map((item: Post, index: number) => {
                    const isFirst = index === 0;
                    const isLast = index === filteredPosts.length - 1;
                    return (
                        <div key={item.id}>
                            <PostCard
                                id={item.id}
                                author={item.user.username}
                                avatar={item.user.img}
                                communityId={item.community.id}
                                community={item.community.name}
                                title={item.title}
                                content={item.content}
                                comments={item.comments.length}
                                isFirst={isFirst}
                                isLast={isLast}
                                searchQuery={searchQuery}
                                isUpdate={true}
                                setIsModalDeleteOpen={() =>
                                    handleOpenDeleteModal(item.id)
                                }
                                setIsModalUpdateOpen={() =>
                                    handleOpenUpdateModal(
                                        item.id,
                                        item.community.id,
                                        item.title,
                                        item.content
                                    )
                                }
                            />
                        </div>
                    );
                })}
            </div>
            <DeletePostModal
                isOpen={isModalDeleteOpen}
                onClose={() => setIsModalDeleteOpen(false)}
                onSubmit={handleSubmitDelete}
            />
            <CreatePostModal
                isOpen={isModalUpdateOpen}
                onClose={() => setIsModalUpdateOpen(false)}
                onSubmit={handleUpdatePost}
                listCommunity={listCommunity}
                dataUpdate={dataUpdate}
            />
        </main>
    );
}

export default OurBlog;
