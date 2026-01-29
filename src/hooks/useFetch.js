import { useState } from "react";
import { delayFn } from "../helpers/DelayFn";

export const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFn = async (arg) => {
        try {
            setIsLoading(true);
            setError(true);
            await delayFn();

            const response = await callback(arg);

            return response;
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetchFn, isLoading, error];
};
