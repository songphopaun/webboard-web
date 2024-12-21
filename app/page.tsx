'use client';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

import PostCard from './components/PostCard';
import SearchAndControls from './components/SearchAndControls';
import { findAllPosts, Post } from '@/services/post';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [listPost, setListPost] = useState<Post[]>([]);
    const [communityId, setCommunityId] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getListPost();
    }, [communityId]);

    const getListPost = async () => {
        const res = await findAllPosts(communityId);
        setListPost(res.data);
    };

    const filteredPosts =
        searchQuery.length >= 2
            ? listPost.filter((post) =>
                  post.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            : listPost;

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
                <div className="hidden md:flex flex-col w-64 min-h-screen ">
                    <Sidebar />
                </div>
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
                                <Link key={item.id} href={`/post/${item.id}`}>
                                    <PostCard
                                        author={item.user.username}
                                        avatar={item.user.img}
                                        community={item.community.name}
                                        title={item.title}
                                        content={item.content}
                                        comments={item.comments.length}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                        searchQuery={searchQuery}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    );
}
