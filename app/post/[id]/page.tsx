'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { findByPost, Post, Comment, createComment } from '@/services/post';
import PostCard from '@/app/components/PostCard';
import Image from 'next/image';
import { formatRelativeTime } from '@/app/utils/relativeTime';
import axios from 'axios';
import { useAlertStore } from '../../../stores';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Link from 'next/link';

function PostDetail() {
    const router = useRouter();
    const { id } = useParams();

    const showAlert = useAlertStore.getState().showAlert;

    const [post, setPost] = useState<Post | null>(null);
    const [isComment, setIsComment] = useState(false);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPost();
    }, [id]);

    const getPost = async () => {
        const res = await findByPost(Number(id));
        setPost(res.data);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const res = await createComment({
                postId: Number(id),
                content: comment,
            });
            showAlert(res.message, 'success');
            setIsComment(!isComment);
            setComment('');
            getPost();
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddComment = () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return router.push('/login');

        setIsComment(!isComment);
    };
    if (!post) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 pt-6">
            <Link href="/">
                <div className="w-10 h-10 bg-brand-green100 text-brand-green500 flex items-center justify-center rounded-full cursor-pointer hover:bg-brand-green500 hover:text-brand-green100 transition-all duration-200">
                    <FaArrowLeftLong />
                </div>
            </Link>

            <PostCard
                author={post.user.username}
                avatar={post.user.img}
                community={post.community.name}
                title={post.title}
                content={post.content}
                comments={post.comments.length}
                createdAt={post.createdAt}
            />
            {isComment ? (
                <div>
                    <textarea
                        placeholder="What's on your mind..."
                        className="w-full min-h-24 px-4 py-2 border rounded-lg focus:outline-none ring-1 ring-[#DADADA]"
                        rows={4}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            type="button"
                            className="w-full sm:w-24 h-10 text-base-success rounded-lg ring-1 ring-base-success font-ibm font-semibold text-sm hover:ring-brand-green500 hover:text-brand-green500"
                            onClick={() => setIsComment(!isComment)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-full sm:w-24 h-10 bg-base-success text-white rounded-lg font-ibm font-semibold text-sm hover:bg-brand-green500"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            Post
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleAddComment}
                    className="w-auto min-w-56 min-h-10 px-4 py-2 flex items-center justify-center gap-2 text-sm font-semibold font-ibm text-base-success ring-2 ring-base-success rounded-lg"
                >
                    Add Comments
                </button>
            )}

            <div className="my-10">
                {post.comments.map((item: Comment, index: number) => {
                    return (
                        <div key={index} className="flex flex-col mt-10 ">
                            <div className="flex items-center mb-3">
                                <Image
                                    src={item.user.img}
                                    alt={`${item.user.username}'s avatar`}
                                    className="w-12 h-12 rounded-full"
                                    width={48}
                                    height={48}
                                    objectFit="cover"
                                    quality={80}
                                    priority
                                />
                                <h4 className="pl-2 text-sm font-medium text-base-grey300 ">
                                    <span className="text-[#191919]">
                                        {item.user.username}
                                    </span>
                                    <span className="ms-2">
                                        {item.createdAt &&
                                            formatRelativeTime(item.createdAt)}
                                    </span>
                                </h4>
                            </div>
                            <h3 className="text-xs text-[#91919] font-normal ml-14">
                                {item.content}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PostDetail;
