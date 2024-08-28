import { toast } from 'react-hot-toast';
import { MessageResponse } from '../types/api-types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';

export const transformImage = (url: string, width = 200) => {
    const newUrl = url.replace('upload/', `upload/dpr_auto/w_${width}/`);
    return newUrl;
};

type ResType =
    | {
        data: MessageResponse;
    }
    | {
        error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
    res: ResType,
    navigate: NavigateFunction | null,
    url: string
) => {
    if ('data' in res) {
        toast.success(res.data.message);
        if (navigate) {
            navigate(url);
        }
    } else {
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as MessageResponse;
        toast.error(messageResponse.message);
    }
};