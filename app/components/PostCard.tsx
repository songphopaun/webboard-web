import Image from 'next/image';

import { formatRelativeTime } from '../utils/relativeTime';
import { FaRegComment } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

type PostCardProps = {
    id: number;
    author: string;
    avatar: string;
    communityId: number;
    community: string;
    title: string;
    content: string;
    comments: number;
    isFirst?: boolean;
    isLast?: boolean;
    searchQuery?: string;
    createdAt?: string;
    isUpdate?: boolean;
    setIsModalDeleteOpen?: (id: number) => void;
    setIsModalUpdateOpen?: (
        id: number,
        communityId: number,
        title: string,
        content: string
    ) => void;
};

export default function PostCard({
    id,
    author,
    avatar,
    communityId,
    community,
    title,
    content,
    comments,
    isFirst = false,
    isLast = false,
    searchQuery = '',
    createdAt,
    isUpdate = false,
    setIsModalDeleteOpen,
    setIsModalUpdateOpen,
}: PostCardProps) {
    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const escapedQuery = query.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

        const parts = text.split(new RegExp(`(${escapedQuery})`, 'gi'));
        return (
            <>
                {parts.map((part, index) =>
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={index} className="bg-yellow-200">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </>
        );
    };

    return (
        <div
            className={`bg-white p-6 border-gray-100 ${
                isFirst ? 'rounded-t-lg border-t' : ''
            } ${isLast ? 'rounded-b-lg border-b' : 'border-b'}`}
        >
            <div className="flex flex-col">
                <div className="flex items-center mb-3">
                    <Image
                        src={avatar}
                        alt={`${author}'s avatar`}
                        className="w-12 h-12 rounded-full"
                        width={48}
                        height={48}
                        objectFit="cover"
                        quality={80}
                        priority
                    />

                    <h4 className="pl-2 text-sm font-medium text-base-grey300 flex justify-between w-full ">
                        <div>
                            <span className={createdAt && `text-[#191919]`}>
                                {author}
                            </span>
                            <span className="ms-2">
                                {createdAt && formatRelativeTime(createdAt)}
                            </span>
                        </div>
                        {isUpdate && (
                            <div className="flex gap-4 text-brand-green500">
                                <FiEdit3
                                    onClick={() =>
                                        setIsModalUpdateOpen &&
                                        setIsModalUpdateOpen(
                                            id,
                                            communityId,
                                            title,
                                            content
                                        )
                                    }
                                    className="h-4 w-4 cursor-pointer"
                                />
                                <RiDeleteBinLine
                                    onClick={() =>
                                        setIsModalDeleteOpen &&
                                        setIsModalDeleteOpen(id)
                                    }
                                    className="h-4 w-4 cursor-pointer"
                                />
                            </div>
                        )}
                    </h4>
                </div>
                <span className=" w-14 h-6 flex items-center justify-center text-base-grey text-xs font-normal font-ibm">
                    {community}
                </span>
                <h3 className="text-base text-[#101828] font-semibold mt-2">
                    {highlightText(title, searchQuery)}
                </h3>
                <p className="text-xs  text-[#101828] mt-1">{content}</p>
                <div className="flex items-center text-gray-500 text-sm mt-2">
                    <FaRegComment className="mr-2" />
                    {comments} Comments
                </div>
            </div>
        </div>
    );
}
