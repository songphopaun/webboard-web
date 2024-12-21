'use client';

import React, { useEffect, useState } from 'react';

import { IoSearchOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosCheckmark } from 'react-icons/io';
import { Community, createPost, findAllCommunity } from '@/services/post';
import CreatePostModal from './CreatePostModal';
import axios from 'axios';
import { useAlertStore } from '../../stores';

interface SearchAndControlsProps {
    communityId: number | null;
    setCommunityId: (id: number) => void;
    setSearchQuery: (query: string) => void;
    getListPost: () => void;
}

const SearchAndControls: React.FC<SearchAndControlsProps> = ({
    communityId,
    setCommunityId,
    setSearchQuery,
    getListPost,
}) => {
    const showAlert = useAlertStore.getState().showAlert;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [listCommunity, setListCommunity] = useState<Community[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getListCommunity();
    }, []);

    const getListCommunity = async () => {
        const res = await findAllCommunity();
        setListCommunity(res.data);
    };

    const handleDropDown = (id: number) => {
        setCommunityId(id);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleCreatePost = async (data: {
        communityId: number;
        title: string;
        content: string;
    }) => {
        try {
            const res = await createPost(data);
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
        <div className="max-w-6xl mx-auto px-4 pt-10 flex items-center gap-2">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pl-10 rounded-lg border-2 border-white bg-inherit focus:outline-none "
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            </div>

            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="px-4 py-2 flex items-center gap-2 text-[#191919]"
                >
                    Community
                    <IoIosArrowDown
                        className={`transition-transform duration-200 ${
                            isDropdownOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                        {listCommunity.map((item: Community, index: number) => {
                            return (
                                <button
                                    key={index}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                                    onClick={() => handleDropDown(item.id)}
                                >
                                    <span className="flex items-center justify-between">
                                        {item.name}
                                        {communityId === item.id && (
                                            <IoIosCheckmark className="text-[#4A4A4A] w-7 h-7" />
                                        )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <button
                className="bg-base-success px-4 py-2 rounded-lg font-ibm font-semibold text-sm hover:bg-brand-green300 text-white"
                onClick={handleOpenModal}
            >
                Create +
            </button>
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreatePost}
                listCommunity={listCommunity}
            />
        </div>
    );
};

export default SearchAndControls;
