'use client';

import { useAlertStore } from '@/stores';
import React, { useMemo } from 'react';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const Alert: React.FC = () => {
    const { isVisible, message, type = 'info', hideAlert } = useAlertStore();

    const DATA_MAP = {
        success: {
            color: 'bg-green-100 bg-opacity-80 text-green-700',
            icon: <FaRegCheckCircle />,
        },
        warning: {
            color: 'bg-yellow-100 bg-opacity-80 text-yellow-700',
            icon: <FaRegTimesCircle />,
        },
        info: {
            color: 'bg-blue-100 bg-opacity-80 text-blue-700',
            icon: <FaRegCheckCircle />,
        },
        error: {
            color: 'bg-red-100 bg-opacity-80 text-base-error',
            icon: <FaRegTimesCircle />,
        },
    };

    const alertType = useMemo(() => {
        const typeVariants = DATA_MAP[type] || DATA_MAP.error;
        return typeVariants;
    }, [type]);

    if (!isVisible) return null;

    return (
        <div
            className={`p-4 rounded-lg flex items-center space-x-3 ${alertType.color}`}
            role="alert"
        >
            <div>{alertType.icon}</div>
            <div className="flex-1 text-sm">{message}</div>
            <div onClick={() => hideAlert()}>
                <IoClose />
            </div>
        </div>
    );
};

export default Alert;
